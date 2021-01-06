"use strict";
//Moleculer_DB
const DbService = require("moleculer-db");
const SqlAdapter = require("moleculer-db-adapter-sequelize");
const nodemailer = require("nodemailer");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASSWORD,
	},
});

/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */

module.exports = {
	name: "registration",
	// version: 1

	/**
	 * Mixins
	 */
	mixins: [DbService],
	adapter: new SqlAdapter(
		"veski",
		process.env.DB_USER,
		process.env.DB_PASSWORD,
		{
			host: "127.0.0.1",
			dialect: "mysql",
		}
	),
	model: {},

	/**
	 * Settings
	 */
	settings: {
		// Available fields in the responses
		secret: process.env.SECRET || "secret",
	},

	/**
	 * Action Hooks
	 */
	hooks: {
		before: {
			/**
			 * Register a before hook for the `create` action.
			 * It sets a default value for the quantity field.
			 *
			 * @param {Context} ctx
			 */
			create(ctx) {
				ctx.params.quantity = 0;
			},

			testear() {
				console.log("aca registration.service");
			},
		},
	},

	/**
	 * Actions
	 */
	actions: {
		/**
		 * The "moleculer-db" mixin registers the following actions:
		 *  - list
		 *  - find
		 *  - count
		 *  - create
		 *  - insert
		 *  - update
		 *  - remove
		 */

		testear: {
			rest: "GET /testear",

			async handler() {
				const test = await this.validateDni("41471665");
				return test;
			},
		},
		sendemail: {
			rest: "POST /sendemail",
			async handler(ctx) {
				let response = await transporter.sendMail({
					from: process.env.EMAIL_USER,
					to: ctx.params.values.email,
					subject: "Veski - Proceso de registro de cuenta",
					html: `<h1>Bienvenid@ a Veski</h1>
					<h3>Por favor ingresá en tu app Veski el siguiente código para continuar con el proceso de registro.</h3>
					<h2>${ctx.params.values.token}</h2>`,
				});
				return response;
			},
		},

		auth: {
			rest: {
				method: "POST",
				path: "/auth",
			},
			async handler(ctx) {
				const username = ctx.params.values.email;
				const emailDb = await this.adapter.db.query(
					`SELECT * FROM client WHERE username = '${username}'`
				);
				if (emailDb[0].length > 0) {
					return {
						error:
							"El email ingresado corresponde a un usuario existente",
					};
				} else {
					return ctx.call("registration.sendemail", ctx.params);
				}
			},
		},
		user: {
			rest: { method: "POST", path: "/create_users" },

			async handler(ctx) {
				const {
					username,
					first_name,
					last_name,
					cellphone,
					dni,
					street,
					city,
					nacimiento,
				} = ctx.params;

				const password = bcrypt.hashSync(ctx.params.password, 10);

				const valDni = await this.validateDni(dni);
				if (!valDni) {
					return {
						error:
							"el DNI ingresado corresponde a un usuario existente",
					};
				}
				const valAge = await this.validateAge(nacimiento);
				if (valAge) {
					return valAge;
				}
				const valDir = await this.validateDirection(
					`${street} , ${city}`
				);
				if (!valDir) {
					return { error: "direccion invalida!" };
				}

				const client = await this.adapter.db.query(
					"INSERT INTO `client` (`username`, `password`, `first_name`, `last_name`, `birthdate`, `cellphone`, `dni`, `street`, `city`)" +
						`VALUES ('${username}', '${password}', '${first_name}', '${last_name}', '${nacimiento}', '${cellphone}', '${dni}', '${street}', '${city}');`
				);

				if (client) {
					const [[{ id }]] = await this.adapter.db.query(
						"SELECT id FROM `client` WHERE dni =" + dni
					);

					const code = await this.generateHash(username);

					const res = this.adapter.db.query(
						"INSERT INTO `accounts` (`id_client`, `code`)" +
							`VALUES ('${id}', '${code}')`
					);

					return res;
				} else {
					return "me rompi :(";
				}
			},
		},
	},

	/**
	 * Methods
	 */
	methods: {
		validateDirection(direction) {
			console.log("me llaman");
			return axios
				.get(
					`http://servicios.usig.buenosaires.gob.ar/normalizar?direccion=${direction}`
				)
				.then(({ data }) => {
					if (data.direccionesNormalizadas.length) {
						return data.direccionesNormalizadas[0].direccion;
					} else {
						return false;
					}
				});
		},
		async validateDni(dni) {
			const dniDb = await this.adapter.db.query(
				`SELECT * FROM \`client\` WHERE dni = '${dni}'`
			);
			return !dniDb[0].length;
		},
		async validateAge(birthdate) {
			const [, , year] = birthdate.split("/");
			console.log(year);
			const today = new Date();
			const dat = today.getFullYear();

			const age = dat - year;
			console.log(birthdate);
			console.log(dat);

			if (age >= 16) {
				return false;
			}
			return { error: "necesitas tener 16 años para registrarte" };
		},

		generateHash(username) {
			const code = jwt.sign(username, this.settings.secret);
			// aplicamos crypto con Gime y mati//
			return code.slice(0, 10);
		},
	},

	/**
	 * Fired after database connection establishing.
	 */
	async afterConnected() {
		// await this.adapter.collection.createIndex({ name: 1 });
	},
};

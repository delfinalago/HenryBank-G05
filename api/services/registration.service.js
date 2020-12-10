"use strict";

const DbService = require("moleculer-db");
const SqlAdapter = require("moleculer-db-adapter-sequelize");
const nodemailer = require("nodemailer");
const axios = require("axios");
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
	adapter: new SqlAdapter("veski", "root", "", {
		host: "127.0.0.1",
		dialect: "mysql",
	}),
	model: {},

	/**
	 * Settings
	 */
	settings: {
		// Available fields in the responses
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
				console.log("aca toy broder");
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
				const test = await this.adapter.db.query("CALL `testear`();");
				return test;
			},
		},
		sendemail: {
			rest: "POST /sendemail",

			params: {
				email: "string",
			},
			/** @param {Context} ctx  */
			async handler(ctx) {
				let response = await transporter.sendMail({
					from: process.env.EMAIL_USER,
					to: ctx.params.email,
					subject: "Veski - Proceso de registro de cuenta",
					html: `<h1>Bienvenid@ a Veski</h1>
					<h3>Por favor hace click <a href="http://google.com">acá</a> para continuar con el proceso de registro.</h3>`,
				});
				return response;
			},

			validate: {
				rest: {
					method: "POST",
					path: "/validate",
				},
				async handler(ctx) {
					const birthdate = ctx.params.birthdate;
					const year = birthdate.split("/");
					console.log(year[0]);
					const today = new Date();
					const dat = today.getFullYear();

					const age = dat - year[0];
					console.log(birthdate);
					console.log(dat);

					if (age >= 16) {
						console.log(age);
						return "Cumple con la edad preestablecida";
					}
					console.log("error");
				},
			},
		},

		auth: {
			rest: {
				method: "POST",
				path: "/auth",
				name: "mailer",
				events: {
					"send.mail": {
						// Validation schema with shorthand notation

						params: {
							from: "string|optional",
							to: "email",
							subject: "string",
						},
					},
				},
			},
			async handler(ctx) {
				const username = ctx.params.username;
				console.log(username);
				const emailDb = await this.adapter.db.query(
					`SELECT * FROM USER WHERE username = '${username}'`
				);
				console.log(emailDb);
				if (emailDb[0].length) {
					return "existe ....";
				} else {
					return ctx.call("registration.sendemail", {
						email: username,
					});
				}
			},
		},
		user: {
			rest: { methodo: "POST", path: "/create_users" },

			async handler(ctx) {
				const {
					name,
					lastname,
					phone,
					dni,
					address,
					province,
					city,
					nacimiento,
				} = ctx.params;

				return test;
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
	},

	/**
	 * Fired after database connection establishing.
	 */
	async afterConnected() {
		// await this.adapter.collection.createIndex({ name: 1 });
	},
};

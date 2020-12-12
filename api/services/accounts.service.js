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
	name: "accounts",
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
		saldoARG: {
			//esta acción mantiene el estado del saldo de la cuenta en pesos de forma actualizada.
			rest: { method: "GET", path: "/saldoarg" },
			async handler(ctx) {
				const id = ctx.params.id_client;
				const saldo = await this.adapter.db
					.query(
						`SELECT balance FROM accounts WHERE id_client = '${id}'`
					)
					.then((e) => e[0][0])
					.then((e) => Object.values(e))
					.then((e) => e[0]);
				const balance = saldo;
				console.log(balance);
				//devuelve saldo actualizado
				return saldo;
			},
		},
		recarga: {
			rest: { method: "PUT", path: "/accountarg" },
			async handler(ctx) {
				const summary = ctx.params.amount;
				const amount = parseInt(summary)
				const destiny = ctx.params.destiny;

				const saldoActual = await this.adapter.db
					.query(
						`SELECT balance + '${amount}' FROM accounts WHERE id_client ='${destiny}' `
					)
					.then((e) => e[0][0])
					.then((e) => Object.values(e))
					.then((e) => e[0])
					.then((e) =>
						this.adapter.db.query(
							`UPDATE accounts SET balance = '${e}' WHERE id_client ='${destiny}' `
						)
					)
					.then((e) =>
						this.adapter.db.query(
							`SELECT balance FROM accounts WHERE id_client = '${destiny}'`
						)
					)
					.then((e) => e[0][0])
					.then((e) => Object.values(e))
					.then((e) => e[0]);

				//devolver saldo actual
				return saldoActual;
			},
		},
	},

	/**
	 * Methods
	 */
	methods: {},

	/**
	 * Fired after database connection establishing.
	 */
	async afterConnected() {
		// await this.adapter.collection.createIndex({ name: 1 });
	},
};

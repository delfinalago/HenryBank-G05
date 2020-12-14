"use strict";

const DbService = require("moleculer-db");
const SqlAdapter = require("moleculer-db-adapter-sequelize");
const nodemailer = require("nodemailer");
const axios = require("axios");
const { MoleculerRetryableError } = require("moleculer").Errors;
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
		recarga: {
			rest: { method: "PUT", path: "/accountarg" },
			async handler(ctx) {
				const amount = parseInt(ctx.params.amount);

				const destiny = ctx.params.destiny;

				await ctx
					.call("accounts.saldoARG", {
						id_client: destiny,
					})
					.then((e) => {
						const newAmount = e + amount;
						return newAmount;
					})
					.then((e) =>
						this.adapter.db.query(
							`UPDATE accounts SET balance = '${e}' WHERE id_client ='${destiny}' `
						)
					)

					.catch((err) => err);

				//devolver saldo actual
				return ctx.call("accounts.saldoARG", {
					id_client: destiny,
				});
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

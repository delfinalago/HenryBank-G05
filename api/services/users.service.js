"use strict";

const DbService = require("moleculer-db");
const SqlAdapter = require("moleculer-db-adapter-sequelize");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */

module.exports = {
	name: "users",
	// version: 1

	/**
	 * Mixins
	 */
	mixins: [DbService],
	adapter: new SqlAdapter("veski", "rocco", "Rocco", {
		host: "127.0.0.1",
		dialect: "mysql",
	}),
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

			async handler() {},
		},

		login: {
			rest: "POST /login",

			async handler(ctx) {
				const [[user]] = await this.adapter.db.query(
					`SELECT * FROM client WHERE username = '${ctx.params.username}'`
				);

				const test = await bcrypt.compare(
					ctx.params.password,
					user.password
				);

				if (test) {
					const { username, id, first_name, last_name } = user;
					delete user.password;
					const token = jwt.sign(
						{ username, id, first_name, last_name },
						this.settings.secret
					);
					return { ...user, token };
				}
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

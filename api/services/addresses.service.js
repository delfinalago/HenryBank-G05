"use strict";

const DbService = require("moleculer-db");
const SqlAdapter = require("moleculer-db-adapter-sequelize");

/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */

module.exports = {
	name: "addresses",
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
				console.log("aca addresses.service");
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

		agregar: {
			rest: "POST /agregar",
			async handler(ctx) {
				const { street, postalCode, province, city } = ctx.params;
				const res = await this.adapter.db.query(
					"INSERT INTO `addresses` (`street`, `postalCode`, `province`, `city`)" +
						`VALUES ('${name}', '${lastname}', '${phone}', '${dni}', '${address}', '${city}', '${nacimiento}');`
				);
				return res;
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

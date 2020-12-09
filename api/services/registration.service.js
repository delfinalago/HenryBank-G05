"use strict";
//Moleculer_DB
const DbService = require("moleculer-db");
const SqlAdapter = require("moleculer-db-adapter-sequelize");

//Authentication
const { ServiceBroker } = require("moleculer");
const broker = new ServiceBroker({
    validator: true // Default is true
});

/* ================================================================================================================== */

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
				const test = await this.adapter.db.query("CALL `testear`();");
				return test;
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
							subject: "string"
						},
					}
				}
			},
			async handler(ctx) {
				const email = ctx.params.email;
				const emailDb = await this.adapter.db.query("CALL `buscarMail`();");
				if (email === emailDb ) {
					
					console.log("ok");
					return emailDb; 
				} else {
					return "error";
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

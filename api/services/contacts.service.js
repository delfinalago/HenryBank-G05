"use strict";

const DbService = require("moleculer-db");
const SqlAdapter = require("moleculer-db-adapter-sequelize");
const Mail = require("nodemailer/lib/mailer");

/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */

module.exports = {
	name: "contacts",

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
	model: { name: "contacts" },

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
				console.log("hola");
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

		allContacts: {
			rest: "GET /all",

			async handler(ctx) {
				const id_cli = ctx.meta.user.id;
				const [allContact] = await this.adapter.db.query(
					`SELECT * FROM contacts WHERE id_cli= '${id_cli}' ORDER BY alias`
				);
				return allContact;
			},
		},

		associate: {
			rest: "POST /associate",

			async handler(ctx) {
				const { alias, username } = ctx.params;
				const { id: id_cli } = ctx.meta.user;

				const [[contact]] = await this.adapter.db.query(
					`SELECT id FROM client WHERE username = '${username}'`
				);

				console.log(contact);

				if (contact) {
					const insertContact = await this.adapter.db.query(
						"INSERT INTO `contacts` (`alias` , `id_cli`, `id_contact` )" +
							`VALUES ('${alias}','${id_cli}' , '${contact.id}');`
					);
					//id_cli es un dato externo que lo tomamos de la auth hecha al usuario, asi sabemos quien hace las peticiones

					console.log(insertContact);
				} else {
					return { error: "no existe el usuario" };
				}
			},
		},

		modifContact: {
			rest: "PUT /modifContact",

			async handler(ctx) {
				const { id_contact, alias } = ctx.params;
				const { id } = ctx.meta.user;

				console.log(alias);

				const modcontact = await this.adapter.db.query(
					`UPDATE contacts SET alias = '${alias}' WHERE id_contact ='${id_contact}' AND id_cli = '${id}' `
				);

				return modcontact;
			},
		},

		deleteContact: {
			rest: "DELETE /delete",

			async handler(ctx) {
				const { id_contact } = ctx.params;
				const { id } = ctx.meta.user;
				const delContact = await this.adapter.db.query(
					`DELETE FROM contacts WHERE id_contact ='${id_contact}' AND id_cli = '${id}' `
				);
				console.log(ctx.params);
				return delContact;
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

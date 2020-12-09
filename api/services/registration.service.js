"use strict";

const DbService = require("moleculer-db");
const SqlAdapter = require("moleculer-db-adapter-sequelize");

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

	    validate:{

		rest: {

			method: "POST",
			path: "/validate",

		},
		async handler(ctx) {
		  const birthdate = ctx.params.birthdate;
		  const bla = birthdate.split('/')
          console.log ( bla[0])
		   const today = new Date();
		   const dat = today.getFullYear();


		  const age = dat - bla[0];
		   console.log(birthdate)
            console.log (dat)

	      if(age >= 16)  {
            console.log (age)
		  return "Cumple con la edad preestablecida";

	       }
		   console.log('error');
	      },
		},
		create_account:{
			rest: {

				method: "POST",
				path: "/create",

			},
			async handler(ctx) {

				const name = ctx.params.nombre
				const surname = ctx.params.apellido
				const tipoDoc = ctx.params.tipoDeDocumento
				const doc = ctx.params.dni
				const birthdat = ctx.params.fechaDeNacimiento
				// const mail = ctx.params.email
				// const pass = ctx.params.password
				const cel = ctx.params.celular
				const street = ctx.params.domicilio
				const numDom = ctx.params.numDom
				const city = ctx.params.localidad
				const province = ctx.params.provincia
				// const country= ctx.params.pais





			},



		}
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

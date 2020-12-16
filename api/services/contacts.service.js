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
	adapter: new SqlAdapter("veski", "rocco", "Rocco", {
		host: "127.0.0.1",
		dialect: "mysql",
	}),
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
    
    findContact: {
        rest: "GET",
        path: "/allcontacts",

		async handler(ctx) {
	
	    const id_cli = ctx.params.id_cli;
		const allContact = await this.adapter.db
       .query(
            `SELECT * FROM contacts WHERE id_cli= '${id_cli}'`
        );
            return allContact;
        },
	},
	

	associateContact: {
		rest: "POST",
		path: "/associateContact",

		async handler(ctx) {
			const {
				alias,
				username,
				id_cli 
			} = ctx.params;
			
		const contact = await this.adapter.db
	   .query(
		  
		  `SELECT id FROM client WHERE username = '${username}'`
	   )
		.then(e => Object.values(e[0][0]))
		 console.log(contact)


	   if(!contact[0].length) {
		const insertContact = await this.adapter.db
		.query(
		   "INSERT INTO `contacts` (`alias` , `id_cli`, `id_contact` )" + `VALUES ('${alias}','${id_cli}' , '${contact}');`
		);
		//id_cli es un dato externo que lo tomamos de la auth hecha al usuario, asi sabemos quien hace las peticiones

		  console.log(insertContact)
	   }
	
		},
	
},



	modifContact: {
		rest: "PUT /modifContact",

	async handler(ctx) {    

	const id_contact = ctx.params.id_contact;
	const alias = ctx.params.alias;

	console.log(alias)
   

   const modcontact = await this.adapter.db

		.query(
			`UPDATE contacts SET alias = '${alias}' WHERE id_contact ='${id_contact}' `
		)
	       
            },
        },
        
    deleteContact: {
                rest: "DELETE",
                path: "/deleteContact",
             
                async handler(ctx) {    

                    const contact = ctx.params.id_contact;
			   const delContact = await this.adapter.db.query(

					`DELETE FROM contacts WHERE id_contact ='${contact}' `
					
				);

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

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
	adapter: new SqlAdapter("veski", "root", "", {
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
        path: "/findContact",

		async handler() {
	
		const allContact = await this.adapter.db
       .query(
            `SELECT alias FROM CONTACTS'`
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
			} = ctx.params;


			
		const contact = await this.adapter.db
       .query(
		  
		  `SELECT id FROM client WHERE username = '${username}'`
	   );
        console.log(contact)
		//   if(contact) {
   
		//    "INSERT INTO contacts (`alias` , `username` )" + `VALUES ('${alias}', '${username}');`

		//   }
              
		// 	return contact;
	   
	},
		

	
	// async handler(ctx) {
	// 	const username = ctx.params.username;
	// 	console.log(username);
	// 	const emailDb = await this.adapter.db.query(
	// 		`SELECT * FROM USER WHERE username = '${username}'`
	// 	);
	// 	console.log(emailDb);
	// 	if (emailDb[0].length) {
	// 		return "existe ....";
	// 	} else {
	// 		return ctx.call("registration.sendemail", {
	// 			email: username,
	// 		});
	// 	}
	// },
},

    modifContact: {
                rest: "PUT",
                path: "/modifContact",

            async handler(ctx) {    

			const alias = ctx.params.alias;
			const aliasm = ctx.params.alias;
		   const modcontact = await this.adapter.db
		
                .query(
                    `UPDATE contacts SET alias = '${aliasm}' WHERE alias ='${alias}' `
				);
				const modif= this.adapter.db.query`SELECT * FROM con WHERE alias = '${alias}'`
				console.log(modcontact)
				
				return modcontact;
            },
        },
        
    eliminContact: {
                rest: "DELETE",
                path: "/deleteContact",
             
                async handler(ctx) {    

                    const contact = ctx.params.id_contact;
			   const modcontact = await this.adapter.db.query(

					`DELETE FROM contacts= '${id_contact}' WHERE id_contact ='${id_contact}' `
					
				);
				
				const allContact = await this.adapter.db.query(
					`SELECT * FROM CONTACTS WHERE id_contact = '${id_contact}'`
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

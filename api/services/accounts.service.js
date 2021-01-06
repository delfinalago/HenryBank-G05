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

			testear() { },
		},
	},

	/**
	 * Actions
	 */
	actions: {
		testear: {
			rest: "GET /testear",

			async handler() {
				const test = await this.validateDni("41471665");
				return test;
			},
		},

		saldoARG: {
			//esta acción mantiene el estado del saldo de la cuenta en pesos de forma actualizada.
			rest: { method: "GET", path: "/saldoarg" },
			async handler(ctx) {
				const id = ctx.params.id_client || ctx.meta.user.id;

				const saldo = await this.adapter.db
					.query(
						`SELECT balance FROM accounts WHERE id_client = '${id}'`
					)

					.then((e) => Object.values(e[0][0])[0])

					.catch((err) => console.log(err));

				const balance = parseInt(saldo);
				//devuelve saldo actualizado
				if (ctx.params.nombre) {
					return {
						balance,
						name: `${ctx.meta.user.first_name} ${ctx.meta.user.last_name}`,
					};
				}
				return balance;
			},
		},

		recarga: {
			rest: { method: "PUT", path: "/accountarg" },
			async handler(ctx) {
				const amount = parseInt(ctx.params.amount);

				const { destiny, type } = ctx.params;

				await ctx
					.call("accounts.saldoARG", {
						id_client: destiny,
					})
					.then((e) => {
						const newAmount = e + amount;
						return newAmount;
					})
					.then((e) => {
						if (type === "recarga") {
							this.adapter.db.query(
								"INSERT INTO `transactions` (`state`, `type`, `description`, `amount`, `destiny`)" +
								`VALUES ('1', 'recarga', '', '${amount}', '${destiny}');`
							);
						}
						return this.adapter.db.query(
							`UPDATE accounts SET balance = '${e}' WHERE id_client ='${destiny}' `
						);
					})

					.catch((err) => console.log(err));

				//devolver saldo actual
				return ctx.call("accounts.saldoARG", {
					id_client: destiny,
				});
			},
		},
		//	---------------------	 acciones para administrar las transactions---//
		extrac: {
			rest: "PUT /extraccion",
			async handler(ctx) {
				const amount = parseInt(ctx.params.amount);
				const { state, origin, type, description } = ctx.params;
				if (state) {
					await ctx
						.call("accounts.saldoARG", {
							id_client: origin,
						})
						.then((e) => {
							const newAmount = e - amount; //extrae la plata//
							return newAmount;
						})
						.then(
							(
								e //actualizo el monto//
							) => {
								if (type === "gasto") {
									this.adapter.db.query(
										"INSERT INTO `transactions` (`state`, `type`, `description`, `amount`, `origin`)" +
										`VALUES ('1', 'gasto', '${description}', '${amount}', '${origin}');`
									);
								}
								return this.adapter.db.query(
									`UPDATE accounts SET balance = '${e}' WHERE id_client ='${origin}' `
								);
							}
						)

						.catch((err) => console.log(err));

					//devolver saldo actual
					return ctx.call("accounts.saldoARG", {
						id_client: origin,
					});
				}
			},
		},

		transaction: {
			rest: "PUT /transc", //operacion que une la extraccion con la recarga de dinero //

			async handler(ctx) {
				const { origin, destiny, amount, state } = ctx.params;

				const description = ctx.params.description || "";

				try {
					await ctx.call("accounts.extrac", {
						origin,
						amount,
						state,
					}); //invoca a la func  extrac y recarga //

					await ctx.call("accounts.recarga", { amount, destiny });

					await this.adapter.db.query(
						"INSERT INTO `transactions` (`state`, `type`, `description`, `amount`, `origin`, `destiny`)" +
						`VALUES ('1', 'transferencia', '${description}', '${amount}', '${origin}', '${destiny}');`
					);
				} catch (e) {
					return e;
				}

				return "transferencia exitosa!";
			},
		},
		//------------------ acciones para los graficos --------------- gg  //

		// egreso: {
		// 	rest : "GET /egresos",

		// async handler (ctx){
		// 	const id = ctx.params.id;
		// 	const [spending] = await this.adapter.db
		// 			.query(
		// 				`SELECT *  FROM transactions WHERE origin = '${id}'`
		// 			)
		// 			return spending[0] ;
		//     }
		// },
		// ingreso : {
		// 	rest : "GET /ingresos",

		// async handler (ctx){
		// 	const id = ctx.params.id;
		// 	const [spending] = await this.adapter.db
		// 			.query(
		// 				`SELECT *  FROM transactions WHERE destiny = '${id}'`
		// 			)
		// 			return spending[0] ;
		//     }
		// },
		//-----accion que se van a disparar con los botones ------//

		ultMovMesEgr: {
			rest: "GET /movMesEg",   //accion que muestra los egresos que se realizaron en los ultimos 3 meses.
			async handler(ctx) {
				const id = ctx.params.id_client || ctx.meta.user.id;

				const today = new Date()
				const dat = today.toLocaleDateString().split("/").reverse().join("-");
				console.log(dat)
				console.log(id)
				const [movEgresosM] = await this.adapter.db
					.query(
						//  `SELECT * FROM transactions WHERE origin ='${id}' ORDER BY date_colum desc`
						//  `SELECT * FROM transactions WHERE origin = '${id}' AND date_colum <= '${dat}'
						//   ORDER BY date_colum DESC`
						`SELECT * FROM  transactions WHERE origin ='${id}' AND date_colum > DATE_SUB(NOW(),INTERVAL 90 DAY)`
					)
				return movEgresosM;

			},
		},
		ultMovSemEgr: {
			rest: "GET /movSemEg",    //accion que muestra los ult egresos que se realizaron en las semanas anteriores a la fecha.
			async handler(ctx) {
				const id = ctx.params.id_client || ctx.meta.user.id;
				const today = new Date()
				const dat = today.toLocaleDateString().split("/").reverse().join("-");

				console.log(dat)

				const [movEgresosS] = await this.adapter.db
					.query(
						`SELECT * FROM  transactions WHERE origin ='${id}' AND date_colum > DATE_SUB(NOW(),INTERVAL 14 DAY)`
					)
				console.log([movEgresosS])
				return movEgresosS;
			},
		},
		ultMovDiaEgr: {
			rest: "GET /movDiaEg",    //accion que muestra los ult egresos que se realizaron en los dias anteriores a la fecha.
			async handler(ctx) {
				const id = ctx.params.id_client || ctx.meta.user.id;
				const today = new Date()
				const dat = today.toLocaleDateString().split("/").reverse().join("-");
				const [movEgresosD] = await this.adapter.db
					.query(
						`SELECT * FROM  transactions WHERE origin ='${id}' AND date_colum > DATE_SUB(NOW(),INTERVAL 7 DAY)`
					)
				return movEgresosD;

			},
		},
		ultMovMesIngr: {
			rest: "GET /movMesIng",    //accion que carga los ult ingresos  que se reallizaron en los meses anteriores.
			async handler(ctx) {
				const id = ctx.params.id_client || ctx.meta.user.id;
				const today = new Date()
				const dat = today.toLocaleDateString().split("/").reverse().join("-");
				const [movIngresosM] = await this.adapter.db
					.query(
						`SELECT * FROM transactions WHERE  destiny = '${id}' AND   date_colum <='${dat}'`
					)
				return movIngresosM[0];
			},
		},

		ultMovSemIngr: {
			rest: "GET /movSemIng",    //accion que carga los ult ingresos  que se realizaron en las ultimas semanas.
			async handler(ctx) {
				const id = ctx.params.id_client || ctx.meta.user.id;
				const today = new Date()
				const dat = today.toLocaleDateString().split("/").reverse().join("-");
				const [movIngresosS] = await this.adapter.db
					.query(
						`SELECT * FROM transactions WHERE destiny = '${id}' AND   date_colum <='${dat}' `
					)
				return movIngresosS[0];
			},
		},
		ultMovDiaIngr: {
			rest: "GET /movDiaIng",    //accion que carga los ult ingresos  que se reallizaron en los dias anteriores.
			async handler(ctx) {
				const id = ctx.params.id_client || ctx.meta.user.id;
				const today = new Date()
				const dat = today.toLocaleDateString().split("/").reverse().join("-");
				const [movIngresosD] = await this.adapter.db
					.query(
						`SELECT * FROM transactions WHERE destiny = '${id}' AND   date_colum <='${dat}'`
					)
				return movIngresosD[0];
			},
		},
		movements: {
			rest: "GET /mov", //lista los  movimientos de un usuario por fecha  --tarea de delfi --//


			async handler(ctx) {
				const id = ctx.params.id_client || ctx.meta.user.id;
				const today = new Date()
				const dat = today.toLocaleDateString().split("/").reverse().join("-");
				const [movUser] = await this.adapter.db
					.query(
						`SELECT *  FROM transactions WHERE origin = '${id}' ORDER BY  date_colum <='${dat}'  DESC LIMIT 14`
					)
				return movUser;
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

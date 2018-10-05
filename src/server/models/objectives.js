/* Connects to PosgreSQL
*
* Requirement:
* set PGUSER and PGPASSWORD
* environment variables
* to PostgreSQL username and password...
*
* set PGUSER=<postgres_username>
* set PGPASSWORD=<postgres_password>
*/
// import { config } from '../../../config'
import { config } from '../../config'

import { logajohn } from '../../lib/logajohn'

//const { Client } = require('pg')

// Pool is better than Client...
const { Pool } = require('pg') // PostgreSQL client pool...

// logajohn.setLevel('info')
logajohn.setLevel(config.DEBUG_LEVEL)
logajohn.debug('objectives.js: logajohn.getLevel()=', logajohn.getLevel())

/**
* execs links_qa script and returns output
*/
export class Objectives {

    constructor(dbname = 'scrumi') {
        this.dbname = dbname
    }

    addObjective(objective) {

        const sWho = 'Objectives::addObjective'

        return new Promise((resolve, reject) => {

	        const config = { database: this.dbname }

	        logajohn.debug(`${sWho}(): Calling pool = new Pool(`, config, ')...')
	        const pool = new Pool(config)

	        const sQuery = `INSERT into tasks 
        	(description, user_id_assigned_to)
        	VALUES
        	($1, $2)
            RETURNING task_id, description, user_id_assigned_to
        	`
	        const args = [objective.description, objective.user_id_assigned_to]

	        logajohn.debug(`${sWho}(): Calling pool.query("${sQuery}", ${JSON.stringify(args)})...`)

	        pool.query(sQuery, args)
	        .then((res) => {
	            logajohn.debug(`${sWho}(): Resolving with res = `, res)
                    resolve(res.rows[0])
	        })
	        .catch(
                    err => setImmediate(() => {
	                logajohn.debug(`${sWho}(): Caught err, rejecting with err = `, err)
                        reject(err)
                    }),
            )

        })/* new Promise */

    }/* addObjective() */

    getObjectives(filter) {
        const sWho = 'Objectives::getObjectives'

        logajohn.debug(`${sWho}(): filter = `, filter )

        return new Promise((resolve, reject) => {

            if (filter == null) {
                reject(new Error('You supplied a null filter.'))
            }

            let args = []
            let wheres = []
            if( filter.description_filter ){
                // NOTE: string concatenation operator in PostgreSQL is "||" 
                //wheres.push("\t" + "t.description like '%' || $" + (wheres.length+1) + " || '%'")
                wheres.push("\t" + "t.description ILIKE '%' || $" + (wheres.length+1) + " || '%'") // Use case-insensitive PostgreSQL specific "ILIKE" in lieu of "like"...
                args.push(filter.description_filter)
            }

            let sWheres = "" 
            if( wheres.length > 0 ){
                sWheres = "\n" + 
                "WHERE\n" +
                wheres.join("\n" + "AND" + "\n")
            }

            let sOrderBy = ""

            if( filter.sort_by_field ){
                if( filter.sort_by_field.toLowerCase() == 'description' ){ 
                    sOrderBy = "\nORDER BY description"
                }

                if( filter.sort_by_asc_desc && filter.sort_by_asc_desc.toUpperCase() == 'ASC' ){
                    sOrderBy += " ASC"
                }
                else if( filter.sort_by_asc_desc && filter.sort_by_asc_desc.toUpperCase() == 'DESC' ){
                    sOrderBy += " DESC"
                }
            }

            const config = { database: this.dbname }

            let sQuery = `
            SELECT
                t.task_id, t.description, t.user_id_assigned_to,
                u.first_name, u.middle_name, u.last_name  
            FROM 
                tasks t
            LEFT OUTER JOIN
                users u ON t.user_id_assigned_to = u.user_id`

            if( sWheres ){ 
                sQuery += sWheres
            }

            if( sOrderBy ){ 
                sQuery += sOrderBy
            }

            //logajohn.debug(`${sWho}(): Calling client = new Client(config), config = `, config)
            //const client = new Client(config)

	        logajohn.debug(`${sWho}(): Calling pool = new Pool(`, config, ')...')
	        const pool = new Pool(config)

	        logajohn.debug(`${sWho}(): Calling pool.query("${sQuery}", ${JSON.stringify(args)})...`)

	        pool.query(sQuery, args)
	        .then((res) => {
	            logajohn.debug(`${sWho}(): resolving with res = `, res)
                    resolve(res.rows)
	        })
	        .catch(
                 err => setImmediate(() => {
	                logajohn.debug(`${sWho}(): rejecting with err = `, err)
                      reject(err)
                  }),
            )

        }) /* return new Promise( (resolve, reject ) =>  */
    } /* getObjectives() */

    deleteObjectiveById(task_id) {
        const sWho = 'Objectives::deleteObjectiveById'

        return new Promise((resolve, reject) => {

	        const config = { database: this.dbname }
	        logajohn.debug(`${sWho}(): Calling pool = new Pool(`, config, ')...')
	        const pool = new Pool(config)

	        const sQuery = `DELETE from tasks
        	 WHERE task_id = $1
            RETURNING task_id
        	`
	        const args = [task_id]

	        logajohn.debug(`${sWho}(): Calling pool.query("${sQuery}", ${JSON.stringify(args)})...`)

	        pool.query(sQuery, args)
	        .then((res) => {
	            logajohn.debug(`${sWho}(): resolving with res.rows[0].task_id, res = `, res)
                    resolve(res.rows[0].task_id)
	        })
	        .catch(
                    err => setImmediate(() => {
	                logajohn.debug(`${sWho}(): Caught err, rejecting with err = `, err)
                        reject(err)
                    }),
                )
        })/* new Promise */
    }/* deleteObjectiveById() */

} /* class Objectives() */

// module.exports = Objectives;
// export Objectives;

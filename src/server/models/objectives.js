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
import { config } from '../../config'

import { logajohn } from '../../lib/logajohn'

//const { Client } = require('pg')
// Pool is better than Client...
const { Pool } = require('pg') // PostgreSQL client pool...

logajohn.setLevel(config.DEBUG_LEVEL)
logajohn.debug('objectives.js: logajohn.getLevel()=', logajohn.getLevel())

/**
* execs links_qa script and returns output
*/
export class Objectives {

    constructor(dbname = 'scrumi') {
        this.dbname = dbname
    }

    // Mirrors full_name custom Postgres function...use mostly for testing...
    static fullName(firstName, middleName, lastName){
        if( ! firstName ){
           firstName = "" 
        }
        else{
            firstName = firstName.trim()
        }

        if( ! middleName ){
           middleName = "" 
        }
        else{
            middleName = middleName.trim()
        }

        if( ! lastName ){
           lastName = "" 
        }
        else{
            lastName = lastName.trim()
        }

        let sFullName = ""

        if( firstName.length > 0 ){
            sFullName += firstName
        }

        if( middleName.length > 0 ){
            if( sFullName.length > 0 ){
                sFullName += ' ';
            }
            sFullName += middleName
        }

        if( lastName.length > 0 ){
            if( sFullName.length > 0 ){
                sFullName += ' ';
            }
            sFullName += lastName
        }

        return sFullName
    }/* static fullName() */

    addObjective(objective) {

        const sWho = 'Objectives::addObjective'

        return new Promise((resolve, reject) => {

	        const config = { database: this.dbname }

	        logajohn.debug(`${sWho}(): Calling pool = new Pool(`, config, ')...')
	        const pool = new Pool(config)

	        const sQuery = `INSERT into objectives 
        	(description, user_id_assigned_to, begun, completed, comment)
        	VALUES
        	($1, $2, $3, $4, $5)
            RETURNING objective_id, description, user_id_assigned_to, begun, completed, comment
        	`
	        const args = [
                objective.description,
                objective.user_id_assigned_to,
                objective.begun,
                objective.completed,
                objective.comment
            ];

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

            let sQuery = `
            SELECT
                o.objective_id, o.description, o.user_id_assigned_to,
                u.first_name, u.middle_name, u.last_name,
                full_name(u.first_name, u.middle_name, u.last_name),  
                o.begun, o.completed, o.comment 
            FROM 
                objectives o
            LEFT OUTER JOIN
                users u ON o.user_id_assigned_to = u.user_id`

            let args = []
            let wheres = []

            if( filter.description_filter ){
                // NOTE: string concatenation operator in PostgreSQL is "||" 
                //wheres.push("\t" + "o.description like '%' || $" + (wheres.length+1) + " || '%'");
                wheres.push("\t" + "o.description ILIKE '%' || $" + (wheres.length+1) + " || '%'"); // Use case-insensitive PostgreSQL-specific "ILIKE" in lieu of "like"...
                args.push(filter.description_filter);
            }

            if( filter.full_name_filter ){
                wheres.push("\t" + "full_name(u.first_name, u.middle_name, u.last_name) ILIKE '%' || $" + (wheres.length+1) + " || '%'");
                args.push(filter.full_name_filter);
            }

            if( filter.comments_filter ){
                wheres.push("\t" + "o.comment ILIKE '%' || $" + (wheres.length+1) + " || '%'");
                args.push(filter.comments_filter);
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
                else if( filter.sort_by_field.toLowerCase() == 'full_name' ){ 
                    sOrderBy = "\nORDER BY full_name(u.first_name, u.middle_name, u.last_name)"
                }
                else if( filter.sort_by_field.toLowerCase() == 'comment' ){ 
                    sOrderBy = "\nORDER BY o.comment"
                }
                else if( filter.sort_by_field.toLowerCase() == 'begun' ){ 
                    sOrderBy = "\nORDER BY o.begun"
                }
                else if( filter.sort_by_field.toLowerCase() == 'completed' ){ 
                    sOrderBy = "\nORDER BY o.completed"
                }
            }

            if( sOrderBy.length > 0 ){
                if( filter.sort_by_asc_desc && filter.sort_by_asc_desc.toUpperCase() == 'ASC' ){
                    sOrderBy += " ASC"
                }
                else if( filter.sort_by_asc_desc && filter.sort_by_asc_desc.toUpperCase() == 'DESC' ){
                    sOrderBy += " DESC"
                }
            }



            if( sWheres ){ 
                sQuery += sWheres
            }

            if( sOrderBy ){ 
                sQuery += sOrderBy
            }

            const config = { database: this.dbname }

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

    deleteObjectiveById(objective_id) {
        const sWho = 'Objectives::deleteObjectiveById'

        return new Promise((resolve, reject) => {

	        const config = { database: this.dbname }
	        logajohn.debug(`${sWho}(): Calling pool = new Pool(`, config, ')...')
	        const pool = new Pool(config)

	        const sQuery = `DELETE from objectives 
        	 WHERE objective_id = $1
            RETURNING objective_id
        	`
	        const args = [objective_id]

	        logajohn.debug(`${sWho}(): Calling pool.query("${sQuery}", ${JSON.stringify(args)})...`)

	        pool.query(sQuery, args)
	        .then((res) => {
	            logajohn.debug(`${sWho}(): resolving with res.rows[0].objective_id, res = `, res)
                    resolve(res.rows[0].objective_id)
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

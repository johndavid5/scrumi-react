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
import { utils } from '../../lib/utils'

// Pool is better than Client...
// const { Client } = require('pg') // PostgreSQL client
const { Pool } = require('pg') // PostgreSQL client pool...

// logajohn.setLevel('info')
logajohn.setLevel(config.DEBUG_LEVEL)
logajohn.debug('users.js: logajohn.getLevel()=', logajohn.getLevel())

/**
* execs links_qa script and returns output
*/
export class Users {
    constructor(dbname = config.DEFAULT_DB_NAME) {
        this.dbname = dbname
    }

    /**
    * e.g., var users = new Users();
    *      users.addUser({first_name: 'Moe', middle_name: 'S', last_name: 'Howard'});
    */
    addUser(user) {
        const sWho = 'Users::addUser'

        return new Promise((resolve, reject) => {

	        const config = { database: this.dbname }

	        logajohn.debug(`${sWho}(): Calling pool = new Pool(`, config, ')...')
	        const pool = new Pool(config)

	        const sQuery = `INSERT into users 
        	(first_name, middle_name, last_name)
        	VALUES
        	($1, $2, $3)
            RETURNING user_id, first_name, middle_name, last_name
        	`
	        const args = [user.first_name, user.middle_name, user.last_name]

	        logajohn.debug(`${sWho}(): Calling pool.query("${sQuery}", ${JSON.stringify(args)})...`)

	        pool.query(sQuery, args)
	        .then((res) => {
	            logajohn.debug(`${sWho}(): Got res = `, res)
                    resolve(res.rows[0])
	        })
	        .catch(
                    err => setImmediate(() => {
	                logajohn.debug(`${sWho}(): Caught err = `, utils.errorStringify(err))
                        reject( utils.errorStringify(err) )
                    }),
                )
        })/* new Promise */
    }/* addUser() */


    getUsers(filter) {
        const sWho = 'Users::getUsers'

        return new Promise((resolve, reject) => {

	        const config = { database: this.dbname }

	        logajohn.debug(`${sWho}(): Calling pool = new Pool(`, config, ')...')
	        const pool = new Pool(config)

	        let sQuery = 'SELECT user_id, first_name, middle_name, last_name, username'
            if( filter.fetch_password_hash === true ){
                   sQuery += ', password_hash'
            }
            sQuery +=   ' from users'

	        let args = []
	        let wheres = []

            if( filter.user_name_filter ){
                // NOTE: string concatenation operator in PostgreSQL is "||" 
                // NOTE: Use case-insensitive PostgreSQL-specific "ILIKE" in lieu of "like"...
                wheres.push("\t" + "username ILIKE '%' || $" + (wheres.length+1) + " || '%'");
                args.push(filter.user_name_filter);
            }

            if( filter.user_name_exact_filter ){
                // NOTE: string concatenation operator in PostgreSQL is "||" 
                // NOTE: Use case-insensitive PostgreSQL-specific "ILIKE" in lieu of "like"...
                // Case insensitive match...?
                //wheres.push("\t" + "username ILIKE $" + (wheres.length+1) );
                //wheres.push("\t" + "LOWER(username) = LOWER($" + (wheres.length+1) + ")" );

                // Case sensitive match...
                wheres.push("\t" + "username = $" + (wheres.length+1) );
                
                args.push(filter.user_name_exact_filter);
            }

            if( filter.first_name_filter ){
                // NOTE: string concatenation operator in PostgreSQL is "||" 
                // NOTE: Use case-insensitive PostgreSQL-specific "ILIKE" in lieu of "like"...
                wheres.push("\t" + "first_name ILIKE '%' || $" + (wheres.length+1) + " || '%'");
                args.push(filter.first_name_filter);
            }

            if( filter.middle_name_filter ){
                // NOTE: string concatenation operator in PostgreSQL is "||" 
                // NOTE: Use case-insensitive PostgreSQL-specific "ILIKE" in lieu of "like"...
                wheres.push("\t" + "middle_name ILIKE '%' || $" + (wheres.length+1) + " || '%'");
                args.push(filter.middle_name_filter);
            }

            if( filter.last_name_filter ){
                // NOTE: string concatenation operator in PostgreSQL is "||" 
                // NOTE: Use case-insensitive PostgreSQL-specific "ILIKE" in lieu of "like"...
                wheres.push("\t" + "last_name ILIKE '%' || $" + (wheres.length+1) + " || '%'");
                args.push(filter.last_name_filter);
            }


            let sWheres = "" 
            if( wheres.length > 0 ){
                sWheres = "\n" + 
                "WHERE\n" +
                wheres.join("\n" + "AND" + "\n")
            }

            let sOrderBy = ""

            if( filter.sort_by_field ){
                if( filter.sort_by_field.toLowerCase() == 'first_name' ){ 
                    sOrderBy = "\nORDER BY first_name"
                }
                else if( filter.sort_by_field.toLowerCase() == 'middle_name' ){ 
                    sOrderBy = "\nORDER BY middle_name"
                }
                else if( filter.sort_by_field.toLowerCase() == 'last_name' ){ 
                    sOrderBy = "\nORDER BY last_name"
                }
                else if( filter.sort_by_field.toLowerCase() == 'username' ){ 
                    sOrderBy = "\nORDER BY username"
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

        })/* new Promise */
    }/* getUsers() */

    updatePasswordHashViaUsername(username, password_hash ) {

        const sWho = 'Users::updatePasswordHashViaUsername'

        logajohn.debug(`${sWho}(): username = '${username}', password_hash = '${password_hash}'...`)

        return new Promise((resolve, reject) => {
	        const config = { database: this.dbname }
	        logajohn.debug(`${sWho}(): Calling pool = new Pool(`, config, ')...')
	        const pool = new Pool(config)

	        const sQuery = `UPDATE users 
        	 SET password_hash = $1
             WHERE username = $2 
            RETURNING user_id
        	`
	        const args = [password_hash, username]

	        logajohn.debug(`${sWho}(): Calling pool.query("${sQuery}", ${JSON.stringify(args)})...`)

	        pool.query(sQuery, args)
	        .then((res) => {
	            logajohn.debug(`${sWho}(): Got res = `, res)
                    resolve(res.rows[0].user_id)
	        })
	        .catch(
                    err => setImmediate(() => {
	                logajohn.debug(`${sWho}(): Caught err = `, err)
                        reject(err)
                    }),
                )
        })/* new Promise */
    }/* updatePasswordHashViaUsername() */

    deleteUserById(user_id) {
        const sWho = 'Users::deleteUserById'

        return new Promise((resolve, reject) => {
	        const config = { database: this.dbname }
	        logajohn.debug(`${sWho}(): Calling pool = new Pool(`, config, ')...')
	        const pool = new Pool(config)

	        const sQuery = `DELETE from users 
        	 WHERE user_id = $1
            RETURNING user_id
        	`
	        const args = [user_id]

	        logajohn.debug(`${sWho}(): Calling pool.query("${sQuery}", ${JSON.stringify(args)})...`)

	        pool.query(sQuery, args)
	        .then((res) => {
	            logajohn.debug(`${sWho}(): Got res = `, res)
                    resolve(res.rows[0].user_id)
	        })
	        .catch(
                    err => setImmediate(() => {
	                logajohn.debug(`${sWho}(): Caught err = `, err)
                        reject(err)
                    }),
                )
        })/* new Promise */
    }/* deleteUserById() */

    
} /* class Users() */

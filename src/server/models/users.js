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
//import { config } from '../../../config'
import { config } from '../../config'

import { logajohn } from '../../lib/logajohn'

// Pool is better than Client...
//const { Client } = require('pg') // PostgreSQL client
const { Pool } = require('pg') // PostgreSQL client pool...

//logajohn.setLevel('info')
logajohn.setLevel(config.DEBUG_LEVEL)
logajohn.info("users.js: logajohn.getLevel()=", logajohn.getLevel() )

/**
* execs links_qa script and returns output
*/
export class Users {

	constructor(dbname=config.DEFAULT_DB_NAME){
        this.dbname=dbname
	}

	addUser( user ){

        const sWho = "Users::addUser"

        return new Promise( (resolve, reject ) => {
        
	        let config = { database: this.dbname };
	        logajohn.debug(`${sWho}(): Calling pool = new Pool(`, config , `)...`)
	        const pool = new Pool( config );
	
	        let sQuery =
        	`INSERT into users 
        	(first_name, middle_name, last_name)
        	VALUES
        	($1, $2, $3)
            RETURNING user_id, first_name, middle_name, last_name
        	`
	        let args = [user.first_name, user.middle_name, user.last_name];
	
	        logajohn.debug(`${sWho}(): Calling pool.query("${sQuery}", ${JSON.stringify(args)})...`);
	
	        pool.query(sQuery, args)
	        .then(res => {
	            logajohn.debug(`${sWho}(): Got res = `, res );
                resolve( res.rows[0] );
	        })
	        .catch(
                err => setImmediate(() => {
	                logajohn.debug(`${sWho}(): Caught err = `, err )
                    reject( err )
                })
            )
	
        })/* new Promise */

     }/* addUser() */


	getUsers( filter ){

        const sWho = "Users::getUsers"

        return new Promise( (resolve, reject ) => {
        
	        let config = { database: this.dbname };
	        logajohn.debug(`${sWho}(): Calling pool = new Pool(`, config , `)...`)
	        const pool = new Pool( config );
	
	        let sQuery =
        	`SELECT * from users`

	        let args = []
	
	        logajohn.debug(`${sWho}(): Calling pool.query("${sQuery}", ${JSON.stringify(args)})...`);
	
	        pool.query(sQuery, args)
	        .then(res => {
	            logajohn.debug(`${sWho}(): Got res = `, res );
                resolve( res.rows );
	        })
	        .catch(
                err => setImmediate(() => {
	                logajohn.debug(`${sWho}(): Caught err = `, err )
                    reject( err )
                })
            )
	
        })/* new Promise */

     }/* getUsers() */

	deleteUserById( user_id ){

        const sWho = "Users::deleteUserById"

        return new Promise( (resolve, reject ) => {
        
	        let config = { database: this.dbname };
	        logajohn.debug(`${sWho}(): Calling pool = new Pool(`, config , `)...`)
	        const pool = new Pool( config );
	
	        let sQuery =
        	`DELETE from users 
        	 WHERE user_id = $1
            RETURNING user_id
        	`
	        let args = [user_id];
	
	        logajohn.debug(`${sWho}(): Calling pool.query("${sQuery}", ${JSON.stringify(args)})...`);
	
	        pool.query(sQuery, args)
	        .then(res => {
	            logajohn.debug(`${sWho}(): Got res = `, res );
                resolve( res.rows[0].user_id );
	        })
	        .catch(
                err => setImmediate(() => {
	                logajohn.debug(`${sWho}(): Caught err = `, err )
                    reject( err )
                })
            )
	
        })/* new Promise */

     }/* deleteUserById() */

} /* class Users() */



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

const { Client } = require('pg')

// logajohn.setLevel('info')
logajohn.setLevel(config.DEBUG_LEVEL)
logajohn.info('objectives.js: logajohn.getLevel()=', logajohn.getLevel())

/**
* execs links_qa script and returns output
*/
export class Objectives {
    constructor(dbname = 'scrumi') {
        this.dbname = dbname
    }

    getObjectives(filter) {
        const sWho = 'Objectives::getObjectives'

        return new Promise((resolve, reject) => {
            if (filter == null) {
                reject(new Error('You supplied a null filter.'))
            }

            const config = { database: this.dbname }

            const sQuery = `
SELECT
    t.task_id, t.description, t.user_id_assigned_to,
    u.first_name, u.middle_name, u.last_name  
FROM 
    tasks t
LEFT OUTER JOIN
    users u ON t.user_id_assigned_to = u.user_id

`

            logajohn.debug(`${sWho}(): Calling client = new Client(config), config = `, config)

            const client = new Client(config)


            logajohn.debug(`${sWho}(): Calling client.connect()...`)
            client.connect()
                .then(() => {
                    logajohn.debug(`${sWho}(): connected...`)
                })
                .then(() => {
                    logajohn.debug('Executing sQuery = ', sQuery)
                    return client.query(sQuery, [])
                })
                .then((res) => {
                    logajohn.debug(`${sWho}(): Got res = `, res)
                    logajohn.debug(`${sWho}(): Calling client.end()...`)
                    client.end()
                    logajohn.debug(`${sWho}(): Calling resolve( res.rows )...`)
                    resolve(res.rows)
                })
                .catch((err) => {
                    logajohn.error(`${sWho}(): Caught err: `, err.stack)
                    logajohn.debug(`${sWho}(): Calling client.end()...`)
                    client.end()
                    logajohn.error(`${sWho}(): Calling reject( err.stack )...`)
                    reject(err.stack)
                })
        }) /* return new Promise( (resolve, reject ) => { */
    } /* getObjectives() */

    //            logajohn.info(`${sWho}(): Calling client.connect()...`);
    //
    //            client.connect( (err) => {
    //              if (err) {
    //                console.error('connection error: ', err.stack )
    //                reject( "connection error"  )
    //              } else {
    //                    console.log('connected')
    //
    //
    //
    //        //console.log(`Executing sQuery = `, sQuery );
    //
    //        //client.query('SELECT $1::text as message', ['Hello world!'], (err, res) => {
    //        client.query(sQuery, [], (err, res) => {
    //
    //           if( err ){
    //             console.error(`${sWho}(): query error: `, err.stack)
    //             console.error(`${sWho}(): Calling reject( err.stack )...`);
    //             reject( err.stack );
    //           }
    //           else{
    //             console.log(`${sWho}(): res = `, res )
    //             console.log(`${sWho}(): Calling resolve( res.rows )...`)
    //             resolve( res.rows );
    //           }
    //           //console.log(err ? err.stack : res.rows[0].message) // Hello World!
    //           client.end()
    //       })
    //  }
    // });
    //           if( err ){
    //             console.error(`${sWho}(): query error: `, err.stack)
    //             console.error(`${sWho}(): Calling reject( err.stack )...`);
    //             reject( err.stack );
    //           }
    //           else{
    //             console.log(`${sWho}(): res = `, res )
    //             console.log(`${sWho}(): Calling resolve( res.rows )...`)
    //             resolve( res.rows );
    //           }
    //           //console.log(err ? err.stack : res.rows[0].message) // Hello World!
    //           client.end()
    //       })
    //
    //                //client.query('SELECT $1::text as message', ['Hello world!'], (err, res) => {
    //
    //                  if( err ){
    //                    console.error(`${sWho}(): query error: `, err.stack)
    //                    reject( err.stack );
    //                  }
    //                  else{
    //                    console.log(`${sWho}(): res: `, res )
    //                    resolve( res.rows );
    //                  }
    //                  //console.log(err ? err.stack : res.rows[0].message) // Hello World!
    //                  client.end()
    //                })
    //            })
    //            .catch( err => {
    //                console.error(`${sWho}(): connection error: `, err.stack)
    //                reject( err.stack )
    //            })
    //
    // let faux_objectives = [
    //    {who: "Moe", what: "I'll murder you!", when: "Now."},
    //    {who: "Larry", what: "No, Moe!", when: "Later."},
    //    {who: "Shemp", what: "Meep, Meep, Meep!", when: "Always."}
    // ];
    //
    // resolve( faux_objectives );
} /* class Objectives() */

// module.exports = Objectives;
// export Objectives;

import { logajohn } from '../../lib/logajohn'
const { Client } = require('pg')

//logajohn.setLevel('info')
logajohn.info("objectives.js: logajohn.getLevel()=", logajohn.getLevel() )

/**
* execs links_qa script and returns output
*/
export class Objectives {

	constructor(dbname="scrumi"){
        this.dbname=dbname
	}

	getObjectives( filter ){

        let sWho = "Objectives::getObjectives";

        return new Promise( (resolve, reject ) => {

            if( filter == null ){
                reject( new Error("You supplied a null filter.") )
            }

            let config = { database: this.dbname };

            logajohn.info(`${sWho}(): Calling client = new Client(config), config = `, config );

            const client = new Client(config)

            logajohn.info(`${sWho}(): Calling client.connect()...`);

            client.connect( (err) => {
              if (err) {
                console.error('connection error: ', err.stack )
                reject( "connection error"  )
              } else {
                    console.log('connected')


                    let sQuery = `
SELECT
    t.task_id, t.description, t.user_id_assigned_to,
    u.first_name, u.middle_name, u.last_name  
FROM 
    tasks t
LEFT OUTER JOIN
    users u ON t.user_id_assigned_to = u.user_id

`;

                    console.log(`Executing sQuery = `, sQuery );

                    //client.query('SELECT $1::text as message', ['Hello world!'], (err, res) => {
                    client.query(sQuery, [], (err, res) => {
                
                       if( err ){
                         console.error(`${sWho}(): query error: `, err.stack)
                         reject( err.stack );
                       }
                       else{
                         console.log(`${sWho}(): res: `, res )
                         resolve( res.rows );
                       }
                       //console.log(err ? err.stack : res.rows[0].message) // Hello World!
                       client.end()
                   })
              }
            });

//            client.connect()
//            .then(() => {
//                console.log('connected');
//                client.query('SELECT $1::text as message', ['Hello world!'], (err, res) => {
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
            //let faux_objectives = [
            //    {who: "Moe", what: "I'll murder you!", when: "Now."},
            //    {who: "Larry", what: "No, Moe!", when: "Later."},
            //    {who: "Shemp", what: "Meep, Meep, Meep!", when: "Always."}
            //];

            resolve( faux_objectives );
        });

	} /* getObjectives() */

} /* class Objectives() */

//module.exports = Objectives;
//export Objectives;



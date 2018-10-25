/* Connects to PosgreSQL
*
* Requirement:
*   set PGUSER and PGPASSWORD
* environment variables to the PostgreSQL
*   username and password...
*
* set PGUSER=<postgres_username>
* set PGPASSWORD=<postgres_password>
*/
//const util = require('util');
const fs = require('fs');

import { config } from '../src/config'

import { logajohn } from '../src/lib/logajohn'
import { utils } from '../src/lib/utils'

//const { Client } = require('pg')
// Pool is better than Client...
const { Pool } = require('pg') // PostgreSQL client pool...

logajohn.setLevel(config.DEBUG_LEVEL)
logajohn.debug('objectives.js: logajohn.getLevel()=', logajohn.getLevel())


//fs.readFile('/etc/passwd', (err, data) => {
//  if (err) throw err;
//  console.log(data);
//});

function promisifiedReadFile(file_path){

    let sWho = "promisifiedReadFile";

    return new Promise((resolve,reject)=>{

        logajohn.debug(`${sWho}(): Calling fs.readFile(${file_path})...`);

        fs.readFile(file_path, 'utf8', (err, data) => {
            if(err){
                setImmediate((err) => {
	                logajohn.debug(`${sWho}(): Got err rejecting Promise with err =`, err )
                    reject(err)
                }, err)
            }
            else{
                logajohn.debug(`${sWho}(): resolving Promise with data =`, data )
                resolve(data);
            }
        });
    })/* new Promise() */
}/* promisifiedReadFile() */

async function main(){

    let sWho = "main";

    let s_db_name = "";
    let s_query = "";
    let s_query_file = "";

    for (let j = 0; j < process.argv.length; j++) {  
        console.log(`argv[${j}] = '${process.argv[j]}'...`);
    }

    for (let j = 0; j < process.argv.length; j++) {  

        console.log(`argv[${j}] = '${process.argv[j]}'...`);

        if( process.argv[j].toLowerCase() == '--dbname' ){
            j++;
            s_db_name = process.argv[j];
        }
        else if( process.argv[j].toLowerCase() == '--query' ){
            j++;
            s_query = process.argv[j];
        }
        else if( process.argv[j].toLowerCase() == '--file' ){
            j++;
            s_query_file = process.argv[j];
        }
    }

    console.log(`s_db_name = '${s_db_name}'...`);
    console.log(`s_query_file = '${s_query_file}'...`);
    console.log(`s_query = '${s_query}'...`);

    if( s_query_file ){
       // https://nodejs.org/api/util.html#util_util_promisify_original
       // https://nodejs.org/api/fs.html#fs_fs_read_fd_buffer_offset_length_position_callback
        try {
            console.log(`${sWho}(): Calling await promisifiedReadFile('${s_query_file}')...`);

            // Should throw JavaScript exception if error occurs...
            s_query = await promisifiedReadFile(s_query_file);

            console.log(`${sWho}(): after await promisifiedReadFile('${s_query_file}'), s_query = '${s_query}'...`);
       }
       catch(erreur){
            console.log(`${sWho}(): SHEMP: Moe, caught erreur = ${utils.errorStringify(erreur)}...`);
       }
    }

    console.log(`SHEMP: Hey, Moe,...s_query = '${s_query}'...`);
    console.log(`SHEMP: Hey, Moe,...typeof s_query = `, typeof(s_query) );

    //let regex = /\\n/g;
    //let regex = /;/g;

    //let s_query_sanitized = s_query.replace("'", " ");
    let s_query_sanitized = s_query;

    console.log(`SHEMP: Hey, Moe,...s_query_sanitized = '${s_query_sanitized}'...`);

    const config = { database: s_db_name }

    logajohn.info(`${sWho}(): Calling pool = new Pool(`, config, ')...')
    const pool = new Pool(config)

    let args = [];
    logajohn.debug(`${sWho}(): Calling pool.query("${s_query_sanitized}", ${JSON.stringify(args)})...`)

	//pool.query(s_query, args)
	pool.query({text: s_query_sanitized})
	.then((res) => {
        console.log(`got rows = ${JSON.stringify(res.rows, null, ' ')}...`)
        return;
	})
	.catch((err) => { 
        console.log(`got err = ${utils.errorStringify(err)}...`);
        return;
    })

    console.log(`Exiting ${sWho}(): Let off some steam, Bennett!`);

}/* main() */

main();
console.log("Just launched main(): I'll be back, Bennett!");

import fs from 'fs'
import path from 'path'
//import lstat from 'lstat'

import { logajohn } from '../../lib/logajohn'
//import { config } from '../../../config'
import { config } from '../../config'

logajohn.setLevel(config.DEBUG_LEVEL)
logajohn.debug("file.js: config.DEBUG_LEVEL = ", config.DEBUG_LEVEL )
logajohn.debug("file.js: logajohn.getLevel()=", logajohn.getLevel() )

/**
* Reads folders and files from filesystem.
*/
export class FileModel {

	static getDir( filter, callback ){

		var sWho = "FileModel::getDir";

		logajohn.debug(sWho + "(): BEFORE: filter = " + JSON.stringify( filter ) );

		if( filter == null ){
			filter = {};
		}

  		if (filter.format){
			filter.format = filter.format.toUpperCase();
		}
		else{
			filter.format = "JSON";
		}

		logajohn.debug(sWho + "(): AFTER: filter = " + JSON.stringify( filter ) );

        let inputPath = filter.path

        let doIt = (err, files) => { 

            let sWho="FileModel::getDir::doIt";

            logajohn.setLevel(config.DEBUG_LEVEL)
            logajohn.debug(`${sWho}: logajohn.getLevel()=`, logajohn.getLevel() )
		    logajohn.debug(`${sWho}: err = '${err}'...`)
		    logajohn.debug(`${sWho}: files = '${files}'...`)

            json_out.files = files;

            json_out.files_statted = [];

            if( err ){
                json_out.error = err;
		        logajohn.debug(`${sWho}: returnin' to callback: json_out= `, json_out, `, err = `, err )
                callback(json_out, err);
                return;
            }

            for( let i = 0; i < files.length; i++ ){
		        logajohn.debug(`${sWho}: files[${i}] = '${files[i]}'...`)
                let extendedPath = path.join(inputPath, files[i])

                json_out.files_statted[i]={};
                json_out.files_statted[i].name = files[i]
                json_out.files_statted[i].extended_path = extendedPath

		        logajohn.debug(`${sWho}: Calling fs.lstatSync( extendedPath[${i}] = '${extendedPath}' ), Moe...`)
                try {
			        let stats = fs.lstatSync(extendedPath);
	                logajohn.debug(`models\/file.js: stats[${i}]=`, stats )
	                //logajohn.info(`models\/file.js: err[${index}]=`, stats )
	                //if(err){
	                //    logajohn.error(`models\/file.js: error[${index}]=`, err )
	                //    files_statted[i].error = err 
	                //}
	                json_out.files_statted[i].stats = stats
	                json_out.files_statted[i].is_file = stats.isFile()
	                json_out.files_statted[i].is_directory = stats.isDirectory()
	                json_out.files_statted[i].is_symbolic_link = stats.isSymbolicLink()
	                json_out.files_statted[i].is_FIFO = stats.isFIFO()
	                json_out.files_statted[i].is_socket = stats.isSocket()
	                json_out.files_statted[i].is_character_device = stats.isCharacterDevice()
	                json_out.files_statted[i].is_block_device = stats.isBlockDevice()
                } catch( error ){
		            logajohn.error(`${sWho}: SHEMP: Sorry, Moe, caught an error doing fs.lstatSync( extendedPath = '${extendedPath}'}: `, error );
                    json_out.files_statted[i].error = error;
                }

            }/* for( let i = 0; i < files.length; i++ ) */

		    logajohn.debug(`${sWho}: returnin' to callback: json_out = `, JSON.stringify(json_out, null, ' '), `, err = `, err )
            callback(json_out, err);
            return;

        }/* doIt() */

        let json_out = { filter };
		logajohn.debug(`${sWho}: Calling fs.readdir("${inputPath}")...`)
        fs.readdir( inputPath, null, doIt) 

		//logajohn.debug(`${sWho}: Calling fs.readdirSync("${path}")...`)
        //let output = fs.readdirSync( path )
        //logajohn.debug(`${sWho}: output = '${output}'...`)
        //callback(output, "");

        //let json_out = { dir: [{'file':'joe.txt'}, {'folder':'stooges'}] }
        //let json_out = { [] }
        //let json_out = {}
        //callback( json_out, "" )

	} /* getDir() */

} /* class File() */

//module.exports = LinksQa;
//export LinksQa;



import { logajohn } from '../../lib/logajohn'

logajohn.setLevel('info')
logajohn.info('links-qa.js: logajohn.getLevel()=', logajohn.getLevel())

/**
* execs links_qa script and returns output
*/
export class LinksQa {
    constructor() {
    }

    static getLinksQa(filter, callback) {
        const sWho = 'LinksQa::getLinksQa'

        logajohn.debug(`${sWho}(): BEFORE: filter = ${JSON.stringify(filter)}`)

        if (filter == null) {
            filter = {}
        }

  		if (filter.format) {
            filter.format = filter.format.toUpperCase()
        } else {
            filter.format = 'JSON'
        }

        logajohn.debug(`${sWho}(): AFTER: filter = ${JSON.stringify(filter)}`)

  		// if( ! filter.basePath ){
        //    console.log(`${sWho}: No filter.basePath sending error...`);
        //    callback({}, "Must supply filter.basePath");
        //    return;
        // }

  		const { spawn } = require('child_process')

        // const s_location = "c:/Users/john.DCLABNT/projects/sw/p27174";
        const s_location = 'c:/Users/john/projects/p27174'
        const s_exe_path = `${s_location}/links_qa.pl`

  		const spawn_cmd = 'perl'
        // const spawn_args = ['-I', s_location, s_exe_path, '-b', filter.base_path, '-d', 'INFO', '-format', filter.format];
        const spawn_args = ['-I', s_location, s_exe_path, `-p${filter.basePath}`, `-i${filter.additionOnlyCode}`, '-d' + 'INFO', '-t']
        const spawn_options = { cwd: s_location }


        logajohn.debug(`${sWho}: Running spawn(\n`
		  + 'spawn_cmd=', spawn_cmd, ',\n'
		  + 'spawn_args =', spawn_args, ',\n'
 		  + 'spawn_options=', spawn_options, '\n'
          + ')...')

        const spawnee = spawn(spawn_cmd, spawn_args)

        let s_stdout = ''
        let s_stderr = ''

        spawnee.stdout.on('data', (data) => {
		    logajohn.debug(`${sWho}: STDOUT: ${data}`)
		    s_stdout += data
        })

        spawnee.stderr.on('data', (data) => {
            logajohn.debug(`${sWho}: STDERR: ${data}`)
            s_stderr += data
        })

        spawnee.on('close', (code) => {
            logajohn.debug(`${sWho}.on('close'): child process exited with code ${code}`)
            logajohn.debug(`${sWho}.on('close'): s_stdout =...\n${s_stdout}\n...`)
            logajohn.debug(`${sWho}.on('close'): s_stdout.length =${s_stdout.length}...`)
            logajohn.debug(`${sWho}.on('close'): s_stderr =...\n${s_stderr}\n...`)
            logajohn.debug(`${sWho}.on('close'): s_stderr.length =...\n${s_stderr.length}\n...`)

            const json_sender = {}
            json_sender.stdout = s_stdout
            json_sender.stderr = s_stderr

            logajohn.debug(`${sWho}.on('close'): Sending json_sender =`, json_sender, '...')

		    callback(json_sender, null)
        }) // on close

        spawnee.on('error', (err) => {
            const msg = `Failed to start subprocess: "${err}"`
            logajohn.error(`${sWho}(): msg='${msg}'`)

            // res.status(500).json({ message: msg });
            const json_sender = {}
            json_sender.message = msg

            logajohn.error(`${sWho}.on('error'): Sending json_sender =`, json_sender, '...')

		    callback(json_sender, msg)
        })


    //      This here should go into a mock or a nock...
    //
    //		let items = [{"qty":4, "item":"Calling Birds"},{"qty":3, "item": "French Hens"},{"qty":2, "item": "Turtle Doves"},{"qty":1, "item": "Partridge in a Pear Tree"}];
    //
    //		logger.info(sWho + "(): items.length = " + items.length + "...");
    //		if( items.length >= 1 ){
    //				logger.info(sWho + "(): items[0] = ", items[0], "...");
    //		}
    //
    //		logger.info(sWho + "(): Returning items = ",  items, " to callback...");
    //		//logger.info(sWho + "(): Returning items to callback...");
    //
    //		callback( items, null );
    //
    //		return;
    } /* getLinksQa() */
} /* class LinksQa() */

// module.exports = LinksQa;
// export LinksQa;

import { logajohn } from '../../lib/logajohn'

//logajohn.setLevel('info')
logajohn.info("links-qa.js: logajohn.getLevel()=", logajohn.getLevel() )

/**
* execs links_qa script and returns output
*/
export class Objectives {

	constructor(){
	}

	static getObjectives( filter ){

        return new Promise( (resolve, reject ) => {

            //if( filter == null ){
            //    reject( new Error("You supplied a null filter.") )
            //}

            let faux_objectives = [
                {who: "Moe", what: "I'll murder you!", when: "Now."},
                {who: "Larry", what: "No, Moe!", when: "Later."},
                {who: "Shemp", what: "Meep, Meep, Meep!", when: "Always."}
            ];

            resolve( faux_objectives );
        });

	} /* getObjectives() */

} /* class Objectives() */

//module.exports = Objectives;
//export Objectives;



var router = require('express').Router();
import C from '../constants';
//var User = require('../../models/user');
import { Users } from './models/users'
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jwt-simple');

//var config = require('../config');
import { config } from '../config'
import { logajohn } from '../lib/logajohn'

logajohn.setLevel(config.DEBUG_LEVEL)
logajohn.info(`user-login-session-api.js: config.DEBUG_LEVEL = `, config.DEBUG_LEVEL )
logajohn.info(`user-login-session-api.js: logajohn.getLevel()=${logajohn.getLevel()}...`)

/*
* To login a user: client feeds in username and password, you 
* authenticate and pass back a JWT token if 
* successful...
*/
function doPost(req, res, next){

	var sWho = "user-login-session-api.js: doPost";

	console.log(`${sWho}(): Handling POST /user_login_session_api...`);
	console.log(`${sWho}(): Got req.body.username = '${req.body.username}'...looking up in User...`);

    const usersModel = new Users()
    let filters = { user_name_exact_filter: req.body.username, fetch_password_hash: true }
    logajohn.info(`${sWho}(): Callin' usersModel.getUsers( filters = `, filters, '...)')

    usersModel.getUsers(filters)
        .then((users) => {
            logajohn.info(`${sWho}().then: users = `, users)

			if( users.length == 0 ){
				console.log("WARNING: Can't find username = \"" + req.body.username + "\" in User DB..., returning code 401 (unauthorized)...");
				return res.sendStatus(401);
			}
            else if( users.length > 1 ){
				console.log("WARNING: Too many users: \"" + req.body.username + "\" in User DB..., returning code 500 (server error)...");
				return res.sendStatus(500);
			}
            else{
                let user = users[0];

                logajohn.info(`${sWho}().then: user = `, user, `...comparing req.body.password to user.password_hash...`)

				bcrypt.compare( req.body.password, user.password_hash,
					function(err, valid){
						if( err ){
							console.log("ERROR during bcrypt.compare(): err = " + JSON.stringify( err ) + ", returning next(err)...\n");
							return next(err);
						}
	
						if( !valid ){
							console.log("WARNING: Password not valid, returning code 401 (unauthorized)...");
							return res.sendStatus(401); // unauthorized
						}
	
						var encodee = {"username": user.username};
	
						console.log(sWho + "(): Password is valid...generating token via jwt.encode( encodee, \"" + config.secret + "\" )...");
	
					   	console.log("encodee = ");
						console.log( encodee );
	
						try {
							var token = jwt.encode(encodee, config.secret );
						}
						catch(e){
							console.log("Exception during jwt.encode(): " + JSON.stringify( e ) + ", returning next(e)...");
							return next(e);
						}
	
						console.log("token = '" + token + "'...");
						console.log("JSON.stringify(token) = '" + JSON.stringify( token ) + "'...");
	
						// When we use res.json(token), the client winds up with
						// a double quote char on each side of their token,
						// so we'll use res.send(token) instead...just like
						// Dickey did in his code...
	
						//console.log("Returning token to user via res.json(token)...");
						//res.json(token);
						

                        const dispatchee = {
                            type: C.USER_LOGIN,
                            username: req.body.username,
                            token
                        }

						console.log("Returning token to user via res.send(dispatchee = ", dispatchee, ")...");

						res.send(dispatchee);
	
			    });
            }/* else */
        })
        .catch((error) => {
            logajohn.info(`${sWho}(): Caught error = `, utils.errorStringify(error))

            const dispatchee = {
                type: C.USER_LOGIN,
                username: req.body.username,
                error,
            }

            logajohn.info(`${sWho}(): SHEMP: Callin' dispatchAndRespond() widh...`, dispatchee)

            if( callback ){
                callback();
            }
        })
	
}/* doPost() */

router.post('/', doPost );

module.exports = router;

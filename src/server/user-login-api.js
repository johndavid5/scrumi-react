/** This controller has two actions:
* one to get an existing user, and the other
* to create a new user...
*/
var router = require('express').Router();
import C from '../constants'
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jwt-simple');

//var User = require('../../models/user');
import { Users } from './models/users'

//var config = require('../../config');
import { config } from '../config'
import { logajohn } from '../lib/logajohn'

logajohn.setLevel(config.DEBUG_LEVEL)
logajohn.info(`user-login-api.js: config.DEBUG_LEVEL = `, config.DEBUG_LEVEL )
logajohn.info(`user-login-api.js: logajohn.getLevel()=${logajohn.getLevel()}...`)

/*
* First, to create a user, we call POST /user_login_api, passing in the
* username and password.
*
* Then, once the user exists, the login process has two steps:
*
* (1) You call POST /user_login_sessions_api, passing in username and password, to get a JWT;
*
* (2) You call GET /user_login_api to get the currently
*     logged-in user’s information.
*     (The client passes x-auth=token in HTTP header
*      and we authenticate it, decode it, and look-up the user info in the database...)
*
* Dickey, Jeff. Write Modern Web Apps with the MEAN Stack:
*   Mongo, Express, AngularJS, and Node.js (Develop and Design) (p. 109). 
*   Pearson Education. Kindle Edition. 
*/
function doGet(req, res, next){

	var sWho = "/api/users GET";

	logajohn.info("Handling GET /user...");

	if( ! req.headers['x-auth']){
		logajohn.info("WARNING: x-auth HTTP header element not supplied, returning code 401 (unauthorized)...");
		return res.sendStatus(401); // unauthorized
	}

	var token = req.headers['x-auth'];

	logajohn.info("Received token = '" + token + "' in HTTP header...");

	logajohn.info("token = '" + token + "', decoding now...via jwt.decode( token, \"" + config.secret + "\" )...");

	try {
		var auth = jwt.decode(token, config.secret);
	}catch( e ){
		logajohn.info(sWho + "(): Exception during jwt.decode(): name = \"" + e.name + "\", message = \"" + e.message + "\"...");
		logajohn.info(sWho + "(): Assuming bad token...returning code 401 (unauthorized)...");
		return res.sendStatus(401); // unauthorized
	}

	logajohn.info("Token successfully decoded: auth = " + JSON.stringify(auth) );

	logajohn.info("Looking up auth.username=\"" + auth.username + "\" in User DB...\n");

	//User.findOne({"username": auth.username}, function(err, user){
	//	if( err ){
	//		logajohn.info("ERROR during User.findOne(): err = " + JSON.stringify(err) + ", calling next(err)...");
    //			return next(err);
	//	}
	//	logajohn.info("DB Lookup of auth.username = \"" + auth.username + "\" succeeded, returning user = " + JSON.stringify(user) + " to client...\n");
	//	res.json(user);
	//});

}

router.get('/', doGet );
	

/* 
* Set password for user: client passes username as req.body.username and password as req.body.password 
* for a user, and you set the password_hash for the user using a one-way
* hash of the password...
*/
function doPut(req, res, next){

    let sWho = "user-login-api::doPut"

	var iNumRounds = 10;

    let username = req.body.username

	bcrypt.genSalt( iNumRounds, function(err, salt){ 
		if( err ){
			logajohn.info(sWho + "(): Trouble with bcrypt.genSalt( iNumRounds = " + iNumRounds + "): err = " + JSON.strinfigy(err) + "..., calling next(err)...");
			return next(err);
		}
		bcrypt.hash( req.body.password, salt, 
				function(){
					//logajohn.info("Making progress, Doc-tor Cy-a-nide...!");
				},
				function(err, password_hash){
        			if( err ){
        				logajohn.info(sWho + "(): Trouble with bcrypt.hash(): err = " + JSON.stringify(err) + "..., calling next(err)...");
	        			return next(err);
        			}

			//var user = new User({"username": req.body.username});

			// user.password_hash = hash;

			//logajohn.info(sWho + "(): Updating user to User DB, user = " + JSON.stringify( user ) + "...\n");
			logajohn.info(`${sWho}(): Updating user: username = '${username}, password_hash.length = ${password_hash.length}, password_hash = '${password_hash}'...` )

            const usersModel = new Users()

            const dispatchee = {
                type: C.USER_SET_PASSWORD_HASH,
                username,
                password_hash,
                error: '',
            }

            usersModel.updatePasswordHashViaUsername(username, password_hash)
            .then( (id)=>{
			    logajohn.info(sWho + "(): .then appears successful, Moe, id = ", id )
                dispatchee.id = id
                res.status(200) // 200: OK

			    logajohn.info(sWho + "(): Sending response: ", dispatchee )
                res.json( dispatchee )
            })
            .catch( (err)=>{
			    logajohn.info(sWho + "(): .catch an error, Moe, err = ", err )
                dispatchee.error = err
                res.status(500) // 500: Server Error

			    logajohn.info(sWho + "(): Sending response: ", dispatchee )
                res.json( dispatchee )
            })


			//user.save(function(err, user){
			//	if( err ){
		    //			logajohn.info("Trouble with user.save(): err =\n");
			//		logajohn.info( err );
			//		return next(err);
			//	}
			//	logajohn.info("Saved new user username = \"" + req.body.username + "\"..., returning code 201...\n");
			//	res.sendStatus(201);
			//});
		});
	});
}

router.put('/', doPut );

module.exports = router;

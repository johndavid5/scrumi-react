import C from '../constants'

// var User = require('../../models/user');
import { Users } from './models/users'

// var config = require('../../config');
import { config } from '../config'
import { logajohn } from '../lib/logajohn'

const router = require('express').Router()

const bcrypt = require('bcrypt-nodejs')
const jwt = require('jwt-simple')

logajohn.setLevel(config.DEBUG_LEVEL)
logajohn.info('user-login-api.js: config.DEBUG_LEVEL = ', config.DEBUG_LEVEL)
logajohn.info(`user-login-api.js: logajohn.getLevel()=${logajohn.getLevel()}...`)

/* Call GET /user_login_api, passing x-auth=the JWT token you
* got from POST /user_login_sessions.
*
* You get back: information on the currently logged-in user.
*/
function doGet(req, res, next) {
    const sWho = '/api/users GET'

    logajohn.info('Handling GET /user...')

    if (!req.headers['x-auth']) {
        logajohn.info('WARNING: x-auth HTTP header element not supplied, returning code 401 (unauthorized)...')
        return res.sendStatus(401) // unauthorized
    }

    const token = req.headers['x-auth']

    logajohn.info(`Received token = '${token}' in HTTP header...`)

    logajohn.info(`token = '${token}', decoding now...via jwt.decode( token, "${config.secret}" )...`)

    try {
        var auth = jwt.decode(token, config.secret)
    } catch (e) {
        logajohn.info(`${sWho}(): Exception during jwt.decode(): name = "${e.name}", message = "${e.message}"...`)
        logajohn.info(`${sWho}(): Assuming bad token...returning code 401 (unauthorized)...`)
        return res.sendStatus(401) // unauthorized
    }

    logajohn.info(`Token successfully decoded: auth = ${JSON.stringify(auth)}`)

    logajohn.info(`Looking up auth.username="${auth.username}" in User DB...\n`)

    // User.findOne({"username": auth.username}, function(err, user){
    //	if( err ){
    //		logajohn.info("ERROR during User.findOne(): err = " + JSON.stringify(err) + ", calling next(err)...");
    //			return next(err);
    //	}
    //	logajohn.info("DB Lookup of auth.username = \"" + auth.username + "\" succeeded, returning user = " + JSON.stringify(user) + " to client...\n");
    //	res.json(user);
    // });
}/* doGet() */

router.get('/', doGet)

/*
* Set password for user:
* Call PUT /user_login_api, passing
* username as req.body.username and password as req.body.password
* for the user, and we will set the password_hash for the user
* using a one-way hash of the password...
*/
function doPut(req, res, next) {
    const sWho = 'user-login-api::doPut'

    const iNumRounds = 10

    const username = req.body.username

    bcrypt.genSalt(iNumRounds, (err, salt) => {
        if (err) {
            logajohn.info(`${sWho}(): Trouble with bcrypt.genSalt( iNumRounds = ${iNumRounds}): err = ${JSON.strinfigy(err)}..., calling next(err)...`)
            return next(err)
        }
        bcrypt.hash(req.body.password, salt,
            () => {
                // logajohn.info("Making progress, Doc-tor Cy-a-nide...!");
            },
            (err, password_hash) => {
        			if (err) {
        				logajohn.info(`${sWho}(): Trouble with bcrypt.hash(): err = ${JSON.stringify(err)}..., calling next(err)...`)
	        			return next(err)
        			}

                // var user = new User({"username": req.body.username});

                // user.password_hash = hash;

                // logajohn.info(sWho + "(): Updating user to User DB, user = " + JSON.stringify( user ) + "...\n");
                logajohn.info(`${sWho}(): Updating user: username = '${username}, password_hash.length = ${password_hash.length}, password_hash = '${password_hash}'...`)

                const usersModel = new Users()

                const dispatchee = {
                    type: C.USER_SET_PASSWORD_HASH,
                    username,
                    password_hash,
                    error: '',
                }

                usersModel.updatePasswordHashViaUsername(username, password_hash)
                    .then((id) => {
			    logajohn.info(`${sWho}(): .then appears successful, Moe, id = `, id)
                        dispatchee.id = id
                        res.status(200) // 200: OK

			    logajohn.info(`${sWho}(): Sending response: `, dispatchee)
                        res.json(dispatchee)
                    })
                    .catch((err) => {
			    logajohn.info(`${sWho}(): .catch an error, Moe, err = `, err)
                        dispatchee.error = err
                        res.status(500) // 500: Server Error

			    logajohn.info(`${sWho}(): Sending response: `, dispatchee)
                        res.json(dispatchee)
                    })


                // user.save(function(err, user){
                //	if( err ){
		    //			logajohn.info("Trouble with user.save(): err =\n");
                //		logajohn.info( err );
                //		return next(err);
                //	}
                //	logajohn.info("Saved new user username = \"" + req.body.username + "\"..., returning code 201...\n");
                //	res.sendStatus(201);
                // });
            })
    })
}/* doPut() */

router.put('/', doPut)

module.exports = router

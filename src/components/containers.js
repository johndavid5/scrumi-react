import { connect } from 'react-redux'

import ObjectivesFilterForm from './ui/ObjectivesFilterForm'
import ObjectivesListComponent from './ui/ObjectivesListComponent'

import UsersFilterForm from './ui/UsersFilterForm'
import UsersListComponent from './ui/UsersListComponent'

import {
    objectivesFilter, usersFilter
} from '../actions'

import { config } from '../config'
import { logajohn } from '../lib/logajohn'

let sWhere = './src/components/containers.js'

logajohn.setLevel(config.DEBUG_LEVEL)
logajohn.debug(`${sWhere}: logajohn.getLevel()=${logajohn.getLevel()}...`)

export const ObjectivesFilterFormContainer = connect(
    (state) => { /* mapStateToProps */

        const sWho = `${sWhere}: ObjectivesFilterFormContainer::mapStateToProps`

        console.log(`${sWho}(): state = `, state)
        const mary_kay_returno = {
            objectives: { ...state.objectives },
        }
        logajohn.debug(`${sWho}(): SHEMP: Moe, retoynin' mary_kay_returno  = `, mary_kay_returno)
        return mary_kay_returno
    },
    dispatch => ({ /* mapDispatchToProps */
        onObjectivesFilter(filters) {
            const sWho = `${sWhere}: ObjectivesFilterFormContainer::mapDispatchToProps`
            logajohn.debug(`${sWho}(): SHEMP: Moe, dispatchin' objectivesFilter(filters), with filters = `, filters )
            logajohn.debug(`${sWho}(): SHEMP: Moe, typeof dispatch = `, (typeof dispatch) )
            dispatch(objectivesFilter(filters))
        },
    }),
)(ObjectivesFilterForm)


export const ObjectivesListContainer = connect(

    (state) => /* mapStateToProps() */ {

        const sWho = `${sWhere}: ObjectivesListContainer::mapStateToProps`

        logajohn.debug(`${sWho}(): state = `, state)

        const returno = {
            objectives: { ...state.objectives },
        }

        logajohn.debug(`${sWho}(): returning `, returno)

        return returno
    },
    dispatch => ({ /* mapDispatchToProps */
        onObjectivesFilter(filters) {
            const sWho = `${sWhere}: ObjectivesListContainer::mapDispatchToProps`
            logajohn.debug(`${sWho}(): SHEMP: Moe, dispatchin' objectivesFilter(filters), with filters = `, filters )
            logajohn.debug(`${sWho}(): SHEMP: Moe, typeof dispatch = `, (typeof dispatch) )
            dispatch(objectivesFilter(filters))
        },
    })
    
)(ObjectivesListComponent)



export const UsersFilterFormContainer = connect(
    (state) => { /* mapStateToProps */

        const sWho = `${sWhere}: UsersFilterFormContainer::mapStateToProps`

        console.log(`${sWho}(): state = `, state)
        const mary_kay_returno = {
            users: { ...state.users },
        }
        logajohn.debug(`${sWho}(): SHEMP: Moe, retoynin' mary_kay_returno  = `, mary_kay_returno)
        return mary_kay_returno
    },
    dispatch => ({ /* mapDispatchToProps */
        onUsersFilter(filters) {
            const sWho = `${sWhere}: UsersFilterFormContainer::mapDispatchToProps`
            logajohn.debug(`${sWho}(): SHEMP: Moe, dispatchin' usersFilter(filters), with filters = `, filters )
            logajohn.debug(`${sWho}(): SHEMP: Moe, typeof dispatch = `, (typeof dispatch) )
            dispatch(usersFilter(filters))
        },
    }),
)(UsersFilterForm)


export const UsersListContainer = connect(

    (state) => /* mapStateToProps() */ {

        const sWho = `${sWhere}: UsersListContainer::mapStateToProps`

        logajohn.debug(`${sWho}(): state = `, state)

        const returno = {
            users: { ...state.users },
        }

        logajohn.debug(`${sWho}(): returning `, returno)

        return returno
    },
    dispatch => ({ /* mapDispatchToProps */
        onUsersFilter(filters) {
            const sWho = `${sWhere}: UsersListContainer::mapDispatchToProps`
            logajohn.debug(`${sWho}(): SHEMP: Moe, dispatchin' usersFilter(filters), with filters = `, filters )
            logajohn.debug(`${sWho}(): SHEMP: Moe, typeof dispatch = `, (typeof dispatch) )
            dispatch(usersFilter(filters))
        },
    })
    
)(UsersListComponent)

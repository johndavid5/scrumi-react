import { connect } from 'react-redux'
import { compose } from 'redux'
import ObjectivesFilterForm from './ui/ObjectivesFilterForm'
import ObjectivesListComponent from './ui/ObjectivesListComponent'
import {
    addColor, rateColor, removeColor, linksQaRun, objectivesFilter,
} from '../actions'
import { findById } from '../lib/array-helpers'
import { sortColors } from '../lib/array-helpers'

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



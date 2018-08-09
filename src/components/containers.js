import { connect } from 'react-redux'
import { compose } from 'redux'
import ColorList from './ui/ColorList'
import ColorDetails from './ui/ColorDetails'
import AddColorForm from './ui/AddColorForm'
import LinksQaRunForm from './ui/LinksQaRunForm'
import LinksQaResultsComponent from './ui/LinksQaResultsComponent'
import ObjectivesFilterForm from './ui/ObjectivesFilterForm'
import ObjectivesListComponent from './ui/ObjectivesListComponent'
import { addColor, rateColor, removeColor, linksQaRun, objectivesFilter } from '../actions'
import { findById } from '../lib/array-helpers'
import { sortColors } from '../lib/array-helpers'

import { logajohn } from '../lib/logajohn' 

export const NewColor = connect(
    null, /* mapStateToProps() */
    dispatch => /* mapDispatchToProps() */
        ({
            onNewColor(title, color) {
                dispatch(addColor(title, color))
            }
        })
)(AddColorForm)

export const ObjectivesFilterFormContainer = connect(
    state => /* mapStateToProps() */
        {
        let sWho = "ObjectivesFilterFormContainer::mapStateToProps";
        console.log(`${sWho}(): state = `, state );
        let mary_kay_returno = {
            objectives: {...state.objectives}
        }
        console.log(`${sWho}(): returning mary_kay_returno  = `, mary_kay_returno );
        return mary_kay_returno;
        },
    dispatch => /* mapDispatchToProps() */
        ({
            onObjectivesFilter(filters) {
                dispatch(objectivesFilter(filters))
            }
        })
)(ObjectivesFilterForm)


export const ObjectivesListContainer = connect(

    state => /* mapStateToProps() */ {

        let sWho="ObjectivesListContainer::mapStateToProps"

        logajohn.debug(`${sWho}(): state = `, state );

        let returno = 
        {
            objectives : {...state.objectives}
        };

        logajohn.debug(`${sWho}(): returning `, returno );

        return returno;
    },
    null
)(ObjectivesListComponent)

export const LinksQaFormContainer = connect(
    state => /* mapStateToProps() */
        ({
            linksQa: {...state.linksQa}
        }),
    dispatch => /* mapDispatchToProps() */
        ({
            onLinksQaRun(basePath, additionOnlyCode, timestamp, output) {
                dispatch(linksQaRun(basePath, additionOnlyCode, timestamp, output))
            }
        })
)(LinksQaRunForm)

export const LinksQaResultsContainer = connect(
    state => /* mapStateToProps() */ {

        let sWho="LinksQaResultsContainer::mapStateToProps"

        logajohn.debug(`${sWho}(): state = `, state );

        let returno = 
        {
            linksQa: {...state.linksQa}
        };

        logajohn.debug(`${sWho}(): returning `, returno );

        return returno;
    },
    null
)(LinksQaResultsComponent)


export const Colors = connect(
    ({colors}, {match}) =>
        ({
            colors: sortColors(colors, match.params.sort)
        }),
    dispatch =>
        ({
            onRemove(id) {
                dispatch(removeColor(id))
            },
            onRate(id, rating) {
                dispatch(rateColor(id, rating))
            }
        })
)(ColorList)

export const Color = connect(
    ({ colors }, { match }) =>
        ({
            ...findById(colors, match.params.id)
        })
)(ColorDetails)

import PropTypes from 'prop-types'

import { Component } from 'react'

import { customStringify, strEqualsIgnoreCase } from '../../lib/utils' // customStringify(): safer than JSON.stringify()... 

// `withRouter` is an HOC.  When we export the `Color`
// component, we send it to `withRouter` which wraps
// it with a component that passes the router properties:
// match, history, and location (as props)...
//import { withRouter } from 'react-router'
//import '../../../stylesheets/SortButton.scss'

class SortButton extends Component {
    render() {
        const {
            sWhat, sWhatPretty, sCurrentSortBy, sCurrentAscDesc, onSortBy
        } = this.props

        let glyph = ""
        let sNextAscDesc = ""
        let sNextAscDescPretty = ""
        let glyphStyle={paddingLeft: '2px'} 
        if( strEqualsIgnoreCase( sCurrentSortBy, sWhat ) ){
                if( strEqualsIgnoreCase( sCurrentAscDesc, "asc" ) ){
                    glyph = <span className="glyphicon glyphicon-chevron-up" aria-hidden="true" style={glyphStyle}></span> 
                    sNextAscDesc = "desc"
                    sNextAscDescPretty = "Descending"
                }
                else if( strEqualsIgnoreCase( sCurrentAscDesc, "desc" ) ){
                    glyph = <span className="glyphicon glyphicon-chevron-down" aria-hidden="true" style={glyphStyle}></span> 
                    sNextAscDesc = "asc"
                    sNextAscDescPretty = "Ascending"
                }
                else{
                    glyph = <span className="glyphicon glyphicon-chevron-up" aria-hidden="true" style={glyphStyle}></span> 
                    sNextAscDesc = "desc"
                    sNextAscDescPretty = "Descending"
                }
        }
        else{
            sNextAscDesc = "asc"
            sNextAscDescPretty = "Ascending"
        }

        let my_id = `sort-by-${sWhat}`
        let my_aria_label = `Sort by ${sWhatPretty} ${sNextAscDescPretty}`

        return (
            <button type="button" className="btn btn-default" id={my_id}
                    aria-label={my_aria_label}
                    onClick={(e)=>onSortBy(e, sWhat, sNextAscDesc)}>
                    {sWhatPretty} 
                    {glyph}
            </button>
        )

    }/* render() */

}/* class SortButton */

SortButton.propTypes = {
    sWhat: PropTypes.string.isRequired,
    sWhatPretty: PropTypes.string.isRequired,
    sCurrentSortBy: PropTypes.string.isRequired,
    sCurrentAscDesc: PropTypes.string.isRequired,
    onSortBy: PropTypes.func.isRequired
}

//SortButton.defaultProps = {
//    rating: 0,
//    onRemove: f => f,
//    onRate: f => f,
//}

//export default withRouter(SortButton)
export default SortButton

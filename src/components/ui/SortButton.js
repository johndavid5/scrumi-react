/* Dependencies: Bootstrap with its glyphicon-chevron-up and glyphicon-chevron-down... */
import PropTypes from 'prop-types'

import { Component } from 'react'

import { customStringify, strEqualsIgnoreCase } from '../../lib/utils' // customStringify(): safer than JSON.stringify()...

class SortButton extends Component {
    render() {
        const {
            sWhat, sWhatPretty, sCurrentSortBy, sCurrentAscDesc, onSortBy,
        } = this.props


        let glyphButton = ''
        let sNextAscDesc = ''
        let sNextAscDescPretty = ''
        let sChevronClass = ''
        // let glyphStyle={paddingLeft: '2px', height: '0.5em', width: '1.0em' }
        // let glyphStyle={paddingLeft: '2px', color: '#FFD9F2'}; /* pink */
        const glyphStyle = { paddingLeft: '2px' } /* pink */

        if (strEqualsIgnoreCase(sCurrentSortBy, sWhat)) {
            if (strEqualsIgnoreCase(sCurrentAscDesc, 'asc')) {
                sNextAscDesc = 'desc'
                sNextAscDescPretty = 'Descending'
                // sChevronClass = "glyphicon-chevron-up"
                sChevronClass = 'fa fa-chevron-up'
            } else if (strEqualsIgnoreCase(sCurrentAscDesc, 'desc')) {
                sNextAscDesc = 'asc'
                sNextAscDescPretty = 'Ascending'
                // sChevronClass = "glyphicon-chevron-down"
                sChevronClass = 'fa fa-chevron-down'
            } else {
                // Shouldn't happen, but if it does assume "asc"
                sNextAscDesc = 'desc'
                sNextAscDescPretty = 'Descending'
                // sChevronClass = "glyphicon-chevron-up"
                sChevronClass = 'fa fa-chevron-up'
            }

            // glyphButton = <button type="button" className="btn btn-default" aria-label={my_aria_label} onClick={(e)=>onSortBy(e, sWhat, sNextAscDesc)} style={{height: '0.5em'}}><span className={'glyphicon ' + sChevronClass} aria-hidden="true" style={{height: '0.5em'}}></span></button>
            // glyphButton = <span className={'glyphicon ' + sChevronClass} aria-hidden="true" style={glyphStyle}></span>
            glyphButton = <i className={sChevronClass} aria-hidden="true" style={glyphStyle} />
        } else {
            sNextAscDesc = 'asc'
            sNextAscDescPretty = 'Ascending'
        }

        const my_id = `sort-by-${sWhat}`
        const my_aria_label = `Sort by ${sWhatPretty} ${sNextAscDescPretty}`

        return (
          <a
              href="#" id={my_id}
                aria-label={my_aria_label}
                onClick={(e) => { e.preventDefault(); onSortBy(e, sWhat, sNextAscDesc) }}
            >
                {sWhatPretty}
                {glyphButton}
            </a>
        )
    }/* render() */
}/* class SortButton */

SortButton.propTypes = {
    sWhat: PropTypes.string.isRequired,
    sWhatPretty: PropTypes.string.isRequired,
    sCurrentSortBy: PropTypes.string.isRequired,
    sCurrentAscDesc: PropTypes.string.isRequired,
    onSortBy: PropTypes.func.isRequired,
}

// SortButton.defaultProps = {
//    rating: 0,
//    onRemove: f => f,
//    onRate: f => f,
// }

export default SortButton

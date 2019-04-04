import PropTypes from 'prop-types'
import { Component } from 'react'

// `withRouter` is an HOC.  When we export the 
// component, we send it to `withRouter` which wraps
// it with a component that passes the router properties:
// match, history, and location (as props)...
import { withRouter } from 'react-router'

/* query-string: parse() query string into an object */
/*               stringify() object into query string */
/* reference: https://www.npmjs.com/package/query-string */
import queryString from 'query-string'

import SortButton from './SortButton'

import { logajohn } from '../../lib/logajohn'

import { customStringify, strEqualsIgnoreCase, stringToBool } from '../../lib/utils' // Safer than JSON.stringify()... 

// import '../../stylesheets/ObjectivesListComponent.scss'
import '../../../stylesheets/ObjectivesListComponent.scss'

// const ObjectivesListComponent = ({ linksQa={}, debug=true}) => {
// const ObjectivesListComponent = (props) => {
class ObjectivesListComponent extends Component {

    
    constructor(props){
        super(props)

        let sWho = `ObjectivesListComponent::constructor`
        logajohn.info(`${sWho}(): this.props=`, customStringify(this.props, ' '))

        this.sortBy = this.sortBy.bind(this)
    } 

    static formFullName(objective){
        let s_out = ''

        if (objective.first_name) {
            s_out += objective.first_name
        }

        if (objective.middle_name && objective.middle_name.length > 0) {
            s_out += ` ${objective.middle_name}`
        }

        if (objective.last_name && objective.last_name.length > 0) {
            s_out += ` ${objective.last_name}`
        }

        return s_out
    }/* formFullName(objective) */

    sortBy(event, sWhat, sAscDesc){

        let sWho = "ObjectivesListComponent::sortby";

        logajohn.info(`${sWho}(): event = `, customStringify(event) )
        logajohn.info(`${sWho}(): event.target = `, customStringify(event.target) )
        logajohn.info(`${sWho}(): this.props = `, customStringify(this.props) )

        const { onObjectivesFilter } = this.props; // Get dispatch method from props...
        const currentFilters = ( this.props.objectives && this.props.objectives.objectives_filters ) ? this.props.objectives.objectives_filters : {}

        logajohn.info(`${sWho}(): currentFilters = `, currentFilters )

        // Important: Use spread operator ... to preserve current filters...
        let filters = { ...currentFilters, sort_by_field: sWhat, sort_by_asc_desc: sAscDesc };

        event.preventDefault()

        logajohn.info(`${sWho}(): Calling onObjectivesFilter(filters=`, customStringify(filters), `...`);
        
        onObjectivesFilter(filters);

    }/* sortBy() */

    render(){ 

        let sWho = "ObjectivesListComponent::render"

        const objectives = this.props.objectives

        let debug = false 

        // Bulletproofing in case we don't have this.props.location...
        if(this.props.hasOwnProperty('location') && this.props.location.hasOwnProperty('search')){
            // Make this.props.location.search query string into an object...
            let search_object = queryString.parse(this.props.location.search)
            console.log(`${sWho}(): search_object = `, search_object )

            debug = stringToBool( search_object.debug )
        }
		console.log(`${sWho}(): debug = `, debug )

        console.log(`${sWho}(): this.props = `, this.props)
        logajohn.debug(`${sWho}(): this.props = `, this.props)

        console.log(`${sWho}(): objectives = `, objectives)
        logajohn.debug(`${sWho}(): objectives = `, objectives)

    const thStyle = {
	  border: '2px solid #DCDCDC',
      color: 'white',
      backgroundColor: '#C1B9DB',
	  padding: '2px',
      textAlign: 'center',
    }

    const tdStyle = {
	  border: '2px solid #DCDCDC',
	  padding: '2px',
      textAlign: 'left',
    }

    const gefilterStyle = {
        color: 'blue',
        whiteSpace: 'nowrap'
    }

    const timestampStyle = {
        color: 'purple',
        whiteSpace: 'nowrap'
    }



    let timestamp = ( objectives.objectives_timestamp ? (
              <div className="filter-params row">
                <div className="col-sm-8">
                    <p id="objectives-timestamp" style={timestampStyle}>{objectives.objectives_timestamp}</p>
                </div>
              </div>
            ): "" )

    let gefilters = []
    let gefilterees = [ 
        { field: 'description_filter', pretty_field: 'Description Filter' }
        ,{ field: 'full_name_filter', pretty_field: 'Assigned To Filter' }
        ,{ field: 'comments_filter', pretty_field: 'Comments Filter' }
    ]

    //gefilters = gefilterees.reduce((accumulator, val)=>{
    //    if( objectives && objectives.objectives_filters && objectives.objectives_filters[val.field] ){
    //        accumulator = accumulator.push(<div style={gefilterStyle}>{val.pretty_field}: &quot;<span id="static-description-filter">{objectives.objectives_filters[val.field]}</span>&quot;</div>);
    //    }
    //    return accumulator;
    //}, gefilters )

    // Form a string list of the filters for the benefit of the end-user...
    gefilterees.forEach( (val)=>{
        if( objectives && objectives.objectives_filters && objectives.objectives_filters[val.field] ){

            let sluggified_field = val.field.replace(/_/g, '-') // e.g., 'description-field'

            let id=`static-${sluggified_field}`; // e.g., 'static-description-field' 

            if( gefilters.length > 0 ){
                gefilters.push(', ')
            }

            gefilters.push(<span style={gefilterStyle}>{val.pretty_field}: &quot;<span id={id}>{objectives.objectives_filters[val.field]}</span>&quot;</span>);
        }
    })

    //if( objectives && objectives.objectives_filters && objectives.objectives_filters.description_filter ){
    //    gefilters.push( 
    //        <div className="col-sm-1 col-form-label" style={gefilterStyle}>Description Filter: &quot;<span id="static-description-filter">{objectives.objectives_filters.description_filter}</span>&quot;</div>
    //    )
    //}

    //if( objectives && objectives.objectives_filters && objectives.objectives_filters.full_name_filter ){
    //    gefilters.push( 
    //      <div className="col-sm-1 col-form-label" style={gefilterStyle}>Assigned To Filter: &quot;<span id="static-full-name-filter">{objectives.objectives_filters.full_name_filter}</span>&quot;</div>
    //    )
    //}
    
    //if( gefilters.length > 0 ){
    //    gefilters.unshift(<div className="filter-params row">);
    //    gefilters.push(</div>);
    //}

    //let filter_params = (  ( 1 == 0 ) ?
    //    (
    //        <div className="filter-params row">
    //            <div className="col-sm-8">
    //                <h3 style={{whiteSpace: 'nowrap'}}>Base Path: {}</h3>
    //            </div>
    //            <div className="col-sm-4">
    //                <h3 style={{whiteSpace: 'nowrap'}}>Addition Only Code: {}</h3>
    //            </div>
    //        </div>
    //
    //        <div className="filter-params row">
    //            <div className="col-sm-4">
    //                <h3 style={{whiteSpace: 'nowrap'}}>STDERR Rows: {}</h3>
    //            </div>
    //        </div> 
    //     ) : ""  )

    let gears = ""
    if( objectives && objectives.hasOwnProperty("objectives_fetching") && objectives.objectives_fetching == true ){
        gears = <img id="spinning-gears" src="/images/gold-brass-gear-cogs-animated-5.gif" width="100" alt="Fetching...stand by..."
        style={{position: 'absolute',
            left: 0,
            right: 0,
            margin: 'auto'
        }} />
    }

    let sCurrentSortByField = ""
    if( objectives && objectives.objectives_filters && objectives.objectives_filters.sort_by_field ){
       sCurrentSortByField =  objectives.objectives_filters.sort_by_field
    }

    let sCurrentSortByAscDesc = ""
    if( objectives && objectives.objectives_filters && objectives.objectives_filters.sort_by_asc_desc){
       sCurrentSortByAscDesc =  objectives.objectives_filters.sort_by_asc_desc
    }

    let objectives_table = (  (objectives && objectives.objectives_list && objectives.objectives_list.length > 0) ?
        (
                  <table className="table" id="objectives-table" style={{marginTop: '10px'}}>
                        <thead>
                      <tr>
                          <th scope="col" style={thStyle}>{1==1?<SortButton sWhat='description' sWhatPretty='Description' sCurrentSortBy={sCurrentSortByField} sCurrentAscDesc={sCurrentSortByAscDesc} onSortBy={this.sortBy} />:""}</th>
                          <th scope="col" style={thStyle}>{1==1?<SortButton sWhat='full_name' sWhatPretty='Assigned To' sCurrentSortBy={sCurrentSortByField} sCurrentAscDesc={sCurrentSortByAscDesc} onSortBy={this.sortBy} />:""}</th>
                          <th scope="col" style={thStyle}>{1==1?<SortButton sWhat='comment' sWhatPretty='Comments' sCurrentSortBy={sCurrentSortByField} sCurrentAscDesc={sCurrentSortByAscDesc} onSortBy={this.sortBy} />:""}</th>
                      </tr>
                    </thead>
                        <tbody>
                      {
                                objectives.objectives_list.map((objective, index) => (
                                  <tr key={objective.objective_id}>
                                      <td style={tdStyle} id={'description-' + objective.objective_id}>{objective.description}</td>
                                      <td style={tdStyle} id={'full_name-' + objective.objective_id}>{objective.full_name}</td>
                                      <td style={tdStyle} id={'comment-' + objective.objective_id}>{objective.comment}</td>
                                    </tr>
                                ))
                      }
                    </tbody>
                    </table>
                ) : ""

    )

    return (
      <div className="objectives-list-component container-fluid" style={{ paddingLeft: '1em' }}>
      {timestamp}
      <div>
      {gefilters}
      </div>
      {gears}
      {objectives_table}
      { ((debugee)=>{
          if(debugee == true)
            return (
                <div>
                    <pre style={{ fontSize: '125%', textAlign: 'left' }}>
                    this.props = { JSON.stringify(this.props, null, ' ') }
                    </pre>
                </div>
            )
          else
            return ''
  	      })( debug ) // IIFE
       }
       </div>
       )
  }/* render() */

}/* class ObjectivesListComponent extends Component */

ObjectivesListComponent.propTypes = {
    objectives: PropTypes.object,
    debug: PropTypes.bool,
}

export default withRouter(ObjectivesListComponent)

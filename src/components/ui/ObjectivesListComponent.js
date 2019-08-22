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

    const thStyle = {};

    /*
    const thStyle = {
	  border: '2px solid #DCDCDC',
      color: 'white',
      backgroundColor: '#C1B9DB',
	  padding: '2px',
      textAlign: 'center',
    }
    */


    const tdStyle = {};

    /*
    const tdStyle = {
	  border: '2px solid #DCDCDC',
	  padding: '2px',
      textAlign: 'left',
    }
    */

    const gefilterStyle = {
        color: 'blue',
        whiteSpace: 'nowrap'
    }

    const timestampStyle = {
        color: 'purple',
        whiteSpace: 'nowrap',
        margin: '0px'
    }


    let gefilters = []
    // Add filter information here if you wish the filter to be displayed...
    let gefilterees = [ 
        { field: 'description_filter', pretty_field: 'Description Filter' }
        ,{ field: 'full_name_filter', pretty_field: 'Assigned To Filter' }
        ,{ field: 'comments_filter', pretty_field: 'Comments Filter' }
    ]

    // Form a string list of the filters for the benefit of the end-user...
    gefilterees.forEach( (val)=>{
        if( objectives && objectives.objectives_filters && objectives.objectives_filters[val.field] ){

            let sluggified_field = val.field.replace(/_/g, '-') // e.g., 'description-field'

            let id=`static-${sluggified_field}`; // e.g., 'static-description-field' 

            if( gefilters.length > 0 ){
                gefilters.push(<span style={gefilterStyle}>, </span>)
            }
            else{
                //gefilters.push('...with ')
                gefilters.push(<span style={gefilterStyle}>...with...</span>)
            }

            gefilters.push(<span style={gefilterStyle}>{val.pretty_field}: &quot;<span id={id}>{objectives.objectives_filters[val.field]}</span>&quot;</span>);
        }
    })


    let gears = ""
    if( objectives && objectives.hasOwnProperty("objectives_fetching") && objectives.objectives_fetching == true ){
        gears = <img id="spinning-gears" src="/scrumi-react/images/gold-brass-gear-cogs-animated-5.gif" width="100" alt="Fetching...stand by..."
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

    console.log(`${sWho}(): SHEMP: Moe, sCurrentSortByField = '${sCurrentSortByField}', sCurrentSortByAscDesc = '${sCurrentSortByAscDesc}'...`)

    let i_num_objectives = (objectives && typeof(objectives.objectives_list) !== 'undefined' && typeof(objectives.objectives_list.length) !== 'undefined') ? objectives.objectives_list.length : 0

    let s_num_objectives = ""
    if( i_num_objectives == 0 ){
        if( objectives.objectives_list ){
          s_num_objectives = "No "    
        }
    }
    else{
          s_num_objectives = "" + i_num_objectives + " "
    }

    // style={{width: '100%', marginTop: '10px'}}
    //style={{width: '100%', marginLeft: 'auto', marginRight: 'auto'}}

    let objectives_table = (  (objectives && objectives.objectives_list && objectives.objectives_list.length > 0) ?
        (
                  <table className="table table-striped" id="objectives-table" style={{marginTop: '10px', display: 'inline-table'}}>
                     <thead>
                       <tr>
                          <th scope="col" style={thStyle}>{1==1?<SortButton sWhat='description' sWhatPretty='Description' sCurrentSortBy={sCurrentSortByField} sCurrentAscDesc={sCurrentSortByAscDesc} onSortBy={this.sortBy} />:""}</th>
                          <th scope="col" style={thStyle}>{1==1?<SortButton sWhat='full_name' sWhatPretty='Assigned To' sCurrentSortBy={sCurrentSortByField} sCurrentAscDesc={sCurrentSortByAscDesc} onSortBy={this.sortBy} />:""}</th>
                          <th scope="col" style={thStyle}>{1==1?<SortButton sWhat='begun' sWhatPretty='Begun' sCurrentSortBy={sCurrentSortByField} sCurrentAscDesc={sCurrentSortByAscDesc} onSortBy={this.sortBy} />:""}</th>
                          <th scope="col" style={thStyle}>{1==1?<SortButton sWhat='completed' sWhatPretty='Completed' sCurrentSortBy={sCurrentSortByField} sCurrentAscDesc={sCurrentSortByAscDesc} onSortBy={this.sortBy} />:""}</th>
                          <th scope="col" style={thStyle}>{1==1?<SortButton sWhat='comment' sWhatPretty='Comments' sCurrentSortBy={sCurrentSortByField} sCurrentAscDesc={sCurrentSortByAscDesc} onSortBy={this.sortBy} />:""}</th>
                       </tr>
                    </thead>
                        <tbody>
                      {
                                objectives.objectives_list.map((objective, index) => (
                                  <tr key={objective.objective_id}>
                                      <td style={tdStyle} id={'description-' + objective.objective_id}>{objective.description}</td>
                                      <td style={tdStyle} id={'full_name-' + objective.objective_id}>{objective.full_name}</td>
                                      <td style={tdStyle} id={'begun-' + objective.objective_id}>{objective.begun}</td>
                                      <td style={tdStyle} id={'completed-' + objective.objective_id}>{objective.completed}</td>
                                      <td style={tdStyle} id={'comment-' + objective.objective_id}>{objective.comment}</td>
                                    </tr>
                                ))
                      }
                    </tbody>
                    </table>
                ) : ""

    )

    return (
      <div className="objectives-list-component container-fluid" >

      <div className="filter-param row">
        <div className="col-sm-10" style={{textAlign: 'center'}}>
          {objectives && objectives.objectives_timestamp ? <p id="objectives-timestamp" style={timestampStyle}>{objectives.objectives_timestamp}</p> : ""}
          <h4 style={{color: 'purple', textAlign: 'center', margin: '2px'}}>{s_num_objectives}Objective{i_num_objectives == 1 ? "": "s"}</h4>
          {gefilters}
        </div>
      </div>

      {gears}

      <div className="row">
        <div className="col-sm-12 table-responsive" style={{textAlign: 'center'}}>
          {objectives_table}
        </div>
      </div>

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

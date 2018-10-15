import PropTypes from 'prop-types'
import SortButton from './SortButton'

import { logajohn } from '../../lib/logajohn'

import { customStringify, strEqualsIgnoreCase } from '../../lib/utils' // Safer than JSON.stringify()... 

// import '../../stylesheets/ObjectivesListComponent.scss'
import '../../../stylesheets/ObjectivesListComponent.scss'

// const ObjectivesListComponent = ({ linksQa={}, debug=true}) => {
const ObjectivesListComponent = (props) => {
    const sWho = 'ObjectivesListComponent'

    const objectives = props.objectives
    const debug = true

    console.log(`${sWho}(): props = `, props)
    logajohn.debug(`${sWho}(): props = `, props)

    console.log(`${sWho}(): objectives = `, objectives)
    logajohn.debug(`${sWho}(): objectives = `, objectives)


    const thStyle = {
	  border: '2px solid purple',
        color: 'white',
        backgroundColor: 'purple',
	  padding: '2px',
        textAlign: 'center',
    }

    const tdStyle = {
	  border: '2px solid purple',
	  padding: '2px',
        textAlign: 'left',
    }

    const gefilterStyle = {
        color: 'blue'
    }

    const timestampStyle = {
        color: 'purple',
        whiteSpace: 'nowrap'
    }

    const formFullName = (objective) => {
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
    }

    const sortBy = (event, sWhat, sAscDesc) => {

        let sWho = "ObjectivesListComponent::sortby";

        logajohn.info(`${sWho}(): event = `, customStringify(event) )
        logajohn.info(`${sWho}(): event.target = `, customStringify(event.target) )
        logajohn.info(`${sWho}(): props = `, customStringify(props) )

        const { onObjectivesFilter } = props; // Get dispatch method from props...
        const currentFilters = ( props.objectives && props.objectives.objectives_filters ) ? props.objectives.objectives_filters : {}

        logajohn.info(`${sWho}(): currentFilters = `, currentFilters )

        // Important: Use spread operator ... to preserve current filters...
        let filters = { ...currentFilters, sort_by_field: sWhat, sort_by_asc_desc: sAscDesc };

        event.preventDefault()

        logajohn.info(`${sWho}(): Calling onObjectivesFilter(filters=`, customStringify(filters), `...`);
        
        onObjectivesFilter(filters);

    }/* sortBy() */

    let timestamp = ( objectives.objectives_timestamp ? (
              <div className="filter-params row">
                <div className="col-sm-8">
                    <p id="objectives-timestamp" style={timestampStyle}>{objectives.objectives_timestamp}</p>
                </div>
              </div>
            ): "" )

    let gefilters = []
    
    if( objectives && objectives.objectives_filters && objectives.objectives_filters.description_filter ){
        gefilters.push( 
              <div className="filter-params row">
                 <div className="col-sm-6 col-form-label" style={gefilterStyle}>Description Filter: &quot;<span id="static-description-filter">{objectives.objectives_filters.description_filter}</span>&quot;</div>
              </div>
        )
    }
    

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
                          <th scope="col" style={thStyle}>{1==1?<SortButton sWhat='description' sWhatPretty='Description' sCurrentSortBy={sCurrentSortByField} sCurrentAscDesc={sCurrentSortByAscDesc} onSortBy={sortBy} />:""}</th>
                          <th scope="col" style={thStyle}>{1==1?<SortButton sWhat='full_name' sWhatPretty='Assigned To' sCurrentSortBy={sCurrentSortByField} sCurrentAscDesc={sCurrentSortByAscDesc} onSortBy={sortBy} />:""}</th>
                      </tr>
                    </thead>
                        <tbody>
                      {
                                objectives.objectives_list.map((objective, index) => (
                                  <tr key={objective.objective_id}>
                                      <td style={tdStyle} id={'description-' + objective.objective_id}>{objective.description}</td>
                                      <td style={tdStyle} id={'full_name-' + objective.objective_id}>{objective.full_name}</td>
                                    </tr>
                                ))
                      }
                    </tbody>
                    </table>
                ) : (<h2>No objectives</h2>)

    )

    return (
      <div className="objectives-list-component container-fluid" style={{ paddingLeft: '1em' }}>
      {timestamp}
      {gefilters}
      {gears}
      {objectives_table}
      { ((debugee) => {
          if(debugee == true)
            return (
                <div>
                    <pre style={{ fontSize: '125%', textAlign: 'left' }}>
                    props = { JSON.stringify(props, null, ' ') }
                    </pre>
                </div>
            )
          else
            return ''
  	      })( debug ) // IIFE
       }
       </div>
    )
}/* const ObjectivesListComponent = ( props ) */

ObjectivesListComponent.propTypes = {
    objectives: PropTypes.object,
    debug: PropTypes.bool,
}

export default ObjectivesListComponent

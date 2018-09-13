import PropTypes from 'prop-types'
import { logajohn } from '../../lib/logajohn'

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

    const timestampStyle = {
        color: 'purple',
    /* whiteSpace: 'nowrap' */
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

    let timestamp = ( objectives.objectives_timestamp ? (
              <div className="filter-params row">
                <div className="col-sm-8">
                    <p style={timestampStyle}>{objectives.objectives_timestamp}</p>
                </div>
              </div>
            ): "" )

    let filter_params = ""

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
        gears = <img src="/images/gold-brass-gear-cogs-animated-5.gif" width="100" alt="Fetching...stand by..."
        style={{position: 'absolute',
            left: 0,
            right: 0,
            margin: 'auto'
        }} />
    }
    //let objectives_table = ""
    //if( objectives && objectives.hasOwnProperty("objectives_fetching") && objectives.objectives_fetching == true ){
    //    objectives_table = (
    //     <img src="/images/gold-brass-gear-cogs-animated-5.gif" width="100" alt="Fetching...stand by..." />
    //   )
    //}
    //else {
        let objectives_table = (  (objectives && objectives.objectives_list && objectives.objectives_list.length > 0) ?
            (
                      <table className="table">
                            <thead>
                          <tr>
                              <th scope="col" style={thStyle}>Description</th>
                              <th scope="col" style={thStyle}>Assigned To</th>
                            </tr>
                        </thead>
                            <tbody>
                          {
                                    objectives.objectives_list.map((objective, index) => (
                                      <tr key={index}>
                                          <td style={tdStyle}>{objective.description}</td>
                                            <td style={tdStyle}>{formFullName(objective)}</td>
                                        </tr>
                                    ))
                          }
                        </tbody>
                        </table>
                    ) : (<h2>No objectives</h2>)

        )
    //}

    return (
      <div className="objectives-list-component container-fluid" style={{ paddingLeft: '1em' }}>
      {timestamp}
      {filter_params}
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

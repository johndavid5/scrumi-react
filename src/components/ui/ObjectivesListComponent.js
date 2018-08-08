import PropTypes from 'prop-types'
import '../../stylesheets/ObjectivesListComponent.scss'
import { logajohn } from '../../lib/logajohn' 

//const ObjectivesListComponent = ({ linksQa={}, debug=true}) => {
const ObjectivesListComponent = ( props ) => {

    let sWho = "ObjectivesListComponent"

    let objectives = props.objectives
    let debug = true

	console.log(`${sWho}(): props = `, props );
	logajohn.debug(`${sWho}(): props = `, props );

	console.log(`${sWho}(): objectives = `, objectives );
	logajohn.debug(`${sWho}(): objectives = `, objectives );


	const tdStyle = {
	  border: '2px solid purple',
	  padding: '2px',
      textAlign: 'left'
	};

	return (
		<div className="objectives-list-component container-fluid" style={{paddingLeft: '1em'}}>
            <div className="filter-params row">
                <div className="col-sm-8">
                    <h3 style={{whiteSpace: 'nowrap'}}>Base Path: {}</h3>
                </div>
                <div className="col-sm-4">
                    <h3 style={{whiteSpace: 'nowrap'}}>Addition Only Code: {}</h3>
                </div>
            </div>

            <div className="filter-params row">
                <div className="col-sm-4">
                    <h3 style={{whiteSpace: 'nowrap'}}>STDERR Rows: {}</h3>
                </div>
            </div>

			<table className="table">
			<tbody key="tbody">
			{
			    //objectives ?
                //objectives.map((value,index)=>{
				//return (<tr key={"tr-"+index}><th scope="row" key={index} style={tdStyle}>{index}</th><td style={tdStyle} key={"val-"+index}>{value}</td></tr>);
			    //}) :
                //""
			}
			</tbody>
			</table>

            { ( debug == true ) ?
				<div><pre style={{fontSize: '125%', textAlign: 'left'}}>objectives = { JSON.stringify(objectives, null, ' ') }</pre></div> :
                ""  
    		}
            { ( debug == true ) ?
				<div><pre style={{fontSize: '125%', textAlign: 'left'}}>props = { JSON.stringify(props, null, ' ') }</pre></div> :
                ""  
    		}
		</div>
	)

}/* const ObjectivesListComponent = ( props ) */

ObjectivesListComponent.propTypes = {
    objectives: PropTypes.object,
    debug: PropTypes.bool
}

export default ObjectivesListComponent

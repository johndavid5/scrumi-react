import { Component } from 'react'
// `withRouter` is an HOC.  When we export the 
// component, we send it to `withRouter` which wraps
// it with a component that passes the router properties:
// match, history, and location (as props)...
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'

import { config } from '../../config'
import { logajohn } from '../../lib/logajohn' 

import { customStringify } from '../../lib/utils' // Safer than JSON.stringify()... 

//import '../../stylesheets/ObjectivesFilterForm.scss'
import '../../../stylesheets/ObjectivesFilterForm.scss'

logajohn.setLevel(config.DEBUG_LEVEL)
logajohn.info(`src/components/ui/ObjectivesFilterForm.js: logajohn.getLevel()=${logajohn.getLevel()}...`)

class ObjectivesFilterForm extends Component {

    VERSION = "1.1.10"

    constructor(props){
        super(props)
        let sWho = `ObjectivesFilterForm(${this.VERSION})::constructor`
        logajohn.info(`${sWho}(): this.props=`, customStringify(this.props, ' '))

        this.state = {
            descriptionFilter: props.descriptionFilter ? props.descriptionFilter : '',
            fullNameFilter: props.fullNameFilter ? props.fullNameFilter : ''
        }

        logajohn.info(`${sWho}(): this.state=`, this.state)

        this.submit = this.submit.bind(this)

        this.filterIt = this.filterIt.bind(this)

        this.handleInputChange = this.handleInputChange.bind(this);

    }

    submit(event) {

        let sWho = "ObjectivesFilterForm::submit";

        if(event){
            event.preventDefault()
        }

        this.filterIt(); 
    }

    filterIt(){

        let sWho = "ObjectivesFilterForm::filterIt";

        logajohn.info(`${sWho}(): this.props = `, customStringify(this.props) )
        logajohn.info(`${sWho}(): this.state = `, customStringify(this.state) )

        const { onObjectivesFilter } = this.props; // Get dispatch method from props...

        const currentFilters = ( this.props.objectives && this.props.objectives.objectives_filters ) ? this.props.objectives.objectives_filters : {}

        // Important: Use spread operator ... to preserve current filter fields...
        let filters = { ...currentFilters, description_filter: this.state.descriptionFilter, full_name_filter: this.state.fullNameFilter };


        logajohn.info(`${sWho}(): Calling onObjectivesFilter(filters=`, customStringify(filters), `...`);
        
        onObjectivesFilter(filters);

    }/* filterIt() */

    componentDidMount(){
        let sWho = "ObjectivesFilterForm::componentDidMount";
        logajohn.info(`${sWho}(): Calling this.filterIt(), Moe...`);
        this.filterIt();
    }

    handleInputChange(event) {

        let sWho = "ObjectivesFilterForm::handleInputChange"

	    const target = event.target;
        //logajohn.info(`${sWho}(): target = `, customStringify(target) )

	    const value = target.type === 'checkbox' ? target.checked : target.value;
        logajohn.info(`${sWho}(): value = `, customStringify(value) )

	    const name = target.name;
        logajohn.info(`${sWho}(): name = `, customStringify(name) )
	
        let stateSetter = {
	      [name]: value
	    };

        logajohn.info(`${sWho}(): stateSetter = `, customStringify(stateSetter) )

	    this.setState( stateSetter )
    }


    render() { 
        
        let sWho = "ObjectivesFilterForm::render"

        logajohn.info(`${sWho}(): this.state = `, this.state )

        logajohn.info(`${sWho}(): this.props = `, this.props )

        return (
        <div className="container-fluid">
        <hr/>
        <form className="objectives-filter-form form-inline" onSubmit={this.submit}>

         <button id="load-objectives" type="submit" className="btn btn-success" aria-label="Load Objectives">
            <span className="glyphicon glyphicon-refresh" aria-hidden="true" style={{fontWeight: 'bold'}}></span>
         </button>

         <label for="description-filter" style={{marginLeft: '4px', marginRight: '2px'}}>Description Filter:</label>
         <input type="text" className="form-control" id="description-filter" name="descriptionFilter" aria-label="Description Filter" value={this.state.descriptionFilter} onChange={this.handleInputChange} />

         <label for="full-name-filter" style={{marginLeft: '4px', marginRight: '2px'}}>Assigned To Filter:</label>
         <input type="text" className="form-control" id="full-name-filter" name="fullNameFilter" aria-label="Assigned To Filter" value={this.state.fullNameFilter} onChange={this.handleInputChange} />
        
        {/*<label className="sr-only" for="description-filter">Description Filter</label>
         <div className="input-group">
           <div className="input-group-prepend">
             <div className="input-group-text">Description Filter</div>
           </div>
           <input type="text" className="form-control" id="description-filter" name="descriptionFilter" value={this.state.descriptionFilter} onChange={this.handleInputChange} >
         </div>*/}


        </form>
        <hr/>
        </div>
        )
    }

}/* class ObjectivesFilterForm extends Component */ 


ObjectivesFilterForm.propTypes = {
    onObjectivesFilter: PropTypes.func
}

ObjectivesFilterForm.defaultProps = {
    onObjectivesFilter: ()=>{}
}

export default withRouter(ObjectivesFilterForm)


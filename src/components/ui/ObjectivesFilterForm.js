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

    // Even though we don't set sortBy stuff in this ObjectivesFilterForm,
    // we do pass along the sort info we get from props...so it seems
    // smoothest to set default sort here in our filterIt() method
    // which automatically carries out the initial fetch...
    // If we wanted to be fancier, we could also "remember"
    // the user's most recent sort by fields via cookies
    // or, better yet the HTML 5 localStorage object... 
    //
    // Use static method to simulate a "const"...
    static DEFAULT_SORT_BY_FIELD(){ return "description"}
    static DEFAULT_SORT_BY_ASC_DESC(){ return "asc"}

    constructor(props){
        super(props)
        let sWho = `ObjectivesFilterForm(${this.VERSION})::constructor`
        logajohn.info(`${sWho}(): this.props=`, customStringify(this.props, ' '))

        // Primarily for testing purposes, but may be useful somehow:
        //    initialize filters in state with their corresponding props...
        this.state = {
            descriptionFilter: props.descriptionFilter ? props.descriptionFilter : '',
            fullNameFilter: props.fullNameFilter ? props.fullNameFilter : '',
            commentsFilter: props.commentsFilter ? props.commentsFilter : '',
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

        // Important: Use spread operator ... to preserve current filter fields such as sort_by_field and sort_by_asc_desc 
        let filters = { ...currentFilters,
            description_filter: this.state.descriptionFilter,
            full_name_filter: this.state.fullNameFilter,
            comments_filter: this.state.commentsFilter
        };

        if( ! filters.sort_by_field ){
            filters.sort_by_field = ObjectivesFilterForm.DEFAULT_SORT_BY_FIELD(); 
        }
        if( ! filters.sort_by_asc_desc ){
            filters.sort_by_asc_desc = ObjectivesFilterForm.DEFAULT_SORT_BY_ASC_DESC();
        }


        logajohn.info(`${sWho}(): Calling onObjectivesFilter(filters=`, customStringify(filters), `...`);
        
        onObjectivesFilter(filters);

    }/* filterIt() */

    componentDidMount(){
        let sWho = "ObjectivesFilterForm::componentDidMount";
        logajohn.info(`${sWho}(): Calling this.filterIt(), Moe...`);
        this.filterIt();
    }

    // Should update state key to equal new value of corresponding component name... 
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

        let bFetching = (this.props.objectives && this.props.objectives.hasOwnProperty("objectives_fetching") && this.props.objectives.objectives_fetching == true )

        let sRefreshClasses = 'fa fa-refresh' + (bFetching ?' fa-spin':'')

        return (
        <div className="container-fluid">

        {/*<hr/>*/}

        <form className="objectives-filter-form form" onSubmit={this.submit}>

            <div className="row">
  	          <div className="form-group col-md-4">
  		         <label for="description-filter">Description Filter</label>
  		         <input type="text" className="form-control form-control-sm" id="description-filter" name="descriptionFilter" aria-label="Description Filter" value={this.state.descriptionFilter} onChange={this.handleInputChange} />
  	          </div>
  
  	          <div className="form-group col-md-4">
      	         <label for="full-name-filter">Assigned To Filter</label>
          	     <input type="text" className="form-control form-control-sm" id="full-name-filter" name="fullNameFilter" aria-label="Assigned To Filter" value={this.state.fullNameFilter} onChange={this.handleInputChange} />
  	          </div>

  	          <div className="form-group col-md-4">
      	         <label for="comments-filter">Comments Filter</label>
      	         <input type="text" className="form-control form-control-sm" id="comments-filter" name="commentsFilter" aria-label="Comments Filter" value={this.state.commentsFilter} onChange={this.handleInputChange} />
  	          </div>
           </div>

          <div className="row">

	          <div className="form-group col-md-4">
	          </div>
	
	          <div className="form-group col-md-4" style={{textAlign: 'center'}}>
	            <button id="load-objectives" type="submit" className="btn btn-primary btn-success btn-sm btn-block"  aria-label="Load Objectives">
	             Load Objectives <i className={sRefreshClasses}></i>
		        </button>
	          </div>
	
	          <div className="form-group col-md-4">
	          </div>

          </div>

        
        </form>

       {/*<hr/>*/}

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


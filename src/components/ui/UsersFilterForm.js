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

import '../../../stylesheets/UsersFilterForm.scss'

logajohn.setLevel(config.DEBUG_LEVEL)
logajohn.info(`src/components/ui/UsersFilterForm.js: logajohn.getLevel()=${logajohn.getLevel()}...`)

class UsersFilterForm extends Component {

    VERSION = "1.1.10"

    // Even though we don't set sortBy stuff in this UsersFilterForm,
    // we do pass along the sort info we get from props...so it seems
    // smoothest to set default sort here in our filterIt() method
    // which automatically carries out the initial fetch...
    // If we wanted to be fancier, we could also "remember"
    // the user's most recent sort by fields via cookies
    // or, better yet the HTML 5 localStorage object... 
    //
    // Use static method to simulate a "const"...
    static DEFAULT_SORT_BY_FIELD(){ return "username"}
    static DEFAULT_SORT_BY_ASC_DESC(){ return "asc"}

    constructor(props){
        super(props)
        let sWho = `UsersFilterForm(${this.VERSION})::constructor`
        logajohn.info(`${sWho}(): this.props=`, customStringify(this.props, ' '))

        // Primarily for testing purposes, but may be useful somehow:
        //    initialize filters in state with their corresponding props...
        this.state = {
            userNameFilter: props.userNameFilter ? props.userNameFilter : '',
            firstNameFilter: props.firstNameFilter ? props.firstNameFilter : '',
            middleNameFilter: props.middleNameFilter ? props.middleNameFilter : '',
            lastNameFilter: props.lastNameFilter ? props.lastNameFilter : ''
        }

        logajohn.info(`${sWho}(): this.state=`, this.state)

        this.submit = this.submit.bind(this)

        this.filterIt = this.filterIt.bind(this)

        this.handleInputChange = this.handleInputChange.bind(this);

    }

    submit(event) {

        let sWho = "UsersFilterForm::submit";

        if(event){
            event.preventDefault()
        }

        this.filterIt(); 
    }

    filterIt(){

        let sWho = "UsersFilterForm::filterIt";

        logajohn.info(`${sWho}(): this.props = `, customStringify(this.props) )
        logajohn.info(`${sWho}(): this.state = `, customStringify(this.state) )

        const { onUsersFilter } = this.props; // Get dispatch method from props...

        const currentFilters = ( this.props.users && this.props.users.users_filters ) ? this.props.users.users_filters : {}

        // Important: Use spread operator ... to preserve current filter fields such as sort_by_field and sort_by_asc_desc 
        let filters = { ...currentFilters,
            user_name_filter: this.state.userNameFilter,
            first_name_filter: this.state.firstNameFilter,
            middle_name_filter: this.state.middleNameFilter,
            last_name_filter: this.state.lastNameFilter
        };

        if( ! filters.sort_by_field ){
            filters.sort_by_field = UsersFilterForm.DEFAULT_SORT_BY_FIELD(); 
        }
        if( ! filters.sort_by_asc_desc ){
            filters.sort_by_asc_desc = UsersFilterForm.DEFAULT_SORT_BY_ASC_DESC();
        }

        logajohn.info(`${sWho}(): Calling onUsersFilter(filters=`, customStringify(filters), `...`);
        
        onUsersFilter(filters);

    }/* filterIt() */

    // Perform initial fetch upon mounting...
    componentDidMount(){
        let sWho = "UsersFilterForm::componentDidMount";
        logajohn.info(`${sWho}(): Calling this.filterIt(), Moe...`);
        this.filterIt();
    }

    // Should update state key to equal new value of corresponding component name... 
    handleInputChange(event) {

        let sWho = "UsersFilterForm::handleInputChange"

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
        
        let sWho = "UsersFilterForm::render"

        logajohn.info(`${sWho}(): this.state = `, this.state )

        logajohn.info(`${sWho}(): this.props = `, this.props )

        let bFetching = (this.props.users && this.props.users.hasOwnProperty("users_fetching") && this.props.users.users_fetching == true )

        let sRefreshClasses = 'fa fa-refresh' + (bFetching ?' fa-spin':'')

        return (
        <div className="container-fluid">

        {/*<hr/>*/}

        <form className="users-filter-form form" onSubmit={this.submit}>

        <div className="row">
	        <div className="col-md-2">
	        </div>

	        <div className="form-group col-md-4">
	          <label for="user-name-filter">User Name Filter:</label>
	          <input type="search" className="form-control form-control-sm" id="user-name-filter" name="userNameFilter" aria-label="User Name Filter" value={this.state.userNameFilter} onChange={this.handleInputChange} />
	        </div>
	
	        <div className="form-group col-md-4">
	          <label for="first-name-filter">First Name Filter:</label>
	          <input type="search" className="form-control form-control-sm" id="first-name-filter" name="firstNameFilter" aria-label="First Name Filter" value={this.state.firstNameFilter} onChange={this.handleInputChange} />
	        </div>

	        <div className="col-md-2">
	        </div>
        </div>

       <div className="row">
	       <div className="col-md-2">
	       </div>

	       <div className="form-group col-md-4">
	         <label for="middle-name-filter">Middle Name Filter:</label>
	         <input type="search" className="form-control form-control-sm" id="middle-name-filter" name="middleNameFilter" aria-label="Middle Name Filter" value={this.state.middleNameFilter} onChange={this.handleInputChange} />
	       </div>
	
	       <div className="form-group col-md-4">
	         <label for="last-name-filter">Last Name Filter:</label>
	         <input type="search" className="form-control form-control-sm" id="last-name-filter" name="lastNameFilter" aria-label="Last Name Filter" value={this.state.lastNameFilter} onChange={this.handleInputChange} />
	       </div>

	       <div className="col-md-2">
	       </div>
        </div>

       <div className="row">
	       <div className="form-group col-md-4">
	       </div>
	
	       <div className="form-group col-md-4" style={{textAlign: 'center'}}>
	           <button id="load-users" type="submit" className="btn btn-primary btn-success btn-sm btn-block" aria-label="Load Users">
	             Load Users <i className={sRefreshClasses}></i>
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

}/* class UsersFilterForm extends Component */ 


UsersFilterForm.propTypes = {
    onUsersFilter: PropTypes.func
}

UsersFilterForm.defaultProps = {
    onUsersFilter: ()=>{}
}

export default withRouter(UsersFilterForm)


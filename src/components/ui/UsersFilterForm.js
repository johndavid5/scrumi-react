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
    static DEFAULT_SORT_BY_FIELD(){ return "first_name"}
    static DEFAULT_SORT_BY_ASC_DESC(){ return "asc"}

    constructor(props){
        super(props)
        let sWho = `UsersFilterForm(${this.VERSION})::constructor`
        logajohn.info(`${sWho}(): this.props=`, customStringify(this.props, ' '))

        // Primarily for testing purposes, but may be useful somehow:
        //    initialize filters in state with their corresponding props...
        this.state = {
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

        return (
        <div className="container-fluid">
        <hr/>
        <form className="users-filter-form form-inline" onSubmit={this.submit}>

         <button id="load-users" type="submit" className="btn btn-success" aria-label="Load Users">
            <span className="glyphicon glyphicon-refresh" aria-hidden="true" style={{fontWeight: 'bold'}}></span>
         </button>

         <label for="first-name-filter" style={{marginLeft: '4px', marginRight: '2px'}}>First Name Filter:</label>
         <input type="text" className="form-control" id="first-name-filter" name="firstNameFilter" aria-label="First Name Filter" value={this.state.firstNameFilter} onChange={this.handleInputChange} />

         <label for="middle-name-filter" style={{marginLeft: '4px', marginRight: '2px'}}>Middle Name Filter:</label>
         <input type="text" className="form-control" id="middle-name-filter" name="middleNameFilter" aria-label="Middle Name Filter" value={this.state.middleNameFilter} onChange={this.handleInputChange} />

         <label for="last-name-filter" style={{marginLeft: '4px', marginRight: '2px'}}>Last Name Filter:</label>
         <input type="text" className="form-control" id="last-name-filter" name="lastNameFilter" aria-label="Last Name Filter" value={this.state.lastNameFilter} onChange={this.handleInputChange} />

        </form>
        <hr/>
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


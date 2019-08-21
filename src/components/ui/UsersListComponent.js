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

import '../../../stylesheets/UsersListComponent.scss'

// const UsersListComponent = ({ linksQa={}, debug=true}) => {
// const UsersListComponent = (props) => {
class UsersListComponent extends Component {

    constructor(props){
        super(props)

        let sWho = `UsersListComponent::constructor`
        logajohn.info(`${sWho}(): this.props=`, customStringify(this.props, ' '))

        this.sortBy = this.sortBy.bind(this)
    } 

    sortBy(event, sWhat, sAscDesc){

        let sWho = "UsersListComponent::sortby";

        logajohn.info(`${sWho}(): event = `, customStringify(event) )
        logajohn.info(`${sWho}(): event.target = `, customStringify(event.target) )
        logajohn.info(`${sWho}(): this.props = `, customStringify(this.props) )

        const { onUsersFilter } = this.props; // Get dispatch method from props...
        const currentFilters = ( this.props.users && this.props.users.users_filters ) ? this.props.users.users_filters : {}

        logajohn.info(`${sWho}(): currentFilters = `, currentFilters )

        // Important: Use spread operator ... to preserve current filters...
        let filters = { ...currentFilters, sort_by_field: sWhat, sort_by_asc_desc: sAscDesc };

        event.preventDefault()

        logajohn.info(`${sWho}(): Calling onUsersFilter(filters=`, customStringify(filters), `...`);
        
        onUsersFilter(filters);

    }/* sortBy() */

    render(){ 

        let sWho = "UsersListComponent::render"

        const users = this.props.users

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

        console.log(`${sWho}(): users = `, users )
        logajohn.debug(`${sWho}(): users = `, users )

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


    let gefilters = []
    // Add filter information here if you wish the filter to be displayed...
    let gefilterees = [ 
        { field: 'user_name_filter', pretty_field: 'Username Filter' }
        ,{ field: 'first_name_filter', pretty_field: 'First Name Filter' }
        ,{ field: 'middle_name_filter', pretty_field: 'Middle Name Filter' }
        ,{ field: 'last_name_filter', pretty_field: 'Last Name Filter' }
    ]

    // Form a string list of the filters for the benefit of the end-user...
    gefilterees.forEach( (val)=>{
        if( users && users.users_filters && users.users_filters[val.field] ){

            let sluggified_field = val.field.replace(/_/g, '-') // e.g., 'description-field'

            let id=`static-${sluggified_field}`; // e.g., 'static-description-field' 

            if( gefilters.length > 0 ){
                gefilters.push(', ')
            }

            gefilters.push(<span style={gefilterStyle}>{val.pretty_field}: &quot;<span id={id}>{users.users_filters[val.field]}</span>&quot;</span>);
        }
    })


    let gears = ""
    if( users && users.hasOwnProperty("users_fetching") && users.users_fetching == true ){
        gears = <img id="spinning-gears" src="/scrumi-react/images/gold-brass-gear-cogs-animated-5.gif" width="100" alt="Fetching...stand by..."
        style={{position: 'absolute',
            left: 0,
            right: 0,
            margin: 'auto'
        }} />
    }

    let sCurrentSortByField = ""
    if( users && users.users_filters && users.users_filters.sort_by_field ){
       sCurrentSortByField =  users.users_filters.sort_by_field
    }

    let sCurrentSortByAscDesc = ""
    if( users && users.users_filters && users.users_filters.sort_by_asc_desc){
       sCurrentSortByAscDesc =  users.users_filters.sort_by_asc_desc
    }

    let users_table = (  (users && users.users_list && users.users_list.length > 0) ?
        (
                  <table className="table" id="users-table" style={{marginTop: '10px', width: '50%', marginLeft: 'auto', marginRight: 'auto'}}>
                        <thead>
                      <tr>
                          <th scope="col" style={thStyle}>{1==1?<SortButton sWhat='username' sWhatPretty='Username' sCurrentSortBy={sCurrentSortByField} sCurrentAscDesc={sCurrentSortByAscDesc} onSortBy={this.sortBy} />:""}</th>
                          <th scope="col" style={thStyle}>{1==1?<SortButton sWhat='first_name' sWhatPretty='First Name' sCurrentSortBy={sCurrentSortByField} sCurrentAscDesc={sCurrentSortByAscDesc} onSortBy={this.sortBy} />:""}</th>
                          <th scope="col" style={thStyle}>{1==1?<SortButton sWhat='middle_name' sWhatPretty='Middle Name' sCurrentSortBy={sCurrentSortByField} sCurrentAscDesc={sCurrentSortByAscDesc} onSortBy={this.sortBy} />:""}</th>
                          <th scope="col" style={thStyle}>{1==1?<SortButton sWhat='last_name' sWhatPretty='Last Name' sCurrentSortBy={sCurrentSortByField} sCurrentAscDesc={sCurrentSortByAscDesc} onSortBy={this.sortBy} />:""}</th>
                      </tr>
                    </thead>
                        <tbody>
                      {
                                users.users_list.map((user, index) => (
                                  <tr key={user.user_id}>
                                      <td style={tdStyle} id={'username-' + user.user_id}>{user.username}</td>
                                      <td style={tdStyle} id={'first_name-' + user.user_id}>{user.first_name}</td>
                                      <td style={tdStyle} id={'middle_name-' + user.user_id}>{user.middle_name}</td>
                                      <td style={tdStyle} id={'last_name-' + user.user_id}>{user.last_name}</td>
                                  </tr>
                                ))
                      }
                    </tbody>
                    </table>
                ) : ""

    )

    return (
      <div className="users-list-component container-fluid" style={{ paddingLeft: '1em' }}>
      <div className="filter-param row">
        <div className="col-sm-4">
          {users && users.users_timestamp ? <p id="users-timestamp" style={timestampStyle}>{users.users_timestamp}</p> : ""}
        </div>
        <div className="col-sm-4">
          <h4 style={{color: 'purple', textAlign: 'center', margin: '0px'}}>Users</h4>
        </div>
      </div>
      <div>
      {gefilters}
      </div>
      {gears}
      {users_table}
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

}/* class UsersListComponent extends Component */

UsersListComponent.propTypes = {
    users: PropTypes.object,
    debug: PropTypes.bool,
}

export default withRouter(UsersListComponent)

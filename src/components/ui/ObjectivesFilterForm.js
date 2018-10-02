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

        logajohn.info(`${sWho}(): this.state=`, this.state)

        this.submit = this.submit.bind(this)
        //this.onChange = this.onChange.bind(this)
    }

    submit(e) {

        let sWho = "ObjectivesFilterForm::submit";

        logajohn.info(`${sWho}(): this.refs = `, customStringify(this.refs) )
        logajohn.info(`${sWho}(): this.props = `, customStringify(this.props) )
        logajohn.info(`${sWho}(): this.state = `, customStringify(this.state) )

        const { _description_filter } = this.refs;

        const { onObjectivesFilter } = this.props; // Get dispatch method from props...

        let filters = { description_filter: _description_filter.value};

        e.preventDefault()

        logajohn.info(`${sWho}(): Calling onObjectivesFilter(filters=`, customStringify(filters), `...`);
        
        onObjectivesFilter(filters);

        // Optional: clear form values...
        //_base_path.value = ''
        //_addition_only_code.value = ''

        //basePath.focus()
    }

    //onChange(e){
    //    let sWho = "ObjectivesFilterForm::onChange"
    //    logajohn.info(`${sWho}(): this.refs = `, this.refs)
    //    logajohn.info(`${sWho}(): e = `, e)
    //    logajohn.info(`${sWho}(): e.target.name = `, e.target.name)
    //    logajohn.info(`${sWho}(): e.target.value = `, e.target.value)
    //    this.refs[e.target.name] = e.target.value
    //}

    render() { 
        
        let sWho = "ObjectivesFilterForm::render"

        logajohn.info(`${sWho}(): this.state = `, this.state )

        logajohn.info(`${sWho}(): this.props = `, this.props )

        return (
        <div className="container-fluid">
        <hr/>
        <form className="objectives-filter-form form-inline" onSubmit={this.submit}>
            <button id="load-objectives">Re-Load Objectives</button>
            description_filter:<input type="text" id="description-filter" ref="_description_filter" />
        </form>
        <hr/>
        </div>
        )
    }

}/* class ObjectivesFilterForm extends Component */ 


ObjectivesFilterForm.propTypes = {
    onObjectivesFilter: PropTypes.func
}

export default withRouter(ObjectivesFilterForm)


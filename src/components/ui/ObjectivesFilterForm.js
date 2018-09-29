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
logajohn.debug(`src/components/ui/ObjectivesFilterForm.js: logajohn.getLevel()=${logajohn.getLevel()}...`)

class ObjectivesFilterForm extends Component {

    VERSION = "1.1.10"

    constructor(props){
        super(props)
        let sWho = `ObjectivesFilterForm(${this.VERSION})::constructor`
        logajohn.debug(`${sWho}(): this.props=`, customStringify(this.props, ' '))

        //this.state = {
        //    show_picker: true,
        //    picker_start_folder_list: [ "G:", "K:" ],
        //    base_path : (this.props.linksQa.basePath ? this.props.linksQa.basePath : this.DEFAULT_BASE_PATH )
        //}

        logajohn.debug(`${sWho}(): this.state=`, this.state)

        this.submit = this.submit.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    submit(e) {

        let sWho = "ObjectivesFilterForm::submit";

        logajohn.debug(`${sWho}(): this.refs = `, customStringify(this.refs) )
        logajohn.debug(`${sWho}(): this.props = `, customStringify(this.props) )
        logajohn.debug(`${sWho}(): this.state = `, customStringify(this.state) )

        const { basePath, additionOnlyCode } = this.refs 
        const { onObjectivesFilter } = this.props; // Get dispatch method from props...

        let filters = {};

        e.preventDefault()

        logajohn.debug(`${sWho}(): Calling onObjectivesFilter(filters=`, filters, `...`);
        
        onObjectivesFilter(filters);

        // Optional: clear form values...
        //_base_path.value = ''
        //_addition_only_code.value = ''

        //basePath.focus()
    }

    onChange(e){
        let sWho = "LinksQaRunForm::onChange"
        logajohn.debug(`${sWho}(): this.refs = `, this.refs)
        logajohn.debug(`${sWho}(): e = `, e)
        logajohn.debug(`${sWho}(): e.target.name = `, e.target.name)
        logajohn.debug(`${sWho}(): e.target.value = `, e.target.value)
        this.refs[e.target.name] = e.target.value
    }

    render() { 
        
        let sWho = "ObjectivesFilterForm::render"

        logajohn.debug(`${sWho}(): this.state = `, this.state )

        logajohn.debug(`${sWho}(): this.props = `, this.props )

        return (
        <div className="container-fluid">
        <hr/>
        <form className="objectives-filter-form form-inline" onSubmit={this.submit}>
            <button id="load-objectives">Re-Load Objectives</button>
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


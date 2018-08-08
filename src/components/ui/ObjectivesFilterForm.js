import { Component } from 'react'
// `withRouter` is an HOC.  When we export the 
// component, we send it to `withRouter` which wraps
// it with a component that passes the router properties:
// match, history, and location (as props)...
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import '../../stylesheets/ObjectivesFilterForm.scss'
import { logajohn } from '../../lib/logajohn' 
import { customStringify } from '../../lib/utils' // Safer than JSON.stringify()... 

class ObjectivesFilterForm extends Component {

    VERSION = "1.1.10"

    constructor(props){
        super(props)
        let sWho = `ObjectivesFilterForm(${this.VERSION})::constructor`
        logajohn.info(`${sWho}(): this.props=`, customStringify(this.props, ' '))

        //this.state = {
        //    show_picker: true,
        //    picker_start_folder_list: [ "G:", "K:" ],
        //    base_path : (this.props.linksQa.basePath ? this.props.linksQa.basePath : this.DEFAULT_BASE_PATH )
        //}

        logajohn.info(`${sWho}(): this.state=`, this.state)

        this.submit = this.submit.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    submit(e) {

        let sWho = "ObjectivesFilterForm::submit";

        console.log(`${sWho}(): this.refs = `, customStringify(this.refs) )
        console.log(`${sWho}(): this.props = `, customStringify(this.props) )
        console.log(`${sWho}(): this.state = `, customStringify(this.state) )

        const { basePath, additionOnlyCode } = this.refs 
        const { onObjectivesFilter } = this.props; // Get dispatch method from props...

        let filters = {};

        e.preventDefault()

        console.log(`${sWho}(): Calling onObjectivesFilter(filters=`, filters, `...`);
        
        onObjectivesFilter(filters);

        // Optional: clear form values...
        //_base_path.value = ''
        //_addition_only_code.value = ''

        //basePath.focus()
    }

    onChange(e){
        let sWho = "LinksQaRunForm::onChange"
        console.log(`${sWho}(): this.refs = `, this.refs)
        console.log(`${sWho}(): e = `, e)
        console.log(`${sWho}(): e.target.name = `, e.target.name)
        console.log(`${sWho}(): e.target.value = `, e.target.value)
        this.refs[e.target.name] = e.target.value
    }

    render() { 
        
        let sWho = "ObjectivesFilterForm::render"

        logajohn.info(`${sWho}(): this.state = `, this.state )

        logajohn.info(`${sWho}(): this.props = `, this.props )

        return (
        <div className="container-fluid">
        <hr/>
        <form className="objectives-filter-form form-inline" onSubmit={this.submit}>
            <button>Re-Load Objectives</button>
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


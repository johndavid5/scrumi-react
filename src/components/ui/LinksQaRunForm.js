import { Component } from 'react'
// `withRouter` is an HOC.  When we export the 
// component, we send it to `withRouter` which wraps
// it with a component that passes the router properties:
// match, history, and location (as props)...
import { withRouter } from 'react-router'
import FilePicker from './FilePicker'
import PropTypes from 'prop-types'
import { logajohn } from '../../lib/logajohn' 
import { customStringify } from '../../lib/utils' 

//import '../../stylesheets/LinksQaRunForm.scss'
import '../../../stylesheets/LinksQaRunForm.scss'

class LinksQaRunForm extends Component {

    VERSION = "1.1.10"

    // G:\p27174\testing\john\production\CSA-AB\20180228A
    DEFAULT_BASE_PATH = "G:\\p27174\\testing\\john\\production\\CSA-AB\\20180228A";
    DEFAULT_ADDITION_ONLY_CODE = "A";

    constructor(props){
        super(props)
        let sWho = `LinksQaRunForm(${this.VERSION})::constructor`
        logajohn.info(`${sWho}(): this.props=`, customStringify(this.props, ' '))

        this.state = {
            show_picker: true,
            picker_start_folder_list: [ "G:", "K:" ],
            base_path : (this.props.linksQa.basePath ? this.props.linksQa.basePath : this.DEFAULT_BASE_PATH )
        }

        logajohn.info(`${sWho}(): this.state=`, this.state)

        this.submit = this.submit.bind(this)
        this.onChange = this.onChange.bind(this)
        this.onChangeBasePath = this.onChangeBasePath.bind(this)
        this.onClickBasePath = this.onClickBasePath.bind(this)
        this.onFilePickerSelect = this.onFilePickerSelect.bind(this)
        this.onFilePickerCancel = this.onFilePickerCancel.bind(this)
    }

    submit(e) {

        let sWho = "LinksQaRunForm::submit";

        console.log(`${sWho}(): this.refs = `, customStringify(this.refs) )
        console.log(`${sWho}(): this.props = `, customStringify(this.props) )
        console.log(`${sWho}(): this.state = `, customStringify(this.state) )

        const { basePath, additionOnlyCode } = this.refs 
        const { onLinksQaRun } = this.props

        let base_path = this.state.base_path

        e.preventDefault()

        //console.log(`${sWho}(): Calling onLinksQaRun(basePath.value='${basePath.value}', additionOnlyCode.value='${additionOnlyCode.value}'...`);
        console.log(`${sWho}(): Calling onLinksQaRun(base_path='${base_path}', additionOnlyCode.value='${additionOnlyCode.value}'...`);
        
        onLinksQaRun(base_path, additionOnlyCode.value )

        // Optional: clear form values...
        //_base_path.value = ''
        //_addition_only_code.value = ''

        basePath.focus()
    }

    onChange(e){
        let sWho = "LinksQaRunForm::onChange"
        console.log(`${sWho}(): this.refs = `, this.refs)
        console.log(`${sWho}(): e = `, e)
        console.log(`${sWho}(): e.target.name = `, e.target.name)
        console.log(`${sWho}(): e.target.value = `, e.target.value)
        this.refs[e.target.name] = e.target.value
    }

    onChangeBasePath(e){
        let sWho = "LinksQaRunForm::onChangeBasePath"
        console.log(`${sWho}(): this.refs = `, customStringify(this.refs) )
        console.log(`${sWho}(): e = `, customStringify(e) )
        console.log(`${sWho}(): e.target.name = `, e.target.name)
        console.log(`${sWho}(): e.target.value = `, e.target.value)
        this.refs[e.target.name] = e.target.value

        // Update base_path
        this.setState( {
            ...this.state,
            base_path: e.target.value
        }, function after(){
            logajohn.info(`${sWho}(): AFTER: this.state = `, customStringify(this.state) )
        })
    }

    onClickBasePath(e){
        let sWho = "LinksQaRunForm::onClickBasePath"

        //logajohn.info(`${sWho}(): this.refs = `, customStringify(this.refs) )
        //logajohn.info(`${sWho}(): e = `, customStringify(e, ' ') )
        logajohn.info(`${sWho}(): e.target.name = `, e.target.name)
        logajohn.info(`${sWho}(): e.target.value = `, e.target.value)

        logajohn.info(`${sWho}(): BEFORE: this.state = `, this.state )

        // Toggle state.show_picker...
        this.setState( {
            ...this.state,
            show_picker: ! this.state.show_picker    
        }, function after(){
            logajohn.info(`${sWho}(): AFTER: this.state = `, this.state )
        })
    }

    onFilePickerSelect(newPath){
        let sWho = "LinksQaRunForm::onFilePickerSelect"
        logajohn.info(`${sWho}(): newPath = "${newPath}"...`)
        //logajohn.info(`${sWho}(): Setting this.refs["basePath"] equal to "${newPath}"...`)
        //this.refs["basePath"] = newPath

        let newState = {
            ...this.state,
            show_picker: false,
            base_path: newPath
        };

        logajohn.info(`${sWho}(): SHEMP: Moe, Callin' this.setState( newState = `, newState, `...)`)

        // Set state.show_picker to false...
        this.setState( newState,
           function after(){
            logajohn.info(`${sWho}(): AFTER: this.state = `, this.state )
           }
        )
    }

    onFilePickerCancel(){
        let sWho = "LinksQaRunForm::onFilePickerCancel"
        logajohn.info(`${sWho}()...`)
        // Set state.show_picker to false...
        this.setState( {
            ...this.state,
            show_picker: false
        }, function after(){
            logajohn.info(`${sWho}(): AFTER: this.state = `, this.state )
        })
    }

    render() { 
        
        let sWho = "LinksQaRunForm::render"

        logajohn.info(`${sWho}(): this.state = `, this.state )

        let show_picker = this.state.show_picker
        logajohn.info(`${sWho}(): show_picker = `, show_picker )

        let base_path = this.state.base_path
        logajohn.info(`${sWho}(): base_path = `, base_path )

        return (
        <div className="container-fluid">
        <form className="links-qa-run-form form-inline" onSubmit={this.submit}>
            {/*<label>LinksQaRunForm {this.VERSION}</label>*/}
            <FilePicker show_picker={show_picker}
            start_folder={base_path}
            onCancel={this.onFilePickerCancel}
            onSelect={this.onFilePickerSelect} />  
            <input name="basePath"
                   value={base_path}
                   onChange={(e)=>this.onChangeBasePath(e)}
                   onClick={(e)=>this.onClickBasePath(e)}
                   type="text"
                   size="60"
                   placeholder="base path..." required
                   autocomplete="off"
            />
            <button type="button" className="btn btn-default" aria-label={show_picker?"Close Folder Picker":"Open Folder Picker"} title={show_picker?"Close Folder Picker":"Open Folder Picker"} onClick={(e)=>this.onClickBasePath(e)}>
                <span className={show_picker?"glyphicon glyphicon-folder-close":"glyphicon glyphicon-folder-open"} aria-hidden="true"></span>
            </button>
            <input name="additionOnlyCode"
                   defaultValue={this.props.linksQa.additionOnlyCode ? this.props.linksQa.additionOnlyCode : this.DEFAULT_ADDITION_ONLY_CODE }
                   ref="additionOnlyCode"
                   type="text"
                   placeholder="addition only code..." required
            />
            <button>RUN LinksQa</button>
        </form>
        </div>
        )
    }

}/* class LinksQaRunForm extends Component */ 


LinksQaRunForm.propTypes = {
    onLinksQaRun: PropTypes.func
}

export default withRouter(LinksQaRunForm)

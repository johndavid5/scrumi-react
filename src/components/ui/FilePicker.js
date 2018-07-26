import { Component } from 'react'
import PropTypes from 'prop-types'
import '../../stylesheets/FilePicker.scss'
import { logajohn } from '../../lib/logajohn' 
import { customStringify } from '../../lib/utils' 
import fetch from 'isomorphic-fetch'
import path from 'path' // From node...used to concatenate file paths...included as path-browserify via the magic of webpack...

class FilePicker extends Component {

    VERSION = "1.1.12"

    DEFAULT_BASE_PATH = "G:\\p27174\\testing\\john\\production\\CSA-AB\\20180228A";

    constructor(props){
        super(props)
        let sWho = `FilePicker(${this.VERSION})::constructor`

        logajohn.info(`${sWho}(): this.props=`, this.props)

        this.state = {
            //show_picker: this.props.show_picker,
            //rows: [ "G:", "K:" ],
            location: this.props.start_folder,
            rows: [this.props.start_folder],
            curr_path: ""
        }

        logajohn.info(`${sWho}(): this.state =`, this.state)

        //this.submit = this.submit.bind(this)
        this.onChange = this.onChange.bind(this)
        this.onClickTableRow = this.onClickTableRow.bind(this)
        this.onDoubleClickTableRow = this.onDoubleClickTableRow.bind(this)
        this.onClickSelect = this.onClickSelect.bind(this)
        this.onClickCancel = this.onClickCancel.bind(this)

        this.getDerivedStateFromProps = this.getDerivedStateFromProps.bind(this)
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this)
        this.componentDidMount = this.componentDidMount.bind(this)
    }


    onChange(e){
        let sWho = "FilePicker::onChange"
        //logajohn.info(`${sWho}(): this.refs = `, this.refs)
        //logajohn.info(`${sWho}(): e = `, e)
        logajohn.info(`${sWho}(): e.target.name = `, e.target.name)
        logajohn.info(`${sWho}(): e.target.value = `, e.target.value)
        
        let new_path = e.target.value
        
        this.setState( {
            ...this.state,
            curr_path: new_path, 
        })
    }

    onClickTableRow(e){
        let sWho = "FilePicker::onClickTableRow"
        //logajohn.info(`${sWho}(): this.refs = `, this.refs)
        //logajohn.info(`${sWho}(): e = `, e)
        //logajohn.info(`${sWho}(): e = `, customStringify(e, ' ') )
        //logajohn.info(`${sWho}(): row = `, row )
        //logajohn.info(`${sWho}(): e.target.name = `, e.target.name)
        //logajohn.info(`${sWho}(): e.target.value = `, e.target.value)
        //logajohn.info(`${sWho}(): e.target = `, customStringify(e.target, ' ') )
        const new_path = e.currentTarget.getAttribute('data-item');
        logajohn.info(`${sWho}(): new_path  = `, new_path )

        this.setState( {
            ...this.state,
            curr_path: new_path, 
            //show_picker: false,
        })

    }

    onDoubleClickTableRow(e){
        let sWho = "FilePicker::onDoubleClickTableRow"
        //logajohn.info(`${sWho}(): this.refs = `, this.refs)
        //logajohn.info(`${sWho}(): e = `, e)
        //logajohn.info(`${sWho}(): e = `, customStringify(e, ' ') )
        //logajohn.info(`${sWho}(): row = `, row )
        //logajohn.info(`${sWho}(): e.target.name = `, e.target.name)
        //logajohn.info(`${sWho}(): e.target.value = `, e.target.value)
        //logajohn.info(`${sWho}(): e.target = `, customStringify(e.target, ' ') )

        logajohn.info(`${sWho}(): SHEMP: Moe, this.state = `, customStringify(this.state, ' ' ));
        let s_clicked_on = e.currentTarget.getAttribute('data-item');
        logajohn.info(`${sWho}(): s_clicked_on = `, s_clicked_on )

        //let s_location = this.state.location + s_clicked_on;
        let s_location = path.join(this.state.location, s_clicked_on);
        logajohn.info(`${sWho}(): s_location = `, s_location )


        // e.g., http://localhost:3000/file_api/dir?path=C:\inetpub\wwwroot\treebuchet\testbed\PRODUCTION 
        let url = `http://localhost:3000/file_api/dir?path=${s_location}`
        console.log(`${sWho}(): SHEMP: Moe, I'm a fetchin' url = ${url} via dha isomorphic fetch...`)
        console.log(`${sWho}(): JOE KOVACS: And usin' Promises, Doc-tor Cy-a-nide...!`)

        fetch(url)
        .then((response)=>{
            if (response.status >= 400) {
                console.log(`${sWho}(): Bad response from server:`, JSON.stringify(response, null, ' '));
            }
            return response.json();
        })
        .then((dir_response)=>{
            console.log(`${sWho}(): dir_response=`, JSON.stringify(dir_response, null, ' '));

            let rows = dir_response.files_statted.reduce ( (accumulator_array, item, index )=>{
                if( item.is_directory ){
                    accumulator_array.push( item.name );
                }
                return accumulator_array;
            }, []);

            // And don't forget to put a ".." in there so
            // we can navigate "out"...
            rows.unshift("..");

            console.log(`${sWho}(): rows =`, rows );

            let newState = {
                ...this.state,
                location: s_location, 
                rows: rows
            };

            console.log(`${sWho}(): Callin' this.setState() with newState = `, JSON.stringify(newState, null, ' ' ));
            this.setState(newState);
        })

    }/* onDoubleClickTableRow(e) */


    componentDidMount(){
        let sWho = "FilePicker::componentDidMount";

        console.log(`${sWho}(): SHEMP: Moe, this.state = `, customStringify(this.state, ' ' ));

        let s_location = this.props.start_folder;
        // e.g., http://localhost:3000/file_api/dir?path=C:\inetpub\wwwroot\treebuchet\testbed\PRODUCTION 
        let url = `http://localhost:3000/file_api/dir?path=${s_location}`
        console.log(`${sWho}(): SHEMP: Moe, I'm a fetchin' url = ${url} via dha isomorphic fetch...`)

        fetch(url)
        .then((response)=>{
            if (response.status >= 400) {
                console.log(`${sWho}(): Bad response from server:`, JSON.stringify(response, null, ' '));
            }
            return response.json();
        })
        .then((dir_response)=>{
            console.log(`${sWho}(): dir_response=`, JSON.stringify(dir_response, null, ' '));

            let rows = dir_response.files_statted.reduce ( (accumulator_array, item, index )=>{
                if( item.is_directory ){
                    accumulator_array.push( item.name );
                }
                return accumulator_array;
            }, []);

            // And don't forget to put a ".." in there so
            // we can navigate "out"...
            rows.unshift("..");

            console.log(`${sWho}(): rows =`, rows );

            let newState = {
                ...this.state,
                location: s_location, 
                rows: rows
            };

            console.log(`${sWho}(): Callin' this.setState() with newState = `, JSON.stringify(newState, null, ' ' ));
            this.setState(newState);
        })
        //.catch( (error)=> { 
        //    console.log(`${sWho}(): Caught error: `, error );
        //})
    }/* componentDidMount() */

    onClickSelect(e){
        let sWho = "FilePicker::onClickSelect"
        //logajohn.info(`${sWho}(): this.refs = `, this.refs)
        //logajohn.info(`${sWho}(): e = `, customStringify(e, ' ') )
        //logajohn.info(`${sWho}(): e.target.name = `, e.target.name)
        //logajohn.info(`${sWho}(): e.target.value = `, e.target.value)
        logajohn.info(`${sWho}(): this.state = `, this.state )
        logajohn.info(`${sWho}(): this.state.curr_path = `, this.state.curr_path )
        logajohn.info(`${sWho}(): this.state.location = `, this.state.location )

        logajohn.info(`${sWho}(): Calling this.props.onSelect(this.state.location)...`)
        this.props.onSelect(this.state.location)
    }

    onClickCancel(e){
        let sWho = "FilePicker::onClickCancel"
        //logajohn.info(`${sWho}(): this.refs = `, this.refs)
        //logajohn.info(`${sWho}(): e = `, customStringify(e, ' ') )
        logajohn.info(`${sWho}(): e.target.name = `, e.target.name)
        logajohn.info(`${sWho}(): e.target.value = `, e.target.value)

        this.setState( {
            ...this.state,
            //show_picker: false
        })

        this.props.onCancel()
    }

    /* lifecycle method `componentWillRecieveProps()` is deprecated in React 16...will be eliminated in React 17...use this instead... */
    getDerivedStateFromProps(props, state){

        const sWho = "FilePicker::getDerivedStateFromProps"

        logajohn.info(`${sWho}(): props = `, customStringify(props, ' ') )
        logajohn.info(`${sWho}(): state = `, customStringify(state, ' ') )

        let newState = {
            ...state,
            //show_picker: props.show_picker 
        }

        logajohn.info(`${sWho}(): SHEMP: Moe, retoyning, newState = `, customStringify(newState, ' ') )

        return newState;

    }

    componentWillReceiveProps(nextProps){

        const sWho = "FilePicker::componentWillRecieveProps"

        logajohn.info(`${sWho}(): nextProps = `, customStringify(nextProps, ' ') )
        logajohn.info(`${sWho}(): this.state = `, customStringify(this.state, ' ') )

        let newState = {
            ...this.state,
            location: nextProps.start_folder 
        }

        logajohn.info(`${sWho}(): SHEMP: Moe, callin' this.setState(newState) = `, customStringify(newState, ' ') )

        this.setState(newState, function after(){
            logajohn.info(`${sWho}(): SHEMP: Moe, after callin' this.setState(newState), this.state = `, customStringify(this.state, ' ') )

	        console.log(`${sWho}(): SHEMP: Moe, this.state = `, customStringify(this.state, ' ' ));
	
	        let s_location = this.state.location;
	        // e.g., http://localhost:3000/file_api/dir?path=C:\inetpub\wwwroot\treebuchet\testbed\PRODUCTION 
	        let url = `http://localhost:3000/file_api/dir?path=${s_location}`
	        console.log(`${sWho}(): SHEMP: Moe, I'm a fetchin' url = ${url} via dha isomorphic fetch...`)
	
	        fetch(url)
	        .then((response)=>{
	            if (response.status >= 400) {
	                console.log(`${sWho}(): Bad response from server:`, JSON.stringify(response, null, ' '));
	            }
	            return response.json();
	        })
	        .then((dir_response)=>{
	            console.log(`${sWho}(): dir_response=`, JSON.stringify(dir_response, null, ' '));
	
	            let rows = dir_response.files_statted.reduce ( (accumulator_array, item, index )=>{
	                if( item.is_directory ){
	                    accumulator_array.push( item.name );
	                }
	                return accumulator_array;
	            }, []);
	
	            console.log(`${sWho}(): rows =`, rows );

                // And don't forget to put a ".." in there so
                // we can navigate "out"...
                rows.unshift("..");
	
	            let newState = {
	                ...this.state,
	                location: s_location, 
	                rows: rows
	            };
	
	            console.log(`${sWho}(): Callin' this.setState() with newState = `, JSON.stringify(newState, null, ' ' ));
	            this.setState(newState);
	        })
        });

        return newState;

    }

    render() { 

        let sWho = "FilePicker::render"

        logajohn.info(`${sWho}(): this.props = `, this.props)
        logajohn.info(`${sWho}(): this.state = `, this.state)
        //logajohn.info(`${sWho}(): this.state.show_picker = `, this.state.show_picker)
        //logajohn.info(`${sWho}(): this.state["show_picker"] = `, this.state["show_picker"])

        let rows = this.state.rows

        let location = this.state.location

        let curr_path = this.state.curr_path

        let show_picker = this.props.show_picker
        logajohn.info(`${sWho}(): show_picker = `, show_picker)

        return (
        <div style={{display: 'inline', position: 'relative'}} className="file-picker">
         {
           show_picker
           ? 
           (
            <div name="picker" id="picker" style={{border: '2px solid green', borderRadius: '5px', padding: '10px', position: 'absolute', left: '0.5em', top: '3em', zIndex: 10, opacity: 1, backgroundColor: 'white', width: '20em' }}>
                <div>VERSION: {this.VERSION}</div>
                <div>Location: {location}</div>
                <div style={{overflowY: 'scroll', height: '20em'}}>
                <table style={{border: '1px solid purple', borderCollapse: true, width: '18em'}}>
                {
                  rows.map( (row, index) =>
                   {
                    let le_class=(row==this.state.curr_path?"selectissimo":"")

                    return (
                      <tr key={index} data-item={row} className={le_class} onClick={(e)=>this.onClickTableRow(e)} onDoubleClick={(e)=>this.onDoubleClickTableRow(e)}><td style={{border: '1px solid purple'}}>{row}</td></tr>
                    )
                   }
                 )
                }
                </table>
                </div>
              <div>
                  <button onClick={(e)=>this.onClickSelect(e)}>Select</button>
                  <button onClick={(e)=>this.onClickCancel(e)}>Cancel</button>
              </div>
            </div>
             )
             : ""
            }
        </div>
        )
    }

}/* class FilePicker extends Component */ 


FilePicker.propTypes = {
    onCancel: PropTypes.func,
    onSelect: PropTypes.func
}

export default FilePicker

jest.mock('react-router')
// Otherwise you get Error...
// `Invariant Violation: You should not use <Route> or withRouter() outside a <Router>`

import ObjectivesListComponent from '../../../src/components/ui/ObjectivesListComponent'

import { faux_objectives } from '../../../data/fauxObjectives'

const { shallow, mount } = Enzyme

import { config } from '../../../src/config'
import { logajohn } from '../../../src/lib/logajohn'
import { customStringify } from '../../../src/lib/utils'

logajohn.setLevel(config.DEBUG_LEVEL)
logajohn.debug(`__tests__/actions.test.js: logajohn.getLevel()=${logajohn.getLevel()}...`)

let sWhere = "__tests__/components/ui/ObjectivesListComponent.test.js"

describe("<ObjectivesListComponent /> UI Component", () => {

    it("renders timestamp if objectives.objectives_timestamp is supplied...", () => {
        let sWho = `${sWhere}: <ObjectivesListComponent /> UI Component -- renders timestamp ` + 
           ` if objectives.objectives_timestamp is supplied...`
        let faux_timestamp = "MOE: No, I just left!"
        let wrapper = mount(<ObjectivesListComponent objectives={{objectives_timestamp: faux_timestamp}} />)
        let findee = wrapper.find('#objectives-timestamp')
        logajohn.debug(`${sWho} -- SHEMP: Moe, findee.html() = `, findee.html() )
        logajohn.debug(`${sWho} -- SHEMP: Moe, findee.text() = `, findee.text() )
        expect(findee.length).toBe(1)
        expect(findee.text()).toBe(faux_timestamp)
    })

    it("does not render timestamp if objectives.objectives_timestamp is not supplied...", () => {
        let wrapper = mount(<ObjectivesListComponent objectives={{}} />)
        expect(wrapper.find('#objectives-timestamp').length).toBe(0)
    })

    it("renders table of objectives if objectives.objectives_list is populated...", () => {
        let sWho = `${sWhere}: <ObjectivesListComponent /> UI Component -- renders table of objectives`
        let wrapper = mount(<ObjectivesListComponent objectives={{objectives_list: faux_objectives}} />)
        logajohn.debug(`${sWho} -- SHEMP: Moe, faux_objectives = `, faux_objectives )
        logajohn.debug(`${sWho} -- SHEMP: Moe, faux_objectives.length = `, faux_objectives.length )

        logajohn.debug(`${sWho} -- SHEMP: Moe, wrapper.html() = `, wrapper.html() )
        logajohn.debug(`${sWho} -- SHEMP: Moe, wrapper.find('#objectives-table').html() = `, wrapper.find('#objectives-table').html() )
        expect(wrapper.find('#objectives-table').length).toBe(1)
        let num_rows = wrapper.find('#objectives-table').find('tr').length
        logajohn.debug(`${sWho} -- SHEMP: Moe, wrapper.find('#objectives-table').find('tr').length = `, num_rows )

        // Forgive me, Reverend Mother, for indulging in some imperative programming in the form of a for() loop...I have sinned...
        // Stick with declarative programming, my child...go and sin no more...
        //for(let i=0; i<num_rows; i++ ){
            // Enzyme Error: can only call .html() on single node...
            //logajohn.debug(`${sWho} -- SHEMP: Moe, wrapper.find('#objectives-table').find('tr').get(i).html() = `, wrapper.find('#objectives-table').find('tr').get(i).html() )
            // TypeError: Converting circular structure to JSON
            //    at JSON.stringify (<anonymous>)
            //logajohn.debug(`${sWho} -- SHEMP: Moe, wrapper.find('#objectives-table').find('tr').get(${i}) = ${customStringify(wrapper.find('#objectives-table').find('tr').get(i), ' ')}...` )
        //}

        // faux_objectives.length+1 because of extra <tr> with <th> headings...
        expect(wrapper.find('#objectives-table').find('tr').length).toBe(faux_objectives.length+1)
    })

    it("does not renders table of objectives if objectives.objectives_list is nonexistent...", () => {
        let wrapper = mount(<ObjectivesListComponent objectives={{}} />)
        expect(wrapper.find('#objectives-table').length).toBe(0)
    })

    it("does not renders table of objectives if objectives.objectives_list is of length zero...", () => {
        let wrapper = mount(<ObjectivesListComponent objectives={{objectives_list: []}} />)
        expect(wrapper.find('#objectives-table').length).toBe(0)
    })

    it("shows spinning gears if objectives.objectives_fetching is true... ", () => {
        let wrapper = mount(<ObjectivesListComponent objectives={{objectives_fetching: true}} />)
        expect(wrapper.find('#spinning-gears').length).toBe(1)
    })

    it("does not show spinning gears if objectives.objectives_fetching is nonexistent... ", () => {
        let wrapper = mount(<ObjectivesListComponent objectives={{}} />)
        expect(wrapper.find('#spinning-gears').length).toBe(0)
    })

    it("does not show spinning gears if objectives.objectives_fetching is false... ", () => {
        let wrapper = mount(<ObjectivesListComponent objectives={{objectives_fetching: false}} />)
        expect(wrapper.find('#spinning-gears').length).toBe(0)
    })

    // it("renders submit button", () =>
    //    expect(mount(<ObjectivesListComponent />).find('#load-objectives').length)
    //        .toBe(1))

    //it("click does not cause error", () => {
    //    mount(<ObjectivesListComponent />).find('#load-objectives').simulate('click')
    //})

    //it("submit causes error if onObjectivesFilter prop not supplied", () => {
    //    let errCaught = null
    //    try {
    //        mount(<ObjectivesListComponent />).find('#load-objectives').simulate('submit')
    //    }
    //    catch(err){
    //        errCaught = err
    //    }
    //    expect(errCaught).not.toBeNull()
    //})

    //it("submit invokes onObjectivesFilter", () => {
    //    const _onObjectivesFilter = jest.fn()
    //    mount(<ObjectivesListComponent onObjectivesFilter={_onObjectivesFilter} />)
    //        .find('#load-objectives')
    //        .simulate('submit')
    //    expect(_onObjectivesFilter).toBeCalled()
    //})

})

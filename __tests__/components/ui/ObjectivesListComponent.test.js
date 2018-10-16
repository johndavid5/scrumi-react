jest.mock('react-router')
// Otherwise you get Error...
// `Invariant Violation: You should not use <Route> or withRouter() outside a <Router>`

import ObjectivesListComponent from '../../../src/components/ui/ObjectivesListComponent'

import { faux_objectives } from '../../../data/fauxObjectives'

const { shallow, mount } = Enzyme

import { config } from '../../../src/config'
import { logajohn } from '../../../src/lib/logajohn'
import { customStringify } from '../../../src/lib/utils'

let sWhere = "__tests__/components/ui/ObjectivesListComponent.test.js"

logajohn.setLevel(config.DEBUG_LEVEL)
logajohn.debug(`${sWhere}: logajohn.getLevel()=${logajohn.getLevel()}...`)


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

    it("renders filters statically...", () => {
        let sWho = `${sWhere}: <ObjectivesListComponent /> UI Component -- renders filters`

        let faux_description_filter = "glass"
        let faux_full_name_filter = "Charlie"
        let faux_objectives_filters = { "description_filter": faux_description_filter, "full_name_filter": faux_full_name_filter }

        let wrapper = mount(<ObjectivesListComponent objectives={{objectives_filters: faux_objectives_filters}} />)

        let description_findee = wrapper.find('#static-description-filter')
        logajohn.debug(`${sWho} -- SHEMP: Moe, description_findee.text() = `, description_findee.text() )
        expect(description_findee.length).toBe(1)
        expect(description_findee.text()).toBe(faux_description_filter)

        let full_name_findee = wrapper.find('#static-full-name-filter')
        logajohn.debug(`${sWho} -- SHEMP: Moe, full_name_findee.text() = `, full_name_findee.text() )
        expect(full_name_findee.length).toBe(1)
        expect(full_name_findee.text()).toBe(faux_full_name_filter)
    })

    it("does not render static filters if not specified...", () => {
        let sWho = `${sWhere}: <ObjectivesListComponent /> UI Component -- renders filters`

        let faux_description_filter = ""
        let faux_full_name_filter = ""
        let faux_objectives_filters = { "description_filter": faux_description_filter, "full_name_filter": faux_full_name_filter }

        let wrapper = mount(<ObjectivesListComponent objectives={{objectives_filters: faux_objectives_filters}} />)

        expect(wrapper.find('#static-description-filter').length).toBe(0);
        expect(wrapper.find('#static-full-name--filter').length).toBe(0);
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

        // faux_objectives.length+1 because of extra <tr> with <th> headings...
        expect(wrapper.find('#objectives-table').find('tr').length).toBe(faux_objectives.length+1)

        // Forgive me, Reverend Mother, for indulging in some imperative programming in the form of a for() loop...I have sinned...
        // Stick with declarative programming, my child...go and sin no more...
        for(let i=0; i<num_rows; i++ ){
            // Enzyme Error: can only call .html() on single node...
            //logajohn.debug(`${sWho} -- SHEMP: Moe, wrapper.find('#objectives-table').find('tr').get(i).html() = `, wrapper.find('#objectives-table').find('tr').get(i).html() )
            // TypeError: Converting circular structure to JSON
            //    at JSON.stringify (<anonymous>)
            // Huge data structure...
            //logajohn.debug(`${sWho} -- SHEMP: Moe, wrapper.find('#objectives-table').find('tr').get(${i}) = ${customStringify(wrapper.find('#objectives-table').find('tr').get(i), ' ')}...` )
        }

        faux_objectives.forEach((faux_objective)=>{
            ['description', 'full_name'].forEach((field)=>{
                let le_id = '#'+ field + '-' + faux_objective.objective_id
                logajohn.debug(`${sWho} -- SHEMP: Moe, look for id = '${le_id}' in there, Moe...`)
                ////logajohn.debug(`${sWho} -- SHEMP: Moe, wrapper.find(${le_id}) = `, customStringify(wrapper.find(le_id)) )
                //logajohn.debug(`${sWho} -- SHEMP: Moe, wrapper.find(${le_id}).length = `, wrapper.find(le_id).length )
                //logajohn.debug(`${sWho} -- SHEMP: Moe, wrapper.find(${le_id}).text() = '${wrapper.find(le_id).text()}'...`)
                expect(wrapper.find(le_id).length).toBe(1)
                expect(wrapper.find(le_id).text()).toEqual(faux_objective[field])
            })
        })

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

    // NOTE: Haven't yet mocked the SortButton, so we're using the real one here...
    it("click on heading invokes onObjectivesFilter() - description, preserving current filters", () => {

        let sWho = sWhere + ": click on heading invokes onObjectivesFilter - description "

        const _onObjectivesFilter = jest.fn()

        let faux_description_filter = "glass"
        let faux_objectives_filters = { "description_filter": faux_description_filter }

        let wrapper = mount(<ObjectivesListComponent onObjectivesFilter={_onObjectivesFilter} objectives={{objectives_filters: faux_objectives_filters, objectives_list: faux_objectives}} />)

        //mount(<ObjectivesListComponent onObjectivesFilter={_onObjectivesFilter} objectives={{objectives_list: faux_objectives}} />)
            wrapper
            .find('#sort-by-description')
            .simulate('click')

        logajohn.debug(`${sWho} -- SHEMP: Moe, _onObjectivesFilter.mock.calls=`, _onObjectivesFilter.mock.calls )

        expect(_onObjectivesFilter).toBeCalled()

        expect(_onObjectivesFilter.mock.calls[0][0].sort_by_field).toEqual('description') // sort by description asc
        expect(_onObjectivesFilter.mock.calls[0][0].sort_by_asc_desc).toEqual('asc') // sort by description asc
        expect(_onObjectivesFilter.mock.calls[0][0].description_filter).toEqual(faux_description_filter) // did not clobber description_filter...
    })

})

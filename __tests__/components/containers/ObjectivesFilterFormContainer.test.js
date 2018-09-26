//"use strict";

import { Provider } from 'react-redux'
import { compose } from 'redux'
import { ObjectivesFilterFormContainer } from '../../../src/components/containers'

const { shallow, mount } = Enzyme

import { config } from '../../../src/config'
import { logajohn } from '../../../src/lib/logajohn'

logajohn.setLevel(config.DEBUG_LEVEL)
logajohn.debug(`__tests__/components/containers/ObjectivesFilterFormContainer.test.js: logajohn.getLevel()=${logajohn.getLevel()}...`)

jest.mock('../../../src/components/ui/ObjectivesFilterForm')

import fetch from 'isomorphic-fetch'
jest.mock('isomorphic-fetch') // Need to mock isomorphic-fetch for objectivesFilter() action creator...

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

import { faux_objectives } from '../../../data/fauxObjectives'

let here = '__tests__/components/containers/ObjectivesFilterFormContainer.test.js'

describe("<ObjectivesFilterFormContainer /> Container ", () => {

    let wrapper

    const _store = mockStore({ objectives: {} })

    beforeAll(() => wrapper = mount(
        <Provider store={_store}>
            <ObjectivesFilterFormContainer />
        </Provider>
    ))

    afterEach(() => jest.resetAllMocks())

    //it("renders three colors", () => {
    //    expect(wrapper
    //        .find('ColorListMock')
    //        .props()
    //        .colors
    //        .length
    //    ).toBe(3)
    //})

    //it("sorts the colors by state", () => {
    //    expect(wrapper
    //        .find('ColorListMock')
    //        .props()
    //        .colors[0]
    //        .title
    //    ).toBe("tomato")
    //})

    it("dispatches an OBJECTIVES_GET action", () => {

        let sWho = "__tests__/components/containers/ObjectivesFilterformContainer.test.js: dispatches an OBJECTIVES_GET action"

        fetch.resetMocks()

        let faux_action = {"type":"OBJECTIVES_GET",
                "filters":{},
                "timestamp":"Thu Sep 20 2018 19:25:00 GMT-0400 (Eastern Daylight Time)",
                "objectives": faux_objectives,
                "error":""}

        // Set the response that we desire when isomorphic fetch is called within the actions.js file...
        // DR. KOTZE: Life was so much simpler in my Warsaw laboratory...
        // [...when Bankcello set up tests for completely impractical non-thunk client-side actions...]
        fetch.mockResponse(JSON.stringify(faux_action))
            
        logajohn.debug(sWho + '(): Callin\' onObjectivesFilter()...')

        wrapper.find('ObjectivesFilterFormMock')
            .props()
            .onObjectivesFilter({})

        //logajohn.debug(sWho + '(): SHEMP: Moe, after onObjectivesFilter(), _store.dispatch.mock.calls = ', _store.dispatch.mock.calls )
        //logajohn.debug(sWho + '(): SHEMP: Moe, after onObjectivesFilter(), _store.dispatch.mock.calls[0][0] = ', _store.dispatch.mock.calls[0][0] )
        //expect(_store.dispatch.mock.calls[0][0])
        //    .toEqual( faux_action )

        logajohn.debug(sWho + '(): SHEMP: Moe, after onObjectivesFilter(), _store.getActions() = ', _store.getActions() )

        expect(1).toEqual(0) 
    })

})

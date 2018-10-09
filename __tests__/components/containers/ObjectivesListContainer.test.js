//"use strict";

import { Provider } from 'react-redux'
import { compose } from 'redux'
import { ObjectivesListContainer } from '../../../src/components/containers'

const { shallow, mount } = Enzyme

import { config } from '../../../src/config'
import { logajohn } from '../../../src/lib/logajohn'

let sWhere = '__tests__/components/containers/ObjectivesListContainer.test.js'

logajohn.setLevel(config.DEBUG_LEVEL)
logajohn.debug(`${sWhere}: logajohn.getLevel()=${logajohn.getLevel()}...`)

jest.mock('../../../src/components/ui/ObjectivesListComponent')

import fetch from 'isomorphic-fetch'
jest.mock('isomorphic-fetch') // Need to mock isomorphic-fetch for objectivesFilter() action creator...

// Mock the redux-store with its thunks...
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

import { faux_objectives } from '../../../data/fauxObjectives'


describe("<ObjectivesListContainer /> Container ", () => {

    let wrapper

    const _faux_store = mockStore({ objectives: {objectives_list: faux_objectives} })

    beforeAll(() => wrapper = mount(
        <Provider store={_faux_store}>
            <ObjectivesListContainer />
        </Provider>
    ))

    afterEach(() => jest.resetAllMocks())

    // We're mostly testing that the connector is connecting ObjectivesListContainer to 
    // ObjectivesListComponent via mapStateToProps()...
    it("renders objectives according to props.objectives.objectives_list", () => {
        expect(wrapper
            .find('ObjectivesListComponentMock')
            .props()
            .objectives
            .objectives_list
            .length
        ).toBe(faux_objectives.length)
    })

    // What we're really confirming is that in containers.js, mapDispatchToProps() connects onObjectivesFilter(filters) to 
    // dispatch(objectivesFilter(filters)...capice...?
    it("dispatches an OBJECTIVES_GET action", (done) => {

        let sWho = `${sWhere}: dispatches an OBJECTIVES_GET action`

        fetch.resetMocks()

        jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000
        logajohn.debug(sWho + '(): SHEMP: Moe, jasmine.DEFAULT_TIMEOUT_INTERVAL = ', jasmine.DEFAULT_TIMEOUT_INTERVAL )

        logajohn.debug(sWho + '(): SHEMP: Moe, before onObjectivesFilter(), _faux_store.getActions() = ', _faux_store.getActions() )
        logajohn.debug(sWho + '(): SHEMP: Moe, before onObjectivesFilter(), _faux_store.getState() = ', _faux_store.getState() )
        //logajohn.debug(sWho + '(): SHEMP: Moe, before onObjectivesFilter(), _faux_store.dispatch.mock.calls = ', _faux_store.dispatch.mock.calls )

        let faux_action = {"type":"OBJECTIVES_GET",
                "filters":{},
                "timestamp":"Thu Sep 20 2018 19:25:00 GMT-0400 (Eastern Daylight Time)",
                "objectives": faux_objectives,
                "error":""}

        // Set the response that we desire when isomorphic fetch is called within the actions.js file...
        // DR. KOTZE: Life was so much simpler in my Warsaw laboratory...
        // [...when Bankcello set up tests for completely impractical non-thunk client-side actions...]
        fetch.mockResponse(JSON.stringify(faux_action))
            
        // We gots ta wait until all dha actions are sent to dha _faux_store, Moe...
        const leStoreSubscriber = ()=>{
            let sWho = "storeSubscriber"
            logajohn.debug(sWho + '(): SHEMP: Looks like a store change, Moe..._faux_store.getState()=',  _faux_store.getState() )
            logajohn.debug(sWho + '(): SHEMP: Looks like a store change, Moe..._faux_store.getActions()=',  _faux_store.getActions() )
            if( _faux_store.getActions().length == 3 ){
                expect(_faux_store.getActions()[0]).toEqual({"type":"OBJECTIVES_FETCHING","objectives_is_fetching":true})
                expect(_faux_store.getActions()[1]).toEqual(faux_action)
                expect(_faux_store.getActions()[2]).toEqual({"type":"OBJECTIVES_FETCHING","objectives_is_fetching":false})
                done();
            }
        }
            
        _faux_store.subscribe( leStoreSubscriber )

        logajohn.debug(sWho + '(): Callin\' onObjectivesFilter()...')

        wrapper.find('ObjectivesListComponentMock')
            .props()
            .onObjectivesFilter({})

        //logajohn.debug(sWho + '(): SHEMP: Moe, after onObjectivesFilter(), _faux_store.dispatch.mock.calls = ', _faux_store.dispatch.mock.calls )
        //logajohn.debug(sWho + '(): SHEMP: Moe, after onObjectivesFilter(), _faux_store.dispatch.mock.calls[0][0] = ', _faux_store.dispatch.mock.calls[0][0] )
        //expect(_faux_store.dispatch.mock.calls[0][0])
        //    .toEqual( faux_action )

        logajohn.debug(sWho + '(): SHEMP: Moe, after onObjectivesFilter(), _faux_store.getActions() = ', _faux_store.getActions() )
        logajohn.debug(sWho + '(): SHEMP: Moe, after onObjectivesFilter(), _faux_store.getState() = ', _faux_store.getState() )
    })


})

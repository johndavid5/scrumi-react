"use strict";

import { Provider } from 'react-redux'
import { compose } from 'redux'
import { ObjectivesFilterFormContainer } from '../../../src/components/containers'

const { shallow, mount } = Enzyme

jest.mock('../../../src/components/ui/ObjectivesFilterForm')

import fetch from 'isomorphic-fetch'
jest.mock('isomorphic-fetch') // Need to mock isomorphic-fetch for objectivesFilter() action creator...

import { faux_objectives } from '../../../data/fauxObjectives'

describe("<ObjectivesFilterFormContainer /> Container ", () => {

    let wrapper

    // Mock the store...
    const _store = {
        dispatch: jest.fn(),
        subscribe: jest.fn(),
        getState: jest.fn(() => {
            return {
                objectives: {}
            }
        )
    }

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

        fetch.resetMocks()

        let faux_action = {"type":"OBJECTIVES_GET",
                "filters":{},
                "timestamp":"Thu Sep 20 2018 19:25:00 GMT-0400 (Eastern Daylight Time)",
                "objectives": faux_objectives,
                "error":""}

        // Set the response that we desire when isomorphic fetch is called within the actions.js file...
        fetch.mockResponse(JSON.stringify(faux_action))
            
        wrapper.find('ObjectivesFilterFormMock')
            .props()
            .onObjectivesFilter({})

        expect(_store.dispatch.mock.calls[0][0])
            .toEqual( faux_action )
    })

})

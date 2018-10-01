jest.mock('react-router')
// Otherwise you get Error...
// `Invariant Violation: You should not use <Route> or withRouter() outside a <Router>`

import ObjectivesFilterForm from '../../../src/components/ui/ObjectivesFilterForm'

const { shallow, mount } = Enzyme

import { config } from '../../../src/config'
import { logajohn } from '../../../src/lib/logajohn'

logajohn.setLevel(config.DEBUG_LEVEL)
logajohn.debug(`ObjectivesFilterForm.test.js: logajohn.getLevel()=${logajohn.getLevel()}...`)

describe("<ObjectivesFilterForm /> UI Component", () => {

    it("renders submit button", () =>
        expect(mount(<ObjectivesFilterForm />).find('#load-objectives').length)
            .toBe(1))

    //it("click does not cause error", () => {
    //    mount(<ObjectivesFilterForm />).find('#load-objectives').simulate('click')
    //})

//    it("submit causes error if onObjectivesFilter prop not supplied", () => {
//        let errCaught = null
//        try {
//            mount(<ObjectivesFilterForm />).find('#load-objectives').simulate('submit')
//        }
//        catch(err){
//            errCaught = err
//        }
//        expect(errCaught).not.toBeNull()
//    })

    it("submit invokes onObjectivesFilter", () => {

        let sWho = "ObjectivesFilterForm.test.js: submit invokes onObjectivesFilter"

        const _onObjectivesFilter = jest.fn()
        mount(<ObjectivesFilterForm onObjectivesFilter={_onObjectivesFilter} />)
            .find('#load-objectives')
            .simulate('submit')
        expect(_onObjectivesFilter).toBeCalled()
    })

//    it("submit invokes onObjectivesFilter -- description filter passed along", () => {
//
//        let sWho = "ObjectivesFilterForm.test.js: submit invokes onObjectivesFilter -- description filter passed along"
//
//        const _onObjectivesFilter = jest.fn()
//        let form = mount(<ObjectivesFilterForm onObjectivesFilter={_onObjectivesFilter} />)
//
//        let description_filter_component = form.find('#description-filter').get(0)
//        let s_description_filter = 'glassware'
//        description_filter_component.value = s_description_filter
//
//        mounter.find('#load-objectives')
//            .simulate('submit')
//
//        logajohn.debug(`${sWho}(): _onObjectivesFilter.calls = `,  _onObjectivesFilter.calls )
//        expect(_onObjectivesFilter).toBeCalledWith({description_filter: 'glassware'})
//
//    })

})

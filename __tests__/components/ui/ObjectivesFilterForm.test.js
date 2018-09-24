jest.mock('react-router')
// Otherwise you get Error...
// `Invariant Violation: You should not use <Route> or withRouter() outside a <Router>`

import ObjectivesFilterForm from '../../../src/components/ui/ObjectivesFilterForm'

const { shallow, mount } = Enzyme

describe("<ObjectivesFilterForm /> UI Component", () => {

    it("renders submit button", () =>
        expect(mount(<ObjectivesFilterForm />).find('#load-objectives').length)
            .toBe(1))

    //it("click does not cause error", () => {
    //    mount(<ObjectivesFilterForm />).find('#load-objectives').simulate('click')
    //})

    it("submit causes error if onObjectivesFilter prop not supplied", () => {
        let errCaught = null
        try {
            mount(<ObjectivesFilterForm />).find('#load-objectives').simulate('submit')
        }
        catch(err){
            errCaught = err
        }
        expect(errCaught).not.toBeNull()
    })

    it("submit invokes onObjectivesFilter", () => {
        const _onObjectivesFilter = jest.fn()
        mount(<ObjectivesFilterForm onObjectivesFilter={_onObjectivesFilter} />)
            .find('#load-objectives')
            .simulate('submit')
        expect(_onObjectivesFilter).toBeCalled()
    })

})

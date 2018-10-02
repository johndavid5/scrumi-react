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

        let sWho = "ObjectivesFilterForm.test.js: submit invokes onObjectivesFilter"

        const _onObjectivesFilter = jest.fn()
        mount(<ObjectivesFilterForm onObjectivesFilter={_onObjectivesFilter} />)
            .find('#load-objectives')
            .simulate('submit')
        expect(_onObjectivesFilter).toBeCalled()
    })

    it("submit invokes onObjectivesFilter -- description filter passed along", () => {

        let sWho = "ObjectivesFilterForm.test.js: submit invokes onObjectivesFilter -- description filter passed along"

        const _onObjectivesFilter = jest.fn()
        let wrapper = mount(<ObjectivesFilterForm onObjectivesFilter={_onObjectivesFilter} />)

        let s_description_filter = 'glassware'

        //let le_props = wrapper.instance().props
        let le_props = wrapper.props()
        logajohn.debug(`${sWho}(): le_props = `, le_props )
        le_props.refs._description_filter.value = s_description_filter
        wrapper.setProps(le_props )

        //logajohn.debug(`${sWho}(): After: wrapper.instance().props = `, wrapper.instance().props )
        logajohn.debug(`${sWho}(): After: wrapper.props() = `, wrapper.props() )

            wrapper.find('#load-objectives')
                .simulate('submit')

        logajohn.debug(`${sWho}(): _onObjectivesFilter.calls = `,  _onObjectivesFilter.calls )
        expect(_onObjectivesFilter).toBeCalledWith({description_filter: 'glassware'})
        

        //wrapper.find('#description-filter').simulate('change', {
        //  target: { value: s_description_filter }
        //})

        //wrapper.find('#description-filter').simulate('keydown', { which: 'a' })

        //let description_filter_component = wrapper.find('#description-filter')

        //description_filter_component.value = s_description_filter
        //description_filter_component.simulate('change', { target: { s_description_filter } })
        //description_filter_component.props().value = s_description_filter

        //logajohn.debug(`${sWho}(): description_filter_component.props().value = `, description_filter_component.props().value )
        //expect(description_filter_component.props().value).toEqual(s_description_filter)
        
        //wrapper.find('#input-value').simulate('change', { target: { '10' } })
        // then, to check if the value was changed:
        //expect(wrapper.find('#input-value').props().value).toEqual('10')

    })

})

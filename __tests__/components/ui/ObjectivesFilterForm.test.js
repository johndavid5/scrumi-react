jest.mock('react-router')
// Otherwise you get Error...
// `Invariant Violation: You should not use <Route> or withRouter() outside a <Router>`

import ObjectivesFilterForm from '../../../src/components/ui/ObjectivesFilterForm'

const { shallow, mount } = Enzyme

import { config } from '../../../src/config'
import { logajohn } from '../../../src/lib/logajohn'

let sWhere = '__tests__/components/ui/ObjectivesFilterform.test.js' 

logajohn.setLevel(config.DEBUG_LEVEL)
logajohn.debug(`${sWhere}: logajohn.getLevel()=${logajohn.getLevel()}...`)

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

        let sWho = `${sWhere}: submit invokes onObjectivesFilter`

        const _onObjectivesFilter = jest.fn()
        mount(<ObjectivesFilterForm onObjectivesFilter={_onObjectivesFilter} />)
            .find('#load-objectives')
            .simulate('submit')
        expect(_onObjectivesFilter).toBeCalled()
    })

    it("submit invokes onObjectivesFilter -- description filter passed along -- sort filters preserved", () => {

        let sWho = `${sWhere}: submit invokes onObjectivesFilter -- description filter passed along -- sort filters preserved`

        const _onObjectivesFilter = jest.fn()
        let s_faux_description_filter = 'glassware'

        // Attempted to simulate user input...
        // ...instead using descriptionFilter prop
        // to set description_filter...
        let faux_objectives_filters = {
           "sort_by_field": "description",
           "sort_by_asc_desc": "asc"
        }
        let wrapper = mount(<ObjectivesFilterForm descriptionFilter={s_faux_description_filter} onObjectivesFilter={_onObjectivesFilter} objectives={{objectives_filters: faux_objectives_filters}}  />)
        //let wrapper = mount(<ObjectivesFilterForm onObjectivesFilter={_onObjectivesFilter} />)

        //let le_props = wrapper.instance().props
        //let le_props = wrapper.props()
        //logajohn.debug(`${sWho}(): le_props = `, le_props )
        //le_props.refs._description_filter.value = s_description_filter
        //wrapper.setProps(le_props )

        //logajohn.debug(`${sWho}(): After: wrapper.instance().props = `, wrapper.instance().props )
        //logajohn.debug(`${sWho}(): After: wrapper.props() = `, wrapper.props() )

        //wrapper.find('#load-objectives')
        //    .simulate('change', {target: {value: s_description_filter}});
        //

        //wrapper.find("#description-filter").instance().value = s_faux_description_filter

        const input = wrapper.find('#description-filter');

        //input.simulate('focus');
        //input.simulate('change', { target: { value: s_faux_description_filter } });

        logajohn.debug(`${sWho}(): input.instance().value = `, input.instance().value )

        wrapper.find('#load-objectives')
                .simulate('submit')

        logajohn.debug(`${sWho}(): _onObjectivesFilter.calls = `,  _onObjectivesFilter.calls )
        //expect(_onObjectivesFilter).toBeCalledWith({description_filter: 'glassware'})
        expect(_onObjectivesFilter.mock.calls[0][0].description_filter).toEqual(s_faux_description_filter) // submitted description_filter...
        expect(_onObjectivesFilter.mock.calls[0][0].sort_by_field).toEqual(faux_objectives_filters.sort_by_field) // did not clobber sort_by_field...
        expect(_onObjectivesFilter.mock.calls[0][0].sort_by_asc_desc).toEqual(faux_objectives_filters.sort_by_asc_desc) // did not clobber sort_by_asc_desc...
        

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

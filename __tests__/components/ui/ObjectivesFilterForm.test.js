// Otherwise you get Error...
// `Invariant Violation: You should not use <Route> or withRouter() outside a <Router>`

import ObjectivesFilterForm from '../../../src/components/ui/ObjectivesFilterForm'

import { config } from '../../../src/config'
import { logajohn } from '../../../src/lib/logajohn'

jest.mock('react-router')

const { shallow, mount } = Enzyme

const sWhere = '__tests__/components/ui/ObjectivesFilterform.test.js'

logajohn.setLevel(config.DEBUG_LEVEL)
logajohn.debug(`${sWhere}: logajohn.getLevel()=${logajohn.getLevel()}...`)

describe('<ObjectivesFilterForm /> UI Component', () => {
    it('renders submit button', () => expect(mount(<ObjectivesFilterForm />).find('#load-objectives').length)
        .toBe(1))

    // it("click does not cause error", () => {
    //    mount(<ObjectivesFilterForm />).find('#load-objectives').simulate('click')
    // })

    // it("submit causes error if onObjectivesFilter prop not supplied", () => {
    //    let errCaught = null
    //    try {
    //        mount(<ObjectivesFilterForm />).find('#load-objectives').simulate('submit')
    //    }
    //    catch(err){
    //        errCaught = err
    //    }
    //    expect(errCaught).not.toBeNull()
    // })

    it('submit invokes onObjectivesFilter', () => {
        const sWho = `${sWhere}: submit invokes onObjectivesFilter`

        const _onObjectivesFilter = jest.fn()
        mount(<ObjectivesFilterForm onObjectivesFilter={_onObjectivesFilter} />)
            .find('#load-objectives')
            .simulate('submit')
        expect(_onObjectivesFilter).toBeCalled()
    })

    //    it("submit invokes onObjectivesFilter -- description filter passed along -- sort filters preserved", () => {
    //
    //        let sWho = `${sWhere}: submit invokes onObjectivesFilter -- description filter passed along -- sort filters preserved`
    //
    //        const _onObjectivesFilter = jest.fn()
    //        let s_faux_description_filter = 'glassware'
    //
    //        // Attempted to simulate user input...
    //        // ...instead using descriptionFilter prop
    //        // to set description_filter...
    //        let faux_objectives_filters = {
    //           "sort_by_field": "description",
    //           "sort_by_asc_desc": "asc"
    //        }
    //        let wrapper = mount(<ObjectivesFilterForm descriptionFilter={s_faux_description_filter} onObjectivesFilter={_onObjectivesFilter} objectives={{objectives_filters: faux_objectives_filters}}  />)
    //        //let wrapper = mount(<ObjectivesFilterForm onObjectivesFilter={_onObjectivesFilter} />)
    //
    //        //let le_props = wrapper.instance().props
    //        //let le_props = wrapper.props()
    //        //logajohn.debug(`${sWho}(): le_props = `, le_props )
    //        //le_props.refs._description_filter.value = s_description_filter
    //        //wrapper.setProps(le_props )
    //
    //        //logajohn.debug(`${sWho}(): After: wrapper.instance().props = `, wrapper.instance().props )
    //        //logajohn.debug(`${sWho}(): After: wrapper.props() = `, wrapper.props() )
    //
    //        //wrapper.find('#load-objectives')
    //        //    .simulate('change', {target: {value: s_description_filter}});
    //        //
    //
    //        //wrapper.find("#description-filter").instance().value = s_faux_description_filter
    //
    //        const input = wrapper.find('#description-filter');
    //
    //        //input.simulate('focus');
    //        //input.simulate('change', { target: { value: s_faux_description_filter } });
    //
    //        logajohn.debug(`${sWho}(): input.instance().value = `, input.instance().value )
    //
    //        wrapper.find('#load-objectives')
    //                .simulate('submit')
    //
    //        logajohn.debug(`${sWho}(): _onObjectivesFilter.calls = `,  _onObjectivesFilter.calls )
    //        //expect(_onObjectivesFilter).toBeCalledWith({description_filter: 'glassware'})
    //        expect(_onObjectivesFilter.mock.calls[0][0].description_filter).toEqual(s_faux_description_filter) // submitted description_filter...
    //        expect(_onObjectivesFilter.mock.calls[0][0].sort_by_field).toEqual(faux_objectives_filters.sort_by_field) // did not clobber sort_by_field...
    //        expect(_onObjectivesFilter.mock.calls[0][0].sort_by_asc_desc).toEqual(faux_objectives_filters.sort_by_asc_desc) // did not clobber sort_by_asc_desc...
    //
    //
    //        //wrapper.find('#description-filter').simulate('change', {
    //        //  target: { value: s_description_filter }
    //        //})
    //
    //        //wrapper.find('#description-filter').simulate('keydown', { which: 'a' })
    //
    //        //let description_filter_component = wrapper.find('#description-filter')
    //
    //        //description_filter_component.value = s_description_filter
    //        //description_filter_component.simulate('change', { target: { s_description_filter } })
    //        //description_filter_component.props().value = s_description_filter
    //
    //        //logajohn.debug(`${sWho}(): description_filter_component.props().value = `, description_filter_component.props().value )
    //        //expect(description_filter_component.props().value).toEqual(s_description_filter)
    //
    //        //wrapper.find('#input-value').simulate('change', { target: { '10' } })
    //        // then, to check if the value was changed:
    //        //expect(wrapper.find('#input-value').props().value).toEqual('10')
    //
    //    })
    //
    //
    //    it("submit invokes onObjectivesFilter -- full name filter passed along -- sort filters preserved", () => {
    //
    //        let sWho = `${sWhere}: submit invokes onObjectivesFilter -- full name filter passed along -- filters preserved`
    //
    //        const _onObjectivesFilter = jest.fn()
    //        let s_faux_full_name_filter = 'Joe Kovacs'
    //        let s_faux_description_filter = 'glassware'
    //
    //        // Attempted to simulate user input...
    //        // ...instead using descriptionFilter prop
    //        // to set description_filter...
    //        let faux_objectives_filters = {
    //           "sort_by_field": "description",
    //           "sort_by_asc_desc": "asc"
    //        }
    //        let wrapper = mount(<ObjectivesFilterForm descriptionFilter={s_faux_description_filter} fullNameFilter={s_faux_full_name_filter} onObjectivesFilter={_onObjectivesFilter} objectives={{objectives_filters: faux_objectives_filters}}  />)
    //
    //        const full_name_filter = wrapper.find('#full-name-filter');
    //
    //        logajohn.debug(`${sWho}(): full_name_filter = `, full_name_filter )
    //
    //        // expect(typeof input).to.not.equal("undefined");
    //        // expect(input).to.have.lengthOf(1);
    //        // logajohn.debug(`${sWho}(): input.instance().value = `, input.instance().value )
    //
    //        wrapper.find('#load-objectives')
    //                .simulate('submit')
    //
    //        logajohn.debug(`${sWho}(): _onObjectivesFilter.calls = `,  _onObjectivesFilter.calls )
    //
    //        //expect(_onObjectivesFilter).toBeCalledWith({description_filter: 'glassware'})
    //        expect(_onObjectivesFilter.mock.calls[0][0].full_name_filter).toEqual(s_faux_full_name_filter) // submitted full_name_filter...
    //
    //        expect(_onObjectivesFilter.mock.calls[0][0].description_filter).toEqual(s_faux_description_filter) // did not clobber description_filter...
    //
    //        expect(_onObjectivesFilter.mock.calls[0][0].sort_by_field).toEqual(faux_objectives_filters.sort_by_field) // did not clobber sort_by_field...
    //        expect(_onObjectivesFilter.mock.calls[0][0].sort_by_asc_desc).toEqual(faux_objectives_filters.sort_by_asc_desc) // did not clobber sort_by_asc_desc...
    //
    //    })


    it('submit invokes onObjectivesFilter -- with full_name_filter, description_filter, and comments_filter passed along -- sort filters preserved', () => {
        const sWho = `${sWhere}: submit invokes onObjectivesFilter -- comments filter passed along -- filters preserved`

        const _onObjectivesFilter = jest.fn()
        const s_faux_full_name_filter = 'Joe Kovacs'
        const s_faux_description_filter = 'glassware'
        const s_faux_comments_filter = 'all'

        // Attempted to simulate user input...
        // ...instead using descriptionFilter prop
        // to set description_filter...
        const faux_objectives_filters = {
            sort_by_field: 'description',
            sort_by_asc_desc: 'asc',
        }
        const wrapper = mount(<ObjectivesFilterForm descriptionFilter={s_faux_description_filter} fullNameFilter={s_faux_full_name_filter} commentsFilter={s_faux_comments_filter} onObjectivesFilter={_onObjectivesFilter} objectives={{ objectives_filters: faux_objectives_filters }} />)

        const description_filter = wrapper.find('#description-filter')
        expect(description_filter.at(0).props().value).toEqual(s_faux_description_filter) // Confirm value of #description-filter set via props...

        logajohn.debug(`${sWho}(): SHEMP: Moe, description_filter = `, description_filter)
        logajohn.debug(`${sWho}(): SHEMP: Shmoe, description_filter.at(0) = `, description_filter.at(0))
        logajohn.debug(`${sWho}(): SHEMP: Shmoe, description_filter.at(0).props() = `, description_filter.at(0).props())
        logajohn.debug(`${sWho}(): SHEMP: Shmoe, description_filter.at(0).props().value = `, description_filter.at(0).props().value)
        logajohn.debug(`${sWho}(): SHEMP: Shmoe, description_filter.at(0).text() = `, description_filter.at(0).text())

        const full_name_filter = wrapper.find('#full-name-filter')
        expect(full_name_filter.at(0).props().value).toEqual(s_faux_full_name_filter) // Confirm value of #full-name-filter set via props...
        logajohn.debug(`${sWho}(): SHEMP: Moe, full_name_filter = `, full_name_filter)

        const comments_filter = wrapper.find('#comments-filter')
        expect(comments_filter.at(0).props().value).toEqual(s_faux_comments_filter) // Confirm value of #comments-filter set via props...
        logajohn.debug(`${sWho}(): SHEMP: Moe, comments_filter = `, comments_filter)

        // expect(typeof input).to.not.equal("undefined");
        // expect(input).to.have.lengthOf(1);
        // logajohn.debug(`${sWho}(): input.instance().value = `, input.instance().value )

        wrapper.find('#load-objectives')
            .simulate('submit')

        logajohn.debug(`${sWho}(): _onObjectivesFilter.calls = `, _onObjectivesFilter.calls)

        // expect(_onObjectivesFilter).toBeCalledWith({description_filter: 'glassware'})
        expect(_onObjectivesFilter.mock.calls[0][0].full_name_filter).toEqual(s_faux_full_name_filter) // submitted full_name_filter...

        expect(_onObjectivesFilter.mock.calls[0][0].description_filter).toEqual(s_faux_description_filter) // submitted description_filter...

        expect(_onObjectivesFilter.mock.calls[0][0].comments_filter).toEqual(s_faux_comments_filter) // submitted comment_filter...

        expect(_onObjectivesFilter.mock.calls[0][0].sort_by_field).toEqual(faux_objectives_filters.sort_by_field) // did not clobber sort_by_field...
        expect(_onObjectivesFilter.mock.calls[0][0].sort_by_asc_desc).toEqual(faux_objectives_filters.sort_by_asc_desc) // did not clobber sort_by_asc_desc...
    })
})

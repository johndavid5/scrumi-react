/* Our manual ObjectivesFilterFormMock: simply renders an empty <div> element...
*
* Now whenever we mock the ObjectivesFilterForm component with `jest.mock()`,
* Jest will obtain the appropriate mock from the __mocks__ folder.
*
* We do not have to define the mock directly in our test.
*/
const ObjectivesFilterFormMock = () => <div></div>

ObjectivesFilterFormMock.displayName = "ObjectivesFilterFormMock"

export default ObjectivesFilterFormMock

import { render, hydrate } from 'react-dom'

jest.mock('react-dom')

jest.mock('../src/store/index', () => () => ({
    subscribe: jest.fn(),
    dispatch: jest.fn(),
    getState: jest.fn(),
}))

describe('App Entry Point - /src/index.js', () => {
    it('renders app without error', () => {
        require('../src/index.js')
    })
})

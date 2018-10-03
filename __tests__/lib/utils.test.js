import { utils } from '../../src/lib/utils'

import { config } from '../../src/config'
import { logajohn } from '../../src/lib/logajohn'

let sWhere = '__tests__/lib/utils.test.js'

logajohn.setLevel(config.DEBUG_LEVEL)
logajohn.debug(`${sWhere}: logajohn.getLevel()=${logajohn.getLevel()}...`)

describe('./src/lib/utils', () => {

    describe('objectToQueryString => queryStringToObject', () => {

        const test_cases = [
            {
                input: { "name": "Moe", "stooge_number": "1", "line": "Why, you!" },
                expected_output: "name=Moe&stooge_number=1&line=Why%2C%20you!",
                // decoded: "name=Moe&stooge_number=1&line=Why, you!"
                linda_round_trippable: true 
            },

            {  
                input: {
                  foo: "hi there",
                  bar: {
                    blah: 123,
                    quux: [1, 2, 3]
                  }
                },
                expected_output: "foo=hi%20there&bar%5Bblah%5D=123&bar%5Bquux%5D%5B0%5D=1&bar%5Bquux%5D%5B1%5D=2&bar%5Bquux%5D%5B2%5D=3",
                // decoded: "foo=hi there&bar[blah]=123&bar[quux][0]=1&bar[quux][1]=2&bar[quux][2]=3"
                linda_round_trippable: false
            }
        ]

        it('converts...', () => {

            let sWho = "${sWhere}::converts"

            test_cases.forEach(({input, expected_output, linda_round_trippable})=>{
                let actual_output = utils.objectToQueryString(input)                    

                logajohn.debug(`${sWho}(): utils.objectToQueryString(): input = `, input )
                logajohn.debug(`${sWho}(): utils.objectToQueryString(): actual_output = `, actual_output )
                logajohn.debug(`${sWho}(): utils.objectToQueryString(): decodeURIComponent(actual_output) = `, decodeURIComponent(actual_output) )

                expect(actual_output).toEqual(expected_output)

                if( linda_round_trippable ){
                    // round trip...
                    let round_trip_object = utils.queryStringToObject(actual_output)
                    expect(round_trip_object).toEqual(input)
                }
            })
        })

    })

})

import { LinksQa } from '../../src/server/models/links-qa'
import { logajohn } from '../../src/lib/logajohn'

logajohn.setLevel('info')

describe("LinksQa", () => {

    it("smoke", (done) => {

        function smokeCallback(data,error){ 
            let sWho = "links-qa.test::LinksQa::smoke::callback";
            logajohn.debug(`${sWho}(): data = `, data )
            logajohn.debug(`${sWho}(): SHEMP: Moe, error = `, error )
            expect(data).not.toBeNull()
            done();
        }

        let sWho = "LinksQa::smoke";
        let filter = {};
        logajohn.debug(`${sWho}(): SHEMP: Moe, callin' LinksQs.getLinksQa( `, filter, `, smokeCallback )...`)
        LinksQa.getLinksQa( filter, smokeCallback );

    })

})

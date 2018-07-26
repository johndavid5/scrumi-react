import fs from 'fs'
import path from 'path'
import { config } from '../../config'
import { reverseForEach } from '../../src/lib/array-helpers'
import { FileModel } from '../../src/server/models/file'
import { logajohn } from '../../src/lib/logajohn'

//logajohn.setLevel('info')
logajohn.setLevel(config.DEBUG_LEVEL)
logajohn.info(`file.test.js: logajohn.getLevel()=${logajohn.getLevel()}...`)

describe("FileModel", () => {

    // Create temporary tree in the same folder as this test...
    const testTree = {
        folders: [
            path.join(__dirname,"stooges"),
            path.join(__dirname,"stooges", "moe"),
            path.join(__dirname,"stooges", "larry"),
            path.join(__dirname,"stooges", "shemp")
        ],
        files: [
            path.join(__dirname,"stooges", "moe", "moe.txt"),
            path.join(__dirname,"stooges", "larry", "larry.txt"),
            path.join(__dirname,"stooges", "shemp", "shemp.txt")
        ]
    }

    beforeAll( () => {

        let sWho = 'file.test.js::beforeAll'

        testTree.folders.forEach( (item)=>{
            try {
                logajohn.debug(`${sWho}(): Calling mkdirSync("${item}")...`)
                fs.mkdirSync( item )
            }catch(err){
                logajohn.error(`${sWho}(): Trouble with mkdirSync("${item}"): `, err )
            }
        })

        testTree.files.forEach( (item)=>{
            try {
                logajohn.debug(`${sWho}(): Calling appendFileSync("${item}", "${item}")...`)
                fs.appendFileSync( item, item )
            }catch(err){
                logajohn.error(`${sWho}(): Trouble with appendFileSync("${item}"): `, err )
            }
        })
    })

    testTree.folders.forEach( (folderPath) => {
        it( "static -- " + folderPath, (done) => {

        let staticCallback = (data,error) => { 
            let sWho = "file.test.js - staticCallback --" + folderPath;
            logajohn.debug(`${sWho}(): SHEMP: Moe, data = `, JSON.stringify(data, null, ' ') )
            logajohn.debug(`${sWho}(): SHEMP: Moe, error = `, error )

            expect(data).not.toBeNull()

            expect(data.length).toBeGreaterThan(0)

            data.forEach( (item)=>{
                if( item.name.match(/\.txt$/) ){ 
                    expect(item.is_file).toBe(true)
                    expect(item.is_directory).toBe(false)
                }
                else{
                    expect(item.is_file).toBe(false)
                    expect(item.is_directory).toBe(true)
                }
            })

            done();
        }

        let sWho = "file.test.js - static - " + folderPath;
        let filter = {'path': folderPath }
        logajohn.debug(`${sWho}(): SHEMP: Moe, callin' FileModel.getDir( `, filter, `, staticCallback )...`)
        FileModel.getDir( filter, staticCallback );

        })
    })

    it("Handles C: gracefully...", (done) => {
        
        let staticCallback = (data,error) => { 
            let sWho = "file.test.js - staticCallback --" + folderPath;
            logajohn.debug(`${sWho}(): SHEMP: Moe, data = `, JSON.stringify(data, null, ' ') )
            logajohn.debug(`${sWho}(): SHEMP: Moe, error = `, error )

            expect(data).not.toBeNull()
            expect(data.length).toBeGreaterThan(0)

            done();
        }

        let sWho = "file.test.js - SHEMP - C:";
        let filter = {'path': "C:" }
        logajohn.debug(`${sWho}(): SHEMP: Moe, callin' FileModel.getDir( `, filter, `, staticCallback )...`)
        FileModel.getDir( filter, staticCallback );

    })


    afterAll( () => {

        let sWho = 'file.test.js::afterAll'

        testTree.files.forEach( (item)=>{
            try {
                logajohn.debug(`${sWho}(): Calling unlinkSync("${item}")...`)
                fs.unlinkSync( item )
            }catch(err){
                logajohn.error(`${sWho}(): Trouble with unlinkSync("${item}"): `, err )
            }
        })


        reverseForEach( testTree.folders, (item) => {
            try {
                logajohn.debug(`${sWho}(): Calling rmdirSync("${item}")...`)
                fs.rmdirSync( item )
            }catch(err){
                logajohn.error(`${sWho}(): Trouble with rmdirSync("${item}"): `, err )
            }
        })

    })

    

//    it("smoke", (done) => {
//
//        function smokeCallback(data,error){ 
//            let sWho = "FileModel::smoke::callback";
//            logajohn.debug(`${sWho}(): SHEMP: Moe, data = `, data )
//            logajohn.debug(`${sWho}(): SHEMP: Moe, error = `, error )
//            expect(data).not.toBeNull()
//            done();
//        }
//
//        let sWho = "FileModel::smoke";
//        let filter = {'path':'g:\\p27174'};
//        logajohn.debug(`${sWho}(): SHEMP: Moe, callin' FileModel.getDir( `, filter, `, smokeCallback )...`)
//        FileModel.getDir( filter, smokeCallback );
//
//    })

//    it("static -- g:\\p27174", (done) => {
//
//        let staticCallback = (data,error) => { 
//            let sWho = "file.test.js - staticCallback";
//            logajohn.debug(`${sWho}(): SHEMP: Moe, data = `, JSON.stringify(data, null, ' ') )
//            logajohn.debug(`${sWho}(): SHEMP: Moe, error = `, error )
//            expect(data).not.toBeNull()
//            done();
//        }
//
//        let sWho = "FileModel::static";
//        let filter = {'path':'g:\\p27174'};
//        //let filter = {'path':'\\\\jpmc\\DATA'};
//        logajohn.debug(`${sWho}(): SHEMP: Moe, callin' FileModel.getDir( `, filter, `, smokeCallback )...`)
//        FileModel.getDir( filter, staticCallback );
//
//    })

})

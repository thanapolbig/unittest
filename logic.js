const converthash = require('./Util/hash256.js')
const logger = require('./Util/logger.js');

class logic {

    add(a,b){
        return (a+b);
    }

    async createAccount(unparsedAttrs) {
        let functionName = `[createAccount]`
        logger.info(functionName)
        return new Promise(async function (resolve, reject) {
            try {
                var bc_user = unparsedAttrs.bc_user || reject(`createAccount.bc_user is required`)
                var book_bank_id = unparsedAttrs.book_bank_id  || reject(`createAccount.book_bank_id is required`)
                var bank_name = unparsedAttrs.bank_name  || reject(`createAccount.bank_name is required`)
                var hash_book_bank_id = await converthash.hash(`${book_bank_id.toString().trim()}`)
                console.log(hash_book_bank_id)  
                var parsedAttrs = await attribute.ParseCreateAccount(unparsedAttrs , hash_book_bank_id)
                var result = await new service().invoke(bc_user .toString().trim() , CC_NAME_CREATE_ACCOUNT ,parsedAttrs )
                var query = await new service().query(bc_user.toString().trim(),bank_name+hash_book_bank_id)
                var output = JSON.parse(query.toString())
                output.remaining = (output.remaining).toFixed(2) //แปลงตัวเลขให้แสดงเป็นทศนิยมสองตำแหน่ง
                output.remaining = (output.remaining).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')   //ใส่ลูกน้ำที่ตัวเลข
                let message = {
                    statusCode: 201,
                    message: output
                }
                //let message = result
                resolve(message)
            } catch (error) {
                let messageError = {
                    statusCode: error.statusCode || 400,
                    message: error.message || `${functionName} create Account failed : bc_user=${bc_user} ,OrgDepartment=${OrgDepartment} [Error] ${error}`
                }
                logger.error(messageError.message)
                reject(messageError)
            }
        })
    }

}

module.exports = new logic();
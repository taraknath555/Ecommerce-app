const crypto = require('crypto')
const util = require('util')
const Repository = require('./repository')

const scrypt = util.promisify(crypto.scrypt)

class adminRepository extends Repository {

  async create(attrs){
    const records = await this.getAll()
    attrs['id'] = this.randomId()

    const salt = crypto.randomBytes(8).toString('hex')
    const hashedBuff = await scrypt(attrs.password, salt, 64)
    const record = {
      ...attrs,
      'password' : `${hashedBuff.toString('hex')}.${salt}`
    }
    records.push(record)
    await this.writeAll(records)
    return record
  }

  async comparePassword(saved,supplied){
    const [hashed, salt] = saved.split('.')
    
    const hashedSuppliedBuff = await scrypt(supplied, salt, 64)
    return hashed === hashedSuppliedBuff.toString('hex')
  }
}

module.exports = new adminRepository('admin.json')
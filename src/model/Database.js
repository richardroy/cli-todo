const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
var myModulePath = require('app-root-path')
const adapter = new FileSync(`${myModulePath}/db.json`)
const db = low(adapter)

module.exports = db;
import * as Datastore from 'nedb'
import User from './User'
const SHA256 = require('crypto-js/sha256')

const dbUsersFileName = __dirname + '/server.db'
const userdb = new Datastore({ filename: dbUsersFileName, autoload: true });
userdb.ensureIndex({fieldName: 'username', unique: true }, (err) => {
  if (err) throw err
})

export const findUser = (username: string, callback: (user: User | null) => void) => {
  const lowercaseName = username.toLowerCase()
  userdb.findOne({ username: lowercaseName }, (err, doc) => {
    if (doc === null) callback(null)
    else callback(User.fromDocument(doc))
  })
}

export const updateUser = (username: string, newUser: User, callback: (err: Error) => void) => {
  const lowercaseName = username.toLowerCase()
  userdb.update({ username: lowercaseName }, newUser, {}, (err) => {
     callback(err)
  })
}

export const updateUserLastVisit = (username: string, lastVisit: number,
  callback: ((err: Error) => void) | undefined) => {
  const lowercaseName = username.toLowerCase()
  userdb.update({ username: lowercaseName }, { $set: {lastVisit} }, {}, callback)
}

export const addUser = (username: string, plainPassword: string,
  callback: (error: Error, username: User) => void) => {
  const lowercaseName = username.toLowerCase()
  const newUser = new User(lowercaseName, SHA256(plainPassword).toString())
  userdb.insert(newUser, (err) => {
    callback(err, newUser)
  })
}

export const removeFields = (fieldsToRemove: object, callback:
  (error: Error, numAffected: number) => void) => {
  userdb.update({}, { $unset: fieldsToRemove }, { multi: true }, callback)
}

export const addFields = (fieldsToAdd: object, callback:
  (error: Error, numAffected: number) => void) => {
  userdb.update({}, { $set: fieldsToAdd }, { multi: true }, callback)
}

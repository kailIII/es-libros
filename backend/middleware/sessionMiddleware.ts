import * as session from '../session'
import * as dbAdmin from '../db/admin'

export const validateUserLoggedIn = (req: Request, res: any, next: any) => {
  const username = session.getUserFromSession(req)
  if (username)
    next()
  else
    res.redirect('/')
}

export const validateUserNotLoggedIn = (req: Request, res: any, next: any) => {
  const username = session.getUserFromSession(req)
  if (username)
    res.redirect('/')
  else
    next()
  }

export const validateUserInDB = (req, res, next) => {
  const username = session.getUserFromSession(req)
  dbAdmin.findUser(username, (user) => {
    if (user) {
      req.userObject = user
      next()
    } else {
      kickOutUser(req, res)
    }
  })

}

export const kickOutUser = (req, res) => {
  session.removeUserSession(req)
  res.redirect('/')
}
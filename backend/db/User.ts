const JSCompat = require('../compat/JSCompat.js')

export default class User {
  username: string;
  hashedPassword: string;
  lastVisit: number;
  likedBooks: number[];
  likedSongs: number[];

  constructor(user: string, pass: string) {
    this.username = user
    this.hashedPassword = pass
    this.lastVisit = 0
    this.likedBooks = []
    this.likedSongs = []
  }

  toStateObject(extraData) {
    const username = this.username
    const lastVisit = this.lastVisit
    const likedBooks = this.likedBooks
    const likedSongs = this.likedSongs
    return { username, lastVisit, likedBooks, likedSongs, ...extraData }

  }

  static fromDocument(document: any): User {
    const user =  new User(document.username, document.hashedPassword)
    user.lastVisit = document.lastVisit
    user.likedBooks = document.likedBooks
    user.likedSongs = document.likedSongs
    return user
  }

}

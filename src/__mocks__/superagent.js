let retainedCallback = undefined
const superagent = jest.genMockFromModule('superagent')


function get(/*url*/) {
  return {
    set: () => { return get() },
    send: () => { return get() },
    then: (successCallback, failiureCallback) => {
      retainedCallback = Object.create(null)
      retainedCallback.nextSuccess = successCallback
      retainedCallback.nextFailiure = failiureCallback
    }
  }
}

function __execSuccess(resp) {
  const nextSuccess = retainedCallback.nextSuccess
  if (nextSuccess)
    nextSuccess(resp)
}

function __execFailiure(error) {
  const nextFailiure = retainedCallback.nextFailiure
  if (nextFailiure)
    nextFailiure(resp)
}

superagent.get = get
superagent.__execSuccess = __execSuccess
superagent.__execFailiure = __execFailiure
module.exports = superagent

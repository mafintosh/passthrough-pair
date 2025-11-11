const { Duplex, Writable } = require('streamx')

class ReversePair extends Duplex {
  constructor(s) {
    super()
    this._stream = s
    this._ondrain = null
  }

  _write(data, cb) {
    if (this._stream.push(data) === false) {
      this._stream._ondrain = cb
    } else {
      cb(null)
    }
  }

  _final(cb) {
    this._stream.push(null)
    cb(null)
  }

  _read(cb) {
    const ondrain = this._ondrain
    this._ondrain = null
    if (ondrain) ondrain()
    cb(null)
  }
}

class Pair extends Duplex {
  constructor() {
    super()

    this._ondrain = null
    this.reverse = new ReversePair(this)
  }

  flush() {
    return Writable.drained(this)
  }

  _read(cb) {
    const ondrain = this._ondrain
    this._ondrain = null
    if (ondrain) ondrain()
    cb(null)
  }

  _write(data, cb) {
    if (this.reverse.push(data) === false) {
      this.reverse._ondrain = cb
    } else {
      cb(null)
    }
  }

  _final(cb) {
    this.reverse.push(null)
    cb(null)
  }
}

module.exports = () => {
  const pair = new Pair()
  return [pair, pair.reverse]
}

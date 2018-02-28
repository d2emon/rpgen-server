function CrapupError(text) {
  Error.call(this, text)
  this.name = "CrapupError"

  this.text = text
  this.message = "Ошибка в свойстве " + text

  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, CrapupError)
  } else {
    this.stack = (new Error()).stack
  }
}

CrapupError.prototype = Object.create(Error.prototype);

module.exports = CrapupError

class ApiError extends Error {
  constructor(data, status) {
    super(data);

    this.name = this.constructor.name;

    // a workaround to make `instanceof ApiError` work in ES5 with babel
    this.constructor = ApiError;
    this.__proto__ = ApiError.prototype; // eslint-disable-line

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }

    this.data = data;
    this.status = status;

    // replaces '[object object]'
    this.message = `API Error. Status: ${status} ${JSON.stringify(data)}`;
  }

  inspect() {
    return this.stack;
  }
}

ApiError.prototype = Error.prototype;

export default ApiError;

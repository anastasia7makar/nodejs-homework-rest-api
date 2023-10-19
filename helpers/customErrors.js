class CustomErrors extends Error {
  code;
  message;

  constructor(code, message) {
    super();

    this.code = code;
    this.message = message;
  }

  static BadRequest(message) {
    return new CustomErrors(400, message);
  }

  static Unauthorized(message = "Not authorized") {
    return new CustomErrors(401, message);
  }

  static Forbidden() {
    return new CustomErrors(403, "Forbidden");
  }
  
  static NotFound(message = "Not Found") {
    return new CustomErrors(404, message);
  }

  static Conflict(message = "Conflict") {
    return new CustomErrors(409, message);
  }
}

module.exports = { CustomErrors };

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

  static Unauthorized() {
    return new CustomErrors(401, "Not authorized");
  }

  static Forbidden() {
    return new CustomErrors(403, "Forbidden");
  }
  
  static NotFound() {
    return new CustomErrors(404, "Not Found");
  }

  static Conflict(message = "Conflict") {
    return new CustomErrors(409, message);
  }
}

module.exports = { CustomErrors };

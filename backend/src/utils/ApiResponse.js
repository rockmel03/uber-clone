class ApiResponse {
  constructor(
    statusCode = 200,
    data = null,
    message = "Success",
    errors = null
  ) {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.errors = errors;
    this.status = statusCode >= 200 && statusCode < 400; // Success if 2xx or 3xx
  }

  // Static method for success responses
  static success(data = {}, message = "Success", statusCode = 200) {
    return new ApiResponse(statusCode, data, message);
  }

  // Static method for error responses
  static error(message = "Error occurred", errors = null, statusCode = 500) {
    return new ApiResponse(statusCode, null, message, errors);
  }

  // Static method for validation errors
  static validationError(errors, message = "Validation Error") {
    return new ApiResponse(400, null, message, errors);
  }
}

module.exports = ApiResponse;

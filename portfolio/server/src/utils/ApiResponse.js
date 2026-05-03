/**
 * Standardised API success response
 * @param {number}  statusCode - HTTP status code
 * @param {any}     data       - Response payload
 * @param {string}  message    - Human-readable message
 */
class ApiResponse {
  constructor(statusCode, data, message = "Success") {
    this.statusCode = statusCode;
    this.success = statusCode < 400;
    this.message = message;
    this.data = data;
  }
}

module.exports = ApiResponse;

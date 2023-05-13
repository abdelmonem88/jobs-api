export default class CustomAPIError extends Error {
  statusCode: any;
  constructor(message: string) {
    super(message);
  }
}

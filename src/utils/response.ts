export class BaseResponse {
  constructor(message: string, data: object, status: number) {}
}

export class BaseControler {
  baseResponse(message: string, data: object, status: number) {
    return {
      status,
      message: message,
      data,
    };
  }
}

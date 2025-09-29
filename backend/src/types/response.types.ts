export interface BaseResponse {
  sucesso: boolean;
  mensagem?: string;
}

export interface SuccessResponse<T = any> extends BaseResponse {
  sucesso: true;
  dados?: T;
}

export interface ErrorResponse extends BaseResponse {
  sucesso: false;
  erro: string;
  mensagem: string;
  detalhes?: any;
}

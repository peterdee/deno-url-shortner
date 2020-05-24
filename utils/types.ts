export interface BasicResponse {
  datetime: number;
  info: string;
  status: number;
  data?: any;
};

export interface ServerOptions {
  hostname?: string;
  port: number;
};

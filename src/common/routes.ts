import { Request, Response } from "express";

export interface IHttpPayload {
  request: Request | any;
  response: Response;
}

import { Request, Response } from "express";

export interface IHttpPayload {
  request: Request;
  response: Response;
}

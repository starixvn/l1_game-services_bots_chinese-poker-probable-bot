import { Application } from "express";
import { IFeature } from "./feature";
import { ILogger, createLogger } from "./logger";

export interface IContext {
  express?: Application;

  features?: IFeature[];

  logger?: ILogger;
}

export function cloneContext(context: IContext, feature: string) {
  return Object.assign({}, context, { logger: createLogger(feature) });
}

export function mergeContext(a: IContext | any, b: IContext | any) {
  return Object.assign({}, a, b);
}

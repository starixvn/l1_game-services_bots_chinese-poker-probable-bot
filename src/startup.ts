import { createServer } from "http";
import { cloneContext, createFeatureContext } from "./common";
import {
  CreateExpressServerOptions,
  createExpressServer,
  registerExpressRoutes,
} from "./servers";

export interface StartupOptions {
  featureDirectory: string;
  port: string;
  express: CreateExpressServerOptions;
}

export async function startup(options: StartupOptions) {
  const express = createExpressServer(options.express);
  const httpServer = createServer(express);
  const root = cloneContext({ express }, "[root]");
  const context = await createFeatureContext(root, options.featureDirectory);

  registerExpressRoutes(context);

  httpServer.listen(options.port);
}

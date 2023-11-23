import { readdirSync } from "fs";
import { join } from "path";
import { RouteType } from "./constants";
import { IContext } from "./context";

export interface IRoute {
  type: RouteType;

  path?: string;

  method?: "get" | "post" | "put" | "delete";

  event?: string;

  handler: Function;

  middleware: Function[];
}

export interface IFeature {
  name: string;
  middleware: Record<string, Function | string>;
  handlers: Record<string, Function>;
  context: Function;
  routes: IRoute[];
}

export function findFeature(features: IFeature[], name: string) {
  return features.find((feature) => feature.name === name);
}

export function findMiddleware(features: IFeature[], name: string) {
  const [featureName, method] = name.split(".");
  const feature = findFeature(features, featureName);

  if (feature && feature.middleware?.[method]) {
    return feature.middleware[method];
  }
}

export async function loadAllFeatures(path: string): Promise<IFeature[]> {
  const directories = readdirSync(path);

  return Promise.all(
    directories.map(async (directory) => {
      const modulePath = join(path, directory);
      const module = await import(modulePath);

      module.name = directory;

      return module;
    }),
  );
}

export async function createFeatureContext(
  root: IContext,
  featurePath: string,
): Promise<IContext> {
  const features = await loadAllFeatures(featurePath);

  return features.reduce(
    (result, feature) => (feature.context ? feature.context(result) : result),
    { ...root, features },
  );
}

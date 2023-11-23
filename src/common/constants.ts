export enum RouteType {
  HTTP = "http",
}

export function getValue(key: string, defaultValue: string) {
  return process.env[key] || defaultValue;
}

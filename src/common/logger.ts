export interface ILogger {
  debug: (...args: any[]) => void;

  log: (...args: any[]) => void;

  error: (...args: any[]) => void;

  warn: (...args: any[]) => void;

  info: (...args: any[]) => void;
}

export function createLogger(feature: string): ILogger {
  return {
    debug: (...args: any[]) => console.debug(feature, ...args),
    log: (...args: any[]) => console.log(feature, ...args),
    error: (...args: any[]) => console.error(feature, ...args),
    warn: (...args: any[]) => console.warn(feature, ...args),
    info: (...args: any[]) => console.info(feature, ...args),
  };
}

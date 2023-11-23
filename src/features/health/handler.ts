import { IHttpPayload } from "../../common";
import * as packageJson from "../../../package.json";

export function responseOkMessage({ response }: IHttpPayload) {
  response.send("ok");
}

export function responseServiceInfo({ response }: IHttpPayload) {
  response.send({
    name: packageJson.name,
    version: packageJson.version,
    description: packageJson.description,
  });
}

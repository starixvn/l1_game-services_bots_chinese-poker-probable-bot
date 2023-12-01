import { IHttpPayload } from "../../common";

export function responseOkMessage({ response }: IHttpPayload) {
  response.send("ok");
}

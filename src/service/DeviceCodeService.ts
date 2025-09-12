import {
  AuthClient,
  IAuthClient,
  VerifyCodeRequest,
} from "../client/MenuMaster.Client.Generated";
import axios from "../service/api";

export class DeviceCodeService {
  private readonly client: IAuthClient;

  constructor(apiUrl: string) {
    this.client = new AuthClient(apiUrl, axios);
  }

  verify = (deviceCode: string): Promise<void> => {
    const body = new VerifyCodeRequest();
    body.code = deviceCode;

    return this.client.verify(body);
  };
}

import axios from "../service/api";
import {
  AccountClient,
  ClientApiException,
  IAccountClient,
  LoginDto,
  RegisterDto,
} from "../client/MenuMaster.Client.Generated";
import { UserDomainModel } from "../domain/UserDomainModel";

export class AccountService {
  private readonly client: IAccountClient;

  constructor(apiUrl: string) {
    this.client = new AccountClient(apiUrl, axios);
  }

  login = (username: string, password: string): Promise<UserDomainModel> => {
    return this.client
      .login(new LoginDto({ username, password }))
      .then((response) => {
        console.log("RESPONSE: ", response);
        const user = new UserDomainModel(
          response.id!,
          response.username!,
          response.email!,
          response.token!
        );

        return Promise.resolve(user);
      })
      .catch((error: ClientApiException) => {
        console.log("ERROR3: ", error.response);
        return Promise.reject(error);
      });
  };

  register = (username: string, password: string): Promise<UserDomainModel> => {
    return this.client
      .register(new RegisterDto({ username, password }))
      .then((response) => {
        console.log(response);
        const user = new UserDomainModel(
          response.id!,
          response.username!,
          response.email!,
          response.token!
        );

        return Promise.resolve(user);
      })
      .catch((error: ClientApiException) => {
        console.log(error.response);
        return Promise.reject(error);
      });
  };
}

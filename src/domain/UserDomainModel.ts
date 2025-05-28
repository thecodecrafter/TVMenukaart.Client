export class UserDomainModel {
  constructor(id: number, username: string, email: string, token: string) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.token = token;
  }

  id!: number;
  username!: string;
  email!: string;
  token!: string;
}

export class JwtResponse {
  accessToken!: string;
  type?: string;
  email?: string;
  user!: user;
  username?: string;
  roles!: string[];

  constructor(accessToken: string, type: string, email: string) {
    this.accessToken = accessToken;
    this.type = type;
    this.user.email = email;
  }
}

export interface user {
  email: string;
  password: string;
}

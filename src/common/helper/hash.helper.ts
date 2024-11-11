import * as bcrypt from 'bcrypt';

export class Password {
  password: string;
  constructor(password: string) {
    this.password = password;
  }

  async hash() {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(this.password, salt);

    return hashPassword;
  }
}

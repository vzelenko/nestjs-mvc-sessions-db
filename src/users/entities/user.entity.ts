import * as bcrypt from 'bcrypt';
export class User {
  public id?: number;
  public email: string;
  public name: string;
  public password: string;

  public setPassword(plainPassword: string) {
    this.password = bcrypt.hashSync(plainPassword, 10);
  }

  public passwordValid(plainPassword: string): boolean {
    return bcrypt.compareSync(plainPassword, this.password);
  }
}

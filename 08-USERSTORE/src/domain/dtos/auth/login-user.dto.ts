import { regularExps } from '../../../config';

export class LoginUserDto {
  private constructor(
    public readonly email: string,
    public readonly password: string,
  ) {}

  static create(object: { [key: string]: any }): [string?, LoginUserDto?] {
    const { email, password } = object;

    if (!email) return ['Email is required'];

    if (!regularExps.email.test(email)) return ['Email is invalid'];

    if (!password) return ['Password is required'];

    if (password.length < 6) return ['Password must be at least 6 characters'];

    return [undefined, new LoginUserDto(email, password)];
  }
}

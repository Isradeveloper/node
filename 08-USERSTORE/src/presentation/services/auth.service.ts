import { BcryptAdapter, JwtAdapter } from '../../config';
import { UserModel } from '../../data/mongo-db';
import {
  CustomError,
  LoginUserDto,
  RegisterUserDto,
  UserEntity,
} from '../../domain';

export class AuthService {
  constructor() {}

  public async registerUser(dto: RegisterUserDto) {
    const existUser = await UserModel.findOne({ email: dto.email });

    if (existUser) throw CustomError.badRequest('User already exists');

    try {
      const user = new UserModel(dto);

      // Encriptar la contraseña
      user.password = BcryptAdapter.hash(dto.password);

      await user.save();

      // JWT <-- Mantener la autenticación del usuario

      // Enviar un correo de validación de email

      const { password, ...rest } = UserEntity.fromObject(user);

      return { user: { ...rest }, token: 'token' };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async loginUser(dto: LoginUserDto) {
    const existUser = await UserModel.findOne({ email: dto.email });

    if (!existUser) throw CustomError.badRequest('User or password incorrect');

    // Comparar las contraseñas
    const isValidPassword = BcryptAdapter.compare(
      dto.password,
      existUser.password,
    );

    if (!isValidPassword)
      throw CustomError.badRequest('User or password incorrect');

    const { password, ...rest } = UserEntity.fromObject(existUser);

    const token = await JwtAdapter.generateToken({ id: existUser.id });

    if (!token) throw CustomError.internalServer('Error generating token');

    return {
      user: { ...rest },
      token,
    };
  }
}

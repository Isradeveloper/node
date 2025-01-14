import { BcryptAdapter, envs, JwtAdapter } from '../../config';
import { UserModel } from '../../data/mongo-db';
import { EmailService } from './email.service';
import {
  CustomError,
  LoginUserDto,
  RegisterUserDto,
  UserEntity,
} from '../../domain';

export class AuthService {
  constructor(private readonly emailService: EmailService) {}

  public async registerUser(dto: RegisterUserDto) {
    const existUser = await UserModel.findOne({ email: dto.email });

    if (existUser) throw CustomError.badRequest('User already exists');

    try {
      const user = new UserModel(dto);

      // Encriptar la contraseña
      user.password = BcryptAdapter.hash(dto.password);

      await user.save();

      // JWT <-- Mantener la autenticación del usuario

      const token = await JwtAdapter.generateToken({ id: user.id });

      if (!token) throw CustomError.internalServer('Error generating token');

      // Enviar un correo de validación de email
      await this.sendEmailValidationLink(user.email);

      const { password, ...rest } = UserEntity.fromObject(user);

      return { user: { ...rest }, token };
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

  public async sendEmailValidationLink(email: string) {
    const token = await JwtAdapter.generateToken({ email });

    if (!token) throw CustomError.internalServer('Error generating token');

    const link = `${envs.WEBSERVICE_URL}/auth/validate-email/${token}`;

    const htmlBody = `
    <h3>Email validation</h3>
    <p>Click <a href="${link}">here</a> to validate your email</p>
    `;

    const isSent = await this.emailService.sendEmail({
      to: email,
      subject: 'Email validation',
      htmlBody,
    });

    if (!isSent) throw CustomError.internalServer('Error sending email');

    return true;
  }

  public async validateEmail(token: string) {
    const payload = await JwtAdapter.validateToken(token);

    if (!payload) throw CustomError.unauthorized('Invalid token');

    const { email } = payload as { email: string };

    if (!email) throw CustomError.internalServer('Email not in token');

    const user = await UserModel.findOne({ email });

    if (!user) throw CustomError.badRequest('Email not found');

    user.emailValidated = true;
    await user.save();

    return true;
  }
}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import {
  AuthResponse,
  LoginDto,
  LoginResponseDto,
} from '../interface/users.dto';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (!user) {
      throw new UnauthorizedException('認証情報が正しくありません');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('認証情報が正しくありません');
    }

    const { ...result } = user;
    return result;
  }

  async login(loginDto: LoginDto): Promise<LoginResponseDto> {
    const user = await this.validateUser(loginDto.username, loginDto.password);

    const payload = { username: user.username, sub: user.id };
    return {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      access_token: this.jwtService.sign(payload),
    };
  }

  async refreshToken(user: User): Promise<AuthResponse> {
    return {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      access_token: this.jwtService.sign(this.createPayload(user)),
    };
  }

  private createPayload(user: any) {
    return { username: user.username, sub: user.id };
  }
}

import { IsNotEmpty, IsString, IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class SignupResponseDto {
  id: number;
  username: string;
  email: string;
}

export class LoginResponseDto {
  user: SignupResponseDto;
  access_token: string;
}

export interface AuthResponse {
  user: SignupResponseDto;
  access_token: string;
  refresh_token?: string;
}

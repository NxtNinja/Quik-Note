import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  Res,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto, LoginAuthAuthDto } from './dto/create-auth.dto';
import { Tokens } from './types/tokens.types';
import { RefreshTokenGuard } from './common/guards/refresh.guard';
import { getCurrentUser } from './common/decorators/getCurrentUser.decorator';
import { Public } from './common/decorators/public.decorator';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('/signup')
  signup(@Body() createAuthDto: CreateAuthDto): Promise<Tokens> {
    return this.authService.signup(createAuthDto);
  }

  @Public()
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() loginAuthDto: LoginAuthAuthDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Tokens> {
    const tokens = await this.authService.login(loginAuthDto);

    res.setHeader('set-cookie', [
      `a_token = ${tokens.access_token}; path = /; HttpOnly; Secure`,
      `r_token = ${tokens.refresh_token}; path = /; HttpOnly; Secure`,
    ]);

    return tokens;
  }

  @Post('/logout')
  @HttpCode(HttpStatus.OK)
  logout(
    @getCurrentUser('sub') userid: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    console.log(userid);

    res.cookie('a_token', 'expired', {
      httpOnly: true,
      expires: new Date(0), // Set the expiration date to the past
      path: '/', // Specify the path to which the cookie belongs
      secure: true, // Make the cookie accessible only over HTTPS if needed
      sameSite: 'strict', // Enforce same-site cookie policy if needed
    });

    return this.authService.logout(userid);
  }

  @Get('currentUser')
  getUser(@getCurrentUser('sub') userId: string) {
    return this.authService.getUser(userId);
  }

  @Public()
  @UseGuards(RefreshTokenGuard)
  @Post('/refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(
    @getCurrentUser('sub') userid: string,
    @getCurrentUser('refreshToken') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Tokens> {
    const tokens = await this.authService.refresh(userid, refreshToken);

    res.setHeader('set-cookie', [
      `a_token = ${tokens.access_token}; path = /; HttpOnly; Secure`,
      `r_token = ${tokens.refresh_token}; path = /; HttpOnly; Secure`,
    ]);

    return tokens;
  }
}

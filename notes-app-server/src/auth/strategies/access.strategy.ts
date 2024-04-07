import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { Request } from 'express';

type jwtPayload = {
  sub: string;
  email: string;
};

@Injectable()
export class AccessStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: AccessStrategy.jwtFromRequest,
      secretOrKey: 'access_secret@1234',
    });
  }

  private static jwtFromRequest(req: Request): string | null {
    let token = null;
    if (
      req.headers.authorization &&
      req.headers.authorization.split(' ')[0] === 'Bearer'
    ) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies && req.cookies['a_token']) {
      token = req.cookies['a_token'];
    }
    return token;
  }

  validate(payload: jwtPayload) {
    if (!payload) {
      throw new UnauthorizedException('Invalid token');
    }
    console.log(payload);

    return payload;
  }
}

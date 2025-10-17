import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from '../token-payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  // No private readonly because we only need configService inside constructor
  // If you only use it inside the constructor (e.g., in super()), you don’t need private readonly.
  // If you might need it later (e.g., in validate()), you should add it.
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => request.cookies.Authentication,
      ]),
      // Can't use this before super()
      // Must use constructor parameter directly
      secretOrKey: configService.getOrThrow('JWT_SECRET'),
    });
  }

  validate(payload: TokenPayload) {
    return payload;
  }
}

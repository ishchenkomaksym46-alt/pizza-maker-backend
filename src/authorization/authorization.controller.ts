import {
    Body,
    Controller,
    Post,
    Req,
    Res,
    UnauthorizedException,
    HttpStatus,
    Get,
    UseGuards,
    Delete
} from '@nestjs/common';
import { AuthorizationService } from './authorization.service';
import {LoginDto} from "../types/authorization.dto";
import type {Response, Request} from "express";
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    name?: string;
    role: string;
  };
  cookies: Record<string, string>;
}

@Controller('auth')
export class AuthorizationController {
  constructor(private readonly authorizationService: AuthorizationService) {}

  @Post('login')
  async login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {
    const user = await this.authorizationService.validateUser(dto);
    const safeUser = { id: user.id, email: user.email, name: user.name ?? undefined, role: user.role ?? undefined };
    const tokens = await this.authorizationService.generateTokensForUser(safeUser);

    res.cookie('refreshToken', tokens.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(HttpStatus.OK);
    return {
      success: true,
      data: {
        accessToken: tokens.accessToken,
        user: { id: user.id, email: user.email, name: user.name },
      },
    }
  }

  @Post('signup')
  async signup(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {
    const user = await this.authorizationService.registerUser(dto);
    const safeUser = { id: user.id, email: user.email, name: user.name };
    const tokens = await this.authorizationService.generateTokensForUser(safeUser);

    res.cookie('refreshToken', tokens.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(HttpStatus.OK);
    return {
      success: true,
      data: {
        accessToken: tokens.accessToken,
        user: { id: user.id, email: user.email, name: user.name },
      },
    }
  }

  @Post('refresh')
  async refresh(@Req() req: AuthRequest) {
      const refreshToken = req.cookies?.refreshToken;
      if (!refreshToken) throw new UnauthorizedException('No refresh token provided');

      const tokens = await this.authorizationService.refresh(refreshToken);
      return {
        success: true,
        data: tokens,
      };
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async me(@Req() req: AuthRequest & any) {
      const user = req.user;
      return {
        success: true,
        data: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      };
  }
}

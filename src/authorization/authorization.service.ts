import { Injectable, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import {LoginDto} from "../types/authorization.dto";
import {PrismaService} from "../prisma.service";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import {ConfigService} from "@nestjs/config";

@Injectable()
export class AuthorizationService {
    constructor(private readonly prisma: PrismaService,
                private readonly jwtService: JwtService,
                private readonly configService: ConfigService) {}

    async validateUser(dto: LoginDto) {
        const user = await this.prisma.users.findUnique({ where: { email: dto.email } });
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isMatch = await bcrypt.compare(dto.password, user.password);
        if (!isMatch) {
            throw new UnauthorizedException('Invalid credentials');
        }

        return user;
    }

    async registerUser(dto: LoginDto) {
        // Проверяем, что пользователь с таким email не существует
        const existingUser = await this.prisma.users.findUnique({ where: { email: dto.email } });
        if (existingUser) {
            throw new UnauthorizedException('User with this email already exists');
        }

        // Хешируем пароль
        const hashedPassword = await bcrypt.hash(dto.password, 10);

        // Создаём пользователя в БД
        const user = await this.prisma.users.create({
            data: {
                email: dto.email,
                password: hashedPassword,
                name: dto.name || "User"
            },
        });

        return user;
    }

    async generateTokensForUser(user: { id: string; email: string; name?: string | null; role?: string | null }) {
        try {
            const payload = {
                sub: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
            };

            const accessToken = await this.jwtService.signAsync(payload, {
                secret: this.configService.get<string>('JWT_SECRET'),
                expiresIn: '15m',
            });

            const refreshToken = await this.jwtService.signAsync(payload, {
                secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
                expiresIn: '7d',
            });

            return {
                accessToken,
                refreshToken,
            };
        } catch (err) {
            throw new InternalServerErrorException('Failed to generate tokens');
        }
    }

    async refresh(refreshToken: string) {
        try {
            const payload = await this.jwtService.verifyAsync(refreshToken, {
                secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
            });

            const newAccessToken = await this.jwtService.signAsync(payload, {
                secret: this.configService.get<string>('JWT_SECRET'),
                expiresIn: '15m',
            });

            return {
                accessToken: newAccessToken,
            }
        } catch (err) {
            throw new UnauthorizedException('Invalid refresh token');
        }
    }
}

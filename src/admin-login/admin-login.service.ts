import {
    BadRequestException,
    HttpException,
    Injectable,
    InternalServerErrorException,
    UnauthorizedException,
} from '@nestjs/common';
import {ConfigService} from "@nestjs/config";
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt'

@Injectable()
export class AdminLoginService {
    constructor(private readonly configService: ConfigService,
                private readonly jwtService: JwtService) {}

    async login(password: string) {
        try {
            const adminPasswordEnv = this.configService.get<string>('ADMIN_PASSWORD');
            const jwtSecret = this.configService.get<string>('JWT_SECRET');

            if(!adminPasswordEnv){
                throw new InternalServerErrorException('Missing admin password');
            } else if(!jwtSecret){
                throw new InternalServerErrorException('Missing JWT secret');
            } else if(!password){
                throw new BadRequestException('Missing user password');
            }

            const res = await bcrypt.compare(password, adminPasswordEnv);

            if (!res) {
                throw new UnauthorizedException('Invalid password');
            }

            const accessToken = await this.jwtService.signAsync(
                {
                    sub: 'admin',
                    email: 'admin',
                    name: 'Admin',
                    role: 'admin',
                },
                {
                    secret: jwtSecret,
                    expiresIn: '15m',
                },
            );

            return {accessToken, success: true};
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }

            console.log(error);

            throw new InternalServerErrorException(error.message);
        }
    }
}

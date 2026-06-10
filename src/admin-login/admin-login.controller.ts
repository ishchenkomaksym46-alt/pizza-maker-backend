import {Controller, Get, Post, Query, UseGuards} from '@nestjs/common';
import {AdminLoginService} from './admin-login.service';
import {Roles} from "../decorators/roles.decorator";
import {RoleEnum} from "../types/enums";
import {RolesGuard} from "../guards/roles.guard";
import {JwtAuthGuard} from "../guards/jwt-auth.guard";

@Controller('admin-login')
export class AdminLoginController {
  constructor(private readonly adminConsoleService: AdminLoginService) {}

  @Post('login')
  login(@Query('password') password: string) {
      return this.adminConsoleService.login(password);
  }

  @Roles(RoleEnum.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('check-token')
  checkToken() {
    return { success: true };
  }
}

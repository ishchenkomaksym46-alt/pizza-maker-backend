import {Body, Controller, Post} from "@nestjs/common";
import { AuthService } from "./auth.service";
import {RegisterDto} from "../types/authorization.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  register(@Body() dto: RegisterDto) {
    
  }
}

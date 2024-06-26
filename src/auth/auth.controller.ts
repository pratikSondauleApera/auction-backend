import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { LoginDto } from "src/validations/userValidation/loginUser.dto";
import { AuthService } from "./auth.service";

@ApiTags('Login')
@Controller()
export class AuthContoller {

    constructor(
        private authService: AuthService
    ) { }

    @Post()
    login(@Body() data: LoginDto) {
        return this.authService.login(data)
    }
}

import { Body, Controller, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "src/validations/userValidation/createUser.dto";
import { ApiTags } from "@nestjs/swagger";
import { SendOtpToEmail } from "src/validations/userValidation/sendOtpToEmail.dto";
import { VerifyEmailDto } from "src/validations/userValidation/verifyEmail.dto";

@ApiTags('Users')
@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) { }

    @Post('create-user')
    createUser(@Body() data: CreateUserDto) {
        return this.usersService.createUser(data)
    }

    @Post('send-otp-email')
    sendOtpToEmail(@Body() data: SendOtpToEmail) {
        return this.usersService.sendOtpToEmail(data)
    }

    @Post('verify-email')
    verifyEmail(@Body() data: VerifyEmailDto) {
        return this.usersService.verifyEmail(data)
    }
}
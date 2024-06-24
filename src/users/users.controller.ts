import { Body, Controller, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "src/validations/userValidation/createUser.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Users')
@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) { }

    @Post('create-user')
    createUser(@Body() data: CreateUserDto) {
        return this.usersService.createUser(data)
    }
}
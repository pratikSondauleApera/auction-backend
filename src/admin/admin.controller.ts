import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AdminService } from "./admin.service";
import { CreateDataEntryUserDto } from "src/validations/adminValidation/createDataEntryUser.dto";

@ApiTags('Admin')
@Controller('admin')
export class AdminController {

    constructor(private adminService: AdminService) { }

    @Post('create-user')
    createDataEntryUser(@Body() data: CreateDataEntryUserDto) {
        return this.adminService.createDataEntryUser(data)
    }
}
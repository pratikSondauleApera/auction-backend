import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { DataEntryService } from "./dataEntry.service";
import { CreateDataEntryUserDto } from "src/validations/adminValidation/createDataEntryUser.dto";

@ApiTags('Data Entry')
@Controller('data-entry')
export class DataEntryController {

    constructor(private adminService: DataEntryService) { }

    @Post('create-user')
    createDataEntryUser(@Body() data: CreateDataEntryUserDto) {
        return this.adminService.createDataEntryUser(data)
    }
}
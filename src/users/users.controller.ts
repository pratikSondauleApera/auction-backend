import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "src/validations/userValidation/createUser.dto";
import { ApiParam, ApiTags } from "@nestjs/swagger";
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

    @Get('countries')
    getCountries() {
        return this.usersService.getCountries()
    }

    @Get('states-by-country/:countryId')
    @ApiParam({
        name: "countryId",
        type: String
    })
    getStatesByCountry(@Param('countryId') countryId: string) {
        return this.usersService.getStatesByCountry(countryId)
    }

    @Get('states')
    getAllStates() {
        return this.usersService.getAllStates()
    }

    @Get('cities-by-state/:stateId')
    @ApiParam({
        name: "stateId",
        type: String
    })
    getCities(@Param('stateId') stateId: string) {
        return this.usersService.getCitiesByState(stateId)
    }

    @Get('cities')
    getAllCities() {
        return this.usersService.getAllCities()
    }

    @Get('locations-by-city/:cityId')
    @ApiParam({
        name: "cityId",
        type: String
    })
    getLocationsByCity(@Param('cityId') cityId: string) {
        return this.usersService.getLocationByCity(cityId)
    }

    @Get('locations')
    getAllLocations() {
        return this.usersService.getAllLocations()
    }
}
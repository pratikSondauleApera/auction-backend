import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Roles } from "@prisma/client";
import { PrismaService } from "src/services/prisma.service";
import { CreateDataEntryUserDto } from "src/validations/adminValidation/createDataEntryUser.dto";
import { Md5 } from "ts-md5";

@Injectable()
export class DataEntryService {

    constructor(
        private prisma: PrismaService
    ) { }

    async createDataEntryUser(data: CreateDataEntryUserDto) {

        const getCity = await this.prisma.cities.findUnique({
            where: {
                id: data?.cityId
            }
        })

        const getState = await this.prisma.states.findUnique({
            where: {
                id: data?.stateId
            }
        })

        if (!getCity || !getState) {
            throw new HttpException('Something went wrong while fetching city or state', HttpStatus.NOT_FOUND)
        }

        const existingUserWithEmail = await this.prisma.users.findFirst({
            where: {
                email: data?.email
            }
        })

        if (existingUserWithEmail) {
            throw new HttpException('This email is already registered', HttpStatus.CONFLICT)
        }

        const existingUserWithPhone = await this.prisma.users.findFirst({
            where: {
                phone: data?.phone
            }
        })

        if (existingUserWithPhone) {
            throw new HttpException('This mobile number is already registered', HttpStatus.CONFLICT)
        }

        try {

            const hashedPassword = Md5.hashStr(data?.password?.trim())

            const userData = {
                firstName: data?.firstName,
                lastName: data?.lastName,
                email: data?.email.trim(),
                password: hashedPassword,
                phone: data?.phone,
                address: data?.address,
                cityId: getCity.id,
                stateId: getState.id,
                pincode: data?.pincode,
                role: Roles.DE
            }

            const createUser = await this.prisma.users.create({
                data: userData
            })

            return {
                status: true,
                statusCode: HttpStatus.CREATED,
                user: createUser,
                msg: "User created successfully"
            }
        } catch (error) {
            console.log(error)
            throw new HttpException('Something went wrong while creating user', HttpStatus.FORBIDDEN)
        }
    }
}
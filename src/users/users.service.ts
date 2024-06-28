import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Roles } from "@prisma/client";
import { PrismaService } from "src/prisma.service";
import { SendgridService } from "src/services/sendEmail.service";
import { CreateUserDto } from "src/validations/userValidation/createUser.dto";
import { SendOtpToEmail } from "src/validations/userValidation/sendOtpToEmail.dto";
import { VerifyEmailDto } from "src/validations/userValidation/verifyEmail.dto";
import { Md5 } from "ts-md5";

@Injectable()
export class UsersService {

    constructor(
        private prisma: PrismaService,
        private readonly sendgridService: SendgridService
    ) { }

    async createUser(data: CreateUserDto) {

        if (data?.role === 'ADMIN') {
            throw new HttpException("You don't have permission to create users", HttpStatus.BAD_REQUEST)
        }

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
                role: Roles.USER
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

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async generateOtp(limit: number) {
        var digits = '0123456789';
        let otp = '';
        for (let i = 0; i < limit; i++) {
            otp += digits[Math.floor(Math.random() * 10)];
        }
        return otp;
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async sendOtpToEmail(data: SendOtpToEmail) {

        const otp = await this.generateOtp(4)

        const mail = {
            to: data?.email,
            subject: 'Email Verification',
            from: {
                email: 'pratik@aperasoftwares.com',
                name: 'Auction'
            },
            html: `<p>Here is your OTP <b>${otp}</b> for email verification</p>`
        };

        const user = await this.prisma.users.update({
            where: {
                email: data?.email
            },
            data: {
                otp: otp,
                otpCreatedAt: new Date()
            }
        })

        try {
            const sendOtpToEmail = await this.sendgridService.send(mail);

            return {
                status: true,
                statusCode: HttpStatus.OK,
                sentEmail: sendOtpToEmail,
                msg: "OTP sent to your email successfully"
            }
        } catch (error) {
            console.error(error);
            throw new HttpException('Something went wrong while sending email', HttpStatus.FORBIDDEN);
        }
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async verifyEmail(data: VerifyEmailDto) {

        const user = await this.prisma.users.findUnique({
            where: {
                email: data?.email,
                verified: false
            }
        })

        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND)
        }

        const otpCreatedAt = new Date(user?.otpCreatedAt).getTime()

        const validityDuration = 10 * 60 * 1000

        const expireOtpInTime = otpCreatedAt + validityDuration

        const currentTime = new Date().getTime()

        if (currentTime > expireOtpInTime) {
            return {
                status: false,
                msg: 'Your OTP has expired'
            }
        }

        if (user?.otp === data?.otp) {

            try {

                const verifyUser = await this.prisma.users.update({
                    where: {
                        email: user?.email
                    },
                    data: {
                        verified: true,
                        active: true
                    }
                })

                return {
                    status: true,
                    statusCode: HttpStatus.OK,
                    verifiedUser: verifyUser,
                    msg: "Email verified successfully"
                }
            } catch (error) {
                console.log(error)
                throw new HttpException('Something went wrong while verifying user email', HttpStatus.FORBIDDEN)
            }
        }

    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async getCountries() {
        try {
            const getAllCountries = await this.prisma.countries.findMany({})

            return {
                status: true,
                statusCode: HttpStatus.OK,
                countries: getAllCountries,
                msg: "Fetched countries successfully"
            }

        } catch (error) {
            console.log(error)
            throw new HttpException("Something went wrong while fetching countries", HttpStatus.FORBIDDEN)
        }
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async getStatesByCountry(countryId: string) {

        const country = await this.prisma.countries.findUnique({
            where: {
                id: countryId
            }
        })

        if (!country) {
            throw new HttpException('Country not found', HttpStatus.NOT_FOUND)
        }

        try {
            const getStates = await this.prisma.states.findMany({
                where: {
                    countryId: country.id
                }
            })

            return {
                status: true,
                statusCode: HttpStatus.OK,
                states: getStates,
                msg: "Fetched states successfully"
            }
        } catch (error) {
            console.log(error)
            throw new HttpException("Something went wrong while fetching states", HttpStatus.FORBIDDEN)
        }
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async getAllStates() {
        try {
            const getAllStates = await this.prisma.states.findMany({})

            return {
                status: true,
                statusCode: HttpStatus.OK,
                states: getAllStates,
                msg: "Fetched states successfully"
            }

        } catch (error) {
            console.log(error)
            throw new HttpException("Something went wrong while fetching states", HttpStatus.FORBIDDEN)
        }
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async getCitiesByState(stateId: string) {

        const state = await this.prisma.states.findUnique({
            where: {
                id: stateId
            }
        })

        if (!state) {
            throw new HttpException('State not found', HttpStatus.NOT_FOUND)
        }

        try {
            const getCities = await this.prisma.cities.findMany({
                where: {
                    stateId: state.id
                }
            })

            return {
                status: true,
                statusCode: HttpStatus.OK,
                cities: getCities,
                msg: "Fetched cities successfully"
            }
        } catch (error) {
            console.log(error)
            throw new HttpException("Something went wrong while fetching cities", HttpStatus.FORBIDDEN)
        }
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async getAllCities() {
        try {
            const getAllCities = await this.prisma.cities.findMany({})

            return {
                status: true,
                statusCode: HttpStatus.OK,
                cities: getAllCities,
                msg: "Fetched cities successfully"
            }

        } catch (error) {
            console.log(error)
            throw new HttpException("Something went wrong while fetching cities", HttpStatus.FORBIDDEN)
        }
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async getLocationByCity(cityId: string) {

        const city = await this.prisma.cities.findUnique({
            where: {
                id: cityId
            }
        })

        if (!city) {
            throw new HttpException('City not found', HttpStatus.NOT_FOUND)
        }

        try {
            const getLocations = await this.prisma.locations.findMany({
                where: {
                    cityId: city.id
                }
            })

            return {
                status: true,
                statusCode: HttpStatus.OK,
                locations: getLocations,
                msg: "Fetched locations successfully"
            }
        } catch (error) {
            console.log(error)
            throw new HttpException("Something went wrong while fetching locations", HttpStatus.FORBIDDEN)
        }
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async getAllLocations() {
        try {
            const getAllLocations = await this.prisma.locations.findMany({})

            return {
                status: true,
                statusCode: HttpStatus.OK,
                locations: getAllLocations,
                msg: "Fetched locations successfully"
            }

        } catch (error) {
            console.log(error)
            throw new HttpException("Something went wrong while fetching locations", HttpStatus.FORBIDDEN)
        }
    }
}
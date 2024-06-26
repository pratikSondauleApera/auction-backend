import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma.service";
import { LoginDto } from "src/validations/userValidation/loginUser.dto";
import { Md5 } from "ts-md5";

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService
    ) { }

    async login(data: LoginDto) {

        const user = await this.prisma.users.findUnique({
            where: {
                email: data?.email
            }
        })

        if (!user) {
            throw new HttpException('User did not exist', HttpStatus.NOT_FOUND)
        }

        if (user?.role !== 'ADMIN' && user?.verified === false) {
            return {
                status: false,
                statusCode: HttpStatus.FORBIDDEN,
                msg: "Your email is not verified"
            }
        }

        const hashedPassword = Md5.hashStr(data?.password.trim())

        if (user?.email !== data?.email || user?.password !== hashedPassword) {
            return {
                status: false,
                statusCode: HttpStatus.UNAUTHORIZED,
                msg: "Invalid email or password"
            }
        }

        try {
            const payload = { id: user?.id, role: user?.role }

            let jwtToken = await this.jwtService.signAsync(payload, {
                privateKey: process.env.JWT_SECRET
            })

            return {
                status: true,
                statusCode: HttpStatus.OK,
                token: jwtToken,
                msg: "Sign-in successfully"
            }
        } catch (error) {
            throw new HttpException('Something went wrong while sign in', HttpStatus.FORBIDDEN)
        }
    }
}
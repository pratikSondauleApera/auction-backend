import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './services/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { SendgridService } from './services/sendEmail.service';
import { UsersModule } from './users/users.module';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { AuthModule } from './auth/auth.module';
import { AuthContoller } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AdminModule } from './admin/admin.module';
import { AdminController } from './admin/admin.controller';
import { AdminService } from './admin/admin.service';
import { AuctionsModule } from './auctions/auctions.module';
import { AuctionsController } from './auctions/auctions.controller';
import { AuctionsService } from './auctions/auctions.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    UsersModule,
    AuthModule,
    AdminModule,
    AuctionsModule,
  ],
  controllers: [
    AppController,
    UsersController,
    AuthContoller,
    AdminController,
    AuctionsController,
  ],
  providers: [
    AppService,
    PrismaService,
    JwtService,
    SendgridService,
    UsersService,
    AuthService,
    AdminService,
    AuctionsService,
  ],
})
export class AppModule { }

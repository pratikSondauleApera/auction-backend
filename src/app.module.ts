import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AuctionsModule } from './auctions/auctions.module';
import { AdminModule } from './admin/admin.module';

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
    AppController
  ],
  providers: [
    AppService
  ],
})
export class AppModule { }

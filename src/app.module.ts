import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import {
  SEQUELIZE_DATABASE,
  SEQUELIZE_HOST,
  SEQUELIZE_PASSWORD,
  SEQUELIZE_PORT,
  SEQUELIZE_USERNAME,
} from './lib/constants';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: SEQUELIZE_HOST,
      port: SEQUELIZE_PORT,
      username: SEQUELIZE_USERNAME,
      password: SEQUELIZE_PASSWORD,
      database: SEQUELIZE_DATABASE,
      autoLoadModels: true,
    }),
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

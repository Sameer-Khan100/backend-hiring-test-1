import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { CallModule } from './Calls/call.module';
import { VoicemailModule } from './Voicemails/voicemail.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Load environment variables globally
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT) || 5432,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadModels: true,
      synchronize: false,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false, // Allow self-signed certificates
        },
      },
    }),    
    CallModule,
    VoicemailModule,
  ],
})
export class AppModule {}

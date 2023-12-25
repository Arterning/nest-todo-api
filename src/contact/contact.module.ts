import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { ContactRepository } from '../db/repositories/ContactRepository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ContactRepository])],
  controllers: [ContactController],
  providers: [ContactService],
})
export class ContactModule {}

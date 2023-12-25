import { Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { ContactRepository } from '../db/repositories/ContactRepository';
import { Contact } from './entities/contact.entity';

@Injectable()
export class ContactService {
  constructor(private readonly contactRepository: ContactRepository) {}

  create(createContactDto: CreateContactDto) {
    const contact = Object.assign(new Contact(), createContactDto);
    return this.contactRepository.save(contact);
  }

  findAll() {
    return this.contactRepository.find();
  }

  findOne(id: number) {
    return this.contactRepository.findOne(id);
  }

  update(id: number, updateContactDto: UpdateContactDto) {
    return this.contactRepository.update(id, {
      phone: updateContactDto.phone,
      address: updateContactDto.address,
    });
  }

  remove(id: number) {
    return this.contactRepository.delete({
      id,
    });
  }
}

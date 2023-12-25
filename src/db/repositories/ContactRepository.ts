import { EntityRepository, Repository } from 'typeorm';
import { Contact } from '../../contact/entities/contact.entity';

@EntityRepository(Contact)
export class ContactRepository extends Repository<Contact> {}

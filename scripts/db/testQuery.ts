import ormConfig from './config';
import { createConnection } from 'typeorm';
import { Contact } from '../../src/contact/entities/contact.entity';

const query = async () => {
  const connection = await createConnection(ormConfig);

  const repository = connection.getRepository<Contact>(Contact);

  const one = await repository
    .createQueryBuilder('cc')
    .where('cc.id = :id')
    .orWhere('cc.phone = :phone')
    .setParameters({
      phone: 2323,
      id: 1,
    })
    .getMany();
  console.log(one);
  return one;
};

query()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });

import { IsString } from 'class-validator';

export class CreateContactDto {
  @IsString()
  phone: string; // 电话

  @IsString()
  address?: string; // 地址
}

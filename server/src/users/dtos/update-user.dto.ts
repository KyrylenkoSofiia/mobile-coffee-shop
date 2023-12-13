import { IsNotEmpty, IsString } from 'class-validator';

export class updateUserDto {
  @IsNotEmpty()
  @IsString()
  mail: string;
  @IsString()
  @IsNotEmpty()
  userName: string;
}

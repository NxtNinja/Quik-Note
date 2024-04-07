import { IsNotEmpty } from 'class-validator';

export class CreateCollectionDto {
  @IsNotEmpty()
  user_created: string;

  @IsNotEmpty()
  coll_name: string;

  @IsNotEmpty()
  coll_description: string;
}

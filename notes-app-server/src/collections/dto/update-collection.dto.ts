import { IsNotEmpty } from 'class-validator';

export class UpdateCollectionDto {
  @IsNotEmpty()
  user_created: string;

  @IsNotEmpty()
  coll_name: string;

  @IsNotEmpty()
  coll_description: string;
}

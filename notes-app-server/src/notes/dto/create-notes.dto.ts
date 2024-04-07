import { IsNotEmpty } from 'class-validator';

export class CreateNotesDto {
  @IsNotEmpty()
  collection_id: string;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  content: string;
}

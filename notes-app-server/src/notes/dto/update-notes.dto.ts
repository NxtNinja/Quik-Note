import { IsNotEmpty } from 'class-validator';

export class UpdateNotesDto {
  @IsNotEmpty()
  collection_id: string;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  content: string;
}

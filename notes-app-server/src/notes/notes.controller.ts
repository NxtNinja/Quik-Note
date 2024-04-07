import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNotesDto } from './dto/create-notes.dto';
import { UpdateNotesDto } from './dto/update-notes.dto';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get('get/:id')
  getNotes(@Param('id') collectionId: string) {
    return this.notesService.getNotes(collectionId);
  }

  @Get('get-one/:id')
  getCollectionById(@Param('id') noteId: string) {
    return this.notesService.getANote(noteId);
  }

  @Post('add')
  createNote(@Body() createNotesDto: CreateNotesDto) {
    return this.notesService.createNote(createNotesDto);
  }

  @Patch('update/:id')
  updateNote(
    @Body() updateNoteDto: UpdateNotesDto,
    @Param('id') noteId: string,
  ) {
    return this.notesService.updateNote(updateNoteDto, noteId);
  }

  @Delete('delete/:id')
  deleteNote(@Param('id') noteId: string) {
    return this.notesService.deleteNote(noteId);
  }
}

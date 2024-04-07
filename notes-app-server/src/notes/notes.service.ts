import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateNotesDto } from './dto/create-notes.dto';
import { UpdateNotesDto } from './dto/update-notes.dto';

@Injectable()
export class NotesService {
  constructor(private prisma: PrismaService) {}

  async getNotes(collectionId: string) {
    if (collectionId !== undefined) {
      try {
        const allNotes = await this.prisma.note.findMany({
          where: {
            collection: {
              id: collectionId,
            },
          },
        });

        if (!allNotes) {
          return { message: 'Could not get notes' };
        }

        return { status: 200, message: 'OK', data: allNotes };
      } catch (error) {
        throw new InternalServerErrorException('Internal Server Error');
      }
    }
  }

  async getANote(noteId: string) {
    if (noteId !== undefined) {
      try {
        const note = await this.prisma.note.findUnique({
          where: {
            id: noteId,
          },
        });

        if (!note) {
          return { message: 'Unable to fetch details' };
        }

        return { status: 200, message: 'OK', data: note };
      } catch (error) {
        throw new InternalServerErrorException('Internal server error');
      }
    } else {
      return { message: 'Invalid note id' };
    }
  }

  async createNote(createNotesDto: CreateNotesDto) {
    const { collection_id, ...rest } = createNotesDto;
    try {
      const newNote = await this.prisma.note.create({
        data: {
          ...rest,
          collection: {
            connect: {
              id: collection_id,
            },
          },
        },
      });

      if (!newNote) {
        return { message: 'Could not create note' };
      }

      return { status: 201, message: 'CREATED', data: newNote };
    } catch (error) {
      throw new InternalServerErrorException('Internal Server Error');
    }
  }

  async updateNote(updateNotesDto: UpdateNotesDto, noteId: string) {
    if (noteId !== undefined) {
      const { collection_id, ...rest } = updateNotesDto;
      try {
        const changeNote = await this.prisma.note.update({
          where: {
            id: noteId,
          },

          data: {
            ...rest,
            collection: {
              connect: {
                id: collection_id,
              },
            },
          },
        });

        if (!changeNote) {
          return { message: 'Could not update note' };
        }

        return { status: 200, message: 'UPDATED', data: changeNote };
      } catch (error) {
        throw new InternalServerErrorException('Internal Server Error');
      }
    }
  }

  async deleteNote(noteId: string) {
    if (noteId !== undefined) {
      try {
        await this.prisma.note.delete({
          where: {
            id: noteId,
          },
        });

        return { status: 200, message: 'DELETED', data: noteId };
      } catch (error) {
        throw new InternalServerErrorException('Internal Server Error');
      }
    }
  }
}

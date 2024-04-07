import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCollectionDto } from './dto/create-collections.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';

@Injectable()
export class CollectionsService {
  constructor(private prisma: PrismaService) {}

  async getCollections(userId: string) {
    try {
      const collections = await this.prisma.collection.findMany({
        where: {
          user: {
            id: userId,
          },
        },
      });

      if (collections.length === 0) {
        return { message: 'No data' };
      }

      return { status: 200, message: 'OK', data: collections };
    } catch (error) {
      throw new InternalServerErrorException('Internal Server Error');
    }
  }

  async getACollection(collectionId: string) {
    if (collectionId !== undefined) {
      try {
        const collection = await this.prisma.collection.findUnique({
          where: {
            id: collectionId,
          },
        });

        if (!collection) {
          return { message: 'Unable to fetch details' };
        }

        return { status: 200, message: 'OK', data: collection };
      } catch (error) {
        throw new InternalServerErrorException('Internal server error');
      }
    } else {
      return { message: 'Invalid collection id' };
    }
  }

  async postCollections(createCollectionDto: CreateCollectionDto) {
    const { user_created, ...rest } = createCollectionDto;
    try {
      const newCollection = await this.prisma.collection.create({
        data: {
          ...rest,
          user: {
            connect: {
              id: user_created,
            },
          },
        },
      });

      if (!newCollection) {
        return { message: 'Failed to create' };
      }

      return { status: 201, message: 'CREATED', data: newCollection };
    } catch (error) {
      throw new InternalServerErrorException('Internal Server Error');
    }
  }

  async updateCollection(
    updateCollectionDto: UpdateCollectionDto,
    collectionId: string,
  ) {
    if (collectionId !== undefined) {
      const { user_created, ...rest } = updateCollectionDto;
      try {
        const changeData = await this.prisma.collection.update({
          where: {
            id: collectionId,
          },
          data: {
            ...rest,
            user: {
              connect: {
                id: user_created,
              },
            },
          },
        });

        if (!changeData) {
          return { message: 'Failed to update' };
        }

        return { status: 200, message: 'UPDATED', data: changeData };
      } catch (error) {
        throw new InternalServerErrorException('Internal Server Error');
      }
    }
  }

  async deleteCollection(collectionId: string) {
    if (collectionId !== undefined) {
      try {
        const notes = await this.prisma.note.findMany({
          where: {
            collection_id: collectionId,
          },
        });

        // Delete all notes associated with the collection
        await Promise.all(
          notes.map(async (note) => {
            await this.prisma.note.delete({
              where: {
                id: note.id,
              },
            });
          }),
        );

        await this.prisma.collection.delete({
          where: {
            id: collectionId,
          },
        });

        return { status: 200, message: 'DELETED', data: collectionId };
      } catch (error) {
        throw new InternalServerErrorException('Internal Server Error');
      }
    }
  }
}

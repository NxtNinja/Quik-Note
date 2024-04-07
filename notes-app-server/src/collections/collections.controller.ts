import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CollectionsService } from './collections.service';
import { CreateCollectionDto } from './dto/create-collections.dto';
import { getCurrentUser } from 'src/auth/common/decorators/getCurrentUser.decorator';
import { UpdateCollectionDto } from './dto/update-collection.dto';

@Controller('collections')
export class CollectionsController {
  constructor(private collectionsService: CollectionsService) {}

  @Get('get')
  getCollections(@getCurrentUser('sub') userId: string) {
    return this.collectionsService.getCollections(userId);
  }

  @Get('get-one/:id')
  getCollectionById(@Param('id') collectionId: string) {
    return this.collectionsService.getACollection(collectionId);
  }

  @Post('add')
  postCollections(@Body() createCollectionDto: CreateCollectionDto) {
    return this.collectionsService.postCollections(createCollectionDto);
  }

  @Patch('update/:id')
  updateCollection(
    @Body() updateCollectionDto: UpdateCollectionDto,
    @Param('id') collectionId: string,
  ) {
    return this.collectionsService.updateCollection(
      updateCollectionDto,
      collectionId,
    );
  }

  @Delete('delete/:id')
  deleteCollection(@Param('id') collectionId: string) {
    return this.collectionsService.deleteCollection(collectionId);
  }
}

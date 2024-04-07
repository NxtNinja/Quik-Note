import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { AccessTokenGuard } from './auth/common/guards/access.guard';
import { APP_GUARD } from '@nestjs/core';
import { CollectionsModule } from './collections/collections.module';
import { NotesModule } from './notes/notes.module';

@Module({
  imports: [PrismaModule, AuthModule, CollectionsModule, NotesModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
  ],
})
export class AppModule {}

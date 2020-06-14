import { Module } from '@nestjs/common';
import { NotesModule } from './notes/notes.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql',
    }),
    NotesModule,
    MongooseModule.forRoot('mongodb://localhost/casfee-vanillajs-spa', {
      useFindAndModify: false,
    }),
  ],
})
export class AppModule {}

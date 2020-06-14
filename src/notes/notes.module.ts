import { Module } from '@nestjs/common';
import { NotesResolver } from './notes.resolver';
import { NotesService } from './notes.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Note as NoteModel, NoteSchema } from './schemas/note.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: NoteModel.name, schema: NoteSchema }]),
  ],
  providers: [NotesResolver, NotesService],
})
export class NotesModule {}

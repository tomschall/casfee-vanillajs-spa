import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import { NewNoteInput } from './dto/new-note.input';
import { Note } from './models/note.model';
import { NotesService } from './notes.service';
import { UpdateNoteInput } from './dto/update-note.input';

const pubSub = new PubSub();

@Resolver((of) => Note)
export class NotesResolver {
  constructor(private readonly notesService: NotesService) {}

  @Query((returns) => Note)
  async note(@Args('id') id: string): Promise<Note> {
    const note = await this.notesService.findOneById(id);
    if (!note) {
      throw new NotFoundException(id);
    }
    return note;
  }

  @Query((returns) => [Note])
  async notes(): Promise<Note[]> {
    return this.notesService.findAll();
  }

  @Mutation((returns) => Note)
  async addNote(@Args('newNoteData') newNoteData: NewNoteInput): Promise<Note> {
    newNoteData.createDate = new Date();
    const note = await this.notesService.create(newNoteData);
    pubSub.publish('noteAdded', { noteAdded: note });
    return note;
  }

  @Mutation((returns) => [Note])
  async insertNotes(): Promise<Note[]> {
    const notes = await this.notesService.createNotes();
    return notes;
  }

  @Mutation((returns) => Note)
  async update(
    @Args('updateNoteData') updateNoteData: UpdateNoteInput,
  ): Promise<Note> {
    const note = await this.notesService.findOneAndUpdate(updateNoteData);
    return note;
  }

  @Mutation((returns) => Boolean)
  async removeNote(@Args('id') id: string) {
    return this.notesService.remove(id);
  }

  @Subscription((returns) => Note)
  noteAdded() {
    return pubSub.asyncIterator('noteAdded');
  }
}

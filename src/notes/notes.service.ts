import { Injectable } from '@nestjs/common';
import { NewNoteInput } from './dto/new-note.input';
import { Note } from './models/note.model';
import { timingSafeEqual } from 'crypto';

@Injectable()
export class NotesService {
  constructor() {
    this.notes = [];
  }

  notes = [];

  async create(data: NewNoteInput): Promise<Note> {
    console.log(data);
    this.notes.push(data);
    console.log('this.notes', this.notes);
    return data as any;
  }

  async findOneById(id: string): Promise<Note> {
    const data = {
      title: 'i Found a Note',
      description: 'this is the note i found',
      finishDate: new Date(),
      importance: 5,
      finished: 0,
    };
    return data as any;
  }

  async findAll(): Promise<Note[]> {
    return this.notes as Note[];
  }

  async remove(id: string): Promise<boolean> {
    return true;
  }
}

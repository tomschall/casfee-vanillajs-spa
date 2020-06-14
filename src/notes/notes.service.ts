import { Injectable } from '@nestjs/common';
import { NewNoteInput } from './dto/new-note.input';
import { Note } from './models/note.model';
import { timingSafeEqual } from 'crypto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Note as NoteModel } from './schemas/note.schema';

@Injectable()
export class NotesService {
  constructor(
    @InjectModel(NoteModel.name) private noteModel: Model<NoteModel>,
  ) {}

  async create(newNoteInput: NewNoteInput): Promise<Note> {
    const note = new this.noteModel(newNoteInput);
    const createdNote = await note.save();
    return createdNote as any;
  }

  async findOneById(id: string): Promise<Note> {
    return (await this.noteModel.findById(id).exec()) as Note;
  }

  async findAll(): Promise<Note[]> {
    return (await this.noteModel.find().exec()) as Note[];
  }

  async remove(id: string): Promise<boolean> {
    return true;
  }
}

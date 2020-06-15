import { Injectable } from '@nestjs/common';
import { NewNoteInput } from './dto/new-note.input';
import { Note } from './models/note.model';
import { timingSafeEqual } from 'crypto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Note as NoteObj } from './schemas/note.schema';
import { UpdateNoteInput } from './dto/update-note.input';

@Injectable()
export class NotesService {
  constructor(@InjectModel(NoteObj.name) private noteModel: Model<NoteObj>) {}

  async create(newNoteInput: NewNoteInput): Promise<Note> {
    const note = new this.noteModel(newNoteInput);
    const createdNote = await note.save();
    return createdNote as any;
  }

  async findOneById(id: string): Promise<Note> {
    return (await this.noteModel.findById(id).exec()) as Note;
  }

  async findOneAndUpdate(updateNoteInput: UpdateNoteInput): Promise<Note> {
    return (await this.noteModel
      .findOneAndUpdate({ _id: updateNoteInput.id }, updateNoteInput, {
        new: true,
      })
      .exec()) as Note;
  }

  async findAll(): Promise<Note[]> {
    return (await this.noteModel.find().exec()) as Note[];
  }

  async remove(id: string): Promise<boolean> {
    if (await this.noteModel.findOneAndDelete({ _id: id }).exec()) return true;
    else return false;
  }
}

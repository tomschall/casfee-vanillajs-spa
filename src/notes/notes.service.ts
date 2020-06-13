import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto';

@Injectable()
export class NotesService {
  create(createNoteDto: CreateNoteDto): Boolean {
    console.log('createNoteDto inside Service', createNoteDto);
    return true;
  }
}

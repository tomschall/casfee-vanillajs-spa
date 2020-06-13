export class CreateNoteDto {
  title: string;
  description: string;
  createDate: Date;
  finishDate: Date;
  importance: number;
  finished: boolean;
}

export class UpdateNoteDto {
  id: string;
  title: string;
  description: string;
  createDate: Date;
  finishDate: Date;
  importance: number;
  finished: boolean;
}

export class Note {
  id: string;
  title: string;
  description: string;
  createDate: Date;
  finishDate: Date;
  importance: number;
  finished: boolean;
}

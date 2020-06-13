import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Query,
  Body,
} from '@nestjs/common';
import { CreateNoteDto } from './dto';
import { NotesService } from './notes.service';

@Controller('notes')
export class NotesController {
  constructor(private notesService: NotesService) {}

  @Post()
  create(@Body() createNoteDto: CreateNoteDto): Boolean {
    return this.notesService.create(createNoteDto);
  }
  @Get()
  findAll(@Query() query) {
    return `This action returns all notes (limit: ${query.limit})`;
  }
  @Get(':id')
  findOne(@Param() params): string {
    console.log(params.id);
    return `This action returns a #${params.id} note`;
  }
  @Put(':id')
  update(@Param() params): string {
    console.log(params.id);
    return `This action updates a #${params.id} note`;
  }
  @Delete(':id')
  remove(@Param() params): string {
    console.log(params.id);
    return `This action deletes a #${params.id} note`;
  }
}

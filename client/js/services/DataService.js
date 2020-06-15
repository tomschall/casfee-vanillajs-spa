import CONFIG from '../../config.js';
import {
  Observable,
  Subject,
  ReplaySubject,
  from,
  fromEvent,
  of,
  range,
} from 'https://dev.jspm.io/rxjs@6/_esm2015';

import {
  map,
  filter,
  switchMap,
} from 'https://dev.jspm.io/rxjs@6/_esm2015/operators';

class DataService {
  constructor() {
    this.notes = [];
    this.subject = new Subject();
  }

  async initData() {
    this.notes = await this.getAllNotes();
  }

  static async create() {
    const obj = new DataService();
    await obj.initData();
    return obj;
  }

  async getAllNotes() {
    try {
      const response = await axios({
        url: CONFIG.graphqlApiHost,
        method: 'POST',
        data: {
          query: `
            query {
              notes 
              {
                id,
                title,
                description,
                createDate,
                finishDate,
                importance,
                finished
              }
            }
          `,
        },
      });
      return response.data.data.notes;
    } catch (err) {
      console.error('Error getting documents', err);
    }
  }

  async createNote(data) {
    try {
      const response = await axios({
        url: CONFIG.graphqlApiHost,
        method: 'POST',
        data: {
          query: `
            mutation {
              addNote(newNoteData: {
                title: "${data.title}",
                description: "${data.description}",
                finishDate: "${data.finishDate}",
                importance: ${data.importance},
                finished: false
              }){
                id,
                title,
                description,
                finishDate,
                createDate,
                importance,
                finished
              }
            }
          `,
        },
      });
      const err = response.data.errors;
      if (response.data.data !== null) {
        const note = response.data.data.addNote;
        this.notes.push(note);
        this.sendData(this.notes);
        return note;
      } else if (err) {
        console.error('graphql error', err);
      }
    } catch (err) {
      console.error('Error getting documents', err);
    }
  }

  async updateNote(id, data) {
    try {
      const response = await axios({
        url: CONFIG.graphqlApiHost,
        method: 'POST',
        data: {
          query: `
            mutation {
              update(updateNoteData: {
                id: "${data.id}",
                title: "${data.title}",
                description: "${data.description}",
                finishDate: "${data.finishDate}",
                importance: ${data.importance},
                finished: false
              }){
                id,
                title,
                description,
                finishDate,
                createDate,
                importance,
                finished
              }
            }
          `,
        },
      });
      const err = response.data.errors;
      if (response.data.data !== null) {
        const note = response.data.data.update;
        const notes = [...this.notes];
        const index = notes.findIndex((x) => x.id === id);
        notes[index] = note;
        this.notes = notes;
        this.sendData(this.notes);
        return note;
      } else if (err) {
        console.error('graphql error', err);
      }
    } catch (err) {
      console.error('Error getting documents', err);
    }
  }

  async deleteNote(id) {
    try {
      const response = await axios({
        url: CONFIG.graphqlApiHost,
        method: 'POST',
        data: {
          query: `
            mutation {
              removeNote(id: "${id}")
            }
          `,
        },
      });
      const err = response.data.errors;
      if (response.data.data !== null) {
        const removeNote = response.data.data.removeNote;
        if (removeNote === true) {
          const notes = [...this.notes];
          const index = notes.findIndex((x) => x.id === id);
          notes.splice(index, 1);
          this.notes = notes;
          this.sendData(this.notes);
          return removeNote;
        }
        return false;
      } else if (err) {
        console.error('graphql error', err);
      }
    } catch (err) {
      console.error('Error getting documents', err);
    }
  }

  sendData(data) {
    return this.subject.next(data);
  }

  clearData() {
    return this.subject.next();
  }

  getData() {
    return this.subject.asObservable();
  }
}

export default DataService;

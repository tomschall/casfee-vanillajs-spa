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
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      let url = '';
      url = CONFIG.apiHost;
      const response = await fetch(url, options);
      return await response.json();
    } catch (err) {
      console.error('Error getting documents', err);
    }
  }

  async getNote(id) {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const url = CONFIG.apiHost + id;
      const response = await fetch(url, options);
      const note = await response.json();
      return note;
    } catch (err) {
      console.error('Error getting documents', err);
    }
  }

  async createNote(data) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    try {
      const url = CONFIG.apiHost;
      const response = await fetch(url, options);
      const note = await response.json();
      this.notes.push(note);
      this.sendData(this.notes);
      return note;
    } catch (err) {
      console.error('Error creating documents', err);
    }
  }

  async updateNote(id, data) {
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    try {
      const url = CONFIG.apiHost + id;
      const response = await fetch(url, options);
      const note = await response.json();
      const notes = [...this.notes];
      const index = notes.findIndex((x) => x.id === id);
      notes[index] = note;
      this.notes = notes;
      this.sendData(this.notes);
      return note;
    } catch (err) {
      console.error('Error updating documents', err);
    }
  }

  async deleteNote() {}

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

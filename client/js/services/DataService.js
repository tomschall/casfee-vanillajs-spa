import CONFIG from '../../config.js';
const { BehaviorSubject, from } = rxjs;
const { map, catchError } = rxjs.operators;

class DataService {
  constructor() {
    this.notes = [];
  }

  async initData() {
    this.notes$ = this.getAllNotes();
    this.notes$.subscribe((notes) => {
      this.notes = notes;
      this.sendData(notes);
    });
    this.subject = new BehaviorSubject();
    this.data$ = this.subject.asObservable();
    this.subjectModal = new BehaviorSubject();
    this.form$ = this.subjectModal.asObservable();
  }

  static async create() {
    const obj = new DataService();
    await obj.initData();
    return obj;
  }

  async getNote(id) {
    try {
      const response = await axios({
        url: CONFIG.graphqlApiHost,
        method: 'POST',
        data: {
          query: `
            query {
              note(id: "${id}") 
              {
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
      const err = response.data.errors;
      if (response.data.data !== null) {
        const note = response.data.data.note;
        return note;
      } else if (err) {
        throw new Error(err[0].message);
      }
    } catch (err) {
      this.handleError(err);
    }
  }

  getAllNotes() {
    return from(
      axios({
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
      }),
    ).pipe(
      map((response) => response.data.data.notes),
      catchError((err) => this.handleError(err)),
    );
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
        throw new Error(err[0].message);
      }
    } catch (err) {
      this.handleError(err);
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
                finished: ${data.finished}
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
        throw new Error(err[0].message);
      }
    } catch (err) {
      this.handleError(err);
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
        throw new Error(err[0].message);
      }
    } catch (err) {
      this.handleError(err);
    }
  }

  sendData(data) {
    return this.subject.next(data);
  }

  sendNewFormData(data) {
    return this.subjectModal.next(data);
  }

  handleError(err) {
    let message = '';
    if (err.response) {
      // Status code out of the range of 2xx, format error message according
      console.error('Error getting response', err.response);
    } else if (err.request) {
      // The request was made but no response was received, format message accordingly
      console.error('Error getting request', err.request);
    } else {
      message = err.message;
    }
    // throw whatever error you have so it's included in your graphql response
    throw new Error(message);
  }
}

export default DataService;

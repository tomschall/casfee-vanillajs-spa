import DataService from '../services/DataService.js';
import { messageService } from '../rxjs.js';

class List {
  constructor() {
    this.setMessageService();
  }

  async initData() {
    this.notes = await DataService.getData();
  }

  static async create() {
    const obj = new List();
    await obj.initData();
    return obj;
  }

  async render(filterBy) {
    if (typeof filterBy !== 'undefined') {
      this.notes = await this.filterNotes(this.notes, filterBy);
    }

    console.log(this.notes);

    let view = `
        <section class="section">
            <h1>List of notes</h1>
            <ul class="todo-list">
                ${this.notes
                  .map(
                    (note) =>
                      `<li class="todo-item"><a href="#detail/${note.id}">${note.title}</a></li>`,
                  )
                  .join('\n ')}
            </ul>
        </section>
        `;
    return view;
  }

  after_render() {}

  filterNotes(notes, filterBy) {
    console.log('filterBy', filterBy);
    return notes.sort((a, b) => {
      return (
        new moment(b[filterBy]).format('YYYYMMDD') -
        new moment(a[filterBy]).format('YYYYMMDD')
      );
    });
  }

  setMessageService() {
    let i = 1;
    setInterval(function () {
      messageService.sendMessage(
        `Message ${i} from Home Page Component to App Component!`,
      );
      i++;
    }, 2000);
  }
}

export default List;

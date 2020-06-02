import FilterUtils from '../utils/FilterUtils.js';

class List {
  constructor() {}

  async initData() {
    this.dataService.getData().subscribe((data) => {
      if (data) {
        // add message to local state if not empty
        this.notes = data;
        this.filterUtils = new FilterUtils(this.notes);
      }
    });
  }

  static async create(dataService) {
    const obj = new List();
    obj.dataService = dataService;
    await obj.initData();
    return obj;
  }

  async render(filterBy) {
    if (this.notes === undefined) return '';

    let [...notes] = this.notes;

    if (typeof filterBy !== 'undefined') {
      notes = await this.filterUtils.filterNotes(filterBy);
    }

    let view = `
        <section class="section">
            <h1>List of notes</h1>
            <ul class="todo-list">
                ${notes
                  .map(
                    (note) =>
                      `<li class="todo-item">
                        <div class="todo-item-first">
                          <a href="#list/${note.id}">${note.title}</a>
                        </div>
                        <div> 
                          <a href="#detail/${note.id}">Show Detail</a>
                        </div>
                        </li>`,
                  )
                  .join('\n ')}
            </ul>
            <detail></detail>
            <detail></detail>
            <detail></detail>
        </section>
        `;
    return view;
  }

  after_render() {}
}

export default List;

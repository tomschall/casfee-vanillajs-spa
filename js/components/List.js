class List {
  constructor() {}

  async initData() {
    this.notes = this.dataService.notes;
    this.dataService.getData().subscribe((data) => {
      if (data) {
        // add message to local state if not empty
        console.log('list data', data);
        this.notes = data;
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
    if (typeof filterBy !== 'undefined') {
      this.notes = await this.filterNotes(this.notes, filterBy);
    }

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
}

export default List;

class List {
  constructor() {}

  async initData() {
    this.dataService.getData().subscribe((data) => {
      if (data) {
        // add message to local state if not empty
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
    if (this.notes === undefined) return '';

    if (typeof filterBy !== 'undefined') {
      console.log('filterBy', filterBy);
      this.notes = await this.filterNotes(filterBy);
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

  filterNotes(filterBy) {
    if (filterBy == 'createDate' || filterBy == 'finishDate') {
      return this.filterByDate(filterBy);
    } else if (filterBy == 'importance') {
      return this.filterByImportance(filterBy);
    } else if (filterBy == 'finished') {
      return this.filterByFinished(filterBy);
    }
  }

  filterByDate(filterBy) {
    return this.notes.sort((a, b) => {
      return (
        new moment(b[filterBy]).format('YYYYMMDD') -
        new moment(a[filterBy]).format('YYYYMMDD')
      );
    });
  }

  filterByImportance(filterBy) {
    return this.notes.filter((x) => x);
  }

  filterByFinished(filterBy) {
    return this.notes.filter((x) => x);
  }
}

export default List;

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

    let [...notes] = this.notes;

    if (typeof filterBy !== 'undefined') {
      notes = await this.filterNotes(filterBy);
    }

    const detailComponent = await this.router.routes[1].component.render();
    this.isDetail = detailComponent == '' ? false : true;

    let view = `
        <section class="section">
            <h1>List of notes</h1>
            <ul class="todo-list">
                ${notes
                  .map(
                    (note) =>
                      `<li class="todo-item"><a href="#list/${note.id}">${note.title}</a> <a href="#detail/${note.id}">Show Detail</a></li>`,
                  )
                  .join('\n ')}
            </ul>
            ${detailComponent}
        </section>
        `;
    return view;
  }

  after_render() {
    if (this.isDetail) this.router.routes[1].component.after_render();
  }

  filterNotes(filterBy) {
    if (filterBy == 'createDate' || filterBy == 'finishDate') {
      return this.filterByDate(filterBy);
    } else if (filterBy == 'importance' || filterBy == 'id') {
      return this.filterBy(filterBy);
    } else if (filterBy == 'finished') {
      return this.filterByFinished();
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

  filterBy(prop) {
    return this.notes.sort((a, b) => a[prop] - b[prop]);
  }

  filterByFinished() {
    return this.notes.filter((x) => x.finished == true);
  }
}

export default List;

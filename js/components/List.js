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
        <ol class="notes">
          ${notes
            .map(
              (note) =>
                `<li class="note effect2" data-category="CSS JavaScript">
                  <article>
                    <figure>
                      <a
                        href="#detail/${note.id}"
                      >
                        <img
                          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/stars-pre.png"
                          alt=""
                        />
                      </a>
                      <figcaption>
                        <ol class="note-categories">
                          <li>
                            <a href="#detail/${note.id}">c: ${new moment(note.createDate).format('DD-MM-YYYY')}</a>
                          </li>
                          <li>
                            <a href="#detail/${note.id}">f: ${new moment(note.finishDate).format('DD-MM-YYYY')}</a>
                          </li>
                          <li>
                            <a href="#detail/${note.id}">i: ${note.importance}</a>
                          </li>
                           <li>
                            <a href="#detail/${note.id}">f:${note.finished}</a>
                          </li>
                        </ol>
                        <h2 class="note-title">
                          <a
                            href="#detail/${note.id}"
                            >${note.title}
                          </a>
                        </h2>
                        <p class="note-desc">
                          <a
                            href="#detail/${note.id}"
                            >${note.description}
                          </a>
                        </p>
                      </figcaption>
                    </figure>
                  </article>
                </li>`,
            )
            .join('\n ')}
          </ol>`;
    return view;
  }

  after_render() {}
}

export default List;

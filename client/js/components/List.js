import FilterService from '../services/FilterService.js';

class List {
  constructor() {}

  async initData() {
    this.dataService.data$.subscribe((data) => {
      if (data) {
        // add message to local state if not empty
        this.notes = data;
      }
    });
  }

  static async create(dataService, filterService) {
    const obj = new List();
    obj.dataService = dataService;
    obj.filterService = filterService;
    await obj.initData();
    return obj;
  }

  async render(filterBy) {
    if (this.notes === undefined) return '';

    let [...notes] = this.notes;

    if (typeof filterBy !== 'undefined') {
      notes = await this.filterService.filterNotes(filterBy);
    }

    const pic = this.getPictureNameArray();

    let view = `
        <div>
          <ul class="filters">
            <li>
              <p id="filterReset" ${this.filterIsActive(filterBy, 'id')}>All</p>
            </li>
            <li>
              <p id="filterCreateDate" ${this.filterIsActive(
                filterBy,
                'createDate',
              )}>
                Create Date
              </p>
            </li>
            <li>
              <p id="filterFinishDate" ${this.filterIsActive(
                filterBy,
                'finishDate',
              )}>
                Finish Date
              </p>
            </li>
            <li>
              <p id="filterImportance" ${this.filterIsActive(
                filterBy,
                'importance',
              )}>
                Importance
              </p>
            </li>
            <li>
              <p id="filterFinished" ${this.filterIsActive(
                filterBy,
                'finished',
              )}>
                Is Finished
              </p>
            </li>
          </ul>
        </div>
        <ol id="notes" class="notes">
          ${notes
            .map(
              (note) =>
                `<li class="note effect2 imp-${
                  note.importance
                } draggable" draggable="true" data-category="CSS JavaScript" id="${
                  note.id
                }">
                  <article>
                    <figure>
                      <div class="note-image-container">
                        <div class="details imp-${note.importance}">
                        </div>
                        <div class="note-edit-icon">
                          <i data-edit="${
                            note.id
                          }" class="far fa-edit fa-lg"></i>
                        </div>
                        <div class="note-delete-icon">
                          <i data-delete="${
                            note.id
                          }" class="far fa-window-close fa-lg"></i>
                        </div>
                        <img src="images/${
                          pic[note.importance]
                        }" alt="Eevee" class="card__image">   
                      </div>
                      <figcaption>
                        <ol class="note-categories">
                          <li>
                            <a data-detail="${note.id}">
                              <i class="far fa-calendar-plus"></i>
                              ${new moment(note.createDate).format(
                                'DD-MM-YYYY',
                              )}
                            </a>
                          </li>
                          <li>
                            <a data-detail="${note.id}">
                              ${this.renderFinishedFlag(note)} 
                              ${new moment(note.finishDate).format(
                                'DD-MM-YYYY',
                              )}
                            </a>
                          </li>
                          <li>
                            <a>${this.renderStars(note)}</a>
                          </li>
                           <li>
                            <a class="${
                              note.finished === true ? 'green' : 'red'
                            }" data-finished="${note.id}" >finished</a>
                          </li>
                        </ol>
                        <h2 class="note-title">
                          <a
                            data-detail="${note.id}"
                            >${note.title}
                          </a>
                        </h2>
                        <p class="note-desc">
                          <a
                            data-detail="${note.id}"
                            >${note.description}
                          </a>
                        </p>
                      </figcaption>
                    </figure>
                  </article>
                  
                </li>`,
            )
            .join('\n ')}
          </ol>
          `;
    return view;
  }

  renderStars(note) {
    let str = '';
    for (let i = 1; i <= 5; i++) {
      if (i <= note.importance) {
        str += `<i class="fas fa-star" data-importance="${note.id},${i}"></i>`;
      } else {
        str += `<i class="far fa-star" data-importance="${note.id},${i}"></i>`;
      }
    }
    return str;
  }

  renderFinished(note) {
    return note.finished === true
      ? `<i class="far fa-thumbs-up" data-finished="${note.id}"></i>`
      : `<i class="far fa-thumbs-down" data-finished="${note.id}"></i>`;
  }

  renderFinishedFlag(note) {
    return note.finished === true
      ? `<i class="fa fa-flag-checkered green" aria-hidden="true"></i> `
      : `<i class="fa fa-flag-checkered red" aria-hidden="true"></i> `;
  }

  filterIsActive(filterBy, element) {
    return filterBy === element ? 'class="active"' : '';
  }

  getPictureNameArray() {
    return [
      '',
      '600px-471Glaceon.png',
      '600px-470Leafeon.png',
      '1200px-133Eevee.png',
      '1200px-196Espeon.png',
      '1200px-136Flareon.png',
    ];
  }

  after_render() {}
}

export default List;

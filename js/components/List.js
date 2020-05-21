import DataService from '../services/DataService.js';
import { messageService } from '../rxjs.js';

const List = {
  render: async (filterBy) => {
    let notes = await DataService.getData();
    if (typeof filterBy !== 'undefined') {
      notes = await List.filterNotes(notes, filterBy);
    }

    let i = 1;
    setInterval(function () {
      messageService.sendMessage(
        `Message ${i} from Home Page Component to App Component!`,
      );
      i++;
    }, 2000);

    let view = `
        <section class="section">
            <h1>List of notes</h1>
            <ul class="todo-list">
                ${notes
                  .map(
                    (note) =>
                      `<li class="todo-item"><a href="#detail/${note.id}">${note.title}</a></li>`,
                  )
                  .join('\n ')}
            </ul>
        </section>
        `;
    return view;
  },
  after_render: async () => {},
  filterNotes: async (notes, filterBy) => {
    console.log('filterBy', filterBy);
    return notes.sort((a, b) => {
      return (
        new moment(b[filterBy]).format('YYYYMMDD') -
        new moment(a[filterBy]).format('YYYYMMDD')
      );
    });
  },
};

export default List;

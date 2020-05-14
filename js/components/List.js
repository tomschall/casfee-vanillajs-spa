import DataService from '../services/DataService.js';

const List = {
  render: async () => {
    let notes = await DataService.getData();
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
};

export default List;

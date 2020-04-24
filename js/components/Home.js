import DataService from '../services/DataService.js';

const Home = {
  render: async () => {
    let notes = await DataService.getData();
    let view = `
        <section class="section">
            <h1> Home </h1>
            <ul>
                ${notes
                  .map(
                    (note) =>
                      `<li><a href="#detail/${note.id}">${note.title}</a></li>`,
                  )
                  .join('\n ')}
            </ul>
        </section>
        `;
    return view;
  },
  after_render: async () => {},
};

export default Home;

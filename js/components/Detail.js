import RouterUtils from '../utils/RouterUtils.js';
import DataService from '../services/DataService.js';

const Detail = {
  render: async () => {
    const params = RouterUtils.getParams();
    const notes = await DataService.getData(params.id);

    return `
        <section class="section">
            <h1>Notes Id : ${notes.id}</h1>
            <p> Notes Title : ${notes.title} </p>
            <p> Notes Description : ${notes.description} </p>
            <p> Notes Importance : ${notes.importance} </p>
            <p> Notes Date Created : ${notes.createDate} </p>
            <p> Notes Date Finished : ${notes.finishDate} </p>
        </section>
      `;
  },
  after_render: async () => {},
};

export default Detail;

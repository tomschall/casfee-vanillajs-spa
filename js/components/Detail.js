import RouterUtils from '../utils/RouterUtils.js';
import DataService from '../services/DataService.js';

const Detail = {
  render: async () => {
    const params = RouterUtils.getParams();
    const note = await DataService.getData(params.id);

    return `
        <section class="section">
            <h1>Notes Id : ${note.id}</h1>
            <p> Notes Title : ${note.title} </p>
            <p> Notes Description : ${note.description} </p>
            <p> Notes Importance : ${note.importance} </p>
            <p> Notes Date Created : ${note.createDate} </p>
            <p> Notes Date Finished : ${note.finishDate} </p>
        </section>
      `;
  },
  after_render: async () => {},
};

export default Detail;

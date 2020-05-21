import RouterUtils from '../utils/RouterUtils.js';
import DataService from '../services/DataService.js';
import { messages } from '../messageService.js';

const Detail = {
  render: async () => {
    console.log(messages);

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
            <p><button class="button is-primary" id="back_btn">Back</button></p>           
        </section>
      `;
  },
  after_render: async () => {
    document
      .getElementById('back_btn')
      .addEventListener('click', async (event) => {
        event.preventDefault();
        window.location.replace('/#list');
      });
  },
};

export default Detail;

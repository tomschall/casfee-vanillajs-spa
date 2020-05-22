import RouterUtils from '../utils/RouterUtils.js';

class Detail {
  constructor() {}

  async initData() {}

  static async create(dataService) {
    const obj = new Detail();
    obj.dataService = dataService;
    await obj.initData();
    return obj;
  }

  async render() {
    this.params = RouterUtils.getParams();
    this.note = await this.dataService.getNote(this.params.id);

    return `
        <section class="section">
            <h1>Notes Id : ${this.note.id}</h1>
            <p> Notes Title : ${this.note.title} </p>
            <p> Notes Description : ${this.note.description} </p>
            <p> Notes Importance : ${this.note.importance} </p>
            <p> Notes Date Created : ${this.note.createDate} </p>
            <p> Notes Date Finished : ${this.note.finishDate} </p>
            <p><button class="button is-primary" id="edit_btn">Edit</button></p>
            <p><button class="button is-primary" id="back_btn">Back</button></p>        
        </section>
      `;
  }

  async after_render() {
    document
      .getElementById('back_btn')
      .addEventListener('click', async (event) => {
        event.preventDefault();
        window.location.replace('/#list');
      });
    document
      .getElementById('edit_btn')
      .addEventListener('click', async (event) => {
        event.preventDefault();
        window.location.replace('/#edit/' + this.note.id);
      });
  }
}

export default Detail;

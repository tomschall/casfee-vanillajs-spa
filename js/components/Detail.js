import RouterUtils from '../utils/RouterUtils.js';

class Detail {
  constructor() {
    this.params = [];
  }

  async initData() {
    this.dataService.getData().subscribe((data) => {
      if (data) {
        // add message to local state if not empty
        this.notes = data;
      }
    });
  }

  static async create(dataService) {
    const obj = new Detail();
    obj.dataService = dataService;
    await obj.initData();
    return obj;
  }

  async render() {
    this.params = RouterUtils.getParams();
    console.log(this.params);
    if (!this.params.id) return '';

    const [
      { id, title, description, importance, createDate, finishDate, finished },
    ] = this.notes.filter((note) => note.id == this.params.id);

    return `
        <section class="section">
            <h1>Notes Id : ${id}</h1>
            <p> Notes Title : ${title} </p>
            <p> Notes Description : ${description} </p>
            <p> Notes Importance : ${importance} </p>
            <p> Notes Date Created : ${createDate} </p>
            <p> Notes Date Finished : ${finishDate} </p>
            <p> Is Finished : ${finished} </p>
            <p><button class="button is-primary" id="edit_btn">Edit</button></p>
            <p><button class="button is-primary" id="delete_btn">Delete</button></p>
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
        console.log('/#edit/' + this.params.id);
        window.location.replace('/#edit/' + this.params.id);
      });
    document
      .getElementById('delete_btn')
      .addEventListener('click', async (event) => {
        event.preventDefault();
        await this.dataService.deleteNote(this.params.id);
        window.location.replace('/#list');
      });
  }
}

export default Detail;

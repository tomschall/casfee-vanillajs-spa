import RouterUtils from '../utils/RouterUtils.js';

class Detail {
  constructor() {
    this.params = [];
  }

  async initData() {
    this.dataService.data$.subscribe((data) => {
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

  async render(id) {
    this.params = RouterUtils.getParams();

    if (id !== undefined && this.params.id === undefined) {
      this.params.id = id;
    }

    const [
      {
        title = '',
        description = '',
        importance = '',
        createDate = '',
        finishDate = '',
        finished = '',
      } = {},
    ] = this.notes.filter((note) => note.id == this.params.id);

    return `
        <section class="section">
            <h1>Notes Id : ${this.params.id}</h1>
            <p> Notes Title : ${title} </p>
            <p> Notes Description : ${description} </p>
            <p> Notes Importance : ${importance} </p>
            <p> Notes Date Created : ${createDate} </p>
            <p> Notes Date Finished : ${finishDate} </p>
            <p> Is Finished : ${finished} </p>
            <button class="button is-primary" id="delete_btn"><span><span>Delete</span></span></button>
            <button class="button is-primary" id="cancel_btn"><span><span>Back</span></span></button>
        </section>
      `;
  }

  async after_render() {
    if (document.getElementById('delete_btn') !== null) {
      document
        .getElementById('delete_btn')
        .addEventListener('click', async (event) => {
          event.preventDefault();

          const note = await this.dataService.deleteNote(this.params.id);

          const modal = document.getElementById('notesModal');
          if (
            modal !== null &&
            modal.style.display &&
            modal.style.display === 'block'
          ) {
            this.dataService.sendNewFormData(note);
            const form = document.getElementById('modalForm');
            modal.style.display = 'none';
            form.innerHTML = '';
            return;
          }
          window.location.replace('/#list');
        });
    }
  }
}

export default Detail;

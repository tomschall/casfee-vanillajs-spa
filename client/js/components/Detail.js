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
        <section class="section detail">
            <h1>Title: ${title}</h1>
            <p><span>Notes Id:</span> ${this.params.id}</p>
            <p><span>Description:</span> ${description}</p>
            <p><span>Importance:</span> ${importance}</p>
            <p><span>Date Created:</span> ${
              this.notes ? new moment(createDate).format('DD-MM-YYYY') : ''
            } </p>
            <p><span>Date Finished:</span> ${
              this.notes ? new moment(createDate).format('DD-MM-YYYY') : ''
            } </p>
            <p><span>Is Finished:</span> ${finished}</p>
            <p><button class="button is-primary" id="delete_btn">Delete</button>
            <button class="button is-primary" id="cancel_btn">Back</button></p>
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

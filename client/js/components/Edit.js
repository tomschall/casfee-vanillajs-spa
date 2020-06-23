import RouterUtils from '../utils/RouterUtils.js';

class Edit {
  constructor() {}

  async initData() {
    this.dataService.data$.subscribe((data) => {
      if (data) {
        // add message to local state if not empty
        this.notes = data;
      }
    });
  }

  static async create(dataService) {
    const obj = new Edit();
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
        finishDate = '',
        finished = '',
      } = {},
    ] = this.notes.filter((note) => note.id == this.params.id);

    return `
            <section class="section form-container">
              <form id="form">
                <ul class="flex-outer">
                  <li>
                    <label>Edit Note</label>
                    <input id="id" type="hidden" value="${
                      this.notes ? this.params.id : ''
                    }"
                  </li>
                  <li>
                    <label for="title">Title</label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      placeholder="What's the title of your note?"
                      value="${this.notes ? title : ''}"
                    />
                  </li>
                  <li>
                    <label for="description">Description</label>
                    <input
                      type="text"
                      id="description"
                      name="description"
                      placeholder="What's the description of your note?"
                      value="${this.notes ? description : ''}"
                    />
                  </li>
                  <li>
                    <label for="finishDate">Finish Date</label>
                    <input
                      type="date"
                      id="finishDate"
                      placeholder="Select the date for finish..."
                      value="${
                        this.notes
                          ? new moment(finishDate).format('YYYY-MM-DD')
                          : ''
                      }"
                    />
                  </li>
                  <li>
                    <label for="importance">Choose the importance</label>
                    <select name="importance" id="importance">
                        <option value="1" ${
                          this.notes && importance == '1' ? 'selected' : ''
                        }>1</option>
                        <option value="2" ${
                          this.notes && importance == '2' ? 'selected' : ''
                        }>2</option>
                        <option value="3" ${
                          this.notes && importance == '3' ? 'selected' : ''
                        }>3</option>
                        <option value="4" ${
                          this.notes && importance == '4' ? 'selected' : ''
                        }>4</option>
                        <option value="5" ${
                          this.notes && importance == '5' ? 'selected' : ''
                        }>5</option>
                      </select>
                  </li>
                  <li>
                    <label for="finished">Is finished</label>
                      <input 
                        id="finished" 
                        class="input" 
                        name="finished" 
                        type="checkbox" 
                        placeholder="Is finished" 
                        ${
                          this.notes && finished == true
                            ? 'checked="checked"'
                            : ''
                        }>
                  </li>
                  <li>
                    <button class="button is-primary" id="submit_btn">
                      <span>
                        <span>Save</span>
                      </span>
                    </button>
                  </li>
                  <li>
                    <button class="button is-primary" id="cancel_btn">
                      <span>
                        <span>Cancel</span>
                      </span>
                    </button>
                  </li>
                </ul>
              </form>
            </section>
        `;
  }

  async after_render() {
    document
      .getElementById('submit_btn')
      .addEventListener('click', async (event) => {
        event.preventDefault();
        const id = document.getElementById('id');
        const title = document.getElementById('title');
        const description = document.getElementById('description');
        const finishDate = document.getElementById('finishDate');
        const importance = document.getElementById('importance');
        const finished = document.getElementById('finished');
        const modal = document.getElementById('notesModal');

        if ((title.value == '') | (description.value == '')) {
          alert(`The fields cannot be empty`);
        } else {
          const data = {
            id: id.value,
            title: title.value,
            description: description.value,
            finishDate: finishDate.value,
            importance: importance.value,
            finished: finished.checked,
          };
          const note = await this.dataService.updateNote(id.value, data);

          if (
            modal !== null &&
            modal.style.display &&
            modal.style.display === 'block'
          ) {
            this.dataService.sendNewFormData(note);
            modal.style.display = 'none';
            const form = document.getElementById('modalForm');
            form.innerHTML = '';
            return;
          }
          window.location.replace('/#list');
        }
      });
  }
}

export default Edit;

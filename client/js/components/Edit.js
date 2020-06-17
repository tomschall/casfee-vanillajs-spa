import RouterUtils from '../utils/RouterUtils.js';

class Edit {
  constructor() {}

  async initData() {
    this.dataService.getData().subscribe((data) => {
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
    if (id === undefined) {
      this.params = RouterUtils.getParams();
    } else {
      this.params.id = id;
    }

    const [
      { title, description, importance, finishDate, finished },
    ] = this.notes.filter((note) => note.id == this.params.id);

    return `
            <h1>Edit Form</h1>
            <section class="section">
              <form id="form">
                  <input id="id" type="hidden" value="${
                    this.notes ? this.params.id : ''
                  }"
                  <div class="field">
                      <p class="control has-icons-left has-icons-right">
                          <input id="title" class="input" name="title" type="text" placeholder="Title" value="${
                            this.notes ? title : ''
                          }">
                      </p>
                  </div>
                  <div class="field">
                      <p class="control has-icons-left has-icons-right">
                          <input id="description" class="input" name="description" type="text" placeholder="Description" value="${
                            this.notes ? description : ''
                          }">
                      </p>
                  </div>
                  <div class="field">
                      <p class="control has-icons-left has-icons-right">
                          <label for="finishDate">Date for finishing</label>
                          <input id="finishDate" class="input" name="finishDate" type="date" placeholder="Date" value="${
                            this.notes
                              ? new moment(finishDate).format('YYYY-MM-DD')
                              : ''
                          }">
                      </p>
                  </div>
                  <div class="field">
                      <label for="importance">Importance</label>
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
                  </div>
                  <div class="field">
                      <p class="control has-icons-left has-icons-right">
                          <label for="finished">Is finished</label>
                          <input id="finished" class="input" name="finished" type="checkbox" placeholder="Is finished" ${
                            this.notes && finished == true
                              ? 'checked="checked"'
                              : ''
                          }>
                      </p>
                  </div>
                  <button class="button is-primary" id="submit_btn">
                    <span>
                      <span>Save</span>
                    </span>
                  </button>
                  <button class="button is-primary" id="cancel_btn">
                    <span>
                      <span>Cancel</span>
                    </span>
                  </button>   
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
    // document
    //   .getElementById('cancel_btn')
    //   .addEventListener('click', async (event) => {
    //     event.preventDefault();
    //     window.location.replace('/#list');
    //   });
  }
}

export default Edit;

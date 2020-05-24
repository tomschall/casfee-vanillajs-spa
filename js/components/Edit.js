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

  async render() {
    this.params = RouterUtils.getParams();

    const [
      { id, title, description, importance, finishDate },
    ] = this.notes.filter((note) => note.id == this.params.id);

    return `
            <h1>Edit Form</h1>
            <section class="section">
              <form id="form">
                  <input id="id" type="hidden" value="${this.notes ? id : ''}"
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
                            this.notes ? finishDate : ''
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
                          <input id="finished" class="input" name="finished" value="1" type="checkbox" placeholder="Is finished">
                      </p>
                  </div>
                  <div class="field">
                      <p class="control">
                          <button class="button is-primary" id="submit_btn">
                          Save
                          </button>
                      </p>
                  </div>
                  <div class="field">
                      <p class="control">
                          <button class="button is-primary" id="cancel_btn">
                          Cancel
                          </button>
                      </p>
                  </div>
              </form>
            </section>
        `;
  }

  async after_render() {
    document
      .getElementById('submit_btn')
      .addEventListener('click', async (event) => {
        event.preventDefault();
        let id = document.getElementById('id');
        let title = document.getElementById('title');
        let description = document.getElementById('description');
        let finishDate = document.getElementById('finishDate');
        let importance = document.getElementById('importance');

        if ((title.value == '') | (description.value == '')) {
          alert(`The fields cannot be empty`);
        } else {
          const data = {
            title: title.value,
            description: description.value,
            finishDate: finishDate.value,
            importance: importance.value,
          };
          const response = await this.dataService.updateNote(id.value, data);
          console.log('response', response);
          window.location.replace('/#list');
        }
      });
    document
      .getElementById('cancel_btn')
      .addEventListener('click', async (event) => {
        event.preventDefault();
        window.location.replace('/#list');
      });
  }
}

export default Edit;

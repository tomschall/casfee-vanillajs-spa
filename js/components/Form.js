class Form {
  constructor() {}

  async initData() {}

  static async create(dataService) {
    const obj = new Form();
    obj.dataService = dataService;
    await obj.initData();
    return obj;
  }

  async render() {
    return `
            <h1>New Note</h1>
            <section class="section">
              <form id="form">
                  <div class="field">
                      <p class="control has-icons-left has-icons-right">
                          <label for="title">Title</label>
                          <input id="title" class="input" name="title" type="text" placeholder="Title">
                      </p>
                  </div>
                  <div class="field">
                      <p class="control has-icons-left has-icons-right">
                          <label for="description">Description</label>
                          <input id="description" class="input" name="description" type="text" placeholder="Description">
                      </p>
                  </div>
                  <div class="field">
                      <p class="control has-icons-left has-icons-right">
                          <label for="finishDate">Date for finishing</label>
                          <input id="finishDate" class="input" name="finishDate" type="date" placeholder="Date">
                      </p>
                  </div>
                  <div class="field">
                      <label for="importance">Importance</label>
                      <select name="importance" id="importance">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
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
  // All the code related to DOM interactions and controls go in here.
  // This is a separate call as these can be registered only after the DOM has been painted
  async after_render() {
    document
      .getElementById('submit_btn')
      .addEventListener('click', async (event) => {
        event.preventDefault();
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
          await this.dataService.createNote(data);
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

export default Form;

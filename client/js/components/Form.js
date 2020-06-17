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
                <fieldset>
                  <label for="title">Title</label>
                  <input
                    id="title"
                    class="input"
                    name="title"
                    type="text"
                    placeholder="Title"
                  />
                </fieldset>

                <fieldset>
                  <label for="description">Description</label>
                  <input
                    id="description"
                    class="input"
                    name="description"
                    type="text"
                    placeholder="Description"
                  />
                </fieldset>
                <fieldset>
                  <label for="finishDate">Date for finishing</label>
                  <input
                    id="finishDate"
                    class="input"
                    name="finishDate"
                    type="date"
                    placeholder="Date"
                  />
                </fieldset>
                <fieldset>
                  <label for="importance">Importance</label>
                  <select name="importance" id="importance">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </fieldset>
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
  // All the code related to DOM interactions and controls go in here.
  // This is a separate call as these can be registered only after the DOM has been painted
  async after_render() {
    document
      .getElementById('submit_btn')
      .addEventListener('click', async (event) => {
        event.preventDefault();

        const title = document.getElementById('title');
        const description = document.getElementById('description');
        const finishDate = document.getElementById('finishDate');
        const importance = document.getElementById('importance');
        const modal = document.getElementById('notesModal');

        if (
          (title.value == '') |
          (description.value == '') |
          (finishDate.value == '') |
          (importance.options[importance.selectedIndex].value == '')
        ) {
          alert(`The fields cannot be empty`);
        } else {
          const data = {
            title: title.value,
            description: description.value,
            finishDate: finishDate.value,
            importance: importance.options[importance.selectedIndex].value,
          };

          const note = await this.dataService.createNote(data);

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

export default Form;

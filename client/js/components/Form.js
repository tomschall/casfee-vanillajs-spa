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
            <section class="section form-container">
              <form id="form">
                <ul class="flex-outer">
                  <li>
                    <label>New Note</label>
                  </li>
                  <li>
                    <label for="title">Title</label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      placeholder="What's the title of your note?"
                    />
                  </li>
                  <li>
                    <label for="description">Description</label>
                    <input
                      type="text"
                      id="description"
                      name="description"
                      placeholder="What's the description of your note?"
                    />
                  </li>
                  <li>
                    <label for="finishDate">Finish Date</label>
                    <input
                      type="date"
                      id="finishDate"
                      placeholder="Select the date for finish..."
                    />
                  </li>
                  <li>
                    <label for="importance">Choose the importance</label>
                    <select name="importance" id="importance">
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
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

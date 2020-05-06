import RouterUtils from '../utils/RouterUtils.js';
import DataService from '../services/DataService.js';

const Form = {
  render: async () => {
    const params = RouterUtils.getParams();
    let note = null;
    if (params.id) note = await DataService.getData(params.id);

    return `
            <h1>Edit Form</h1>
            <section class="section">
              <form id="form">
                  <input id="id" type="hidden" value="${note ? note.id : ''}"
                  <div class="field">
                      <p class="control has-icons-left has-icons-right">
                          <input id="title" class="input" name="title" type="text" placeholder="Title" value="${
                            note ? note.title : ''
                          }">
                          <span class="icon is-small is-left">
                              <i class="fas fa-envelope"></i>
                          </span>
                          <span class="icon is-small is-right">
                              <i class="fas fa-check"></i>
                          </span>
                      </p>
                  </div>
                  <div class="field">
                      <p class="control has-icons-left has-icons-right">
                          <input id="description" class="input" name="description" type="text" placeholder="Description" value="${
                            note ? note.description : ''
                          }">
                          <span class="icon is-small is-left">
                              <i class="fas fa-envelope"></i>
                          </span>
                          <span class="icon is-small is-right">
                              <i class="fas fa-check"></i>
                          </span>
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
  },
  // All the code related to DOM interactions and controls go in here.
  // This is a separate call as these can be registered only after the DOM has been painted
  after_render: async () => {
    document
      .getElementById('submit_btn')
      .addEventListener('click', async (event) => {
        event.preventDefault();
        let id = document.getElementById('id');
        let title = document.getElementById('title');
        let description = document.getElementById('description');
        if ((title.value == '') | (description.value == '')) {
          alert(`The fields cannot be empty`);
        } else {
          const data = {
            title: title.value,
            description: description.value,
          };
          const response = await DataService.updateNote(id.value, data);
          console.log('response', response);
          window.location.replace('/#home');
        }
      });
    document
      .getElementById('cancel_btn')
      .addEventListener('click', async (event) => {
        event.preventDefault();
        window.location.replace('/#home');
      });
  },
};

export default Form;

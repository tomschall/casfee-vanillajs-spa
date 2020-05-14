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
                      </p>
                  </div>
                  <div class="field">
                      <p class="control has-icons-left has-icons-right">
                          <input id="description" class="input" name="description" type="text" placeholder="Description" value="${
                            note ? note.description : ''
                          }">
                      </p>
                  </div>
                  <div class="field">
                      <p class="control has-icons-left has-icons-right">
                          <label for="finishDate">Date for finishing</label>
                          <input id="finishDate" class="input" name="finishDate" type="date" placeholder="Date" value="${
                            note ? note.finishDate : ''
                          }">
                      </p>
                  </div>
                  <div class="field">
                      <label for="importance">Importance</label>
                      <select name="importance" id="importance">
                        <option value="1" ${
                          note && note.importance == '1' ? 'selected' : ''
                        }>1</option>
                        <option value="2" ${
                          note && note.importance == '2' ? 'selected' : ''
                        }>2</option>
                        <option value="3" ${
                          note && note.importance == '3' ? 'selected' : ''
                        }>3</option>
                        <option value="4" ${
                          note && note.importance == '4' ? 'selected' : ''
                        }>4</option>
                        <option value="5" ${
                          note && note.importance == '5' ? 'selected' : ''
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
          const response = await DataService.updateNote(id.value, data);
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
  },
};

export default Form;

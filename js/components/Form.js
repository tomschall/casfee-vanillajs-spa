import RouterUtils from '../utils/RouterUtils.js';
import DataService from '../services/DataService.js';

const Form = {
  render: async () => {
    return `
            <section class="section">
              <form id="form">
                  <div class="field">
                      <p class="control has-icons-left has-icons-right">
                          <input id="title" class="input" name="title" type="text" placeholder="Title">
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
                          <input id="description" class="input" name="description" type="text" placeholder="Description">
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
                          <button class="button is-primary" id="register_submit_btn">
                          Save
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
      .getElementById('register_submit_btn')
      .addEventListener('click', (event) => {
        event.preventDefault();
        let title = document.getElementById('title');
        let description = document.getElementById('description');
        if ((title.value == '') | (description.value == '')) {
          alert(`The fields cannot be empty`);
        } else {
          alert(
            `Title ${title.value} and Description ${description.value} was successfully submitted!`,
          );
        }
      });
  },
};

export default Form;

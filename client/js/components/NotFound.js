import RouterUtils from '../utils/RouterUtils.js';

class NotFound {
  constructor() {
    this.params = [];
  }

  async render() {
    this.params = RouterUtils.getParams();

    return `
        <section class="section">
            <h1>Not Found Component</h1>
        </section>
      `;
  }
  async after_render() {}
}

export default NotFound;

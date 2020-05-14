import RouterUtils from '../utils/RouterUtils.js';

const NotFound = {
  render: async () => {
    const params = RouterUtils.getParams();

    return `
        <section class="section">
            <h1>Not Found Component</h1>
        </section>
      `;
  },
  after_render: async () => {},
};

export default NotFound;

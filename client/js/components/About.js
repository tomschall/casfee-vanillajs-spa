import RouterUtils from '../utils/RouterUtils.js';

class About {
  constructor() {
    this.params = [];
  }

  async render() {
    this.params = RouterUtils.getParams();

    return `
        <section class="section about">
            <div class="about">
              <h1>CAS-FEE-2020</h1>
              <p><a href="mailto:thomas.schallert@gmail.com">thomas.schallert@gmail.com</a></p>
              <p><a href="https://github.com/tomschall/" target="_blank">github.com/tomschall</a></p>
            </div>
        </section>
      `;
  }
  async after_render() {}
}

export default About;

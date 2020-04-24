// --------------------------------
//  Define Data Sources
// --------------------------------

let getData = async () => {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const response = await fetch(
      `https://5bb634f6695f8d001496c082.mockapi.io/api/posts`,
      options,
    );
    const json = await response.json();
    // console.log(json)
    return json;
  } catch (err) {
    console.log('Error getting documents', err);
  }
};

let Home = {
  render: async () => {
    let posts = await getData();
    let view = /*html*/ `
            <section class="section">
                <h1> Home </h1>
                <ul>
                    ${posts
                      .map(
                        (post) =>
                          /*html*/ `<li><a href="#detail/${post.id}">${post.title}</a></li>`,
                      )
                      .join('\n ')}
                </ul>
            </section>
        `;
    return view;
  },
  after_render: async () => {},
};

export default Home;

const Home = {
  render: async () => {
    let notes = await getData();
    let view = `
        <section class="section">
            <h1> Home </h1>
            <ul>
                ${notes
                  .map(
                    (note) =>
                      `<li><a href="#detail/${note.id}">${note.title}</a></li>`,
                  )
                  .join('\n ')}
            </ul>
        </section>
        `;
    return view;
  },
  after_render: async () => {},
};

const getData = async () => {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const response = await fetch(
      `https://5ea2d434b9f5ca00166c324a.mockapi.io/notes`,
      options,
    );
    const json = await response.json();
    return json;
  } catch (err) {
    console.error('Error getting documents', err);
  }
};

export default Home;

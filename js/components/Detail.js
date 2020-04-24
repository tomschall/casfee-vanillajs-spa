import RouterUtils from './../services/RouterUtils.js';

const Detail = {
  render: async () => {
    const params = RouterUtils.getParams();
    const notes = await getData(params.id);

    return `
        <section class="section">
            <h1>Notes Id : ${notes.id}</h1>
            <p> Notes Title : ${notes.title} </p>
            <p> Notes Description : ${notes.description} </p>
            <p> Notes Importance : ${notes.importance} </p>
            <p> Notes Date Created : ${notes.createDate} </p>
            <p> Notes Date Finished : ${notes.finishDate} </p>
        </section>
      `;
  },
  after_render: async () => {},
};

const getData = async (id) => {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const response = await fetch(
      `https://5ea2d434b9f5ca00166c324a.mockapi.io/notes/` + id,
      options,
    );
    const json = await response.json();
    // console.log(json)
    return json;
  } catch (err) {
    console.log('Error getting documents', err);
  }
};

export default Detail;

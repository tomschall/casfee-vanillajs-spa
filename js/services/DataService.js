const DataService = {
  getData: async (id) => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      let url = '';
      if (!id) url = `https://5ea2d434b9f5ca00166c324a.mockapi.io/notes`;
      else url = `https://5ea2d434b9f5ca00166c324a.mockapi.io/notes/` + id;
      const response = await fetch(url, options);
      const json = await response.json();
      return json;
    } catch (err) {
      console.error('Error getting documents', err);
    }
  },
};

export default DataService;

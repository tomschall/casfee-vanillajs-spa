import CONFIG from '../../config.js';

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
      if (!id) url = CONFIG.apiHost;
      else url = CONFIG.apiHost + id;
      const response = await fetch(url, options);
      const json = await response.json();
      return json;
    } catch (err) {
      console.error('Error getting documents', err);
    }
  },
};

export default DataService;

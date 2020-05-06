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
  createNote: async (data) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    try {
      const url = CONFIG.apiHost;
      const response = await fetch(url, options);
      const json = await response.json();
      return json;
    } catch (err) {
      console.error('Error creating documents', err);
    }
  },
  updateNote: async (id, data) => {
    console.log('data', data);
    console.log('id', id);
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    try {
      const url = CONFIG.apiHost + id;
      const response = await fetch(url, options);
      const json = await response.json();
      return json;
    } catch (err) {
      console.error('Error updating documents', err);
    }
  },
};

export default DataService;

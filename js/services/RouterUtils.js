const RouterUtils = {
  getParams: () => {
    let r = location.hash.toLowerCase().split('/');
    const request = {
      resource: r[0],
      id: r[1],
    };

    return request;
  },
};

export default RouterUtils;

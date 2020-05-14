const RouterUtils = {
  getParams: () => {
    let r = location.hash.toLowerCase().split('/');
    const res = {
      resource: r[0],
      id: r[1],
    };

    return res;
  },
};

export default RouterUtils;

class FilterService {
  constructor() {
    this.notes = [];
  }

  async initData() {
    this.dataService.data$.subscribe((data) => {
      if (data) {
        // add message to local state if not empty
        this.notes = data;
      }
    });
  }

  static async create(dataService) {
    const obj = new FilterService();
    obj.dataService = dataService;
    await obj.initData();
    return obj;
  }

  async filterNotes(filterBy) {
    if (filterBy == 'createDate' || filterBy == 'finishDate') {
      return this.filterByDate(filterBy);
    } else if (filterBy == 'importance' || filterBy == 'id') {
      return this.filterBy(filterBy);
    } else if (filterBy == 'finished') {
      return this.filterByFinished();
    }
  }

  async filterByDate(filterBy) {
    return this.notes.sort((a, b) => {
      return (
        new moment(b[filterBy]).format('YYYYMMDD') -
        new moment(a[filterBy]).format('YYYYMMDD')
      );
    });
  }

  async filterBy(prop) {
    return this.notes.sort((a, b) => b[prop] - a[prop]);
  }

  async filterByFinished() {
    return this.notes.filter((x) => x.finished == true);
  }
}

export default FilterService;

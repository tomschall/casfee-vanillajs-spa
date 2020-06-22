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
    const [...notes] = this.notes;
    return notes.sort((a, b) => {
      return (
        new moment(b[filterBy]).format('YYYYMMDD') -
        new moment(a[filterBy]).format('YYYYMMDD')
      );
    });
  }

  async filterBy(prop) {
    const [...notes] = this.notes;
    if (prop === 'id') return notes;
    return notes.sort((a, b) => b[prop] - a[prop]);
  }

  async filterByFinished() {
    const [...notes] = this.notes;
    return notes.filter((x) => x.finished == true);
  }
}

export default FilterService;

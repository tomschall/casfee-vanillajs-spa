class FilterUtils {
  constructor(notes) {
    this.notes = notes;
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
    return this.notes.sort((a, b) => a[prop] - b[prop]);
  }

  async filterByFinished() {
    return this.notes.filter((x) => x.finished == true);
  }
}

export default FilterUtils;

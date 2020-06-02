const FilterUtils = {
  filterNotes: function (filterBy) {
    if (filterBy == 'createDate' || filterBy == 'finishDate') {
      return this.filterByDate(filterBy);
    } else if (filterBy == 'importance' || filterBy == 'id') {
      return this.filterBy(filterBy);
    } else if (filterBy == 'finished') {
      return this.filterByFinished();
    }
  },
  filterByDate: function (filterBy) {
    return this.notes.sort((a, b) => {
      return (
        new moment(b[filterBy]).format('YYYYMMDD') -
        new moment(a[filterBy]).format('YYYYMMDD')
      );
    });
  },
  filterBy: function (prop) {
    return this.notes.sort((a, b) => a[prop] - b[prop]);
  },
  filterByFinished: function () {
    return this.notes.filter((x) => x.finished == true);
  },
};

export default FilterUtils;

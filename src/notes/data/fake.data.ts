export default function getNotes() {
  return [
    {
      title: 'Hello World',
      description: 'Was denn sonst? :)',
      finishDate: randomDate(new Date(2020, 3, 1), new Date()),
      createDate: new Date(2020, 0, 1),
      importance: 1,
      finished: false,
    },
    {
      title: 'Projekt1 abgeben',
      description: 'Am Sonntag ist Projektabgabe',
      finishDate: randomDate(new Date(2020, 3, 1), new Date()),
      createDate: new Date(2020, 0, 10),
      importance: 2,
      finished: true,
    },
    {
      title: 'Wandern gehen',
      description: 'Eine schöne Wanderroute aussuchen',
      finishDate: randomDate(new Date(2020, 3, 1), new Date()),
      createDate: new Date(2020, 0, 15),
      importance: 3,
      finished: false,
    },
    {
      title: 'Ein gutes Buch lesen',
      description: 'In der Bücherei ein gutes Buch ausleihen.',
      finishDate: randomDate(new Date(2020, 3, 1), new Date()),
      createDate: new Date(2020, 0, 1),
      importance: 4,
      finished: true,
    },
    {
      title: 'RxJS lernen',
      description: 'Reactive extensions are cool!',
      finishDate: randomDate(new Date(2020, 3, 1), new Date()),
      createDate: new Date(2020, 0, 1),
      importance: 5,
      finished: false,
    },
    {
      title: 'Meiner Freundin Blumen kaufen :P',
      description: 'Zuerst rausfinden, was ihre Lieblingsblumen sind.',
      finishDate: randomDate(new Date(2020, 3, 1), new Date()),
      createDate: new Date(2020, 0, 15),
      importance: 4,
      finished: true,
    },
    {
      title: 'Typescript lernen',
      description: 'Typescript rockt so richtig',
      finishDate: randomDate(new Date(2020, 3, 1), new Date()),
      createDate: new Date(2020, 0, 10),
      importance: 1,
      finished: false,
    },
    {
      title: 'An Open Source Projekten arbeiten',
      description: 'Etwas in die Community zurückgeben...',
      finishDate: randomDate(new Date(2020, 3, 1), new Date()),
      createDate: new Date(2020, 0, 15),
      importance: 2,
      finished: true,
    },
  ];
}

const randomDate = function (start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  );
};

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[travis-image]: https://api.travis-ci.org/nestjs/nest.svg?branch=master
[travis-url]: https://travis-ci.org/nestjs/nest
[linux-image]: https://img.shields.io/travis/nestjs/nest/master.svg?label=linux
[linux-url]: https://travis-ci.org/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="blank">Node.js</a> framework for building efficient and scalable server-side applications, heavily inspired by <a href="https://angular.io" target="blank">Angular</a>.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/dm/@nestjs/core.svg" alt="NPM Downloads" /></a>
<a href="https://travis-ci.org/nestjs/nest"><img src="https://api.travis-ci.org/nestjs/nest.svg?branch=master" alt="Travis" /></a>
<a href="https://travis-ci.org/nestjs/nest"><img src="https://img.shields.io/travis/nestjs/nest/master.svg?label=linux" alt="Linux" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#5" alt="Coverage" /></a>
<a href="https://gitter.im/nestjs/nestjs?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=body_badge"><img src="https://badges.gitter.im/nestjs/nestjs.svg" alt="Gitter" /></a>
<a href="https://opencollective.com/nest#backer"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec"><img src="https://img.shields.io/badge/Donate-PayPal-dc3d53.svg"/></a>
  <a href="https://twitter.com/nestframework"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# MyNotes App

## Description

A simple notes application. The frontend is built with vanillajs and the backend with nest.js. The backend uses graphql for querying and a mongodb to save the data.

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Features
* CRUD operations - add, show, edit and delete notes.
* Notes are colored by importance, each color has also it's own Pokemon.
* Theme toggler - Switch theme design.
* Sorting by different criteria
* Drag and drop - Delete Notes with drag and drop, just drag the note that you want to delete to the left or the right side and release it, if the color switches to dark red. After deleting the note, the notes stay as they were before deleting. The get ordered new at the next action. I thought this behaviour is more natural.
* Modal for creating and editing notes.
* Routes for creating and editing notes.

## Sort notes by different criteria
* init state (All)
* create date (Create Date)
* finish date (Finish Date)
* importance (Importance)
* finished (Is Finished)

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## GraphQL Mutation for creating a bunch of Notes

After installing the app please go to http://localhost:3000/graphql and run the following mutation to create a bunch of notes. After that you can surfe to http://localhost:3000/ where the notes will be shown.

```
mutation {
  insertNotes{
    id,
    title,
    description,
    finishDate,
    createDate,
    importance,
    finished
  }
}
```

## GraphQL Test Queries/Mutations for Notes

You could also test the graphql api on the graphql playground with the following queries/mutations. Just visit http://localhost:3000/graphql and copy/paste the mutation/query that you want to run.

```
mutation {
  addNote(newNoteData: {
  	title: "Neue Notiz",
    description: "Ich muss heute noch viele Bücher lesen",
    finishDate: "10-10-2020",
    importance: 5,
    finished: false
  }){
    id,
    title,
    description,
    finishDate,
    createDate,
    importance,
    finished
  }
}

query {
  note(id: "5ee668915b92b0c2e0ba900f")
  {
    title,
    description,
    createDate,
    finishDate,
    importance,
    finished
  }
}

query {
  notes
  {
    id,
    title,
    description,
    finishDate,
    importance,
    finished
  }
}

mutation {
  removeNote(id: "5ee667eb2d2ee4c249288ed2")
}

mutation {
  update(updateNoteData: {
    id: "5ee668915b92b0c2e0ba900f",
  	title: "Neue Notiz",
    description: "Keine Schokolade mehr essen...",
    finishDate: "11-10-2020",
    importance: 4,
    finished: true
  }){
    id,
    title,
    description,
    finishDate,
    createDate,
    importance,
    finished
  }
}
```

## Versioning

```sh
Node Version: v12.6.0
NPM Version: 6.9.0
MongoDB Version: 4.0.6 Community Edition
```

## Stay in touch

- Author - [Thomas Schallert](https://github.com/tomschall/)

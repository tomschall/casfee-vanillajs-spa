let squareBtn = document.querySelector('.square');

squareBtn.addEventListener('click', () => {
  import('./square.js').then((Module) => {
    console.log('name module', Module.name);
  });
});

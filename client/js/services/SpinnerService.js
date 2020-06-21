class SpinnerService {
  constructor() {
    this.loadingDiv = document.getElementById('loading');
    this.container = document.getElementById('container');
  }

  hideSpinner() {
    setTimeout(() => {
      this.loadingDiv.style.visibility = 'hidden';
      this.container.classList.remove('hidden');
    }, 300);
  }

  showSpinner() {
    this.loadingDiv.style.visibility = 'visible';
    this.container.classList.add('hidden');
  }
}

export default SpinnerService;

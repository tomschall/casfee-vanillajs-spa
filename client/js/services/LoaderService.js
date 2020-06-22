class LoaderService {
  constructor() {
    this.loadingDiv = document.getElementById('loading');
    this.container = document.getElementById('container');
  }

  hideLoader() {
    setTimeout(() => {
      this.loadingDiv.style.visibility = 'hidden';
      this.container.classList.remove('hidden');
    }, 300);
  }

  showLoader() {
    this.loadingDiv.style.visibility = 'visible';
    this.container.classList.add('hidden');
  }
}

export default LoaderService;

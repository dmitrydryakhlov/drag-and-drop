import Component from '@ember/component';

export default Component.extend({
  tagName: 'div',
  classNames: ['uploader', 'dropzone'],

  actions: {
    cancel() {
      this.xhr.abort()
    }
  },

  dragOver(event) {
    event.preventDefault()
  },

  drop(theEvent) {
    theEvent.preventDefault();
    const aFormData = new FormData();
    const file = theEvent.dataTransfer.files[0];
    aFormData.append('img', file);
    this.makeRequestXHR(aFormData);
  },

  makeRequestXHR(theFormData) {
    this.xhr = new XMLHttpRequest();
    this.xhr.mode = 'no-cors'
    this.xhr.upload.addEventListener('progress', (event) => {
      var percent = 0;
      var position = event.loaded || event.position;
      var total = event.total;
      if (event.lengthComputable) {
        percent = Math.ceil(position / total * 100);
      }
      const progressbars = this.element.getElementsByClassName(`progress-bar`);
      for (let i = 0; i < progressbars.length; i++) {
        progressbars[i].style.width = `${percent}%`;
      }
      const status = this.element.getElementsByClassName(`status`);
      for (let i = 0; i < status.length; i++) {
        status[i].innerText = `${percent}%`;
      }
    }, true);
    this.xhr.onload = () => this.returnDefault('uploaded');
    this.xhr.onabort = () => this.returnDefault('aborted');
    this.xhr.open("POST", 'http://localhost:3000/upload/', true);
    this.xhr.send(theFormData);
  },

  returnDefault(theMessage) {
    const aProgressbars = this.element.getElementsByClassName(`progress-bar`);
    for (let i = 0; i < aProgressbars.length; i++) {
      aProgressbars[i].style.width = '0%';
    }
    const aStatus = this.element.getElementsByClassName(`status`);
    for (let i = 0; i < aStatus.length; i++) {
      aStatus[i].innerText = `${theMessage}`;
      setTimeout(() => {
        aStatus[i].innerText = `drag and drop here`;
      }, 2000);
    }
  }
})
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
    let myFormData = new FormData();
    let file = theEvent.dataTransfer.files[0];
    myFormData.append('img', file);
    this.makeRequestXHR(myFormData);
    //this.makeRequestAjax(myFormData);
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
      let progressbars = this.element.getElementsByClassName(`progress-bar`);
      for (let i = 0; i < progressbars.length; i++) {
        progressbars[i].style.width = `${percent}%`;
      }
      let status = this.element.getElementsByClassName(`status`);
      for (let i = 0; i < status.length; i++) {
        status[i].innerText = `${percent}%`;
      }
    }, true);
    this.xhr.onload = () => {
      this.returnDefault('uploaded')
    }
    this.xhr.onabort = () => {
      this.returnDefault('aborted');
    }
    this.xhr.open("POST", 'http://localhost:3000/upload/', true);
    this.xhr.send(theFormData);
  },

  returnDefault(theMessage) {
    let progressbars = this.element.getElementsByClassName(`progress-bar`);
    for (let i = 0; i < progressbars.length; i++) {
      progressbars[i].style.width = '0%';
    }
    let status = this.element.getElementsByClassName(`status`);
    for (let i = 0; i < status.length; i++) {
      status[i].innerText = `${theMessage}`;
    }
  }
})
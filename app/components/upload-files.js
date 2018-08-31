import Component from '@ember/component';
import $ from 'jquery'

export default Component.extend({
  tagName: 'div',
  classNames: ['uploader', 'dropzone'],

  dragOver(event) {
    event.preventDefault()
  },

  drop(theEvent) {
    theEvent.preventDefault();
    var fd = new FormData();
    let file = theEvent.dataTransfer.files[0];
    fd.append('img', file);
    this.makeRequest(fd);
  },

  makeRequest(fd) {
    $.ajax({
      url: 'http://localhost:3000/upload/',
      type: 'POST',
      data: fd,
      contentType: false,
      processData: false,
      encType: "multipart/form-data",
      xhr: () => {
        var xhr = $.ajaxSettings.xhr();
        if (xhr.upload) {
          xhr.upload.addEventListener('progress', (event) => {
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
        }
        return xhr;
      },
      success: function (response) {
        console.log(response);
      },
      error: function (errorMessage) {
        console.log(errorMessage);
      }
    }).done(() => { //

      let progressbars = this.element.getElementsByClassName(`progress-bar`);
      for (let i = 0; i < progressbars.length; i++) {
        progressbars[i].style.width = '0%';
      }
      let status = this.element.getElementsByClassName(`status`);
      for (let i = 0; i < status.length; i++) {
        status[i].innerText = 'File uploaded';
      }
    });
  }
})
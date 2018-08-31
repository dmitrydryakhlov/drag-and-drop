import Component from '@ember/component';
import $ from 'jquery'

export default Component.extend({
  init() {
    this._super(arguments);
    this.id = ~~(Math.random() * 100)
  },
  tagName: 'div',
  classNames: ['uploader', 'dropzone'],
  dragOver(event) {
    event.preventDefault()
  },

  /**
   * 
   * @param {Object} theEvent 
   */
  drop(theEvent) {
    theEvent.preventDefault();
    var fd = new FormData();
    let file = theEvent.dataTransfer.files[0];
    fd.append('img', file);
    this.makeRequest(fd);
    console.log(this.id);
  },

  makeRequest(fd) {
    $.ajax({
      url: 'http://localhost:3000/upload/',
      type: 'POST',
      data: fd,
      contentType: false,//'multipart/form-data',
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
            //this.$(" .progress-bar").css("width", + percent + "%");
            //this.$(" .status").text(percent + "%");
            //getElementsByClassName();
            var progressbars = self.querySelectorAll("progress-bar");
            for (let i = 0; i < progressbars.length; i++) {
              //console.log(progressbars)
              progressbars[i].style.width = `${percent}%`;
            }
            var status = document.querySelectorAll(" .status");
            for (let i = 0; i < status.length; i++) {
              status[i].innerHTML = `${percent}%`;
            }
          }, true);
        }
        return xhr;
      },
      success: function (response) {
        console.log("Data Uploaded: " + response);
      },
      error: function (errorMessage) {
        console.log(errorMessage);
      }
    }).done((res) => { //
      //$(" .status").text(0 + "%");
      //$(" .progress-bar").css("width", + 0 + "%");
      var progressbars = document.querySelectorAll(" .progress-bar");
      for (let i = 0; i < progressbars.length; i++) {
        progressbars[i].style.width = '0%';
      }
      var status = document.querySelectorAll(" .status");
      for (let i = 0; i < status.length; i++) {
        status[i].innerHTML = '0%';
      }

    });
  }
})
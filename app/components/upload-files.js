import Component from '@ember/component';
import $ from 'jquery'



export default Component.extend({
    tagName: 'div',
    classNames: ['uploader', 'dropzone'],
    dragOver(event) {
        event.preventDefault()
    },

    drop(event) {
        event.preventDefault();
        var fd = new FormData();
        let file = event.dataTransfer.files[0];
        fd.append('img', file);
        this.makeRequest(fd);
    },

    makeRequest(fd) {
        $.ajax({
            url: 'http://localhost:3000/upload/',
            type: 'POST',
            data: fd,
            contentType: false,//'multipart/form-data',
            processData: false,
            encType: "multipart/form-data",
            success: function (response) {
                console.log("Data Uploaded: " + response);
            },
            error: function (errorMessage) {
                console.log(errorMessage);
            }
        })
    }
});

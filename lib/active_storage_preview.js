/*!
 * Active Storage Preview - Simple Active Storage script with Direct Upload and Image Preview
 *
 * The MIT License
 *
 * @author:  Washington Botelho
 * @doc:     https://github.com/wbotelhos/active_storage_preview
 * @version: 0.0.1
 *
 */

function ActiveStoragePreview(options) {
  'use strict';

  this.form         = options.form;
  this.options      = options;
  this.target       = options.target;
  this.uploadButton = options.uploadButton;
  this.uploadField  = options.uploadField;
}

ActiveStoragePreview.prototype = {
  bindButton: function() {
    'use strict';

    this.uploadButton.addEventListener('click', function() {
      this.uploadField.click();
    }.bind(this));
  },

  bindField: function() {
    'use strict';

    this.uploadField.addEventListener('change', function(event) {
      var files = event.currentTarget.files;

      for (var i = 0; i < files.length; i++) {
        this.readAndPreview(files[i]);
      }
    }.bind(this));
  },

  bindUpload: function() {
    'use strict';

    addEventListener('direct-upload:initialize', this.directUploadInitialize.bind(this));
    addEventListener('direct-uploads:start', this.directUploadsStart.bind(this));
    addEventListener('direct-upload:start', this.directUploadStart.bind(this));
    addEventListener('direct-upload:before-blob-request', this.directUploadBeforeBlobRequest.bind(this));
    addEventListener('direct-upload:before-storage-request', this.directUploadBeforeStorageRequest.bind(this));
    addEventListener('direct-upload:progress', this.directUploadProgress.bind(this));
    addEventListener('direct-upload:error', this.directUploadError.bind(this));
    addEventListener('direct-upload:end', this.directUploadEnd.bind(this));
    addEventListener('direct-uploads:end', this.directUploadsEnd.bind(this));
  },

  create: function() {
    'use strict';

    this.bindButton();
    this.bindField();
    this.bindUpload();

    return this;
  },

  directUploadInitialize: function(event) {
    'use strict';

    console.log('[upload.1] Dispatched for every file after form submission.');

    this.triggerEvent('direct-upload-initialize', { event: event });
  },

  directUploadsStart: function(event) {
    'use strict';

    console.log('[upload.2] A form containing files for direct upload fields was submitted.');

    this.triggerEvent('direct-uploads-start', { event: event });
  },

  directUploadStart: function(event) {
    'use strict';

    console.log('[upload.3] A direct upload is starting.');

    this.triggerEvent('direct-upload:start', { event: event });
  },

  directUploadBeforeBlobRequest: function(event) {
    'use strict';

    console.log('[upload.4] Before making a request to your application for direct upload metadata.');

    this.triggerEvent('direct-upload:before-blob-request', { event: event });
  },

  directUploadBeforeStorageRequest: function(event) {
    'use strict';

    console.log('[upload.5] Before making a request to store a file.');

    this.triggerEvent('direct-upload:before-storage-request', { event: event });
  },

  directUploadProgress: function(event) {
    'use strict';

    console.log('[upload.6] As requests to store files progress.');

    var id         = this.parameterize(event.detail.file.name);
    var percentBox = this.percentBox(id);

    if (percentBox) {
      percentBox.innerText = event.detail.progress + '%';
    }

    this.triggerEvent('direct-upload:progress', { event: event });
  },

  directUploadError: function(event) {
    'use strict';

    console.log('[upload.7] An error occurred. An alert will display unless this event is canceled.');

    event.preventDefault(event.detail.error);

    this.triggerEvent('direct-upload:error', { event: event });
  },

  directUploadEnd: function(event) {
    'use strict';

    console.log('[upload.8] A direct upload has ended.');

    var id         = this.parameterize(event.detail.file.name);
    var percentBox = this.percentBox(id);

    if (percentBox) {
      percentBox.remove();
    }

    this.triggerEvent('direct-upload:end', { event: event });
  },

  directUploadsEnd: function(event) {
    'use strict';

    console.log('[upload.9] All direct uploads have ended.');

    this.triggerEvent('direct-uploads-end', { event: event });
  },

  onLoadPreview: function(file, event) {
    'use strict';

    var base64 = event.target.result;
    var id     = this.parameterize(file.name);

    if (this.uploadField.multiple) {
      var html = this.previewTemplate(base64, id, file);

      this.target.insertAdjacentHTML('beforeend', html);
    } else {
      if (this.options.attribute === 'style') {
        this.target.style = 'background-image: url("' + base64 + '")';
      } else {
        this.target.src = base64;
      }
    }

    this.triggerEvent('direct-uploads-on-load-preview', { event: event });
  },

  parameterize: function(value) {
    'use strict';

    return value.trim().toLowerCase().replace(/[^a-zA-Z0-9 -]/, '').replace(/\s/g, '-');
  },

  percentBox: function(id) {
    'use strict';

    return document.querySelector('[data-preview-item="' + id + '"]');
  },

  previewTemplate: function(src, id, file) {
    'use strict';

    if (typeof(this.options.template) === 'function') {
      return this.options.template(src, id, file);
    }

    return '<img alt="" src="' + src + '">';
  },

  readAndPreview: function(file) {
    'use strict';

    if (!/\.(jpe?g|png|gif)$/i.test(file.name)) {
      return;
    }

    var reader = new FileReader();

    reader.addEventListener('load', this.onLoadPreview.bind(this, file), false);
    reader.readAsDataURL(file);
  },

  triggerEvent: function(el, eventName, json) {
    'use strict';

    if (window.CustomEvent && typeof window.CustomEvent === 'function') {
      var event = new CustomEvent(eventName, { detail: json });
    } else {
      var event = document.createEvent('CustomEvent');

      event.initCustomEvent(eventName, true, true, json);
    }

    this.uploadField.dispatchEvent(event);
  },
};

# Active Storage Preview

[![Build Status](https://github.com/wbotelhos/active_storage_preview/workflows/CI/badge.svg)](https://github.com/wbotelhos/active_storage_preview/actions)
[![NPM Version](https://badge.fury.io/js/active_storage_preview.svg)](https://badge.fury.io/js/active_storage_preview)
[![Dependency](https://david-dm.org/wbotelhos/active_storage_preview.svg)](https://david-dm.org/wbotelhos/active_storage_preview)
[![Dev Dependency](https://david-dm.org/wbotelhos/active_storage_preview/dev-status.svg)](https://david-dm.org/wbotelhos/active_storage_preview#info=devDependencies)
[![Code Climate](https://codeclimate.com/github/wbotelhos/active_storage_preview.png)](https://codeclimate.com/github/wbotelhos/active_storage_preview)
[![Support](https://img.shields.io/badge/donate-%3C3-brightgreen.svg)](https://www.patreon.com/wbotelhos)

Simple Direct Upload with Preview Image

## Options

|Attribute   |Default  |Description                                      |
|------------|---------|-------------------------------------------------|
|attribute   |'src'    |The attribute that will receive the image preview|
|form        |undefined|The form that contain the file uplod field       |
|target      |undefined|The target for the image(s)                      |
|uploadButton|undefined|The button to trigger the upload file selection  |
|uploadField |undefined|The file field                                   |

## Usage

### For Image

When using single image, sets the target directly on image. Image will receive the `src`.

```html
<img data-target>

<form data-form enctype="multipart/form-data">
  <input data-upload-field type="file">

  <a data-upload-button href="javascript:void(0)">Select Image</a>
</form>
```

```js
new ActiveStoragePreview({
  form:         document.querySelector('[data-form]'),
  target:       document.querySelector('[data-target]'),
  uploadButton: document.querySelector('[data-upload-button]'),
  uploadField:  document.querySelector('[data-upload-field]'),
}).create();
```

### For Image used on background

When using single image on background, like cover, sets the target directly on image. Image will receive the `background-image`. You must set `attribute` option as `style`.

```html
<div data-target></div>

<form data-form enctype="multipart/form-data">
  <input data-upload-field multiple="multiple" type="file">

  <a data-upload-button href="javascript:void(0)">Select Image</a>
</form>
```

```js
new ActiveStoragePreview({
  attribute:    'style',
  form:         document.querySelector('[data-form]'),
  target:       document.querySelector('[data-target]'),
  uploadButton: document.querySelector('[data-upload-button]'),
  uploadField:  document.querySelector('[data-upload-field]'),
}).create();
```

### For Images

When using multiple images, sets the target on a wrapper. Images will be appended. Do not forget the `multiple` attribute on field. :)

```html
<div data-target></div>

<form data-form enctype="multipart/form-data">
  <input data-upload-field multiple="multiple" type="file">

  <a data-upload-button href="javascript:void(0)">Select Images</a>
</form>
```

```js
new ActiveStoragePreview({
  form:         document.querySelector('[data-form]'),
  target:       document.querySelector('[data-target]'),
  uploadButton: document.querySelector('[data-upload-button]'),
  uploadField:  document.querySelector('[data-upload-field]'),
}).create();
```

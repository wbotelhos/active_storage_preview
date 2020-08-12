describe('onLoadPreview', function() {
  'use strict';

  context('when is multiple', function() {
    beforeEach(function() {
      fixture.load('multiple.html');
    });

    context('when template is given', function() {
      it ('appends the template content on target', function() {
        // given

        var event = { target: { result: 'base64' } };
        var file  = { name: 'File Name.jpg' };

        var activeStoragePreview = new ActiveStoragePreview({
          target: document.querySelector('[data-target]'),

          template: function(src, id, file) {
            return (
              '<div data-name="' + file.name + '" data-template="' + id + '"><img alt="alt" src="' + src + '"></div>'
            );
          },

          uploadField: document.querySelector('[data-upload-field]'),
        });

        // when

        activeStoragePreview.onLoadPreview(file, event);

        // then

        var template = document.querySelector('[data-template]');

        expect(template.dataset.name).toEqual('File Name.jpg');
        expect(template.dataset.template).toEqual('file-name-jpg');

        var img = template.querySelector('img');

        expect(img.alt).toEqual('alt');
        expect(img.src).toMatch('/base64$');
      });

      context('when attribute option is style', function() {
        it ('ignores the template chaging background image', function() {
          // given

          var event = { target: { result: 'base64' } };
          var file  = { name: 'File Name.jpg' };

          var activeStoragePreview = new ActiveStoragePreview({
            attribute:  'style',
            target:      document.querySelector('[data-target]'),
            template:    function(_src, _id, _file) { return '<div data-ignored></div>'; },
            uploadField: document.querySelector('[data-upload-field]'),
          });

          // when

          activeStoragePreview.onLoadPreview(file, event);

          // then

          var target = document.querySelector('[data-target]');

          expect(target.querySelector('[data-ignored]')).toEqual(null);
          expect(target.querySelector('img')).toEqual(null);

          expect(target.style['background-image']).toEqual('url("base64")');
        });
      });
    });

    context('when template is not given', function() {
      it ('appends the default image on target', function() {
        // given

        var event = { target: { result: 'base64' } };
        var file  = { name: 'File Name.jpg' };

        var activeStoragePreview = new ActiveStoragePreview({
          target:      document.querySelector('[data-target]'),
          uploadField: document.querySelector('[data-upload-field]'),
        });

        // when

        activeStoragePreview.onLoadPreview(file, event);

        // then

        var img = document.querySelector('[data-target]').querySelector('img');

        expect(img.alt).toEqual('');
        expect(img.src).toMatch('/base64$');
      });

      context('when attribute option is style', function() {
        it ('changes background image', function() {
          // given

          var event = { target: { result: 'base64' } };
          var file  = { name: 'File Name.jpg' };

          var activeStoragePreview = new ActiveStoragePreview({
            attribute:  'style',
            target:      document.querySelector('[data-target]'),
            uploadField: document.querySelector('[data-upload-field]'),
          });

          // when

          activeStoragePreview.onLoadPreview(file, event);

          // then

          var target = document.querySelector('[data-target]');

          expect(target.querySelector('[data-ignored]')).toEqual(null);
          expect(target.querySelector('img')).toEqual(null);

          expect(target.style['background-image']).toEqual('url("base64")');
        });
      });
    });
  });

  context('when is single', function() {
    context('when has no image', function() {
      beforeEach(function() {
        fixture.load('single_no_image.html');
      });

      context('when template is given', function() {
        it ('appends the template content on target', function() {
          // given

          var event = { target: { result: 'base64' } };
          var file  = { name: 'File Name.jpg' };

          var activeStoragePreview = new ActiveStoragePreview({
            target: document.querySelector('[data-target]'),

            template: function(src, id, file) {
              return (
                '<div data-name="' + file.name + '" data-template="' + id + '"><img alt="alt" src="' + src + '"></div>'
              );
            },

            uploadField: document.querySelector('[data-upload-field]'),
          });

          // when

          activeStoragePreview.onLoadPreview(file, event);

          // then

          var template = document.querySelector('[data-template]');

          expect(template.dataset.name).toEqual('File Name.jpg');
          expect(template.dataset.template).toEqual('file-name-jpg');

          var img = template.querySelector('img');

          expect(img.alt).toEqual('alt');
          expect(img.src).toMatch('/base64$');
        });

        context('when attribute option is style', function() {
          it ('ignores the template chaging background image', function() {
            // given

            var event = { target: { result: 'base64' } };
            var file  = { name: 'File Name.jpg' };

            var activeStoragePreview = new ActiveStoragePreview({
              attribute:  'style',
              target:      document.querySelector('[data-target]'),
              template:    function(_src, _id, _file) { return '<div data-ignored></div>'; },
              uploadField: document.querySelector('[data-upload-field]'),
            });

            // when

            activeStoragePreview.onLoadPreview(file, event);

            // then

            var target = document.querySelector('[data-target]');

            expect(target.querySelector('[data-ignored]')).toEqual(null);
            expect(target.querySelector('img')).toEqual(null);

            expect(target.style['background-image']).toEqual('url("base64")');
          });
        });
      });

      context('when template is not given', function() {
        it ('appends the default image on target', function() {
          // given

          var event = { target: { result: 'base64' } };
          var file  = { name: 'File Name.jpg' };

          var activeStoragePreview = new ActiveStoragePreview({
            target:      document.querySelector('[data-target]'),
            uploadField: document.querySelector('[data-upload-field]'),
          });

          // when

          activeStoragePreview.onLoadPreview(file, event);

          // then

          var img = document.querySelector('[data-target]').querySelector('img');

          expect(img.alt).toEqual('');
          expect(img.src).toMatch('/base64$');
        });

        context('when attribute option is style', function() {
          it ('chages background image', function() {
            // given

            var event = { target: { result: 'base64' } };
            var file  = { name: 'File Name.jpg' };

            var activeStoragePreview = new ActiveStoragePreview({
              attribute:  'style',
              target:      document.querySelector('[data-target]'),
              uploadField: document.querySelector('[data-upload-field]'),
            });

            // when

            activeStoragePreview.onLoadPreview(file, event);

            // then

            var target = document.querySelector('[data-target]');

            expect(target.querySelector('[data-ignored]')).toEqual(null);
            expect(target.querySelector('img')).toEqual(null);

            expect(target.style['background-image']).toEqual('url("base64")');
          });
        });
      });
    });

    context('when has image', function() {
      beforeEach(function() {
        fixture.load('single_with_image.html');
      });

      context('when template is given', function() {
        it ('ignores template and changes the image', function() {
          // given

          var event = { target: { result: 'base64' } };
          var file  = { name: 'File Name.jpg' };

          var activeStoragePreview = new ActiveStoragePreview({
            target:      document.querySelector('[data-target]'),
            template:    function(src, id, file) { return '<div data-ignored></div>'; },
            uploadField: document.querySelector('[data-upload-field]'),
          });

          // when

          activeStoragePreview.onLoadPreview(file, event);

          // then

          expect(document.querySelector('[data-ignored]')).toEqual(null);

          var img = document.querySelector('[data-target]').querySelector('img');

          expect(img.alt).toEqual('');
          expect(img.src).toMatch('/base64$');
        });

        context('when attribute option is style', function() {
          it ('ignores the template chaging background image', function() {
            // given

            var event = { target: { result: 'base64' } };
            var file  = { name: 'File Name.jpg' };

            var activeStoragePreview = new ActiveStoragePreview({
              attribute:  'style',
              target:      document.querySelector('[data-target]'),
              template:    function(_src, _id, _file) { return '<div data-ignored></div>'; },
              uploadField: document.querySelector('[data-upload-field]'),
            });

            // when

            activeStoragePreview.onLoadPreview(file, event);

            // then

            var target = document.querySelector('[data-target]');

            expect(target.querySelector('[data-ignored]')).toEqual(null);
            expect(target.querySelector('img').src).toMatch('/pixel.png$');

            expect(target.style['background-image']).toEqual('url("base64")');
          });
        });
      });

      context('when template is not given', function() {
        it ('appends the default image on target', function() {
          // given

          var event = { target: { result: 'base64' } };
          var file  = { name: 'File Name.jpg' };

          var activeStoragePreview = new ActiveStoragePreview({
            target:      document.querySelector('[data-target]'),
            uploadField: document.querySelector('[data-upload-field]'),
          });

          // when

          activeStoragePreview.onLoadPreview(file, event);

          // then

          var img = document.querySelector('[data-target]').querySelector('img');

          expect(img.alt).toEqual('');
          expect(img.src).toMatch('/base64$');
        });

        context('when attribute option is style', function() {
          it ('changes background image', function() {
            // given

            var event = { target: { result: 'base64' } };
            var file  = { name: 'File Name.jpg' };

            var activeStoragePreview = new ActiveStoragePreview({
              attribute:  'style',
              target:      document.querySelector('[data-target]'),
              uploadField: document.querySelector('[data-upload-field]'),
            });

            // when

            activeStoragePreview.onLoadPreview(file, event);

            // then

            var target = document.querySelector('[data-target]');

            expect(target.querySelector('[data-ignored]')).toEqual(null);
            expect(target.querySelector('img').src).toMatch('/pixel.png$');

            expect(target.style['background-image']).toEqual('url("base64")');
          });
        });
      });
    });
  });
});

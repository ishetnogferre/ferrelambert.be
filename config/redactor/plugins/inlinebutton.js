var plugin = $.extend({}, Craft.Redactor.PluginBase, {
  linkOptions: [],
  existingText: '',
  hack: null,
  modalState: {
    selectedLink: {
      text: null,
      url: null
    },
    isButton: false,
  },
  translations: {
    en: {
      "my-button": "Button"
    }
  },

  init: function(app) {
    this.app = app;

    // define lang service
    this.lang = app.lang;
    this.toolbar = app.toolbar;
    this.insertion = app.insertion;

  },
  start: function(){
    // set up the button with lang variable
    var buttonData = {
      title: this.lang.get('my-button'),
      api: 'plugin.inlinebutton.setLinkOptions',
    };

    // add the button to the toolbar
    var $button = this.toolbar.addButton('my-button', buttonData);
  },
  showModal: function (arguments, zIndex) {
      let refHandle = arguments.refHandle,
          callback = arguments.callback;

      this.app.selection.save();

      this.modalState.isButton = true;

      // Create a new one each time because Redactor creates a new one and we can't reuse the references.
      const modal = Craft.createElementSelectorModal(arguments.elementType, {
          storageKey: 'RedactorInput.LinkTo.' + arguments.elementType,
          sources: arguments.sources,
          criteria: arguments.criteria,
          defaultSiteId: this.elementSiteId,
          autoFocusSearchBox: false,
          onSelect: $.proxy(function(elements) {
              if (elements.length) {
                  const element = elements[0];

                  this.app.selection.restore();

                  this.modalState.selectedLink = {
                      url: element.url + '#' + refHandle + ':' + element.id + '@' + element.siteId,
                      text: this.app.selection.getText().length > 0 ? this.app.selection.getText() : element.label
                  }

                  this.app.api('module.link.open');
              }
          }, this),
          closeOtherModals: false,
      });
  },
  openLink: function () {
    this.modalState.isButton = true;
    this.app.api('module.link.open');
  },

  unLink: function () {
    console.log(this.app);
    this.modalState.isButton = true;
    this.app.api('module.link.unlink');
  },


  setLinkOptions: function (linkOptions) {
      this.linkOptions = linkOptions;
  },

  onmodal: {
      link: {
          open: function(modal, form) {
              // Prevent Redactor from aggressively refocusing, when we don't want it to.
              this.hack = modal.app.editor.focus;
              modal.app.editor.focus = () => null;

              $form = $(form.nodes);

              if (this.modalState.selectedLink.url) {
                  $form.find('input[name=url]').val(this.modalState.selectedLink.url);
              }

              if (this.modalState.selectedLink.text) {
                  $form.find('input[name=text]').val(this.modalState.selectedLink.text);
              }

              this.modalState.selectedLink = {
                  text: null,
                  url: null
              };
          },
          close: function (modal) {
            // Revert the functionality.
            modal.app.editor.focus = this.hack;
            this.hack = null;
          }
      }
  },
  onlink: {
    inserted: function(s) {
      if (this.modalState.isButton == true) {
        s.nodes[0].classList.add('redactor__btn-container');

        let innerText = s.nodes[0].innerHTML;
        let innerEl = document.createElement('span');
        innerEl.innerHTML = innerText;
        innerEl.classList.add('btn__inner');
        s.nodes[0].innerHTML =  '';
        s.nodes[0].prepend(innerEl);
      }

      this.modalState.isButton = false;
    },
  },

  setLinkOptions: function (linkOptions) {
      var button = this.app.toolbar.getButton('my-button'),
          dropdown = this.app.toolbar.getButton('link').getDropdown(),
          items = JSON.parse(JSON.stringify(dropdown.items));
      

      items.custom1.api = "plugin.inlinebutton.showModal";
      items.custom2.api = "plugin.inlinebutton.showModal";
      items.link.api = "plugin.inlinebutton.openLink";
      items.unlink.api = "plugin.inlinebutton.unLink";

      button.setDropdown(items);
  }
});

(function($R) {
  $R.add('plugin', 'inlinebutton', plugin);
})(Redactor);
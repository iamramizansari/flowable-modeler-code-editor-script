// ==UserScript==
// @name         Flowable Modeler Code Editor Script 
// @namespace    http://ramizansari.com/
// @version      0.1
// @description  Allow flowable modeller user to edit script tasks in proper code editor
// @author       Rameez Ul haq
// @match        */flowable-modeler/*
// @grant        none
// ==/UserScript==


(function () {
    'use strict';

    addStaticAssets();
    jQuery(document).ready(function () {
        Mousetrap.bind('command+k', function (e) {
            jQuery("body > div.modal.ng-scope.top.am-fade > div > div > div.modal-body > p > textarea").attr("id", "old-editor");
            jQuery("body > div.modal.ng-scope.top.am-fade > div > div > div.modal-body > p > textarea").css("display", "none");
            jQuery("<div id='code-editor'></div>").insertAfter("body > div.modal.ng-scope.top.am-fade > div > div > div.modal-body > p > textarea");
            var ta = document.getElementById("old-editor");
            var cm = CodeMirror(document.getElementById("code-editor"), {
                value: ta.value,
                mode: "javascript",
                indentUnit: 4,
                lineNumbers: true
            });
            cm.setSize(null, 800);
            cm.on('change', (cm) => {
                ta.value = cm.getValue();
                ta.dispatchEvent(new Event('input'));
            });
        });
    });
})();

function addStaticAssets() {
  var css = `
  .modal-dialog {
      width: 800px !important;
      margin: 30px auto;
  }
  *[ng-controller="FlowableTextPropertyPopupCtrl"] textarea{
    height: 700px !important;
    width: 100% !important;
  }
  #code-editor{
    height: 800px;
  }
  `;

  var head, style, scriptCM, scriptJS, scriptMT, link, body;
  head = document.getElementsByTagName('head')[0];
  body = document.getElementsByTagName('body')[0];
  if (!head) { return; }
  style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = css;
  head.appendChild(style);

  link = document.createElement('link');
  link.rel = "stylesheet";
  link.href = "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.60.0/codemirror.min.css"
  link.integrity = 'sha512-xIf9AdJauwKIVtrVRZ0i4nHP61Ogx9fSRAkCLecmE2dL/U8ioWpDvFCAy4dcfecN72HHB9+7FfQj3aiO68aaaw=='
  link.crossOrigin = 'anonymous'
  head.appendChild(link);

  scriptCM = document.createElement('script')
  scriptCM.addEventListener("load", function (event) {
    scriptJS = document.createElement('script')
    scriptJS.src = 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.60.0/mode/javascript/javascript.min.js'
    scriptJS.integrity = 'sha512-isTDQTpVc8nKKMQmhm0b6fccRPjzo2g0q6l2VLy9/jDn5s8bEUu9WuSGkkAfN/NCwI3+Qi5wEVCaPRoWvT6YPw=='
    scriptJS.crossOrigin = 'anonymous'
    body.appendChild(scriptJS);
  });
  scriptCM.src = 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.60.0/codemirror.min.js'
  scriptCM.integrity = 'sha512-hc0zo04EIwTzKLvp2eycDTeIUuvoGYYmFIjYx7DmfgQeZPC5N27sPG2wEQPq8d8fCTwuguLrI1ffatqxyTbHJw=='
  scriptCM.crossOrigin = 'anonymous'

  body.appendChild(scriptCM);
  scriptMT = document.createElement('script');
  scriptMT.src = "https://cdnjs.cloudflare.com/ajax/libs/mousetrap/1.6.5/mousetrap.min.js"
  scriptMT.integrity = "sha512-+Jg3Ynmj9hse704K48H6rBBI3jdNBjReRGBCxUWFfOz3yVurnJFWtAWssDAsGtzWYw89xFWPxShuj2T6E9EOpg=="
  scriptMT.crossOrigin = "anonymous"
  body.appendChild(scriptMT);

}

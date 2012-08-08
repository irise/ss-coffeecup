// Coffeecup Template Engine wrapper for SocketStream 0.3

var ck = require('coffeecup');

exports.init = function(ss, config) {

  return {

    name: 'Coffeecup',

    // Opening code to use when a Coffeecup template is called for the first time
    prefix: function() {
      return '<script type="text/javascript">(function(){var t=require(\'socketstream\').tmpl;'
    },

    // Closing code once all Coffeecup templates have been written into the <script> tag
    suffix: function() {
      return '}).call(this);</script>';
    },

    // Compile template into a function and attach it to ss.tmpl
    process: function(template, path, id) {

      var compiledTemplate;

      try {
        compiledTemplate = ck.compile(template).toString();
      } catch (e) {
        var message = '! Error compiling the ' + path + ' template into Coffeecup';
        console.log(String.prototype.hasOwnProperty('red') && message.red || message);
        throw new Error(e);
        compiledTemplate = '';
      }

      return 't[\'' + id + '\']=' + compiledTemplate + ';';
    }
  }
}

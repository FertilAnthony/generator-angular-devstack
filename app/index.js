'use strict';

var path = require('path');
var chalk = require('chalk');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

var application = require('./src/application');
var model = require('./src/model');

var AngularDevstackGenerator = yeoman.generators.Base.extend({
  /* Initialization, evaluate appname */
  init: function () {
    this.pkg = require('../package.json');

    this.argument('appname', { type: String, required: false });
    this.appname = this.appname || path.basename(process.cwd());
    this.BASE_HREF = '<%= BASE_HREF %>';
  },

  info: function () {
    this.log(yosay(
      chalk.red('Welcome!') + '\n' +
      chalk.yellow('You\'re using Angular Devstack!')
    ));
  },

  /* Initialize model */
  model: model,

  /* Process files */
  application: application,

  /* Install dependencies */
  install: function () {
    this.installDependencies();
  }
});

module.exports = AngularDevstackGenerator;

"use strict";

var _tsyringe = require("tsyringe");
var _DayjsDateProvider = require("./DateProvider/implementations/DayjsDateProvider");
var _EtherealMailProvider = require("./MailProvider/implementations/EtherealMailProvider");
var _SESMailProvider = require("./MailProvider/implementations/SESMailProvider");
var _S3StorageProvider = require("./StorageProvider/implementations/S3StorageProvider");
var _StorageProvider = require("./StorageProvider/implementations/StorageProvider");
_tsyringe.container.registerSingleton("DayjsDateProvider", _DayjsDateProvider.DayjsDateProvider);
const mailProvider = {
  ethereal: _EtherealMailProvider.EtherealMailProvider,
  sendgrid: _SESMailProvider.SESMailProvider
};
_tsyringe.container.registerSingleton("MailProvider", mailProvider[process.env.MAIL_PROVIDER]);
const diskStorage = {
  local: _StorageProvider.StorageProvider,
  s3: _S3StorageProvider.S3StorageProvider
};
_tsyringe.container.registerSingleton("StorageProvider", diskStorage[process.env.DISK]);
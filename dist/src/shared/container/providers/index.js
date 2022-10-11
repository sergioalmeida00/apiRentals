"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const DayjsDateProvider_1 = require("./DateProvider/implementations/DayjsDateProvider");
const EtherealMailProvider_1 = require("./MailProvider/implementations/EtherealMailProvider");
const SESMailProvider_1 = require("./MailProvider/implementations/SESMailProvider");
const S3StorageProvider_1 = require("./StorageProvider/implementations/S3StorageProvider");
const StorageProvider_1 = require("./StorageProvider/implementations/StorageProvider");
tsyringe_1.container.registerSingleton("DayjsDateProvider", DayjsDateProvider_1.DayjsDateProvider);
const mailProvider = {
    ethereal: EtherealMailProvider_1.EtherealMailProvider,
    sendgrid: SESMailProvider_1.SESMailProvider
};
tsyringe_1.container.registerSingleton("MailProvider", mailProvider[process.env.MAIL_PROVIDER]);
const diskStorage = {
    local: StorageProvider_1.StorageProvider,
    s3: S3StorageProvider_1.S3StorageProvider
};
tsyringe_1.container.registerSingleton("StorageProvider", diskStorage[process.env.DISK]);

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3StorageProvider = void 0;
const aws_sdk_1 = require("aws-sdk");
const upload_1 = __importDefault(require("@config/upload"));
const path_1 = require("path");
const promises_1 = __importDefault(require("fs/promises"));
const mime_1 = __importDefault(require("mime"));
class S3StorageProvider {
    constructor() {
        this.client = new aws_sdk_1.S3({
            region: process.env.AWS_BUCKET_REGION
        });
    }
    save(file, folder) {
        return __awaiter(this, void 0, void 0, function* () {
            const originalName = (0, path_1.resolve)(upload_1.default.tmpFolder, file);
            const fileContent = yield promises_1.default.readFile(originalName);
            const ContentType = mime_1.default.getType(originalName);
            yield this.client.putObject({
                Bucket: `${process.env.AWS_BUCKET}/${folder}`,
                Key: file,
                ACL: "public-read",
                Body: fileContent,
                ContentType
            }).promise();
            yield promises_1.default.unlink(originalName);
            return file;
        });
    }
    delete(file, folder) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.client.deleteObject({
                Bucket: `${process.env.AWS_BUCKET}/${folder}`,
                Key: file
            }).promise();
        });
    }
}
exports.S3StorageProvider = S3StorageProvider;

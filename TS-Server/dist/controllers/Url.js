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
const qrcode_1 = __importDefault(require("qrcode"));
const short_uuid_1 = __importDefault(require("short-uuid"));
const validateSchema_1 = require("../lib/validateSchema");
const db_1 = __importDefault(require("../db"));
class UrlControllers {
    constructor() {
        this.createUrl = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const { error } = validateSchema_1.validateSchema.validate(data);
                if (error) {
                    return res.json({ valid: false, msg: error });
                }
                const shortId = short_uuid_1.default.generate();
                const shorten_url = `${process.env.API_URL}/${shortId}`;
                const UrlData = Object.assign(Object.assign({}, data), { shorten_url: shorten_url, shorten_id: shortId, click_counts: 0, qr_counts: 0 });
                const NewUrl = yield (0, db_1.default)("Url_Details").insert(UrlData).returning("*");
                res.status(201).json({ valid: true, msg: "created new url", NewUrl });
            }
            catch (error) {
                console.log(error);
            }
        });
        this.redirectUrl = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const ExistingUrl = yield (0, db_1.default)("Url_Details")
                    .where({ shorten_id: req.params.id })
                    .first();
                if (ExistingUrl) {
                    yield (0, db_1.default)("Url_Details")
                        .where({ shorten_id: req.params.id })
                        .increment("click_counts");
                    return res.redirect(ExistingUrl.original_url);
                }
            }
            catch (error) {
                console.log(error);
            }
        });
        this.redirectQRUrl = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const ExistingUrl = yield (0, db_1.default)("Url_Details")
                    .where({ shorten_id: req.params.id })
                    .first();
                if (ExistingUrl) {
                    yield (0, db_1.default)("Url_Details")
                        .where({ shorten_id: req.params.id })
                        .increment("qr_counts");
                    return res.redirect(ExistingUrl.original_url);
                }
            }
            catch (error) {
                console.log(error);
            }
        });
        this.GetUrls = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { username } = req.query;
                const UrlData = yield (0, db_1.default)("Url_Details").where({ username: username });
                return res.status(200).json({ valid: true, UrlData });
            }
            catch (error) {
                console.log(error);
            }
        });
        this.GetQR = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { shortId } = req.query;
                const QRUrl = `${process.env.API_URL}/qr/${shortId}`;
                const QRImage = yield qrcode_1.default.toDataURL(QRUrl);
                return res.status(200).json({ valid: true, QRImage });
            }
            catch (error) {
                console.log(error);
            }
        });
        this.EditUrl = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { link, shortId } = req.body;
                const NewUrl = yield (0, db_1.default)("Url_Details")
                    .where({ shorten_id: shortId })
                    .update({ original_url: link });
                res.status(201).json({ valid: true, msg: "updated new url", NewUrl });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.default = new UrlControllers();

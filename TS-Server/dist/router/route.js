"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Url_1 = __importDefault(require("../controllers/Url"));
const router = express_1.default.Router();
router.post('/api/createUrl', Url_1.default.createUrl);
router.post('/api/updateUrl', Url_1.default.EditUrl);
router.get('/:id', Url_1.default.redirectUrl);
router.get('/qr/:id', Url_1.default.redirectQRUrl);
router.get('/api/getUrls', Url_1.default.GetUrls);
router.get('/api/getQR', Url_1.default.GetQR);
exports.default = router;

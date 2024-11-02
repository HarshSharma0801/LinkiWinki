import express from 'express';
import Url from '../controllers/Url';


const router = express.Router();


router.post('/api/createUrl' , Url.createUrl);
router.post('/api/updateUrl' , Url.EditUrl);
router.get('/:id',Url.redirectUrl);
router.get('/qr/:id',Url.redirectQRUrl);
router.get('/api/getUrls',Url.GetUrls);
router.get('/api/getQR',Url.GetQR);


export default router
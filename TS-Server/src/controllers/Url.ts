import express from "express";
import QRCode from "qrcode";
import short from "short-uuid";
import { validateSchema } from "../lib/validateSchema";
import db from "../db";

class UrlControllers {
  createUrl = async (req: express.Request, res: express.Response) => {
    try {
      const data = req.body;
      const { error } = validateSchema.validate(data);
      if (error) {
        return res.json({ valid: false, msg: error });
      }

      const shortId = short.generate();
      const shorten_url = `${process.env.API_URL}/${shortId}`;

      const UrlData = {
        ...data,
        shorten_url: shorten_url,
        shorten_id: shortId,
        click_counts: 0,
        qr_counts: 0,
      };

      const NewUrl = await db("Url_Details").insert(UrlData).returning("*");

      res.status(201).json({ valid: true, msg: "created new url", NewUrl });
    } catch (error) {
      console.log(error);
    }
  };

  redirectUrl = async (req: express.Request, res: express.Response) => {
    try {
      const ExistingUrl = await db("Url_Details")
        .where({ shorten_id: req.params.id })
        .first();

      if (ExistingUrl) {
        await db("Url_Details")
          .where({ shorten_id: req.params.id })
          .increment("click_counts");

        return res.redirect(ExistingUrl.original_url);
      }
    } catch (error) {
      console.log(error);
    }
  };

  redirectQRUrl = async (req: express.Request, res: express.Response) => {
    try {
      const ExistingUrl = await db("Url_Details")
        .where({ shorten_id: req.params.id })
        .first();

      if (ExistingUrl) {
        await db("Url_Details")
          .where({ shorten_id: req.params.id })
          .increment("qr_counts");

        return res.redirect(ExistingUrl.original_url);
      }
    } catch (error) {
      console.log(error);
    }
  };

  GetUrls = async (req: express.Request, res: express.Response) => {
    try {
      const { username } = req.query;

      const UrlData = await db("Url_Details").where({ username: username });

      return res.status(200).json({ valid: true, UrlData });
    } catch (error) {
      console.log(error);
    }
  };

  GetQR = async (req: express.Request, res: express.Response) => {
    try {
      const { shortId } = req.query;

      const QRUrl = `${process.env.API_URL}/qr/${shortId}`;

      const QRImage = await QRCode.toDataURL(QRUrl);

      return res.status(200).json({ valid: true, QRImage });
    } catch (error) {
      console.log(error);
    }
  };

  EditUrl = async (req: express.Request, res: express.Response) => {
    try {
      const { link, shortId } = req.body;
      const NewUrl = await db("Url_Details")
        .where({ shorten_id: shortId })
        .update({ original_url: link });

      res.status(201).json({ valid: true, msg: "updated new url", NewUrl });
    } catch (error) {
      console.log(error);
    }
  };
}

export default new UrlControllers();

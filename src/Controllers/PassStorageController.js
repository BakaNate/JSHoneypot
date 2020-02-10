/**
 ** Developed by BakaNate
 ** on 10/02/2020
 ** For project JSHoneypot
 ** Copyright (c) 2020. All right reserved.
 */

import {
  throwBadRequest,
  sendOKWithData,
  sendCreated,
  throwIntServerError,
  throwNotFound,
} from '../BakaDevKit/BakaRes';

const PassStorage = require('../Models/PassStorageModel');

const createPassStorage = async (req, res) => {
  if (!req.body.site || !req.body.email || !req.body.pass) return throwBadRequest(new Error('Missing Parameters'));

  await PassStorage.createRecord(req.body.site, req.body.email, req.body.pass, (err, record) => {
    if (err) return throwIntServerError(err, res);
    return sendCreated(record, err);
  });
  return null;
};

const getPassStorage = async (req, res) => {
  await PassStorage.getAllDocuments((err, passStorage) => {
    if (err) return throwNotFound(err, res);
    return sendOKWithData(passStorage, res);
  });
};

const decryptPass = async (req, res) => {
  await PassStorage.getAndDecypher(req.body.site, (err, doc) => {
    if (err) return throwNotFound(err, res);
    return sendOKWithData(doc, res);
  });
};

module.exports = {
  createPassStorage,
  getPassStorage,
  decryptPass,
};

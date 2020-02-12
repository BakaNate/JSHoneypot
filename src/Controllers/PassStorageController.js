/**
 ** Developed by BakaNate
 ** on 10/02/2020
 ** For project JSHoneypot
 ** Copyright (c) 2020. All right reserved.
 */

import jwt from 'jsonwebtoken';

import {
  throwBadRequest,
  sendOKWithData,
  sendCreated,
  throwIntServerError,
  throwNotFound, throwUnauthorized,
} from '../BakaDevKit/BakaRes';

const PassStorage = require('../Models/PassStorageModel');

const createPassStorage = async (req, res) => {
  if (!req.body.site || !req.body.email || !req.body.pass) return throwBadRequest(new Error('Missing Parameters'), res);

  await PassStorage.createRecord(req.body.site, req.body.email, req.body.pass, (err, record) => {
    if (err) return throwIntServerError(err, res);
    return sendCreated(record, err);
  });
  return null;
};

const getPassStorage = async (req, res) => {
  if (!req.headers.authorization) return throwBadRequest(new Error('No Authorization token'), res);
  const token = jwt.verify(req.headers.authorization, '4Very5ecr3tKey');
  if (token.exp > Date.now()) return throwUnauthorized(new Error('Token Expired'), res);

  await PassStorage.getAllDocuments((err, passStorage) => {
    if (err) return throwNotFound(err, res);
    return sendOKWithData(passStorage, res);
  });
  return null;
};

const decryptPass = async (req, res) => {
  if (!req.body.site) return throwBadRequest(new Error('Missing Parameters'), res);
  await PassStorage.getAndDecypher(req.body.site, (err, doc) => {
    if (err) return throwNotFound(err, res);
    return sendOKWithData(doc, res);
  });
  return null;
};

module.exports = {
  createPassStorage,
  getPassStorage,
  decryptPass,
};

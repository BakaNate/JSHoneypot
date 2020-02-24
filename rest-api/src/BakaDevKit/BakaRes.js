/**
 ** Developed by BakaNate
 ** on 10/02/2020
 ** For project JSHoneypot
 ** Copyright (c) 2020. All right reserved.
 */

import { OK, CREATED } from './messages/validMessages';
import { FORBIDDEN, UNAUTHORIZED } from './messages/aclMessages';
import { TEAPOT } from './messages/miscMessages';
import {
  INT_SERVER_ERROR, BAD_GATEWAY, BAD_REQUEST, NOT_FOUND, NOT_IMPLEMENTED,
} from './messages/errorMessages';

import BakaLog from './BakaLog';

const Bk = new BakaLog('Bdk:BkRes');

export const sendOK = (res) => {
  Bk.log('200 | OK');
  return res.status(200).send({ message: OK });
};

export const sendOKWithData = (obj, res) => {
  Bk.log(`201 | OK: ${JSON.stringify(obj)}`);
  return res.status(201).send(obj);
};

export const sendCreated = (obj, res) => {
  Bk.log(`201 | Created: ${JSON.stringify(obj)}`);
  return res.status(201).send({ message: CREATED });
};

export const throwBadRequest = (err, res) => {
  Bk.error(`400 | ${err}`);
  return res.status(400).send({ message: BAD_REQUEST });
};

export const throwUnauthorized = (err, res) => {
  Bk.error(`401 | ${err}`);
  return res.status(401).send({ message: UNAUTHORIZED });
};

export const throwForbidden = (err, res) => {
  Bk.error(`403 | ${err}`);
  return res.status(403).send({ message: FORBIDDEN });
};

export const throwNotFound = (err, res) => {
  Bk.error(`404 | ${err}`);
  return res.status(404).send({ message: NOT_FOUND });
};

export const throwTeaPot = (res) => {
  Bk.log(`418 | ${TEAPOT}`);
  return res.status(418).send({ message: TEAPOT });
};

export const throwIntServerError = (err, res) => {
  Bk.error(`500 | ${err}`);
  return res.status(500).send({ message: INT_SERVER_ERROR });
};

export const throwNotImplemented = (res) => {
  Bk.warning(`501 | ${NOT_IMPLEMENTED}`);
  return res.status(501).send({ message: NOT_IMPLEMENTED });
};

export const throwBadGateway = (err, res) => {
  Bk.error(`502 | ${err}`);
  return res.status(502).send({ message: BAD_GATEWAY });
};

import { OK, CREATED } from './messages/validMessages';
import { FORBIDDEN, UNAUTHORIZED } from './messages/aclMessages';
import { TEAPOT } from './messages/miscMessages';
import {
  INT_SERVER_ERROR, BAD_GATEWAY, BAD_REQUEST, NOT_FOUND, NOT_IMPLEMENTED,
} from './messages/errorMessages';

import BakaLog from './BakaLog';

const Bk = new BakaLog('Bdk:BkRes');

export const sendOK = (res) => {
  Bk.log('OK');
  return res.status(200).send({ message: OK });
};

export const sendOKWithData = (obj, res) => {
  Bk.log(`OK: ${JSON.stringify(obj)}`);
  return res.status(201).send(obj);
};

export const sendCreated = (obj, res) => {
  Bk.log(`Created: ${JSON.stringify(obj)}`);
  return res.status(201).send({ message: CREATED });
};

export const throwBadRequest = (err, res) => {
  Bk.error(err);
  return res.status(400).send({ message: BAD_REQUEST });
};

export const throwUnauthorized = (err, res) => {
  Bk.error(err);
  return res.status(401).send({ message: UNAUTHORIZED });
};

export const throwForbidden = (err, res) => {
  Bk.error(err);
  return res.status(403).send({ message: FORBIDDEN });
};

export const throwNotFound = (err, res) => {
  Bk.error(err);
  return res.status(404).send({ message: NOT_FOUND });
};

export const throwTeaPot = (res) => {
  Bk.log(TEAPOT);
  return res.status(418).send({ message: TEAPOT });
};

export const throwIntServerError = (err, res) => {
  Bk.error(err);
  return res.status(500).send({ message: INT_SERVER_ERROR });
};

export const throwNotImplemented = (res) => {
  Bk.warning(NOT_IMPLEMENTED);
  return res.status(501).send({ message: NOT_IMPLEMENTED });
};

export const throwBadGateway = (err, res) => {
  Bk.error(err);
  return res.status(502).send({ message: BAD_GATEWAY });
};

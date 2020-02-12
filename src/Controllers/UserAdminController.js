/**
 ** Developed by BakaNate
 ** on 11/02/2020
 ** For project JSHoneypot
 ** Copyright (c) 2020. All right reserved.
 */
import {
  sendOKWithData,
  throwBadRequest,
  throwNotFound,
} from '../BakaDevKit/BakaRes';

const UserAdmin = require('../Models/UserAdminModel');

const logUser = async (req, res) => {
  if (!req.body.userName || !req.body.pass) return throwBadRequest(new Error('Missing Parameters'), res);
  await UserAdmin.getUserAdmin(req.body.userName, (err, user) => {
    if (err) return throwNotFound(err, res);
    const token = user.getJWT(req.body.pass);
    console.log(token);
    if (token === null) return throwBadRequest(new Error('Invalid Credentials'), res);
    return sendOKWithData({ token }, res);
  });
  return null;
};

module.exports = {
  logUser,
};

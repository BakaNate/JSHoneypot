/**
 ** Developed by BakaNate
 ** on 11/02/2020
 ** For project JSHoneypot
 ** Copyright (c) 2020. All right reserved.
 */

import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userAdminSchema = new mongoose.Schema({
  userName: {
    type: String,
    unique: true,
    required: true,
    maxlength: 254,
  },
  pass: {
    type: String,
    required: true,
    maxlength: 254,
    selected: false,
  },
});

userAdminSchema.statics.createRecords = async function (pass, cb) {
  const hash = await bcrypt.hash(pass, 10);
  await this.model('userAdmin').create({
    userName: 'UserAdmin',
    pass: hash,
  }, (err, record) => {
    if (err) return cb(err);
    return cb(null, record);
  });
};

userAdminSchema.statics.getUserAdmin = async function (userName, cb) {
  await this.model('userAdmin').findOne({ userName }, async (err, user) => {
    if (err) return cb(err);
    if (!user) return cb(new Error('Not found'));
    return cb(null, user);
  });
};

userAdminSchema.methods.getJWT = function (pass) {
  const isValid = bcrypt.compare(pass, this.pass);
  if (!isValid) return null;
  return jwt.sign({ userName: this.userName }, '4Very5ecr3tKey', { expiresIn: 86400 });
};

module.exports = mongoose.model('userAdmin', userAdminSchema);

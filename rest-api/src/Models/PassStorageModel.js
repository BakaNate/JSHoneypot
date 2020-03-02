/**
 ** Developed by BakaNate
 ** on 10/02/2020
 ** For project JSHoneypot
 ** Copyright (c) 2020. All right reserved.
 */

import mongoose from 'mongoose';
import Cryptr from 'cryptr';

const cryptr = new Cryptr('MySecretKey');

const passStorageSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    maxlength: 254,
  },
  pass: {
    type: String,
    required: true,
    maxlength: 254,
  },
  site: {
    type: String,
    required: true,
    maxlength: 254,
    unique: true,
  },
});

passStorageSchema.statics.createRecord = async function (email, pass, site, cb) {
  const encryptedPass = await cryptr.encrypt(pass);
  await this.model('PassStorage').create({
    email,
    pass: encryptedPass,
    site,
  }, (err, record) => {
    if (err) return cb(err);
    return cb(null, record);
  });
};

passStorageSchema.statics.getAllDocuments = async function (cb) {
  await this.model('PassStorage').find({}, async (err, passStorage) => {
    if (err) return cb(err);
    if (!passStorage) return cb(new Error('Not Found'));
    return cb(null, passStorage);
  });
};

passStorageSchema.statics.getAndDecypher = async function (site, cb) {
  await this.model('PassStorage').findOne({ site }, async (err, doc) => {
    if (err) return cb(err);
    if (!doc) return cb(new Error('Not Found'));
    const returned = {
      email: doc.email,
      pass: cryptr.decrypt(doc.pass),
      site: doc.site,
    };
    return cb(null, returned);
  });
};

module.exports = mongoose.model('PassStorage', passStorageSchema);

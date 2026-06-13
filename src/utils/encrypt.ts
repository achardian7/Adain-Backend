import crypto from 'crypto';

import config from '../config';

const encrypt = (password: string): string => {
  const encrypted = crypto
    .pbkdf2Sync(password, config.SECRET, 1000, 64, 'sha512')
    .toString('hex');

  return encrypted;
};

export default encrypt;

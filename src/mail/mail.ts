import ejs from 'ejs';
import nodemailer from 'nodemailer';
import path from 'path';

import config from '../config';
import logger from '../lib/logger';

const transporter = nodemailer.createTransport({
  host: config.EMAIL_SMTP_HOST,
  port: config.EMAIL_SMTP_PORT,
  secure: config.EMAIL_SMTP_SECURE,
  auth: {
    user: config.EMAIL_SMTP_USER,
    pass: config.EMAIL_SMTP_PASS,
  },
});

interface SendEmailPayload {
  from: string;
  to: string;
  subject: string;
  html: string;
}

export const renderMailTemplate = async (
  template: string,
  data: any,
): Promise<string> => {
  try {
    const pathTemplate = path.join(__dirname, `templates/${template}`);
    const result = await ejs.renderFile(pathTemplate, data);

    return result as string;
  } catch (error) {
    logger.error('Error while render mail template:', error);
    throw error;
  }
};

export const sendMail = async ({
  ...mailPayload
}: SendEmailPayload): Promise<string> => {
  try {
    const info = await transporter.sendMail({
      ...mailPayload,
    });

    return info.messageId;
  } catch (error) {
    logger.error('Error while sending mail:', error);
    throw error;
  }
};

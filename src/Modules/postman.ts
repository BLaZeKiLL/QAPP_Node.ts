import * as nodemailer from 'nodemailer';

class Postman {

  private static mailer = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'developer.qapp@gmail.com',
      pass: 'developer@QAPP'
    }
  });

  public static async accountMail(reciver: string, type: string, password: string): Promise<boolean> {
    const mail = {
      from: 'developer.qapp@gmail.com',
      to: reciver,
      subject: `QAPP new ${type} account password`,
      text: `PASSWORD : ${password}`
    };
    try {
      await Postman.mailer.sendMail(mail);
      return true;
    } catch (error) {
      throw error;
    }
  }

}

export {
  Postman
};

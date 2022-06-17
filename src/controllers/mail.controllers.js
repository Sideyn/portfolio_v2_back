const nodemailer = require("nodemailer");
require("dotenv").config();

const { EMAIL_HOST, EMAIL_PASSWORD, EMAIL_TO_SEND, EMAIL_USED } = process.env;

const transport = nodemailer.createTransport({
  service: EMAIL_HOST,
  auth: {
    user: EMAIL_USED,
    pass: EMAIL_PASSWORD,
  },
});

const send = (req, res) => {
  const emailOption = {
    from: `${EMAIL_USED}`,
    to: `${EMAIL_TO_SEND}`,
    subject: `${req.body.object}`,
    text: `
        Message de ${req.body.name}
        Message : ${req.body.message}`,
  };

  transport.sendMail(emailOption, (err) => {
    if (err) {
      res.status(500).json({ errorMessage: err.message });
    } else {
      res.sendStatus(200);
    }
  });
};

module.exports = { send };

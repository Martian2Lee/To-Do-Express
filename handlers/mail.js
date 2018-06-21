const nodemailer = require('nodemailer')
const promisify = require('es6-promisify')

const transport = nodemailer.createTransport({
  service: process.env.MAIL_SERVICE,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
})

exports.sendEmail = async options => {
  const { user, subject, text } = options

  const mailOptions = {
    from: process.env.MAIL_USER,
    to: user.email,
    subject,
    text
  }
  const sendMail = promisify(transport.sendMail, transport)
  return sendMail(mailOptions)
}

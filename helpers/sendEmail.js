const nodemailer = require("nodemailer");
const {META_PASSWORD} = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "kseniyamesch@meta.ua",
    pass: META_PASSWORD
  }
}

const transporter = nodemailer.createTransport(nodemailerConfig)

const sendEmail = async (data) => {
    try {
        const email = {...data, from: "kseniyamesch@meta.ua" };
        await transporter.sendMail(email);
        return true
    } catch (error) {
        throw error;
    }
}
 module.exports = sendEmail;
 
// const email = {
//     to: 'kseniyamesch0101@gmail.com',
    
//     subject: "Test email",
//     html: "Test email"
//   }
  
  
//   .then(() => console.log())
//   .catch(error => console.log(error.message))
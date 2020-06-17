const expressConfig = require("./utils/expressConfig");
const serverConfig = require("./utils/serverConfig");
const app = expressConfig();

const nodeMailer = require('nodemailer');

const index = require("./src/index");
serverConfig();

app.get('/', index);
app.post('/submitFormData', function(req,res) {
    var first = req.body.first;
    var email = req.body.email;
    let heading = 'You have signed up for Code Future!';
    let message = `Hello, ${first}!\n\nWe have confirmed that you are joining Code Future this summer for our lessons on Scratch, now all that is left to do is wait for the activities to begin! We will be using this email address to update you with dates, new materials, and resources. If you would like to switch to a different email, please reply to this message with your preferred email address.\n\nWe can't wait to start coding with you this summer!\n\nWith kind regards,\nYour Code Future team\nRomir Singla, Ash Srinivasan and Edward Kang`;
    let transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'codefutureform@gmail.com',
            pass: 'silicon1961'
        }
    });
    let mailOptions = {
        to: email,
        subject: heading,
        text: message
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        // console.log('Message %s sent: %s', info.messageId, info.response);
    });
    res.writeHead(301, { Location: '/' });
    res.end();
});
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
    var actnum = req.body.actnum;
    var date = req.body.date;
    let heading = `${first} signed up!`;
    let message = `${first} from ${email} is joining activity number ${actnum} on ${date}`;
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
        to: 'projectcodefuture@gmail.com',
        subject: heading,
        text: message
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });
    res.writeHead(301, { Location: '/' });
    res.end();
});
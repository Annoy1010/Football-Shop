import nodemailer from 'nodemailer';
import express from 'express';
const router = express.Router();

router.post('/', (req, res) => {
    const data = req.body;
    // const email = data.email;
    const title = data.title;
    const content = data.content;

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'lephuc8a1@gmail.com',
            pass: 'l3th3Phuc',
        },
    });

    var mailOptions = {
        from: 'lephuc8a1@gmail.com',
        to: '20521764@gm.uit.edu.vn',
        subject: title,
        text: content,
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
            res.send(true);
        }
    });
});

export default router;

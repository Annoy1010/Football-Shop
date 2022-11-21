import nodemailer from 'nodemailer';
import express from 'express';
const router = express.Router();

router.post('/', (req, res) => {
    const data = req.body;
    const email = data.email;
    const resetCode = data.resetCode;

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: '20521764@gm.uit.edu.vn',
            pass: 'l3th3Phuc',
        },
    });

    var mailOptions = {
        from: '20521764@gm.uit.edu.vn',
        to: email,
        subject: 'Khôi phục tài khoản',
        text: `Mã xác thực của bạn là: ${resetCode}. Vui lòng nhập đúng mã xác thực để có thể khôi phục tài khoản`,
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

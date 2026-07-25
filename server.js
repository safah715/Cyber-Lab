require('dotenv').config();
const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const securityMiddleware = require('./middleware/security');

const app = express();
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
securityMiddleware(app);

// Firebase Admin Initialization
const serviceAccount = require('./serviceAccountKey.json'); // يجب توفير هذا الملف من Firebase Console
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Nodemailer Setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
});

// OTP Generation & Email
app.post('/api/send-otp', async (req, res) => {
    try {
        const { email, name } = req.body;
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const hashedOtp = await bcrypt.hash(otp, 10);
        
        await db.collection('otps').doc(email).set({
            otp: hashedOtp,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            name: name
        });

        const mailOptions = {
            from: `"QMISHI NUMBERS" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'رمز التحقق من QMISHI NUMBERS',
            html: `<div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; background: #000; color: #D4AF37;">
                    <h2>مرحباً ${name}</h2>
                    <p>رمز التحقق الخاص بك هو:</p>
                    <h1 style="letter-spacing: 5px; background: #D4AF37; color: #000; display: inline-block; padding: 10px 20px;">${otp}</h1>
                    <p>لا تشارك هذا الرمز مع أي شخص.</p>
                   </div>`
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: "تم إرسال رمز التحقق إلى بريدك الإلكتروني" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Verify OTP
app.post('/api/verify-otp', async (req, res) => {
    try {
        const { email, otp } = req.body;
        const doc = await db.collection('otps').doc(email).get();
        if (!doc.exists) return res.status(400).json({ error: "رمز التحقق غير صالح" });

        const isValid = await bcrypt.compare(otp, doc.data().otp);
        if (isValid) {
            await db.collection('otps').doc(email).delete();
            const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.status(200).json({ success: true, token });
        } else {
            res.status(400).json({ error: "رمز التحقق غير صحيح" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 QMISHI NUMBERS Server running on port ${PORT}`));
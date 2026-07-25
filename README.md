# QMISHI NUMBERS
**المالك:** KING AL QMISHI  
**حقوق التصميم والبرمجة:** © KING AL QMISHI 2026

## وصف المشروع
منصة عالمية فاخرة لإدارة وطلب الأرقام الوهمية والمميزة، مبنية بأحدث تقنيات الويب (Full Stack) مع تركيز خاص على الأمان، السرعة، وتجربة المستخدم الفاخرة (Glassmorphism & Neon Gold).

## التقنيات المستخدمة
- **Frontend:** HTML5, TailwindCSS, Bootstrap 5, GSAP, Particles.js, Vanilla JS (ES2025)
- **Backend:** Node.js, Express, Firebase Admin SDK, Nodemailer
- **Database & Auth:** Firebase Firestore, Firebase Authentication
- **Security:** Helmet, Rate Limiting, JWT, XSS/CSRF Protection

## طريقة التشغيل
1. تأكد من تثبيت Node.js.
2. انتقل إلى مجلد `server` ونفذ: `npm install`
3. قم بإنشاء ملف `serviceAccountKey.json` من Firebase Console وضعه في مجلد `server`.
4. املأ بيانات `.env` بشكل صحيح.
5. شغل الخادم: `npm start`
6. افتح `public/index.html` عبر خادم محلي (مثل Live Server في VS Code).

## ملاحظات هامة
- يجب تفعيل Firebase Authentication (Email/Password & Google) من وحدة تحكم Firebase.
- يجب إعداد Firestore Database وقواعد الأمان المرفقة.
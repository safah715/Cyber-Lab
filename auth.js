import { auth, db, googleProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut, onAuthStateChanged, doc, setDoc, getDoc } from './firebase.js';

export const handleGoogleLogin = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;
        await checkOrCreateUser(user);
        window.location.href = 'index.html';
    } catch (error) {
        Swal.fire('خطأ', error.message, 'error');
    }
};

export const handleEmailLogin = async (email, password) => {
    try {
        const result = await signInWithEmailAndPassword(auth, email, password);
        const userDoc = await getDoc(doc(db, "users", result.user.uid));
        if (userDoc.exists() && !userDoc.data().isVerified) {
            Swal.fire('تنبيه', 'يرجى التحقق من بريدك الإلكتروني أولاً', 'warning');
            await signOut(auth);
            return;
        }
        window.location.href = 'index.html';
    } catch (error) {
        Swal.fire('خطأ', 'البريد الإلكتروني أو كلمة المرور غير صحيحة', 'error');
    }
};

export const handleRegister = async (name, email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        await setDoc(doc(db, "users", user.uid), {
            name: name,
            email: email,
            role: 'user',
            isVerified: false,
            createdAt: new Date().toISOString()
        });

        // Trigger OTP via Backend
        const response = await fetch('http://localhost:5000/api/send-otp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, name })
        });
        const data = await response.json();
        
        if (data.success) {
            localStorage.setItem('pendingVerificationEmail', email);
            window.location.href = 'verify.html'; // صفحة التحقق من OTP
        }
    } catch (error) {
        Swal.fire('خطأ', error.message, 'error');
    }
};

export const checkOrCreateUser = async (user) => {
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);
    if (!userSnap.exists()) {
        await setDoc(userRef, {
            name: user.displayName,
            email: user.email,
            role: 'user',
            isVerified: true,
            createdAt: new Date().toISOString()
        });
    }
};

export const logout = async () => {
    await signOut(auth);
    window.location.href = 'login.html';
};

onAuthStateChanged(auth, (user) => {
    if (!user && window.location.pathname.includes('index.html')) {
        window.location.href = 'login.html';
    }
});
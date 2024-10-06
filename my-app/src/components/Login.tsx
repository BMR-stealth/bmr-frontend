import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { GoogleAuthProvider, signInWithPopup, getRedirectResult, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';  // Firebase auth instance
import { getFirestore, setDoc, doc, getDoc } from 'firebase/firestore';  // Firestore methods
import { app } from '../firebase';  // Firebase app instance

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if there is a redirect result after Google sign-in
    const fetchRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          const user = result.user;

          // Add user details to Firestore if not already added
          const db = getFirestore(app);
          await setDoc(doc(db, 'users', user.uid), {
            uid: user.uid,
            name: user.displayName,
            email: user.email,
            company: 'Google Account',
            experience: 'N/A',
            createdAt: new Date(),
          }, { merge: true });

          alert('Google Sign-In successful!');
          navigate('/dashboard');
        }
      } catch (error: any) {
        if (error.message) {
          setError(error.message);
        }
      }
    };

    fetchRedirectResult();
  }, [navigate]);

  // Handle Email/Password Login
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      // Authenticate with email and password
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Fetch Firestore user data if needed
      const db = getFirestore(app);
      const userRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const userType = userDoc.data().userType;

        // Redirect based on user type
        if (userType === 'lender') {
          navigate('/dashboard'); // Redirect lenders to their dashboard
        } else {
          navigate('/borrower'); // Redirect borrowers to their page
        }
      } else {
        setError('User data not found.');
      }
    } catch (error: any) {
      setError('Invalid email or password');
    }
  };

  // Handle Google Sign-In using redirect
  // Handle Google Sign-In (combined for both existing and new users)
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const db = getFirestore(app);
      const userRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) {
        // If the user doesn't exist in Firestore, create a new document
        await setDoc(userRef, {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          company: 'Google Account',
          experience: 'N/A',
          createdAt: new Date(),
          userType: 'lender', // Default user type for Google sign-in
        });
        alert('Google Sign-Up successful! Redirecting to your dashboard...');
      } else {
        alert('Google Sign-In successful! Redirecting to your dashboard...');
      }

      // Navigate to the dashboard after successful sign-in
      navigate('/dashboard');
    } catch (error: any) {
      setError(error.message);
    }
  };


  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 mb-4 rounded">
            {error}
          </div>
        )}

        {/* Email/Password Sign-In Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-indigo-300"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-indigo-300"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Log In
          </button>
        </form>

        {/* Add link to signup */}
        <div className="text-center mt-4">
          <p>
            Don’t have an account?{' '}
            <Link to="/signup" className="text-blue-500 hover:text-blue-600">
              Sign Up
            </Link>
          </p>
        </div>

        {/* Google Sign-In Button */}
        <div className="mt-4 text-center">
          <p className="mb-2">Or sign in with:</p>
          <button
            onClick={handleGoogleSignIn}
            className="flex items-center justify-center w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-200"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google icon" className="w-5 h-5 mr-2" />
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;

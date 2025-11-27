// "use client";
// import { signIn } from "next-auth/react";

// export default function Login() {
//   return (
//     <div className="p-10 max-w-md mx-auto">
//       <h1 className="text-3xl font-bold mb-6">Login</h1>

//       <button
//         onClick={() => signIn("google")}
//         className="w-full bg-red-600 text-white p-3 rounded mb-3"
//       >
//         Login with Google
//       </button>

//       <form
//         onSubmit={(e) => {
//           e.preventDefault();
//           signIn("credentials", {
//             email: e.target.email.value,
//             password: e.target.password.value,
//           });
//         }}
//         className="space-y-4"
//       >
//         <input name="email" placeholder="Email" className="border p-2 w-full" />
//         <input
//           name="password"
//           placeholder="Password"
//           type="password"
//           className="border p-2 w-full"
//         />

//         <button className="w-full bg-blue-600 text-white p-3 rounded">
//           Login
//         </button>
//       </form>
//     </div>
//   );
// }
// app/login/page.jsx
"use client";

import { useState } from "react";
import { auth } from "@/firebase.init";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const googleProvider = new GoogleAuthProvider();

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      router.push("/");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {error && <p className="text-red-600 mb-4">{error}</p>}

        <form onSubmit={handleEmailLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input input-bordered w-full"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input input-bordered w-full"
          />
          <button type="submit" className="btn bg-green-500 text-white w-full">
            Login
          </button>
        </form>
        <p className="text-center text-gray-500 mb-4">OR</p>
        <button
          onClick={handleGoogleLogin}
          className="btn bg-green-500 text-white w-full mb-4"
        >
          Login with Google
        </button>

        <p className="mt-4 text-center text-gray-600 text-sm">
          Do not have an account?{" "}
          <span
            className="text-green-500 font-semibold cursor-pointer"
            onClick={() => router.push("/register")}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}

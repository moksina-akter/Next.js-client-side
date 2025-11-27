"use client";

import { useState } from "react";
import { auth } from "@/firebase.init";
import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const googleProvider = new GoogleAuthProvider();

  const handleGoogleRegister = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      router.push("/");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEmailRegister = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        {error && <p className="text-red-600 mb-4">{error}</p>}

        <form onSubmit={handleEmailRegister} className="space-y-4">
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
            Register
          </button>
        </form>
        <p className="text-center text-gray-500 mb-4">OR</p>
        <button
          onClick={handleGoogleRegister}
          className="btn bg-green-500 text-white w-full mb-4"
        >
          Register with Google
        </button>

        <p className="mt-4 text-center text-gray-600 text-sm">
          Already have an account?{" "}
          <span
            className="text-green-500 font-semibold cursor-pointer"
            onClick={() => router.push("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

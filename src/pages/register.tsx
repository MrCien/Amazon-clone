// pages/register.tsx

import { useState } from "react";
import { useRouter } from "next/router";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Registration successful. Please sign in.");
        router.push("/login");
      } else {
        alert(data.message || "Something went wrong");
      }
    } catch (error) {
      alert("An error occurred while registering.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 w-96 shadow-md rounded">
        <h1 className="text-2xl font-semibold mb-4">Create account</h1>

        <form onSubmit={handleRegister}>
          <label className="text-sm font-medium">Your email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border border-gray-400 w-full mt-1 mb-4 px-2 py-2 rounded focus:outline-none focus:ring-1 focus:ring-yellow-500"
            placeholder="you@example.com"
          />

          <label className="text-sm font-medium">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border border-gray-400 w-full mt-1 mb-4 px-2 py-2 rounded focus:outline-none focus:ring-1 focus:ring-yellow-500"
            placeholder="At least 6 characters"
          />

          <button
            type="submit"
            className="bg-yellow-400 hover:bg-yellow-500 w-full py-2 font-medium rounded"
          >
            Create your Amazon account
          </button>
        </form>

        <p className="text-xs text-gray-600 mt-4">
          By continuing, you agree to Amazon Clone's Conditions of Use and Privacy Notice.
        </p>

        <div className="my-4 flex items-center">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-gray-500 text-sm">Already have an account?</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <button
          onClick={() => router.push("/login")}
          className="w-full border border-gray-400 py-2 rounded hover:bg-gray-100"
        >
          Sign-In
        </button>
      </div>
    </div>
  );
}

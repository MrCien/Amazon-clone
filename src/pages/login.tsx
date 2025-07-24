import { signIn } from "next-auth/react";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter both email and password");
      return;
    }

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      alert("Login failed: " + res.error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 w-96 shadow-md rounded">
        <h1 className="text-2xl font-semibold mb-4">Sign-In</h1>

        <label className="text-sm font-medium">Email or mobile phone number</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-400 w-full mt-1 mb-4 px-2 py-2 rounded"
          placeholder="you@example.com"
        />

        <label className="text-sm font-medium">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-400 w-full mt-1 mb-4 px-2 py-2 rounded"
          placeholder="********"
        />

        <button
          className="bg-yellow-400 hover:bg-yellow-500 w-full py-2 font-medium rounded"
          onClick={handleLogin}
        >
          Continue
        </button>

        <p className="text-xs text-gray-600 mt-4">
          By continuing, you agree to Amazon Clone's Conditions of Use and Privacy Notice.
        </p>

        <div className="my-4 flex items-center">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-gray-500 text-sm">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <button
          onClick={() => signIn("google")}
          className="w-full border border-gray-400 py-2 mb-2 rounded hover:bg-gray-100"
        >
          Continue with Google
        </button>
        <button
          onClick={() => signIn("github")}
          className="w-full border border-gray-400 py-2 rounded hover:bg-gray-100"
        >
          Continue with GitHub
        </button>

        <p className="text-xs text-blue-500 mt-4 cursor-pointer hover:underline">
          New to Amazon Clone? Create your account
        </p>
      </div>
    </div>
  );
}

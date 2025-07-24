import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";

// Same in-memory user store — in real world, use a DB like MongoDB
let users: { email: string; password: string }[] = [];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  // Find the user
  const user = users.find((u) => u.email === email);
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Compare password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Login success
  return res.status(200).json({ message: "Login successful" });
}

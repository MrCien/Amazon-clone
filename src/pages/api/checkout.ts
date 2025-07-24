// pages/api/checkout.ts
import { NextApiRequest, NextApiResponse } from "next";
import { StoreProduct } from "../../../type";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed"
    });
  }

  try {
    const { items, email, address, paymentMethod = "COD" } = req.body;

    if (!items || !email || !address) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: items, email, or address"
      });
    }

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid or empty items array"
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format"
      });
    }

    for (const item of items) {
      if (!item._id || !item.price || !item.quantity) {
        return res.status(400).json({
          success: false,
          message: "Invalid item in cart"
        });
      }
    }

    const totalAmount = items.reduce(
      (total: number, item: StoreProduct) =>
        total + item.price * (item.quantity || 1),
      0
    );

    const order = {
      id: `ORD-${Date.now()}`,
      email,
      address,
      items,
      totalAmount,
      paymentMethod,
      status: "Pending",
      createdAt: new Date().toISOString()
    };

    // await saveOrderToDatabase(order);

    return res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order
    });

  } catch (error: any) {
    console.error("Checkout error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
}

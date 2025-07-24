// pages/order-confirmation.tsx
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";

export default function OrderConfirmation() {
  const router = useRouter();
  const [orderId, setOrderId] = useState("");
  const [orderDate, setOrderDate] = useState("");
  const [estimatedDelivery, setEstimatedDelivery] = useState("");

  useEffect(() => {
    // Generate random order ID when component mounts
    const randomId = `#${Math.floor(Math.random() * 10000000000)}`;
    setOrderId(randomId);
    
    // Set current date
    const today = new Date();
    setOrderDate(today.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    }));
    
    // Set estimated delivery (3-5 days from now)
    const deliveryDate = new Date(today);
    deliveryDate.setDate(deliveryDate.getDate() + Math.floor(Math.random() * 3) + 3);
    setEstimatedDelivery(deliveryDate.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric' 
    }));
  }, []);

  const handleReturnHome = () => {
    window.location.href = "http://localhost:3000";
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Head>
        <title>Order Confirmation - Amazon</title>
      </Head>

      <div className="max-w-4xl mx-auto p-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-2xl font-semibold text-gray-800">Amazon</div>
          <button 
            onClick={handleReturnHome}
            className="bg-yellow-400 hover:bg-yellow-500 px-4 py-2 rounded-md text-sm font-medium"
          >
            Return to Home
          </button>
        </div>

        {/* Order Confirmation Box */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-start mb-4">
            <div className="text-green-600 mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Thank you for your order!</h1>
              <p className="text-gray-600">We'll send a confirmation when your item ships.</p>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4 mt-4">
            <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Order ID</p>
                <p className="font-medium">{orderId || "Generating..."}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Order Date</p>
                <p className="font-medium">{orderDate || "Today"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Estimated Delivery</p>
                <p className="font-medium">{estimatedDelivery || "Calculating..."}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Payment Method</p>
                <p className="font-medium">Cash On Delivery</p>
              </div>
            </div>
          </div>

          <div className="mt-6 border-t border-gray-200 pt-4">
            <h2 className="text-lg font-medium text-gray-900">Delivery Address</h2>
            <div className="mt-2">
              <p className="font-medium">Shivam Namdev</p>
              <p className="text-gray-600">Vill. Bhago, Post - deotalab, District Rewa Madhya Pradesh Contact</p>
              <p className="text-gray-600">- 9755253271
Naigarhi Road, Bhago 486341</p>
              <p className="text-gray-600">Madhya Pradesh, 486341</p>
              <p className="text-gray-600">India</p>
              <p className="text-gray-600">Phone: 08349256158</p>
            </div>
          </div>

          <div className="mt-6 border-t border-gray-200 pt-4">
            <h2 className="text-lg font-medium text-gray-900">Order Details</h2>
            <div className="mt-4 flex items-start">
              <div className="w-20 h-20 bg-gray-200 rounded-md mr-4"></div>
              <div>
                <p className="font-medium">iPhone 14 Pro</p>
                <p className="text-gray-600 text-sm">Color: Dark Green | Mobile Tablets</p>
                <p className="text-gray-900 font-bold mt-1">$1,350.00</p>
                <p className="text-green-600 text-sm mt-1">In stock</p>
              </div>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-6 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Need Help?</h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="font-medium">Track Your Order</p>
              <p className="text-gray-600 text-sm mt-1">Check the status of your order</p>
            </div>
            <div>
              <p className="font-medium">Return or Exchange Items</p>
              <p className="text-gray-600 text-sm mt-1">Start a return or exchange</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
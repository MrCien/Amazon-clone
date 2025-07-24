// pages/checkout.tsx
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Head from "next/head";

export default function CheckoutPage() {
  const { data: session } = useSession();
  const router = useRouter();

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("COD");

  const [formData, setFormData] = useState({
    name: session?.user?.name || "",
    email: session?.user?.email || "",
    phone: "",
    pincode: "",
    state: "",
    city: "",
    address: "",
  });

  // Sample cart items
  const cartItems = [
    {
      id: 1,
      title: "iPhone 14 Pro",
      price: 1350,
      quantity: 1,
      image: "http://localhost:3000/_next/image?url=https%3A%2F%2Fi.ibb.co%2FgmdpWtD%2Fmobile-5.webp&w=640&q=75",
      deliveryDate: "Get it by Tomorrow"
    },
   
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + tax;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { name, phone, pincode, city, state, address } = formData;
    
    if (!name) {
      toast.error("Please enter your full name");
      return false;
    }
    if (!phone) {
      toast.error("Please enter your phone number");
      return false;
    }
    if (!pincode) {
      toast.error("Please enter your pincode");
      return false;
    }
    if (!city) {
      toast.error("Please enter your city");
      return false;
    }
    if (!state) {
      toast.error("Please enter your state");
      return false;
    }
    if (!address) {
      toast.error("Please enter your full address");
      return false;
    }
    
    if (!/^\d{10}$/.test(phone)) {
      toast.error("Please enter a valid 10-digit phone number");
      return false;
    }
    
    if (!/^\d{6}$/.test(pincode)) {
      toast.error("Please enter a valid 6-digit pincode");
      return false;
    }
    
    return true;
  };

  const placeOrderHandler = async () => {
    if (isLoading) return;
    
    if (!validateForm()) return;
    
    if (!session) {
      toast.error("Please sign in to place an order");
      return router.push("/auth/signin");
    }

    setIsLoading(true);
    
    const { name, phone, pincode, city, state, address } = formData;
    const fullAddress = `${name}, ${phone}, ${address}, ${city}, ${state}, ${pincode}`;

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: session.user?.email,
          address: fullAddress,
          paymentMode: paymentMethod,
          status: "pending",
          items: cartItems,
          totalAmount: total
        }),
      });

      const data = await res.json();

      if (!res.ok || data.success === false) {
        throw new Error(data.message || "Failed to place order");
      }

      toast.success("✅ Order Placed Successfully!");
      setOrderPlaced(true);
      setTimeout(() => router.push(`/order-confirmation?orderId=${data.orderId}&amount=${total}`), 2000);
    } catch (error: any) {
      console.error("Order error:", error);
      toast.error(error.message || "❌ Failed to place order. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (orderPlaced) {
    return (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <div className="text-green-500 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Confirmed!</h2>
          <p className="text-gray-600 mb-6">Thank you for your purchase. We've sent a confirmation email.</p>
          <div className="animate-pulse text-sm text-gray-500">
            Redirecting to order details...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <Head>
        <title>Checkout - Amazon</title>
      </Head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
        <div className="flex items-center mb-6">
          <div className="text-2xl font-semibold text-gray-800">Amazon.in</div>
          <div className="ml-4 text-sm text-gray-500">Checkout (3 items)</div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Column - Delivery Information */}
          <div className="md:w-2/3">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-4">
              <h2 className="text-xl font-bold text-gray-900 mb-4">1. Delivery address</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full name</label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-yellow-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mobile number</label>
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="10-digit mobile number"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-yellow-500"
                    type="tel"
                    pattern="[0-9]{10}"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                  <input
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder="6-digit pincode"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-yellow-500"
                    type="text"
                    pattern="[0-9]{6}"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-yellow-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                  <input
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-yellow-500"
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Full address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows={3}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-yellow-500"
                  required
                />
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4">2. Payment method</h2>
              
              <div className="space-y-4">
                <div 
                  className={`border rounded-md p-4 cursor-pointer ${paymentMethod === "COD" ? "border-yellow-400 bg-yellow-50" : "border-gray-200"}`}
                  onClick={() => setPaymentMethod("COD")}
                >
                  <div className="flex items-center">
                    <input 
                      type="radio" 
                      checked={paymentMethod === "COD"}
                      onChange={() => setPaymentMethod("COD")}
                      className="h-4 w-4 text-yellow-600 focus:ring-yellow-500"
                    />
                    <label className="ml-3 block text-sm font-medium text-gray-700">
                      Cash on Delivery (COD)
                    </label>
                  </div>
                  <p className="ml-7 text-sm text-gray-500 mt-1">Pay with cash upon delivery</p>
                </div>

                <div 
                  className={`border rounded-md p-4 cursor-pointer ${paymentMethod === "Card" ? "border-yellow-400 bg-yellow-50" : "border-gray-200"}`}
                  onClick={() => setPaymentMethod("Card")}
                >
                  <div className="flex items-center">
                    <input 
                      type="radio" 
                      checked={paymentMethod === "Card"}
                      onChange={() => setPaymentMethod("Card")}
                      className="h-4 w-4 text-yellow-600 focus:ring-yellow-500"
                    />
                    <label className="ml-3 block text-sm font-medium text-gray-700">
                      Credit/Debit Card
                    </label>
                  </div>
                  <div className="ml-7 mt-2 flex space-x-2">
                    <img src="https://logos-world.net/wp-content/uploads/2020/04/Visa-Logo.png" alt="Visa" className="h-6" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" alt="Mastercard" className="h-6" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/American_Express_logo_%282018%29.svg/1200px-American_Express_logo_%282018%29.svg.png" alt="Amex" className="h-6" />
                  </div>
                </div>

                <div 
                  className={`border rounded-md p-4 cursor-pointer ${paymentMethod === "UPI" ? "border-yellow-400 bg-yellow-50" : "border-gray-200"}`}
                  onClick={() => setPaymentMethod("UPI")}
                >
                  <div className="flex items-center">
                    <input 
                      type="radio" 
                      checked={paymentMethod === "UPI"}
                      onChange={() => setPaymentMethod("UPI")}
                      className="h-4 w-4 text-yellow-600 focus:ring-yellow-500"
                    />
                    <label className="ml-3 block text-sm font-medium text-gray-700">
                      UPI
                    </label>
                  </div>
                  <div className="ml-7 mt-2 flex space-x-2">
                    <img src="https://img.icons8.com/3d-fluency/94/paytm.png" alt="GPay" className="h-6" />
                    <img src="https://img.icons8.com/color/48/google-pay.png" alt="PhonePe" className="h-6" />
                    <img src="https://img.icons8.com/color/48/phone-pe.png" alt="Paytm" className="h-6" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="md:w-1/3">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 sticky top-4">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex border-b pb-4">
                    <div className="w-20 h-20 flex-shrink-0">
                      <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="text-sm font-medium text-gray-900 line-clamp-2">{item.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">Qty: {item.quantity}</p>
                      <p className="text-xs text-green-600 mt-1">{item.deliveryDate}</p>
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                     ${(item.price * item.quantity).toLocaleString('en-IN')}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-2 mb-6">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items):</span>
                  <span className="text-sm font-medium">${subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Delivery:</span>
                  <span className="text-sm font-medium text-green-600">FREE</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Tax (18%):</span>
                  <span className="text-sm font-medium">${tax.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between border-t pt-2 mt-2">
                  <span className="text-base font-bold">Total:</span>
                  <span className="text-lg font-bold">${total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <button
                onClick={placeOrderHandler}
                disabled={isLoading}
                className={`w-full ${
                  isLoading ? "bg-yellow-400" : "bg-yellow-400 hover:bg-yellow-500"
                } py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  `Place your order (${paymentMethod})`
                )}
              </button>

              <div className="mt-4 text-xs text-gray-500">
                <p>By placing your order, you agree to Amazon's <a href="#" className="text-blue-600 hover:underline">Conditions of Use</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Notice</a>.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
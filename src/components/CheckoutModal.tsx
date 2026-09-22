import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { DemoOrder } from '../types';
import {
  X,
  CheckCircle2,
  Package,
  ShieldAlert,
  Calendar,
  MapPin,
  Mail,
  ArrowRight,
  CreditCard,
  Banknote,
  Smartphone,
  Lock,
} from 'lucide-react';
import { Link } from 'react-router-dom';

type PaymentOption = 'Cash on Delivery' | 'UPI' | 'Credit / Debit Card';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    subtotal,
    deliveryFee,
    totalSavings,
    total,
    placeDemoOrder,
  } = useStore();

  const [formData, setFormData] = useState({
    fullName: 'Ananya Sharma',
    email: 'ananya.sharma@example.com',
    address: '14/B, Heritage Boulevard',
    city: 'New Delhi',
    pinCode: '110001',
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentOption>('Cash on Delivery');

  // Demo non-functional fields
  const [demoCard, setDemoCard] = useState({
    cardholderName: 'Ananya Sharma',
    cardNumber: '4532 8821 9045 7712',
    expiryDate: '08/28',
    cvv: '842',
  });

  const [demoUpiId, setDemoUpiId] = useState('demo@upi');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [confirmedOrder, setConfirmedOrder] = useState<DemoOrder | null>(null);

  if (!isCheckoutOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full Name is required';
    if (!formData.email.trim()) {
      errs.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email address';
    }
    if (!formData.address.trim()) errs.address = 'Address is required';
    if (!formData.city.trim()) errs.city = 'City is required';
    if (!formData.pinCode.trim()) {
      errs.pinCode = 'PIN code is required';
    } else if (!/^\d{6}$/.test(formData.pinCode.replace(/\s/g, ''))) {
      errs.pinCode = 'PIN code must be 6 digits';
    }

    if (paymentMethod === 'Credit / Debit Card') {
      if (!demoCard.cardholderName.trim()) errs.cardholderName = 'Cardholder name is required';
      if (!demoCard.cardNumber.trim()) errs.cardNumber = 'Card number is required';
    } else if (paymentMethod === 'UPI') {
      if (!demoUpiId.trim()) errs.demoUpi = 'UPI ID is required';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const order = placeDemoOrder(formData, paymentMethod);
    setConfirmedOrder(order);
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setConfirmedOrder(null);
  };

  return (
    <div
      id="checkout-modal-overlay"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
      onClick={handleClose}
    >
      <div
        id="checkout-modal-content"
        className="w-full max-w-2xl bg-[#FAF8F5] rounded-2xl shadow-2xl border border-[#E8E2D9] overflow-hidden my-8 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="px-6 py-4 bg-white border-b border-[#E8E2D9] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="font-serif text-xl font-bold text-[#1E1D1C]">
              {confirmedOrder ? 'Order Confirmation' : 'Checkout'}
            </h3>
          </div>
          <button
            id="close-checkout-modal"
            onClick={handleClose}
            className="p-1.5 rounded-full text-[#6B6864] hover:text-[#1E1D1C] hover:bg-[#F3EFEA] transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Demo Warning Banner */}
        <div className="px-6 py-2.5 bg-[#FAF4E6] border-b border-[#E8DFC8] flex items-center gap-2.5 text-xs text-[#7C5E0B]">
          <ShieldAlert className="w-4 h-4 shrink-0 text-[#B8860B]" />
          <span>
            <strong>Demo Payment</strong> — No real payment will be processed.
          </span>
        </div>

        {confirmedOrder ? (
          /* SUCCESS STATE */
          <div className="p-6 sm:p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-inner animate-in zoom-in-50 duration-300">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-1.5">
              <h4 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E1D1C]">
                Order Confirmed!
              </h4>
              <p className="text-sm text-[#524E48]">
                Thank you for shopping with Kronos Books.
              </p>
              <div className="inline-block mt-2 px-4 py-1.5 bg-white border border-[#D5CBBF] rounded-full text-xs font-mono font-bold text-[#1E1D1C] shadow-xs">
                Order ID: <span className="text-[#B8860B]">{confirmedOrder.orderId}</span>
              </div>
              <p className="text-xs text-[#8C8275] pt-1">
                Demo order only — no real payment has been processed.
              </p>
            </div>

            {/* Order Summary Receipt Box */}
            <div className="bg-white rounded-xl p-5 border border-[#E8E2D9] text-left text-xs space-y-3 shadow-xs">
              <div className="flex justify-between items-center pb-2 border-b border-[#F0EBE1]">
                <div className="flex items-center gap-1.5 text-[#6B6864]">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Placed on: {confirmedOrder.date}</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold uppercase tracking-wider text-[10px]">
                  {confirmedOrder.paymentMethod}
                </span>
              </div>

              {/* Items summary */}
              <div className="space-y-2 py-1 max-h-48 overflow-y-auto">
                {confirmedOrder.items.map((item) => (
                  <div key={item.book.id} className="flex justify-between items-center text-xs">
                    <span className="font-medium text-[#1E1D1C] truncate max-w-[280px]">
                      {item.quantity}x {item.book.title}
                    </span>
                    <span className="text-[#524E48]">₹{item.book.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-[#F0EBE1] space-y-1 text-[#6B6864]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-[#1E1D1C]">₹{confirmedOrder.subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span className="text-[#1E1D1C]">
                    {confirmedOrder.delivery === 0 ? 'FREE' : `₹${confirmedOrder.delivery}`}
                  </span>
                </div>
                {confirmedOrder.discount > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Savings</span>
                    <span>-₹{confirmedOrder.discount}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-bold text-[#1E1D1C] pt-1 border-t border-[#F0EBE1]">
                  <span>Total Payable</span>
                  <span className="text-[#B8860B]">₹{confirmedOrder.total}</span>
                </div>
              </div>

              {/* Shipping info */}
              <div className="pt-3 border-t border-[#F0EBE1] text-[11px] text-[#6B6864] space-y-0.5">
                <div className="flex items-center gap-1 text-[#1E1D1C] font-semibold">
                  <MapPin className="w-3 h-3 text-[#8C8275]" />
                  <span>Delivering to: {confirmedOrder.shippingDetails.fullName}</span>
                </div>
                <p className="pl-4">
                  {confirmedOrder.shippingDetails.address}, {confirmedOrder.shippingDetails.city} -{' '}
                  {confirmedOrder.shippingDetails.pinCode}
                </p>
                <p className="pl-4 text-[#8C8275]">
                  Payment Mode: <strong>{confirmedOrder.paymentMethod}</strong> (Demo)
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <Link
                to="/books"
                onClick={handleClose}
                className="py-3 px-6 rounded-xl bg-[#1E1D1C] text-[#FAF8F5] text-xs font-semibold hover:bg-[#33302C] transition-colors inline-flex items-center justify-center gap-2"
              >
                <span>Continue Shopping</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#E6CA65]" />
              </Link>
            </div>
          </div>
        ) : cart.length === 0 ? (
          /* EMPTY CART STATE */
          <div className="p-8 text-center space-y-4">
            <p className="text-sm text-[#524E48]">Your shopping bag is currently empty.</p>
            <Link
              to="/books"
              onClick={handleClose}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#1E1D1C] text-[#FAF8F5] text-xs font-semibold hover:bg-[#33302C] transition-colors"
            >
              <span>Browse Books</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#E6CA65]" />
            </Link>
          </div>
        ) : (
          /* FORM STATE */
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            {/* Order Preview Strip */}
            <div className="bg-white rounded-xl p-4 border border-[#E8E2D9] flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-[#524E48]">
                <Package className="w-4 h-4 text-[#B8860B]" />
                <span>
                  Ordering <strong>{cart.reduce((s, i) => s + i.quantity, 0)} books</strong>
                </span>
              </div>
              <div className="text-right">
                <span className="text-[#8C8275]">Total Payable: </span>
                <strong className="text-sm font-bold text-[#1E1D1C]">₹{total}</strong>
              </div>
            </div>

            {/* SECTION 1: Customer Information */}
            <div className="space-y-4">
              <h4 className="text-xs uppercase tracking-wider font-bold text-[#8C8275]">
                Customer Information
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label htmlFor="checkout-fullName" className="block text-xs font-semibold text-[#1E1D1C] mb-1">
                    Full Name *
                  </label>
                  <input
                    id="checkout-fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className={`w-full px-3.5 py-2 text-xs rounded-lg border bg-white text-[#1E1D1C] focus:outline-hidden focus:border-[#B8860B] transition-colors ${
                      errors.fullName ? 'border-rose-500' : 'border-[#D5CBBF]'
                    }`}
                    placeholder="e.g. Ananya Sharma"
                  />
                  {errors.fullName && (
                    <p className="text-[11px] text-rose-600 mt-1">{errors.fullName}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="checkout-email" className="block text-xs font-semibold text-[#1E1D1C] mb-1">
                    Email *
                  </label>
                  <input
                    id="checkout-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full px-3.5 py-2 text-xs rounded-lg border bg-white text-[#1E1D1C] focus:outline-hidden focus:border-[#B8860B] transition-colors ${
                      errors.email ? 'border-rose-500' : 'border-[#D5CBBF]'
                    }`}
                    placeholder="e.g. ananya@example.com"
                  />
                  {errors.email && (
                    <p className="text-[11px] text-rose-600 mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Address */}
                <div className="sm:col-span-2">
                  <label htmlFor="checkout-address" className="block text-xs font-semibold text-[#1E1D1C] mb-1">
                    Address *
                  </label>
                  <input
                    id="checkout-address"
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className={`w-full px-3.5 py-2 text-xs rounded-lg border bg-white text-[#1E1D1C] focus:outline-hidden focus:border-[#B8860B] transition-colors ${
                      errors.address ? 'border-rose-500' : 'border-[#D5CBBF]'
                    }`}
                    placeholder="e.g. 14/B, Heritage Boulevard"
                  />
                  {errors.address && (
                    <p className="text-[11px] text-rose-600 mt-1">{errors.address}</p>
                  )}
                </div>

                {/* City */}
                <div>
                  <label htmlFor="checkout-city" className="block text-xs font-semibold text-[#1E1D1C] mb-1">
                    City *
                  </label>
                  <input
                    id="checkout-city"
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className={`w-full px-3.5 py-2 text-xs rounded-lg border bg-white text-[#1E1D1C] focus:outline-hidden focus:border-[#B8860B] transition-colors ${
                      errors.city ? 'border-rose-500' : 'border-[#D5CBBF]'
                    }`}
                    placeholder="e.g. New Delhi"
                  />
                  {errors.city && (
                    <p className="text-[11px] text-rose-600 mt-1">{errors.city}</p>
                  )}
                </div>

                {/* PIN Code */}
                <div>
                  <label htmlFor="checkout-pinCode" className="block text-xs font-semibold text-[#1E1D1C] mb-1">
                    PIN Code *
                  </label>
                  <input
                    id="checkout-pinCode"
                    type="text"
                    maxLength={6}
                    value={formData.pinCode}
                    onChange={(e) => setFormData({ ...formData, pinCode: e.target.value })}
                    className={`w-full px-3.5 py-2 text-xs rounded-lg border bg-white text-[#1E1D1C] focus:outline-hidden focus:border-[#B8860B] transition-colors ${
                      errors.pinCode ? 'border-rose-500' : 'border-[#D5CBBF]'
                    }`}
                    placeholder="110001"
                  />
                  {errors.pinCode && (
                    <p className="text-[11px] text-rose-600 mt-1">{errors.pinCode}</p>
                  )}
                </div>
              </div>
            </div>

            {/* SECTION 2: Payment Method */}
            <div className="space-y-4 pt-2 border-t border-[#E8E2D9]">
              <div className="flex items-center justify-between">
                <h4 className="text-xs uppercase tracking-wider font-bold text-[#8C8275]">
                  Payment Method
                </h4>
                <span className="text-[11px] text-[#B8860B] font-medium flex items-center gap-1">
                  <Lock className="w-3 h-3" />
                  <span>Demo Mode</span>
                </span>
              </div>

              {/* Selectable demo payment options */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Cash on Delivery */}
                <label
                  className={`relative p-3.5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                    paymentMethod === 'Cash on Delivery'
                      ? 'border-[#B8860B] bg-[#FAF4E6] shadow-xs'
                      : 'border-[#E8E2D9] bg-white hover:border-[#D5CBBF]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-7 h-7 rounded-lg bg-[#F5F1EB] flex items-center justify-center text-[#1E1D1C]">
                      <Banknote className="w-4 h-4 text-[#B8860B]" />
                    </div>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="Cash on Delivery"
                      checked={paymentMethod === 'Cash on Delivery'}
                      onChange={() => setPaymentMethod('Cash on Delivery')}
                      className="accent-[#B8860B]"
                    />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-[#1E1D1C]">
                      Cash on Delivery
                    </span>
                    <span className="text-[11px] text-[#8C8275]">Pay upon arrival</span>
                  </div>
                </label>

                {/* UPI */}
                <label
                  className={`relative p-3.5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                    paymentMethod === 'UPI'
                      ? 'border-[#B8860B] bg-[#FAF4E6] shadow-xs'
                      : 'border-[#E8E2D9] bg-white hover:border-[#D5CBBF]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-7 h-7 rounded-lg bg-[#F5F1EB] flex items-center justify-center text-[#1E1D1C]">
                      <Smartphone className="w-4 h-4 text-[#B8860B]" />
                    </div>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="UPI"
                      checked={paymentMethod === 'UPI'}
                      onChange={() => setPaymentMethod('UPI')}
                      className="accent-[#B8860B]"
                    />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-[#1E1D1C]">UPI</span>
                    <span className="text-[11px] text-[#8C8275]">Instant demo payment</span>
                  </div>
                </label>

                {/* Credit / Debit Card */}
                <label
                  className={`relative p-3.5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                    paymentMethod === 'Credit / Debit Card'
                      ? 'border-[#B8860B] bg-[#FAF4E6] shadow-xs'
                      : 'border-[#E8E2D9] bg-white hover:border-[#D5CBBF]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-7 h-7 rounded-lg bg-[#F5F1EB] flex items-center justify-center text-[#1E1D1C]">
                      <CreditCard className="w-4 h-4 text-[#B8860B]" />
                    </div>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="Credit / Debit Card"
                      checked={paymentMethod === 'Credit / Debit Card'}
                      onChange={() => setPaymentMethod('Credit / Debit Card')}
                      className="accent-[#B8860B]"
                    />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-[#1E1D1C]">
                      Credit / Debit Card
                    </span>
                    <span className="text-[11px] text-[#8C8275]">Cards accepted</span>
                  </div>
                </label>
              </div>

              {/* Dynamic Sub-panel for Selected Payment Method */}
              <div className="p-4 rounded-xl bg-white border border-[#E8E2D9] space-y-3">
                {paymentMethod === 'Cash on Delivery' && (
                  <div className="text-xs text-[#524E48] space-y-1">
                    <div className="flex items-center gap-2 text-[#1E1D1C] font-semibold">
                      <Banknote className="w-4 h-4 text-[#B8860B]" />
                      <span>Pay when your order is delivered.</span>
                    </div>
                    <p className="text-[11px] text-[#8C8275] pl-6">
                      Have cash or UPI ready at the time of courier doorstep delivery. No advance payment required.
                    </p>
                  </div>
                )}

                {paymentMethod === 'UPI' && (
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <label htmlFor="demo-upi-id" className="block text-xs font-semibold text-[#1E1D1C]">
                        UPI ID
                      </label>
                      <span className="text-[10px] text-[#B8860B] font-mono bg-[#FAF4E6] px-2 py-0.5 rounded border border-[#E8DFC8]">
                        Demo Field
                      </span>
                    </div>
                    <div className="relative">
                      <input
                        id="demo-upi-id"
                        type="text"
                        value={demoUpiId}
                        onChange={(e) => setDemoUpiId(e.target.value)}
                        placeholder="example: demo@upi"
                        className="w-full px-3.5 py-2 text-xs rounded-lg border border-[#D5CBBF] bg-[#FAF8F5] text-[#1E1D1C] focus:bg-white focus:outline-hidden focus:border-[#B8860B] transition-colors"
                      />
                    </div>
                    {errors.demoUpi && (
                      <p className="text-[11px] text-rose-600">{errors.demoUpi}</p>
                    )}
                    <p className="text-[11px] text-[#8C8275]">
                      Demo payment only — no real UPI transaction will take place.
                    </p>
                  </div>
                )}

                {paymentMethod === 'Credit / Debit Card' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-[#1E1D1C]">
                        Card Details (Non-Functional Demo)
                      </span>
                      <span className="text-[10px] text-[#B8860B] font-mono bg-[#FAF4E6] px-2 py-0.5 rounded border border-[#E8DFC8]">
                        Demo Only
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-medium text-[#6B6864] mb-1">
                          Cardholder Name
                        </label>
                        <input
                          type="text"
                          value={demoCard.cardholderName}
                          onChange={(e) => setDemoCard({ ...demoCard, cardholderName: e.target.value })}
                          placeholder="Name as on card"
                          className="w-full px-3.5 py-2 text-xs rounded-lg border border-[#D5CBBF] bg-[#FAF8F5] text-[#1E1D1C] focus:bg-white focus:outline-hidden focus:border-[#B8860B]"
                        />
                        {errors.cardholderName && (
                          <p className="text-[11px] text-rose-600 mt-1">{errors.cardholderName}</p>
                        )}
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-medium text-[#6B6864] mb-1">
                          Card Number
                        </label>
                        <input
                          type="text"
                          value={demoCard.cardNumber}
                          onChange={(e) => setDemoCard({ ...demoCard, cardNumber: e.target.value })}
                          placeholder="4532 •••• •••• 8842"
                          maxLength={19}
                          className="w-full px-3.5 py-2 text-xs font-mono rounded-lg border border-[#D5CBBF] bg-[#FAF8F5] text-[#1E1D1C] focus:bg-white focus:outline-hidden focus:border-[#B8860B]"
                        />
                        {errors.cardNumber && (
                          <p className="text-[11px] text-rose-600 mt-1">{errors.cardNumber}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-[11px] font-medium text-[#6B6864] mb-1">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          value={demoCard.expiryDate}
                          onChange={(e) => setDemoCard({ ...demoCard, expiryDate: e.target.value })}
                          placeholder="MM/YY"
                          maxLength={5}
                          className="w-full px-3.5 py-2 text-xs font-mono rounded-lg border border-[#D5CBBF] bg-[#FAF8F5] text-[#1E1D1C] focus:bg-white focus:outline-hidden focus:border-[#B8860B]"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-medium text-[#6B6864] mb-1">
                          CVV
                        </label>
                        <input
                          type="password"
                          value={demoCard.cvv}
                          onChange={(e) => setDemoCard({ ...demoCard, cvv: e.target.value })}
                          placeholder="•••"
                          maxLength={4}
                          className="w-full px-3.5 py-2 text-xs font-mono rounded-lg border border-[#D5CBBF] bg-[#FAF8F5] text-[#1E1D1C] focus:bg-white focus:outline-hidden focus:border-[#B8860B]"
                        />
                      </div>
                    </div>

                    <p className="text-[11px] text-[#8C8275] pt-1">
                      IMPORTANT: These demo fields do not transmit, save, or process real payment data.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Place Order CTA Button */}
            <div className="pt-2 border-t border-[#E8E2D9] flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2.5 rounded-xl border border-[#D5CBBF] bg-white text-xs font-semibold text-[#524E48] hover:bg-[#F3EFEA] transition-colors"
              >
                Cancel
              </button>
              <button
                id="place-demo-order-btn"
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-[#1E1D1C] hover:bg-[#33302C] text-[#FAF8F5] text-xs font-semibold flex items-center gap-2 transition-all shadow-md active:scale-98"
              >
                <span>Place Demo Order</span>
                <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

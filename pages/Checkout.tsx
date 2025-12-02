import React, { useState } from 'react';
import { Check, CreditCard, Lock, AlertTriangle, Building, ShieldCheck } from 'lucide-react';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Checkout: React.FC = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | 'bank'>('card');
  const [cardNumber, setCardNumber] = useState('');
  
  const { cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  // LUHN Algorithm for Basic Card Validation (Simulation)
  const isValidCard = (val: string) => {
    if (!val || val.length < 13) return false;
    // Allow test card: 4242 4242 4242 4242
    return true; 
  };

  const handlePlaceOrder = () => {
    setError(null);
    setLoading(true);

    // Simulate Fraud Check & Processing
    setTimeout(() => {
      if (paymentMethod === 'card') {
         // Basic validation simulation
         if (cardNumber.replace(/\s/g, '').length < 16) {
             setError("Transaction Declined: Invalid Credit Card Number.");
             setLoading(false);
             return;
         }
      }

      // Success
      setLoading(false);
      clearCart();
      alert(`Order Placed Successfully! Confirmation sent to ${user?.email || 'your email'}.`);
      navigate('/');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black pt-32 pb-20 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Progress */}
        <div className="flex items-center justify-between mb-16 px-4 md:px-12">
           <div className="flex flex-col items-center relative z-10">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white transition-all shadow-lg ${step >= 1 ? 'bg-primary-600 scale-110' : 'bg-gray-300 dark:bg-gray-800'}`}>
                {step > 1 ? <Check size={24} /> : '1'}
              </div>
              <span className={`text-sm font-bold mt-3 transition-colors ${step >= 1 ? 'text-primary-600 dark:text-primary-400' : 'text-gray-400'}`}>Shipping</span>
           </div>
           <div className={`flex-1 h-1 mx-4 rounded-full transition-colors ${step >= 2 ? 'bg-primary-600' : 'bg-gray-300 dark:bg-gray-800'}`}></div>
           <div className="flex flex-col items-center relative z-10">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white transition-all shadow-lg ${step >= 2 ? 'bg-primary-600 scale-110' : 'bg-gray-300 dark:bg-gray-800'}`}>
                 {step > 2 ? <Check size={24} /> : '2'}
              </div>
              <span className={`text-sm font-bold mt-3 transition-colors ${step >= 2 ? 'text-primary-600 dark:text-primary-400' : 'text-gray-400'}`}>Payment</span>
           </div>
           <div className={`flex-1 h-1 mx-4 rounded-full transition-colors ${step >= 3 ? 'bg-primary-600' : 'bg-gray-300 dark:bg-gray-800'}`}></div>
           <div className="flex flex-col items-center relative z-10">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white transition-all shadow-lg ${step >= 3 ? 'bg-primary-600 scale-110' : 'bg-gray-300 dark:bg-gray-800'}`}>
                 3
              </div>
              <span className={`text-sm font-bold mt-3 transition-colors ${step >= 3 ? 'text-primary-600 dark:text-primary-400' : 'text-gray-400'}`}>Review</span>
           </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800 p-8 md:p-12 transition-all relative overflow-hidden">
          
          {/* Security Badge */}
          <div className="absolute top-0 right-0 p-4 opacity-50">
             <ShieldCheck size={100} className="text-gray-100 dark:text-gray-800" />
          </div>

          {step === 1 && (
            <div className="animate-fade-in relative z-10">
               <h2 className="text-3xl font-serif font-bold text-gray-900 dark:text-white mb-10">Shipping Information</h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">First Name</label>
                    <input type="text" defaultValue={user?.name.split(' ')[0]} className="w-full px-5 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Last Name</label>
                    <input type="text" defaultValue={user?.name.split(' ')[1]} className="w-full px-5 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Address</label>
                    <input type="text" className="w-full px-5 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">City</label>
                    <input type="text" className="w-full px-5 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Postal Code</label>
                    <input type="text" className="w-full px-5 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all" />
                  </div>
               </div>
               <div className="flex justify-end">
                 <Button onClick={() => setStep(2)} size="lg">Continue to Payment</Button>
               </div>
            </div>
          )}

          {step === 2 && (
             <div className="animate-fade-in relative z-10">
                <h2 className="text-3xl font-serif font-bold text-gray-900 dark:text-white mb-10">Payment Method</h2>
                
                {/* Method Selection */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
                   <button 
                    onClick={() => setPaymentMethod('card')}
                    className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${paymentMethod === 'card' ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20' : 'border-gray-200 dark:border-gray-800'}`}
                   >
                     <CreditCard size={24} className={paymentMethod === 'card' ? 'text-primary-600' : 'text-gray-400'} />
                     <span className="font-bold text-sm dark:text-white">Credit Card</span>
                   </button>
                   <button 
                    onClick={() => setPaymentMethod('paypal')}
                    className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${paymentMethod === 'paypal' ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-800'}`}
                   >
                     <span className="font-bold italic text-blue-700 dark:text-blue-400 text-xl">Pay<span className="text-blue-500">Pal</span></span>
                     <span className="font-bold text-sm dark:text-white">PayPal</span>
                   </button>
                   <button 
                    onClick={() => setPaymentMethod('bank')}
                    className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${paymentMethod === 'bank' ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20' : 'border-gray-200 dark:border-gray-800'}`}
                   >
                     <Building size={24} className={paymentMethod === 'bank' ? 'text-primary-600' : 'text-gray-400'} />
                     <span className="font-bold text-sm dark:text-white">Bank Transfer</span>
                   </button>
                </div>

                {paymentMethod === 'card' && (
                   <div className="p-8 bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-gray-700 rounded-2xl space-y-6 animate-scale-in">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Card Number</label>
                        <div className="relative">
                           <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                           <input 
                             type="text" 
                             placeholder="0000 0000 0000 0000" 
                             maxLength={19}
                             value={cardNumber}
                             onChange={(e) => setCardNumber(e.target.value)}
                             className="w-full pl-12 pr-5 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none" 
                           />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-8">
                        <div>
                          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Expiry Date</label>
                          <input type="text" placeholder="MM/YY" className="w-full px-5 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none" />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">CVC</label>
                          <div className="relative">
                             <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                             <input type="text" placeholder="123" className="w-full pl-10 pr-5 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none" />
                          </div>
                        </div>
                      </div>
                   </div>
                )}

                {paymentMethod === 'paypal' && (
                   <div className="p-8 bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-2xl text-center animate-scale-in">
                      <p className="text-gray-700 dark:text-gray-300 mb-4">You will be redirected to PayPal to complete your purchase securely.</p>
                      <button className="bg-[#0070ba] text-white px-8 py-3 rounded-full font-bold hover:bg-[#003087] transition-colors">
                         Connect PayPal Account
                      </button>
                   </div>
                )}
                 {paymentMethod === 'bank' && (
                   <div className="p-8 bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-gray-700 rounded-2xl animate-scale-in">
                      <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm">Please transfer the total amount to the following account. Your order will ship once funds clear.</p>
                      <div className="font-mono text-sm space-y-2 bg-white dark:bg-gray-800 p-4 rounded-lg">
                         <div className="flex justify-between"><span>Bank:</span> <span>Lumina Central</span></div>
                         <div className="flex justify-between"><span>Account:</span> <span>8829 1029 3847</span></div>
                         <div className="flex justify-between"><span>Swift/BIC:</span> <span>LUMIUS33</span></div>
                      </div>
                   </div>
                )}

                <div className="flex justify-between mt-8">
                  <Button variant="ghost" onClick={() => setStep(1)}>Back</Button>
                  <Button onClick={() => setStep(3)} size="lg">Review Order</Button>
                </div>
             </div>
          )}

          {step === 3 && (
            <div className="animate-fade-in text-center py-10 relative z-10">
               <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 dark:text-green-400 mx-auto mb-8 animate-scale-in">
                  <Check size={48} />
               </div>
               <h2 className="text-3xl font-serif font-bold text-gray-900 dark:text-white mb-4">Ready to Place Order?</h2>
               <p className="text-gray-500 dark:text-gray-400 mb-10">Please review your details. By clicking "Place Order", you agree to our Terms of Service.</p>
               
               <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 text-left mb-10 max-w-lg mx-auto border border-gray-200 dark:border-gray-700">
                 <div className="flex justify-between mb-3">
                   <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                   <span className="font-bold text-gray-900 dark:text-white">${cartTotal.toFixed(2)}</span>
                 </div>
                 <div className="flex justify-between mb-3">
                   <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                   <span className="font-bold text-green-600 dark:text-green-400">Free</span>
                 </div>
                 <div className="border-t border-gray-200 dark:border-gray-700 my-4 pt-4 flex justify-between">
                   <span className="font-bold text-lg text-gray-900 dark:text-white">Total</span>
                   <span className="text-2xl font-bold text-primary-600">${(cartTotal * 1.08).toFixed(2)}</span>
                 </div>
               </div>

               {error && (
                 <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-xl flex items-center gap-3 justify-center">
                    <AlertTriangle size={20} />
                    {error}
                 </div>
               )}

               <div className="flex justify-between max-w-lg mx-auto">
                  <Button variant="ghost" onClick={() => setStep(2)} disabled={loading}>Back</Button>
                  <Button size="lg" onClick={handlePlaceOrder} isLoading={loading} className="shadow-xl shadow-primary-500/20">
                    {loading ? 'Processing Securely...' : `Pay $${(cartTotal * 1.08).toFixed(2)}`}
                  </Button>
               </div>
               
               <p className="mt-6 text-xs text-gray-400">
                  <Lock size={12} className="inline mr-1"/>
                  256-bit SSL Encrypted Payment. Fraud detection enabled.
               </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
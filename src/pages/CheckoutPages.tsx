import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Lock, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BookCover } from '../components/ui/BookCard';
import { useState } from 'react';

export function CheckoutPage() {
  const { boxItems, boxTotal, addToast } = useApp();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      navigate('/checkout/success');
    }, 2000);
  };

  if (boxItems.length === 0) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-heading-2 font-serif mb-4">Your box is empty</h1>
          <p className="text-ink-muted mb-6">Add some books before checking out.</p>
          <Link to="/books" className="px-6 py-3 bg-ink text-cream rounded-full font-medium">Browse Books</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/box" className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-ink mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Box
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-heading-2 font-serif text-ink mb-8">Checkout</h1>

          <div className="grid lg:grid-cols-[1fr_360px] gap-8">
            {/* Form */}
            <form onSubmit={handleCheckout} className="space-y-6">
              <div className="bg-card rounded-2xl p-6 border border-border-light">
                <h2 className="font-medium text-ink mb-4 flex items-center gap-2"><CreditCard className="w-4 h-4" /> Payment Details</h2>
                <div className="space-y-4">
                  <input type="text" placeholder="Card number" className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:border-primary" defaultValue="4242 4242 4242 4242" />
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="MM/YY" className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:border-primary" defaultValue="12/28" />
                    <input type="text" placeholder="CVC" className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:border-primary" defaultValue="123" />
                  </div>
                  <input type="text" placeholder="Name on card" className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:border-primary" defaultValue="Alex Reader" />
                </div>
              </div>

              <div className="bg-card rounded-2xl p-6 border border-border-light">
                <h2 className="font-medium text-ink mb-4">Shipping Address</h2>
                <div className="space-y-4">
                  <input type="text" placeholder="Full name" className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:border-primary" defaultValue="Alex Reader" />
                  <input type="text" placeholder="Address" className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:border-primary" defaultValue="123 Reading Lane" />
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="City" className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:border-primary" defaultValue="Portland" />
                    <input type="text" placeholder="ZIP" className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:border-primary" defaultValue="97201" />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={processing}
                className="w-full flex items-center justify-center gap-2 py-4 bg-primary text-cream font-medium rounded-full hover:bg-primary-dark transition-colors disabled:opacity-70"
              >
                <Lock className="w-4 h-4" />
                {processing ? 'Processing...' : `Pay $${boxTotal.toFixed(2)}`}
              </button>
              <p className="text-center text-xs text-ink-muted flex items-center justify-center gap-1">
                <Lock className="w-3 h-3" /> Secure checkout — This is a demo
              </p>
            </form>

            {/* Summary */}
            <div className="bg-card rounded-2xl p-6 border border-border-light h-fit sticky top-24">
              <h2 className="font-serif text-lg text-ink mb-4">Order Summary</h2>
              <div className="space-y-3 mb-4">
                {boxItems.map(item => (
                  <div key={item.book.id} className="flex items-center gap-3">
                    <BookCover book={item.book} size="small" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-ink truncate">{item.book.title}</p>
                      <p className="text-xs text-ink-muted">{item.book.author}</p>
                    </div>
                    <p className="text-sm font-medium">${item.book.price}</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-border-light pt-4 space-y-2">
                <div className="flex justify-between text-sm"><span className="text-ink-muted">Subtotal</span><span>${boxTotal.toFixed(2)}</span></div>
                <div className="flex justify-between text-sm"><span className="text-ink-muted">Shipping</span><span className="text-secondary">Free</span></div>
                <div className="flex justify-between font-semibold pt-2 border-t border-border-light"><span>Total</span><span>${boxTotal.toFixed(2)}</span></div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 flex items-center justify-center">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center max-w-md mx-auto px-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.2 }}
          className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <Check className="w-8 h-8 text-cream" />
        </motion.div>
        <h1 className="text-heading-2 font-serif text-ink mb-4">You picked well.</h1>
        <p className="text-ink-light mb-8">Your reading box is on its way! Check your email for confirmation and tracking details.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/account" className="px-6 py-3 bg-ink text-cream font-medium rounded-full hover:bg-primary transition-colors">
            View Account
          </Link>
          <Link to="/books" className="px-6 py-3 border-2 border-ink text-ink font-medium rounded-full hover:bg-ink hover:text-cream transition-colors">
            Browse More Books
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

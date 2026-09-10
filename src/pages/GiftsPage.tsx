import { useState } from 'react';
import { motion } from 'framer-motion';
import { Gift, Calendar, Heart, Send } from 'lucide-react';
import { giftOptions } from '../data';
import { useApp } from '../context/AppContext';

export default function GiftsPage() {
  const [selectedPlan, setSelectedPlan] = useState(3);
  const [form, setForm] = useState({ recipientName: '', recipientEmail: '', senderName: '', message: '', deliveryDate: '' });
  const { addToast } = useApp();

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    addToast('Gift sent successfully! 🎁', 'success');
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className="text-heading-1 font-serif text-ink mb-4">Give them a reason to cancel their plans.</h1>
          <p className="text-ink-light text-lg max-w-xl mx-auto">A BookNest gift is more than a subscription — it's an invitation to discover stories worth talking about.</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Gift Options */}
          <div>
            <h2 className="font-serif text-xl text-ink mb-6">Choose a gift</h2>
            <div className="space-y-3 mb-8">
              {giftOptions.map(option => (
                <button
                  key={option.months}
                  onClick={() => setSelectedPlan(option.months)}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${selectedPlan === option.months ? 'border-primary bg-primary/5' : 'border-border hover:border-ink/20'}`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-ink">{option.label}</p>
                      <p className="text-sm text-ink-muted">{option.description}</p>
                    </div>
                    <p className="font-bold text-ink">${option.price}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Gift Card Preview */}
            <div className="p-6 bg-ink rounded-2xl text-cream">
              <div className="flex items-center gap-2 mb-4">
                <Gift className="w-5 h-5 text-primary" />
                <span className="font-serif text-lg">BookNest Gift</span>
              </div>
              <p className="text-cream/60 text-sm mb-2">
                {selectedPlan}-month membership
              </p>
              <p className="font-serif text-2xl mb-4">Stories worth making room for.</p>
              <div className="flex items-center gap-4 text-sm text-cream/40">
                <span>{giftOptions.find(o => o.months === selectedPlan)?.label}</span>
                <span>•</span>
                <span>${giftOptions.find(o => o.months === selectedPlan)?.price}</span>
              </div>
            </div>
          </div>

          {/* Gift Form */}
          <div>
            <h2 className="font-serif text-xl text-ink mb-6">Personalize your gift</h2>
            <form onSubmit={handleSend} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-ink mb-1">Recipient's Name</label>
                <input
                  type="text"
                  value={form.recipientName}
                  onChange={(e) => setForm({ ...form, recipientName: e.target.value })}
                  className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:border-primary"
                  placeholder="Who's this for?"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-ink mb-1">Recipient's Email</label>
                <input
                  type="email"
                  value={form.recipientEmail}
                  onChange={(e) => setForm({ ...form, recipientEmail: e.target.value })}
                  className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:border-primary"
                  placeholder="their@email.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-ink mb-1">Your Name</label>
                <input
                  type="text"
                  value={form.senderName}
                  onChange={(e) => setForm({ ...form, senderName: e.target.value })}
                  className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:border-primary"
                  placeholder="From you"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-ink mb-1">Personal Message</label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:border-primary resize-none h-24"
                  placeholder="Add a personal touch..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-ink mb-1 flex items-center gap-1">
                  <Calendar className="w-4 h-4" /> Delivery Date
                </label>
                <input
                  type="date"
                  value={form.deliveryDate}
                  onChange={(e) => setForm({ ...form, deliveryDate: e.target.value })}
                  className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:border-primary"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-cream font-medium rounded-full hover:bg-primary-dark transition-colors"
              >
                <Send className="w-4 h-4" />
                Send Gift — ${giftOptions.find(o => o.months === selectedPlan)?.price}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

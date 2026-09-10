import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Star, BookOpen, Truck, Users, Gift } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function MembershipPage() {
  const [annual, setAnnual] = useState(false);
  const { addToast } = useApp();

  const plans = [
    { name: 'Monthly Reader', monthly: 19.99, annual: 199.99, books: 1, features: ['1 hardcover book per month', 'Member-only selections', 'Free standard shipping', 'Community access', 'Monthly reading challenges', 'Editor\'s notes & discussions'] },
    { name: 'Avid Reader', monthly: 34.99, annual: 349.99, books: 2, popular: true, features: ['2 hardcover books per month', 'Everything in Monthly Reader', 'Priority new releases', 'Exclusive author events', 'Quarterly bonus book', 'Early access to selections'] },
    { name: 'Devoted Reader', monthly: 49.99, annual: 499.99, books: 3, features: ['3 hardcover books per month', 'Everything in Avid Reader', 'Signed editions when available', 'Annual exclusive edition', 'Personal reading recommendations', 'VIP community access'] },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className="text-heading-1 font-serif text-ink mb-4">Your monthly reading ritual.</h1>
          <p className="text-ink-light text-lg max-w-xl mx-auto">Join a community of curious readers. Get hand-picked books delivered to your door every month.</p>
          
          {/* Toggle */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <span className={`text-sm font-medium ${!annual ? 'text-ink' : 'text-ink-muted'}`}>Monthly</span>
            <button
              onClick={() => setAnnual(!annual)}
              className={`relative w-14 h-7 rounded-full transition-colors ${annual ? 'bg-primary' : 'bg-border'}`}
            >
              <motion.div
                animate={{ x: annual ? 28 : 2 }}
                className="absolute top-1 w-5 h-5 bg-cream rounded-full shadow"
              />
            </button>
            <span className={`text-sm font-medium ${annual ? 'text-ink' : 'text-ink-muted'}`}>
              Annual <span className="text-primary font-bold">Save 17%</span>
            </span>
          </div>
        </motion.div>

        {/* Plans */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-20">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`relative p-6 rounded-2xl border-2 ${plan.popular ? 'border-primary bg-card shadow-lg' : 'border-border bg-card'}`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-cream text-xs font-bold rounded-full">
                  Most Popular
                </span>
              )}
              <h3 className="font-serif text-xl text-ink mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-3xl font-bold text-ink">${annual ? (plan.annual / 12).toFixed(2) : plan.monthly}</span>
                <span className="text-sm text-ink-muted">/month</span>
              </div>
              {annual && <p className="text-xs text-primary font-medium mb-2">Billed ${plan.annual}/year</p>}
              <p className="text-sm text-ink-muted mb-4">{plan.books} book{plan.books > 1 ? 's' : ''} per month + $9.99 each additional</p>
              <ul className="space-y-2 mb-6">
                {plan.features.map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm text-ink-light">
                    <Check className="w-4 h-4 text-secondary shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => addToast('Membership flow coming soon!', 'info')}
                className={`w-full py-3 rounded-full font-medium text-sm transition-colors ${plan.popular ? 'bg-primary text-cream hover:bg-primary-dark' : 'bg-ink text-cream hover:bg-primary'}`}
              >
                Become a Member
              </button>
            </motion.div>
          ))}
        </div>

        {/* Benefits */}
        <div className="max-w-4xl mx-auto mb-20">
          <h2 className="text-heading-2 font-serif text-ink text-center mb-10">What's included</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: BookOpen, title: 'Curated Books', desc: 'Hand-picked by our editorial team' },
              { icon: Truck, title: 'Free Shipping', desc: 'Delivered to your door monthly' },
              { icon: Users, title: 'Community', desc: 'Connect with fellow readers' },
              { icon: Gift, title: 'Member Perks', desc: 'Exclusive events and bonuses' },
            ].map((benefit, i) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6 bg-card rounded-2xl"
              >
                <benefit.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-medium text-ink mb-1">{benefit.title}</h3>
                <p className="text-sm text-ink-muted">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-sm text-ink-muted mb-4">Cancel or skip anytime. No commitments.</p>
          <Link
            to="/books"
            className="inline-flex items-center gap-2 px-8 py-4 bg-ink text-cream font-medium rounded-full hover:bg-primary transition-colors"
          >
            Explore Books First
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

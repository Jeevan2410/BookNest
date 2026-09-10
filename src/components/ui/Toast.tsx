import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Info } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function ToastContainer() {
  const { toasts, removeToast } = useApp();

  return (
    <div className="fixed bottom-6 right-6 z-[70] space-y-2">
      <AnimatePresence>
        {toasts.map(toast => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg max-w-sm ${
              toast.type === 'success' ? 'bg-secondary text-cream' :
              toast.type === 'error' ? 'bg-primary text-cream' :
              'bg-ink text-cream'
            }`}
          >
            {toast.type === 'success' && <Check className="w-4 h-4 shrink-0" />}
            {toast.type === 'error' && <X className="w-4 h-4 shrink-0" />}
            {toast.type === 'info' && <Info className="w-4 h-4 shrink-0" />}
            <span className="text-sm">{toast.message}</span>
            <button onClick={() => removeToast(toast.id)} className="ml-auto p-1 hover:opacity-70">
              <X className="w-3 h-3" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

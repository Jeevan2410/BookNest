import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Book, BoxItem } from '../types';

interface AppState {
  boxItems: BoxItem[];
  savedBooks: string[];
  searchOpen: boolean;
  boxDrawerOpen: boolean;
  mobileMenuOpen: boolean;
  toasts: Toast[];
  user: User | null;
}

interface User {
  id: string;
  name: string;
  email: string;
  memberSince: string;
  plan: string;
}

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface AppContextType extends AppState {
  addToBox: (book: Book) => void;
  removeFromBox: (bookId: string) => void;
  toggleSaved: (bookId: string) => void;
  setSearchOpen: (open: boolean) => void;
  setBoxDrawerOpen: (open: boolean) => void;
  setMobileMenuOpen: (open: boolean) => void;
  addToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;
  login: (email: string, password: string) => void;
  signup: (name: string, email: string, password: string) => void;
  logout: () => void;
  boxTotal: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [boxItems, setBoxItems] = useState<BoxItem[]>([]);
  const [savedBooks, setSavedBooks] = useState<string[]>([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [boxDrawerOpen, setBoxDrawerOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [user, setUser] = useState<User | null>(null);

  const addToBox = useCallback((book: Book) => {
    setBoxItems(prev => {
      if (prev.length >= 3 && !prev.find(item => item.book.id === book.id)) {
        return prev;
      }
      const existing = prev.find(item => item.book.id === book.id);
      if (existing) {
        return prev.map(item => item.book.id === book.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { book, quantity: 1 }];
    });
    addToast(`"${book.title}" added to your box`, 'success');
  }, []);

  const removeFromBox = useCallback((bookId: string) => {
    setBoxItems(prev => prev.filter(item => item.book.id !== bookId));
  }, []);

  const toggleSaved = useCallback((bookId: string) => {
    setSavedBooks(prev => prev.includes(bookId) ? prev.filter(id => id !== bookId) : [...prev, bookId]);
  }, []);

  const addToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const login = useCallback((_email: string, _password: string) => {
    setUser({ id: '1', name: 'Alex Reader', email: _email, memberSince: '2024', plan: 'Avid Reader' });
    addToast('Welcome back!', 'success');
  }, [addToast]);

  const signup = useCallback((name: string, email: string, _password: string) => {
    setUser({ id: '1', name, email, memberSince: '2026', plan: 'Monthly Reader' });
    addToast('Welcome to BookNest!', 'success');
  }, [addToast]);

  const logout = useCallback(() => {
    setUser(null);
    addToast('See you next time!', 'info');
  }, [addToast]);

  const boxTotal = boxItems.reduce((sum, item) => sum + (item.book.price * item.quantity), 0);

  return (
    <AppContext.Provider value={{
      boxItems, savedBooks, searchOpen, boxDrawerOpen, mobileMenuOpen, toasts, user, boxTotal,
      addToBox, removeFromBox, toggleSaved, setSearchOpen, setBoxDrawerOpen, setMobileMenuOpen,
      addToast, removeToast, login, signup, logout,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  id: number | string;
  name: string;
  slug: string;
  main_category?: string;
  image_url?: string;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: { id: number | string; name: string; slug: string; main_category?: string; image_url?: string; image?: string }, quantity?: number) => void;
  removeFromCart: (id: number | string) => void;
  updateQuantity: (id: number | string, quantity: number) => void;
  clearCart: () => void;
  totalItemsCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  openCart: () => void;
  closeCart: () => void;
  isCartRfqOpen: boolean;
  setIsCartRfqOpen: (open: boolean) => void;
  openCartRfq: () => void;
  closeCartRfq: () => void;
  lastAddedProduct: string | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'cie_export_cart_items_v1';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCartRfqOpen, setIsCartRfqOpen] = useState(false);
  const [lastAddedProduct, setLastAddedProduct] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cartItems]);

  const addToCart = (product: { id: number | string; name: string; slug: string; main_category?: string; image_url?: string; image?: string }, quantity: number = 100) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id.toString() === product.id.toString() || item.slug === product.slug);
      if (existing) {
        return prev.map(item =>
          item.id.toString() === product.id.toString() || item.slug === product.slug
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        const newItem: CartItem = {
          id: product.id,
          name: product.name,
          slug: product.slug,
          main_category: product.main_category,
          image_url: product.image_url || product.image || '/products/default.jpg',
          quantity: Math.max(1, quantity)
        };
        return [...prev, newItem];
      }
    });

    setLastAddedProduct(product.name);
    setTimeout(() => {
      setLastAddedProduct(null);
    }, 2500);
  };

  const removeFromCart = (id: number | string) => {
    setCartItems(prev => prev.filter(item => item.id.toString() !== id.toString()));
  };

  const updateQuantity = (id: number | string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id.toString() === id.toString()
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const openCartRfq = () => {
    setIsCartOpen(false);
    setIsCartRfqOpen(true);
  };
  const closeCartRfq = () => setIsCartRfqOpen(false);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItemsCount,
        isCartOpen,
        setIsCartOpen,
        openCart,
        closeCart,
        isCartRfqOpen,
        setIsCartRfqOpen,
        openCartRfq,
        closeCartRfq,
        lastAddedProduct
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

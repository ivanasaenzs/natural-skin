import React, { createContext, useState, useEffect } from "react";
import { db, auth } from "../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [userId, setUserId] = useState(null);

  // check firebase authentication
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        // if user id is not found (user logged out/is not registered) the cart is emptied out
        setUserId(null);
        setCartItems([]);
      }
    });
    return () => unsubscribe();
  }, []);

  // if user exists, we search for a pre-existent cart (before user logged out)
  useEffect(() => {
    if (userId) {
      const fetchCartItems = async () => {
        try {
          const docRef = doc(db, "users", userId);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setCartItems(docSnap.data().cart || []);
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };
      fetchCartItems();
    }
  }, [userId]);

  // updates cart in firebase
  useEffect(() => {
    if (userId && cartItems.length > 0) {
      const saveCartItems = async () => {
        try {
          const docRef = doc(db, "users", userId);
          await updateDoc(docRef, {
            cart: cartItems,
          });
        } catch (error) {
          console.error("error:", error);
        }
      };
      saveCartItems();
    }
  }, [cartItems, userId]);

  // ADD PRODUCT TO CART
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        // if a product (quantity = 1) is already in the cart and ADD TO CART button is clicked, we check if it the peviously added matches the one we're trying to add to either add quantity or add a completely new one
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      // returns array (cart) with new product + previously added ones
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  // calculates subtotal
  const calculateSubtotal = (item) => item.quantity * item.productPrice;

  // calculates total
  const calculateTotal = () =>
    cartItems.reduce((total, item) => total + calculateSubtotal(item), 0);

  //  deletes only one product from the cart
  const deleteCartItem = (productId) => {
    setCartItems((prevItems) => {
      const updatedCart = prevItems.filter((item) => item.id !== productId);
      return updatedCart;
    });
    // updates firebase
    if (userId) {
      const updateCartInFirestore = async () => {
        try {
          const docRef = doc(db, "users", userId);
          await updateDoc(docRef, {
            cart: cartItems.filter((item) => item.id !== productId),
          });
        } catch (error) {
          console.error("Error removing item from cart:", error);
        }
      };
      updateCartInFirestore();
    }
  };

  // DELETE CART
  const deleteCart = async () => {
    setCartItems([]);

    if (userId) {
      try {
        // deletes and updates cart in firebase
        const docRef = doc(db, "users", userId);
        await updateDoc(docRef, {
          cart: [],
        });
      } catch (error) {
        console.error("Error clearing cart:", error);
      }
    }
  };

  // ORDER CONFIRMATION
  const confirmOrder = async () => {
    if (!userId || cartItems.length === 0) return;

    const order = {
      products: cartItems,
      total: calculateTotal(),
      date: new Date().toString(),
    };

    try {
      const docRef = doc(db, "users", userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const existingOrders = docSnap.data().orders || [];
        await updateDoc(docRef, {
          orders: [...existingOrders, order],
        });
      } else {
        await updateDoc(docRef, {
          orders: [order],
        });
      }

      deleteCart();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        calculateSubtotal,
        calculateTotal,
        confirmOrder,
        deleteCartItem,
        deleteCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

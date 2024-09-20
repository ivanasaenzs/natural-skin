import React, { createContext, useState, useEffect } from "react";
import { db, auth } from "../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [userId, setUserId] = useState(null);

  // depende el estado de la autenticación de firebase lo que el carrito muestra
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        // si no encuentra user id (usuario cerró sesión o no está registrado) vacía el carrito
        setUserId(null);
        setCartItems([]);
      }
    });
    return () => unsubscribe();
  }, []);

  // si el usuario existe, se busca si hay un carrito pre existente al inicio de sesión actual
  useEffect(() => {
    if (userId) {
      const fetchCartItems = async () => {
        try {
          const docRef = doc(db, "users", userId);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setCartItems(docSnap.data().cart || []);
            console.log(
              docSnap.data().cart,
              "Buscando el carrito del usuario (ID):",
              docSnap.id
            );
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };
      fetchCartItems();
    }
  }, [userId]);

  // actualiza carrito del usuario en firebase
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

  // AGREGAR PRODUCTO A CARRITO
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        // si un producto (1 cantidad) ya está en el carrito y se vuelva a clickear el botón ADD TO CART nos fijamos si coincide con el existente p/ sumar la cantidad y si no agrega el nuevo
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      // devuelve array (carrito) con producto completamente nuevo + los anteriormente agregados (prevItems)
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  // calcula subtotal
  const calculateSubtotal = (item) => item.quantity * item.productPrice;

  //calcula total
  const calculateTotal = () =>
    cartItems.reduce((total, item) => total + calculateSubtotal(item), 0);

  // elimina un solo producto del carrito
  const deleteCartItem = (productId) => {
    console.log("se borró producto");
    setCartItems((prevItems) => {
      const updatedCart = prevItems.filter((item) => item.id !== productId);
      return updatedCart;
    });
    // actualiza firebase
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

  const deleteCart = async () => {
    // borra el carrito "visualmente"
    setCartItems([]);

    if (userId) {
      try {
        // borra (actualiza) carrito en firebase
        const docRef = doc(db, "users", userId);
        await updateDoc(docRef, {
          cart: [],
        });
      } catch (error) {
        console.error("Error clearing cart:", error);
      }
    }
  };

  // confirmación de pedidos
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
      console.error("error: ", error);
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

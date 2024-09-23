import React, { useEffect, useState } from "react";
import { db, auth } from "../../../firebase";
import { doc, getDoc } from "firebase/firestore";
import {
  Alert,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Container,
} from "@mui/material";

export const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [userId, setUserId] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  // check firebase authentication
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // looks for users in firebase
  useEffect(() => {
    if (userId) {
      const fetchOrders = async () => {
        try {
          const docRef = doc(db, "users", userId);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const userData = docSnap.data();
            setOrders(userData.orders || []);
          } else {
            setOrders([]);
          }
        } catch {
          setErrorMessage("Error fetching orders");
        }
      };
      fetchOrders();
    }
  }, [userId]);

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          bgcolor: "background.paper",
          p: 3,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h5" gutterBottom>
          Your Orders
        </Typography>
        <List sx={{ width: "100%" }}>
          {orders.length > 0 ? (
            orders.map((order, index) => (
              <Box key={index}>
                <ListItem
                  sx={{ backgroundColor: "#f5f5f5", borderRadius: 1, mb: 1 }}
                >
                  <ListItemText
                    primary={`Order Total: $${order.total.toFixed(2)}`}
                    secondary={`Order Date: ${new Date(
                      order.date
                    ).toLocaleDateString("default", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}`}
                    primaryTypographyProps={{ fontWeight: "bold" }}
                  />
                </ListItem>
                {/* checks products exist so an undefined isn't returned before mapping and rendering array */}
                {order.products &&
                  order.products.map((item, index) => (
                    <ListItem key={index}>
                      <ListItemText
                        primary={`${item.productName} x ${item.quantity}`}
                        secondary={`Price: $${item.productPrice.toFixed(2)}`}
                      />
                    </ListItem>
                  ))}

                <Divider sx={{ my: 2 }} />
              </Box>
            ))
          ) : (
            <Typography variant="body1">No orders found.</Typography>
          )}
        </List>

        {errorMessage && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {errorMessage}
          </Alert>
        )}
      </Box>
    </Container>
  );
};

export default Orders;

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Button,
  Grid,
  Divider,
} from '@mui/material';
import { Visibility } from '@mui/icons-material';
import { orderAPI } from '../services/api';
import { motion } from 'framer-motion';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await orderAPI.getAll({ page: 0, size: 20 });
      setOrders(response.data.content);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      PENDING: 'warning',
      CONFIRMED: 'info',
      PROCESSING: 'info',
      SHIPPED: 'primary',
      DELIVERED: 'success',
      CANCELLED: 'error',
      RETURNED: 'error',
    };
    return colors[status] || 'default';
  };

  if (loading) {
    return <Container><Typography>Loading...</Typography></Container>;
  }

  if (orders.length === 0) {
    return (
      <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          No orders yet
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Start shopping to see your orders here
        </Typography>
        <Button
          component={Link}
          to="/products"
          variant="contained"
          size="large"
        >
          Start Shopping
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      <Typography
        variant="h3"
        sx={{
          fontFamily: '"Playfair Display", serif',
          fontWeight: 700,
          mb: 4,
        }}
      >
        My Orders
      </Typography>

      <Grid container spacing={3}>
        {orders.map((order, index) => (
          <Grid item xs={12} key={order.id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Order #{order.orderNumber}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Placed on {new Date(order.orderDate).toLocaleDateString()}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                      <Chip
                        label={order.status}
                        color={getStatusColor(order.status)}
                        sx={{ fontWeight: 600 }}
                      />
                      <Button
                        component={Link}
                        to={`/orders/${order.id}`}
                        variant="outlined"
                        startIcon={<Visibility />}
                      >
                        View Details
                      </Button>
                    </Box>
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Grid container spacing={2}>
                    {order.orderItems?.slice(0, 3).map((item) => (
                      <Grid item xs={12} sm={4} key={item.id}>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                          <Box
                            sx={{
                              width: 60,
                              height: 60,
                              borderRadius: 1,
                              bgcolor: 'grey.200',
                              flexShrink: 0,
                            }}
                          />
                          <Box>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                              {item.product?.name || 'Product'}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              Qty: {item.quantity}
                            </Typography>
                            <Typography variant="body2" color="primary" sx={{ fontWeight: 600 }}>
                              ${item.price}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>

                  <Divider sx={{ my: 2 }} />

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Payment Method: {order.paymentMethod}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Payment Status: <Chip label={order.paymentStatus} size="small" />
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'right' }}>
                      <Typography variant="body2" color="text.secondary">
                        Total Amount
                      </Typography>
                      <Typography variant="h5" color="primary" sx={{ fontWeight: 700 }}>
                        ${order.totalAmount.toFixed(2)}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default OrdersPage;

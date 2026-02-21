import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  IconButton,
  Divider,
  Grid,
  TextField,
} from '@mui/material';
import { Delete, Add, Remove, ShoppingBag } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { cartAPI } from '../services/api';
import { useCartStore } from '../store/store';

const CartPage = () => {
  const navigate = useNavigate();
  const { cart, setCart, clearCart } = useCartStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await cartAPI.get();
      setCart(response.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateQuantity = async (cartItemId, quantity) => {
    try {
      const response = await cartAPI.update(cartItemId, quantity);
      setCart(response.data);
    } catch (error) {
      toast.error('Failed to update quantity');
    }
  };

  const handleRemoveItem = async (cartItemId) => {
    try {
      await cartAPI.remove(cartItemId);
      await fetchCart();
      toast.success('Item removed from cart');
    } catch (error) {
      toast.error('Failed to remove item');
    }
  };

  const handleClearCart = async () => {
    try {
      await cartAPI.clear();
      clearCart();
      toast.success('Cart cleared');
    } catch (error) {
      toast.error('Failed to clear cart');
    }
  };

  if (loading) {
    return <Container><Typography>Loading...</Typography></Container>;
  }

  if (!cart || cart.items.length === 0) {
    return (
      <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
        <ShoppingBag sx={{ fontSize: 100, color: 'text.secondary', mb: 2 }} />
        <Typography variant="h4" sx={{ mb: 2 }}>
          Your cart is empty
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Looks like you haven't added anything to your cart yet
        </Typography>
        <Button
          component={Link}
          to="/products"
          variant="contained"
          size="large"
          sx={{ px: 4 }}
        >
          Continue Shopping
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
        Shopping Cart
      </Typography>

      <Grid container spacing={4}>
        {/* Cart Items */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              {cart.items.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <Box sx={{ display: 'flex', gap: 3, mb: 3, pb: 3, borderBottom: '1px solid', borderColor: 'divider' }}>
                    <Box
                      component={Link}
                      to={`/products/${item.productId}`}
                      sx={{
                        width: 120,
                        height: 120,
                        borderRadius: 2,
                        overflow: 'hidden',
                        flexShrink: 0,
                      }}
                    >
                      <img
                        src={item.productImage || 'https://via.placeholder.com/120'}
                        alt={item.productName}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </Box>

                    <Box sx={{ flex: 1 }}>
                      <Link
                        to={`/products/${item.productId}`}
                        style={{ textDecoration: 'none', color: 'inherit' }}
                      >
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                          {item.productName}
                        </Typography>
                      </Link>

                      <Typography variant="h6" color="primary" sx={{ fontWeight: 700, mb: 2 }}>
                        ${item.price}
                      </Typography>

                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <IconButton
                          size="small"
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Remove />
                        </IconButton>
                        
                        <TextField
                          type="number"
                          value={item.quantity}
                          size="small"
                          sx={{ width: 60 }}
                          inputProps={{ min: 1, style: { textAlign: 'center' } }}
                          onChange={(e) => {
                            const qty = parseInt(e.target.value) || 1;
                            handleUpdateQuantity(item.id, qty);
                          }}
                        />

                        <IconButton
                          size="small"
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                        >
                          <Add />
                        </IconButton>

                        <IconButton
                          color="error"
                          onClick={() => handleRemoveItem(item.id)}
                          sx={{ ml: 2 }}
                        >
                          <Delete />
                        </IconButton>
                      </Box>
                    </Box>

                    <Box sx={{ textAlign: 'right' }}>
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        ${item.subtotal.toFixed(2)}
                      </Typography>
                    </Box>
                  </Box>
                </motion.div>
              ))}

              <Button
                color="error"
                onClick={handleClearCart}
                sx={{ mt: 2 }}
              >
                Clear Cart
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Order Summary */}
        <Grid item xs={12} md={4}>
          <Card sx={{ position: 'sticky', top: 100 }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
                Order Summary
              </Typography>

              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography>Subtotal ({cart.totalItems} items)</Typography>
                  <Typography sx={{ fontWeight: 600 }}>
                    ${cart.totalAmount.toFixed(2)}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography>Shipping</Typography>
                  <Typography sx={{ fontWeight: 600 }}>$10.00</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography>Tax</Typography>
                  <Typography sx={{ fontWeight: 600 }}>
                    ${(cart.totalAmount * 0.1).toFixed(2)}
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Total
                </Typography>
                <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>
                  ${(cart.totalAmount + 10 + cart.totalAmount * 0.1).toFixed(2)}
                </Typography>
              </Box>

              <Button
                fullWidth
                variant="contained"
                size="large"
                onClick={() => navigate('/checkout')}
                sx={{
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                }}
              >
                Proceed to Checkout
              </Button>

              <Button
                fullWidth
                component={Link}
                to="/products"
                sx={{ mt: 2 }}
              >
                Continue Shopping
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CartPage;

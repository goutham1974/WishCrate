import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Divider,
} from '@mui/material';
import { CreditCard, AccountBalance } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { orderAPI } from '../services/api';
import { useCartStore } from '../store/store';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cart, clearCart } = useCartStore();
  
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    phoneNumber: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    country: '',
    zipCode: '',
  });
  
  const [paymentMethod, setPaymentMethod] = useState('CREDIT_CARD');
  const [loading, setLoading] = useState(false);

  const handleShippingChange = (e) => {
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handlePlaceOrder = async () => {
    if (!shippingInfo.fullName || !shippingInfo.addressLine1 || !shippingInfo.city ||
        !shippingInfo.state || !shippingInfo.country || !shippingInfo.zipCode) {
      toast.error('Please fill in all required shipping fields');
      return;
    }

    setLoading(true);
    try {
      await orderAPI.create(shippingInfo, paymentMethod);
      clearCart();
      toast.success('Order placed successfully!');
      navigate('/orders');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  if (!cart || cart.items.length === 0) {
    return (
      <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Your cart is empty
        </Typography>
        <Button variant="contained" onClick={() => navigate('/products')}>
          Continue Shopping
        </Button>
      </Container>
    );
  }

  const subtotal = cart.totalAmount;
  const tax = subtotal * 0.1;
  const shipping = 10;
  const total = subtotal + tax + shipping;

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
        Checkout
      </Typography>

      <Grid container spacing={4}>
        {/* Checkout Form */}
        <Grid item xs={12} md={8}>
          {/* Shipping Information */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
                Shipping Information
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    name="fullName"
                    value={shippingInfo.fullName}
                    onChange={handleShippingChange}
                    required
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    name="phoneNumber"
                    value={shippingInfo.phoneNumber}
                    onChange={handleShippingChange}
                    required
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Address Line 1"
                    name="addressLine1"
                    value={shippingInfo.addressLine1}
                    onChange={handleShippingChange}
                    required
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Address Line 2"
                    name="addressLine2"
                    value={shippingInfo.addressLine2}
                    onChange={handleShippingChange}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="City"
                    name="city"
                    value={shippingInfo.city}
                    onChange={handleShippingChange}
                    required
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="State/Province"
                    name="state"
                    value={shippingInfo.state}
                    onChange={handleShippingChange}
                    required
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Country"
                    name="country"
                    value={shippingInfo.country}
                    onChange={handleShippingChange}
                    required
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="ZIP/Postal Code"
                    name="zipCode"
                    value={shippingInfo.zipCode}
                    onChange={handleShippingChange}
                    required
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
                Payment Method
              </Typography>

              <FormControl component="fieldset">
                <RadioGroup
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <FormControlLabel
                    value="CREDIT_CARD"
                    control={<Radio />}
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CreditCard />
                        <Typography>Credit/Debit Card</Typography>
                      </Box>
                    }
                  />
                  <FormControlLabel
                    value="PAYPAL"
                    control={<Radio />}
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <AccountBalance />
                        <Typography>PayPal</Typography>
                      </Box>
                    }
                  />
                  <FormControlLabel
                    value="COD"
                    control={<Radio />}
                    label={<Typography>Cash on Delivery</Typography>}
                  />
                </RadioGroup>
              </FormControl>
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

              <Box sx={{ mb: 3 }}>
                {cart.items.map((item) => (
                  <Box
                    key={item.id}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      mb: 2,
                    }}
                  >
                    <Box>
                      <Typography variant="body2">{item.productName}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        Qty: {item.quantity}
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      ${item.subtotal.toFixed(2)}
                    </Typography>
                  </Box>
                ))}
              </Box>

              <Divider sx={{ mb: 2 }} />

              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography>Subtotal</Typography>
                  <Typography sx={{ fontWeight: 600 }}>${subtotal.toFixed(2)}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography>Shipping</Typography>
                  <Typography sx={{ fontWeight: 600 }}>${shipping.toFixed(2)}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography>Tax</Typography>
                  <Typography sx={{ fontWeight: 600 }}>${tax.toFixed(2)}</Typography>
                </Box>
              </Box>

              <Divider sx={{ mb: 2 }} />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Total
                </Typography>
                <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>
                  ${total.toFixed(2)}
                </Typography>
              </Box>

              <Button
                fullWidth
                variant="contained"
                size="large"
                onClick={handlePlaceOrder}
                disabled={loading}
                sx={{
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                }}
              >
                {loading ? 'Placing Order...' : 'Place Order'}
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CheckoutPage;

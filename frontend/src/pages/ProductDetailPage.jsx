import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Box,
  Grid,
  Typography,
  Button,
  Rating,
  Chip,
  Divider,
  TextField,
} from '@mui/material';
import { ShoppingCart, Favorite, Share } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { productAPI, cartAPI } from '../services/api';
import { useCartStore } from '../store/store';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { setCart } = useCartStore();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await productAPI.getById(id);
      setProduct(response.data);
    } catch (error) {
      toast.error('Error loading product');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    try {
      const response = await cartAPI.add(product.id, quantity);
      setCart(response.data);
      toast.success('Added to cart!');
    } catch (error) {
      toast.error('Failed to add to cart');
    }
  };

  if (loading) {
    return <Container><Typography>Loading...</Typography></Container>;
  }

  if (!product) {
    return <Container><Typography>Product not found</Typography></Container>;
  }

  const discount = product.discountPrice
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : 0;

  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      <Grid container spacing={4}>
        {/* Images */}
        <Grid item xs={12} md={6}>
          <Box>
            <motion.img
              key={selectedImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              src={product.images?.[selectedImage] || 'https://via.placeholder.com/600'}
              alt={product.name}
              style={{
                width: '100%',
                height: 500,
                objectFit: 'cover',
                borderRadius: 16,
              }}
            />
            
            {product.images?.length > 1 && (
              <Box sx={{ display: 'flex', gap: 2, mt: 2, flexWrap: 'wrap' }}>
                {product.images.map((image, index) => (
                  <Box
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: 2,
                      overflow: 'hidden',
                      cursor: 'pointer',
                      border: selectedImage === index ? '2px solid' : 'none',
                      borderColor: 'primary.main',
                    }}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        </Grid>

        {/* Product Details */}
        <Grid item xs={12} md={6}>
          <Box>
            {product.brand && (
              <Typography
                variant="overline"
                color="primary"
                sx={{ fontWeight: 600, fontSize: '0.9rem' }}
              >
                {product.brand}
              </Typography>
            )}

            <Typography
              variant="h3"
              sx={{
                fontFamily: '"Playfair Display", serif',
                fontWeight: 700,
                mb: 2,
              }}
            >
              {product.name}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Rating value={product.averageRating || 0} readOnly precision={0.5} />
              <Typography variant="body2" color="text.secondary">
                ({product.totalReviews || 0} reviews)
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Typography variant="h4" color="primary" sx={{ fontWeight: 700 }}>
                ${product.discountPrice || product.price}
              </Typography>
              {product.discountPrice && (
                <>
                  <Typography
                    variant="h5"
                    sx={{
                      textDecoration: 'line-through',
                      color: 'text.secondary',
                    }}
                  >
                    ${product.price}
                  </Typography>
                  <Chip label={`-${discount}%`} color="error" />
                </>
              )}
            </Box>

            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              {product.description}
            </Typography>

            <Divider sx={{ my: 3 }} />

            {/* Stock Status */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Availability:
              </Typography>
              {product.stockQuantity > 0 ? (
                <Chip label={`${product.stockQuantity} in stock`} color="success" />
              ) : (
                <Chip label="Out of stock" color="error" />
              )}
            </Box>

            {/* Quantity Selector */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Quantity:
              </Typography>
              <TextField
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                inputProps={{ min: 1, max: product.stockQuantity }}
                sx={{ width: 100 }}
              />
            </Box>

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
              <Button
                variant="contained"
                size="large"
                startIcon={<ShoppingCart />}
                onClick={handleAddToCart}
                disabled={product.stockQuantity === 0}
                sx={{
                  flex: 1,
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                }}
              >
                Add to Cart
              </Button>
              <Button
                variant="outlined"
                size="large"
                sx={{ minWidth: 60 }}
              >
                <Favorite />
              </Button>
              <Button
                variant="outlined"
                size="large"
                sx={{ minWidth: 60 }}
              >
                <Share />
              </Button>
            </Box>

            {/* Specifications */}
            {product.specifications && Object.keys(product.specifications).length > 0 && (
              <Box sx={{ mt: 4 }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  Specifications
                </Typography>
                {Object.entries(product.specifications).map(([key, value]) => (
                  <Box
                    key={key}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      py: 1,
                      borderBottom: '1px solid',
                      borderColor: 'divider',
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      {key}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {value}
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetailPage;

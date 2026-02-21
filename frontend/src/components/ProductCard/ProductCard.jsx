import React from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  IconButton,
  Rating,
  Chip,
} from '@mui/material';
import { ShoppingCart, Favorite } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { cartAPI } from '../../services/api';
import { useCartStore } from '../../store/store';

const ProductCard = ({ product }) => {
  const { setCart } = useCartStore();

  const handleAddToCart = async () => {
    try {
      const response = await cartAPI.add(product.id, 1);
      setCart(response.data);
      toast.success('Added to cart!');
    } catch (error) {
      toast.error('Failed to add to cart');
    }
  };

  const discount = product.discountPrice
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : 0;

  return (
    <motion.div
      whileHover={{ y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        className="hover-lift"
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'visible',
        }}
      >
        {/* Discount Badge */}
        {discount > 0 && (
          <Chip
            label={`-${discount}%`}
            color="error"
            size="small"
            sx={{
              position: 'absolute',
              top: 10,
              left: 10,
              zIndex: 1,
              fontWeight: 700,
            }}
          />
        )}

        {/* Favorite Icon */}
        <IconButton
          sx={{
            position: 'absolute',
            top: 10,
            right: 10,
            zIndex: 1,
            bgcolor: 'white',
            '&:hover': { bgcolor: 'grey.100' },
          }}
        >
          <Favorite />
        </IconButton>

        {/* Product Image */}
        <Link to={`/products/${product.id}`} style={{ textDecoration: 'none' }}>
          <CardMedia
            component="img"
            height="240"
            image={product.imageUrl || product.images?.[0] || 'https://via.placeholder.com/300'}
            alt={product.name}
            sx={{
              objectFit: 'cover',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
          />
        </Link>

        <CardContent sx={{ flexGrow: 1, p: 2 }}>
          {/* Brand */}
          {product.brand && (
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ textTransform: 'uppercase', fontWeight: 600 }}
            >
              {product.brand}
            </Typography>
          )}

          {/* Product Name */}
          <Link
            to={`/products/${product.id}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                mb: 1,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                '&:hover': { color: 'primary.main' },
              }}
            >
              {product.name}
            </Typography>
          </Link>

          {/* Rating */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Rating value={product.averageRating || 0} readOnly size="small" precision={0.5} />
            <Typography variant="caption" sx={{ ml: 1, color: 'text.secondary' }}>
              ({product.totalReviews || 0})
            </Typography>
          </Box>

          {/* Price */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>
              ${product.discountPrice || product.price}
            </Typography>
            {product.discountPrice && (
              <Typography
                variant="body2"
                sx={{
                  textDecoration: 'line-through',
                  color: 'text.secondary',
                }}
              >
                ${product.price}
              </Typography>
            )}
          </Box>

          {/* Add to Cart Button */}
          <Box
            onClick={handleAddToCart}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
              py: 1,
              px: 2,
              bgcolor: 'primary.main',
              color: 'white',
              borderRadius: 2,
              cursor: 'pointer',
              fontWeight: 600,
              transition: 'all 0.2s',
              '&:hover': {
                bgcolor: 'primary.dark',
                transform: 'scale(1.02)',
              },
            }}
          >
            <ShoppingCart fontSize="small" />
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              Add to Cart
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProductCard;

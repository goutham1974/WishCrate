import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import { ArrowForward, LocalShipping, Security, Support, CardGiftcard } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import ProductCard from '../components/ProductCard/ProductCard';
import { productAPI, categoryAPI } from '../services/api';
import { useProductStore } from '../store/store';

const HomePage = () => {
  const { featuredProducts, setFeaturedProducts } = useProductStore();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFeaturedProducts();
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await categoryAPI.getAll();
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchFeaturedProducts = async () => {
    try {
      const response = await productAPI.getFeatured();
      setFeaturedProducts(response.data);
    } catch (error) {
      console.error('Error fetching featured products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (categoryId) => {
    navigate(`/products?category=${categoryId}`);
  };

  const features = [
    {
      icon: <LocalShipping fontSize="large" />,
      title: 'Free Shipping',
      description: 'On orders over $50',
    },
    {
      icon: <Security fontSize="large" />,
      title: 'Secure Payment',
      description: '100% secure transactions',
    },
    {
      icon: <Support fontSize="large" />,
      title: '24/7 Support',
      description: 'Dedicated customer service',
    },
    {
      icon: <CardGiftcard fontSize="large" />,
      title: 'Gift Cards',
      description: 'Perfect for any occasion',
    },
  ];

  const heroSlides = [
    {
      title: 'Summer Collection 2026',
      subtitle: 'Discover the latest trends',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200',
      cta: 'Shop Now',
    },
    {
      title: 'Electronics Sale',
      subtitle: 'Up to 50% off on gadgets',
      image: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=1200',
      cta: 'Explore Deals',
    },
    {
      title: 'Fashion Forward',
      subtitle: 'New arrivals every week',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200',
      cta: 'View Collection',
    },
  ];

  return (
    <Box>
      {/* Hero Carousel */}
      <Box sx={{ mb: 8 }}>
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{ delay: 5000 }}
          pagination={{ clickable: true }}
          navigation
          loop
          style={{ height: '70vh' }}
        >
          {heroSlides.map((slide, index) => (
            <SwiperSlide key={index}>
              <Box
                sx={{
                  height: '100%',
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${slide.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Container>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <Typography
                      variant="h2"
                      sx={{
                        color: 'white',
                        fontFamily: '"Playfair Display", serif',
                        fontWeight: 800,
                        mb: 2,
                        textAlign: 'center',
                      }}
                    >
                      {slide.title}
                    </Typography>
                    <Typography
                      variant="h5"
                      sx={{
                        color: 'white',
                        mb: 4,
                        textAlign: 'center',
                      }}
                    >
                      {slide.subtitle}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                      <Button
                        component={Link}
                        to="/products"
                        variant="contained"
                        size="large"
                        endIcon={<ArrowForward />}
                        sx={{
                          bgcolor: 'white',
                          color: 'primary.main',
                          px: 4,
                          py: 1.5,
                          fontSize: '1.1rem',
                          fontWeight: 700,
                          '&:hover': {
                            bgcolor: 'grey.100',
                            transform: 'scale(1.05)',
                          },
                        }}
                      >
                        {slide.cta}
                      </Button>
                    </Box>
                  </motion.div>
                </Container>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>

      <Container maxWidth="xl">
        {/* Features Section */}
        <Grid container spacing={3} sx={{ mb: 8 }}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  sx={{
                    height: '100%',
                    textAlign: 'center',
                    p: 3,
                    transition: 'all 0.3s',
                    '&:hover': {
                      transform: 'translateY(-10px)',
                      boxShadow: 6,
                    },
                  }}
                >
                  <Box sx={{ color: 'primary.main', mb: 2 }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Featured Products */}
        <Box sx={{ mb: 8 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Typography
              variant="h3"
              sx={{
                fontFamily: '"Playfair Display", serif',
                fontWeight: 700,
              }}
            >
              Featured Products
            </Typography>
            <Button
              component={Link}
              to="/products"
              endIcon={<ArrowForward />}
              sx={{ fontWeight: 600 }}
            >
              View All
            </Button>
          </Box>

          {loading ? (
            <Typography>Loading...</Typography>
          ) : (
            <Grid container spacing={3}>
              {featuredProducts.slice(0, 8).map((product) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                  <ProductCard product={product} />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>

        {/* Categories Banner */}
        <Box sx={{ mb: 8 }}>
          <Typography
            variant="h3"
            sx={{
              fontFamily: '"Playfair Display", serif',
              fontWeight: 700,
              mb: 4,
              textAlign: 'center',
            }}
          >
            Shop by Category
          </Typography>
          <Grid container spacing={3}>
            {categories.slice(0, 8).map((category, index) => (
              <Grid item xs={12} sm={6} md={3} key={category.id}>
                <Card
                  onClick={() => handleCategoryClick(category.id)}
                  sx={{
                    height: 200,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    background: `linear-gradient(135deg, ${
                      ['#667eea', '#f093fb', '#4facfe', '#43e97b', '#fa709a', '#fee140', '#30cfd0', '#a8edea'][index % 8]
                    } 0%, ${
                      ['#764ba2', '#f5576c', '#00f2fe', '#38f9d7', '#fee140', '#fa709a', '#330867', '#fed6e3'][index % 8]
                    } 100%)`,
                    '&:hover': {
                      transform: 'scale(1.05)',
                      boxShadow: 8,
                    },
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      color: 'white',
                      fontWeight: 700,
                      textAlign: 'center',
                      px: 2,
                    }}
                  >
                    {category.name}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;

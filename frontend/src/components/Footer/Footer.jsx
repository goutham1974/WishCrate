import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  Divider,
} from '@mui/material';
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  Email,
  Phone,
  LocationOn,
} from '@mui/icons-material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#1a1a2e',
        color: 'white',
        py: 6,
        mt: 8,
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          {/* About Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                fontFamily: '"Playfair Display", serif',
                fontWeight: 700,
                mb: 2,
              }}
            >
              WishCrate
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, color: 'grey.400' }}>
              Your premium e-commerce destination for quality products at the best prices.
              Shop with confidence and style.
            </Typography>
            <Box>
              <IconButton color="inherit" aria-label="Facebook">
                <Facebook />
              </IconButton>
              <IconButton color="inherit" aria-label="Twitter">
                <Twitter />
              </IconButton>
              <IconButton color="inherit" aria-label="Instagram">
                <Instagram />
              </IconButton>
              <IconButton color="inherit" aria-label="LinkedIn">
                <LinkedIn />
              </IconButton>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link to="/" style={{ color: '#9ca3af', textDecoration: 'none' }}>
                Home
              </Link>
              <Link to="/products" style={{ color: '#9ca3af', textDecoration: 'none' }}>
                Shop
              </Link>
              <Link to="/about" style={{ color: '#9ca3af', textDecoration: 'none' }}>
                About Us
              </Link>
              <Link to="/contact" style={{ color: '#9ca3af', textDecoration: 'none' }}>
                Contact
              </Link>
            </Box>
          </Grid>

          {/* Customer Service */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
              Customer Service
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link to="/faq" style={{ color: '#9ca3af', textDecoration: 'none' }}>
                FAQ
              </Link>
              <Link to="/shipping" style={{ color: '#9ca3af', textDecoration: 'none' }}>
                Shipping Info
              </Link>
              <Link to="/returns" style={{ color: '#9ca3af', textDecoration: 'none' }}>
                Returns
              </Link>
              <Link to="/privacy" style={{ color: '#9ca3af', textDecoration: 'none' }}>
                Privacy Policy
              </Link>
            </Box>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
              Contact Us
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocationOn sx={{ color: 'primary.main' }} />
                <Typography variant="body2" sx={{ color: 'grey.400' }}>
                  123 Commerce St, NY 10001
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Phone sx={{ color: 'primary.main' }} />
                <Typography variant="body2" sx={{ color: 'grey.400' }}>
                  +1 (555) 123-4567
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Email sx={{ color: 'primary.main' }} />
                <Typography variant="body2" sx={{ color: 'grey.400' }}>
                  support@wishcrate.com
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, bgcolor: 'grey.800' }} />

        <Typography variant="body2" align="center" sx={{ color: 'grey.500' }}>
          © {new Date().getFullYear()} WishCrate. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;

import React from 'react';
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Button,
  Grid,
  Divider,
} from '@mui/material';
import { Edit, ShoppingBag, Favorite, LocationOn } from '@mui/icons-material';
import { useAuthStore } from '../store/store';
import { motion } from 'framer-motion';

const ProfilePage = () => {
  const { user } = useAuthStore();

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
        My Account
      </Typography>

      <Grid container spacing={4}>
        {/* Profile Card */}
        <Grid item xs={12} md={4}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Card>
              <CardContent sx={{ textAlign: 'center', p: 4 }}>
                <Avatar
                  sx={{
                    width: 120,
                    height: 120,
                    margin: '0 auto',
                    mb: 2,
                    bgcolor: 'primary.main',
                    fontSize: '3rem',
                  }}
                >
                  {user?.firstName?.charAt(0)}
                </Avatar>
                
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                  {user?.firstName} {user?.lastName}
                </Typography>
                
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  {user?.email}
                </Typography>

                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<Edit />}
                  sx={{ mb: 2 }}
                >
                  Edit Profile
                </Button>

                <Divider sx={{ my: 3 }} />

                <Box sx={{ textAlign: 'left' }}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Member Since
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {new Date().toLocaleDateString()}
                  </Typography>

                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Phone
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {user?.phoneNumber || 'Not provided'}
                  </Typography>

                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Account Type
                  </Typography>
                  <Typography variant="body1">
                    {user?.role}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Account Actions */}
        <Grid item xs={12} md={8}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card
                  sx={{
                    height: '100%',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: 6,
                    },
                  }}
                >
                  <CardContent sx={{ textAlign: 'center', p: 4 }}>
                    <ShoppingBag sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                    <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                      My Orders
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Track, return, or buy things again
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>

            <Grid item xs={12} sm={6}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card
                  sx={{
                    height: '100%',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: 6,
                    },
                  }}
                >
                  <CardContent sx={{ textAlign: 'center', p: 4 }}>
                    <Favorite sx={{ fontSize: 60, color: 'error.main', mb: 2 }} />
                    <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                      Wishlist
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Your saved items and favorites
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>

            <Grid item xs={12} sm={6}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card
                  sx={{
                    height: '100%',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: 6,
                    },
                  }}
                >
                  <CardContent sx={{ textAlign: 'center', p: 4 }}>
                    <LocationOn sx={{ fontSize: 60, color: 'success.main', mb: 2 }} />
                    <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                      Addresses
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Manage your shipping addresses
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>

            <Grid item xs={12} sm={6}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card
                  sx={{
                    height: '100%',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: 6,
                    },
                  }}
                >
                  <CardContent sx={{ textAlign: 'center', p: 4 }}>
                    <Edit sx={{ fontSize: 60, color: 'warning.main', mb: 2 }} />
                    <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                      Settings
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Account settings and preferences
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProfilePage;

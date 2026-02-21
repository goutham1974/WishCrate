import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  CircularProgress,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Inventory as InventoryIcon,
  ShoppingCart as OrdersIcon,
  People as UsersIcon,
  Category as CategoryIcon,
} from '@mui/icons-material';
import { adminAPI } from '../services/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalCategories: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await adminAPI.getStats();
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching admin stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const menuItems = [
    {
      title: 'Products Management',
      description: 'Add, edit, or remove products',
      icon: <InventoryIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
      link: '/admin/products',
    },
    {
      title: 'Orders Management',
      description: 'View and manage customer orders',
      icon: <OrdersIcon sx={{ fontSize: 48, color: 'success.main' }} />,
      link: '/admin/orders',
    },
    {
      title: 'Users Management',
      description: 'Manage user accounts and roles',
      icon: <UsersIcon sx={{ fontSize: 48, color: 'info.main' }} />,
      link: '/admin/users',
    },
    {
      title: 'Categories',
      description: 'Manage product categories',
      icon: <CategoryIcon sx={{ fontSize: 48, color: 'warning.main' }} />,
      link: '/admin/categories',
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <DashboardIcon sx={{ fontSize: 40, mr: 2, color: 'primary.main' }} />
        <Typography variant="h4" component="h1" fontWeight="bold">
          Admin Dashboard
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {menuItems.map((item) => (
          <Grid item xs={12} sm={6} md={6} key={item.title}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4,
                },
              }}
            >
              <CardContent sx={{ flexGrow: 1, textAlign: 'center', py: 4 }}>
                <Box sx={{ mb: 2 }}>{item.icon}</Box>
                <Typography variant="h5" component="h2" gutterBottom fontWeight="bold">
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  {item.description}
                </Typography>
                <Button
                  component={Link}
                  to={item.link}
                  variant="contained"
                  size="large"
                  fullWidth
                >
                  Manage
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Paper sx={{ mt: 4, p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Quick Stats
        </Typography>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" color="primary.main" fontWeight="bold">
                  {stats.totalProducts}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Products
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" color="success.main" fontWeight="bold">
                  {stats.totalOrders}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Orders
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" color="info.main" fontWeight="bold">
                  {stats.totalUsers}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Users
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" color="warning.main" fontWeight="bold">
                  {stats.totalCategories}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Categories
                </Typography>
              </Box>
            </Grid>
          </Grid>
        )}
      </Paper>
    </Container>
  );
};

export default AdminDashboard;

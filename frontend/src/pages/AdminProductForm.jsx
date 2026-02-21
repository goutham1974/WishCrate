import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Paper,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { Save as SaveIcon, ArrowBack as BackIcon } from '@mui/icons-material';
import { toast } from 'react-toastify';
import api from '../services/api';

const AdminProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    brand: '',
    price: '',
    originalPrice: '',
    categoryId: '',
    stockQuantity: '',
    imageUrl: '',
    additionalImages: '',
    specifications: '',
    colors: '',
    sizes: '',
    featured: false,
    newArrival: false,
    onSale: false,
  });

  useEffect(() => {
    fetchCategories();
    if (isEditMode) {
      fetchProduct();
    }
  }, [id]);

  const fetchCategories = async () => {
    try {
      // This would need a category endpoint, for now using mock data
      setCategories([
        { id: 1, name: 'Electronics' },
        { id: 2, name: 'Fashion' },
        { id: 3, name: 'Home & Living' },
        { id: 4, name: 'Books' },
        { id: 5, name: 'Sports' },
      ]);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/products/${id}`);
      const product = response.data;
      setFormData({
        name: product.name || '',
        description: product.description || '',
        brand: product.brand || '',
        price: product.price || '',
        originalPrice: product.originalPrice || '',
        categoryId: product.category?.id || '',
        stockQuantity: product.stockQuantity || '',
        imageUrl: product.imageUrl || '',
        additionalImages: product.additionalImages?.join(', ') || '',
        specifications: product.specifications || '',
        colors: product.colors?.join(', ') || '',
        sizes: product.sizes?.join(', ') || '',
        featured: product.featured || false,
        newArrival: product.newArrival || false,
        onSale: product.onSale || false,
      });
    } catch (error) {
      console.error('Error fetching product:', error);
      toast.error('Failed to load product');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.price || !formData.categoryId) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);
      
      // Prepare data for API
      const productData = {
        name: formData.name,
        description: formData.description,
        brand: formData.brand,
        price: parseFloat(formData.price),
        originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : null,
        categoryId: parseInt(formData.categoryId),
        stockQuantity: parseInt(formData.stockQuantity) || 0,
        imageUrl: formData.imageUrl,
        additionalImages: formData.additionalImages ? formData.additionalImages.split(',').map(s => s.trim()) : [],
        specifications: formData.specifications,
        colors: formData.colors ? formData.colors.split(',').map(s => s.trim()) : [],
        sizes: formData.sizes ? formData.sizes.split(',').map(s => s.trim()) : [],
        featured: formData.featured,
        newArrival: formData.newArrival,
        onSale: formData.onSale,
      };

      if (isEditMode) {
        await api.put(`/products/${id}`, productData);
        toast.success('Product updated successfully');
      } else {
        await api.post('/products', productData);
        toast.success('Product created successfully');
      }
      
      navigate('/admin/products');
    } catch (error) {
      console.error('Error saving product:', error);
      toast.error(error.response?.data?.message || 'Failed to save product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Button
          startIcon={<BackIcon />}
          onClick={() => navigate('/admin/products')}
          sx={{ mr: 2 }}
        >
          Back
        </Button>
        <Typography variant="h4" component="h1" fontWeight="bold">
          {isEditMode ? 'Edit Product' : 'Add New Product'}
        </Typography>
      </Box>

      <Paper sx={{ p: 4 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Basic Information */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom sx={{ borderBottom: 1, borderColor: 'divider', pb: 1 }}>
                Basic Information
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Product Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                required
                label="Brand"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Category</InputLabel>
                <Select
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleChange}
                  label="Category"
                >
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </Grid>

            {/* Pricing & Stock */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom sx={{ borderBottom: 1, borderColor: 'divider', pb: 1, mt: 2 }}>
                Pricing & Stock
              </Typography>
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                required
                type="number"
                label="Price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                inputProps={{ step: '0.01', min: '0' }}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                type="number"
                label="Original Price"
                name="originalPrice"
                value={formData.originalPrice}
                onChange={handleChange}
                inputProps={{ step: '0.01', min: '0' }}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                required
                type="number"
                label="Stock Quantity"
                name="stockQuantity"
                value={formData.stockQuantity}
                onChange={handleChange}
                inputProps={{ min: '0' }}
              />
            </Grid>

            {/* Images */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom sx={{ borderBottom: 1, borderColor: 'divider', pb: 1, mt: 2 }}>
                Images
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Main Image URL"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                helperText="Enter the main product image URL"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Additional Images"
                name="additionalImages"
                value={formData.additionalImages}
                onChange={handleChange}
                helperText="Enter multiple image URLs separated by commas"
              />
            </Grid>

            {/* Variants */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom sx={{ borderBottom: 1, borderColor: 'divider', pb: 1, mt: 2 }}>
                Variants & Specifications
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Colors"
                name="colors"
                value={formData.colors}
                onChange={handleChange}
                helperText="Enter colors separated by commas (e.g., Red, Blue, Black)"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Sizes"
                name="sizes"
                value={formData.sizes}
                onChange={handleChange}
                helperText="Enter sizes separated by commas (e.g., S, M, L, XL)"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Specifications"
                name="specifications"
                value={formData.specifications}
                onChange={handleChange}
                helperText="Enter product specifications"
              />
            </Grid>

            {/* Flags */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom sx={{ borderBottom: 1, borderColor: 'divider', pb: 1, mt: 2 }}>
                Product Flags
              </Typography>
            </Grid>

            <Grid item xs={12} sm={4}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="featured"
                    checked={formData.featured}
                    onChange={handleChange}
                  />
                }
                label="Featured Product"
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="newArrival"
                    checked={formData.newArrival}
                    onChange={handleChange}
                  />
                }
                label="New Arrival"
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="onSale"
                    checked={formData.onSale}
                    onChange={handleChange}
                  />
                }
                label="On Sale"
              />
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate('/admin/products')}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  startIcon={<SaveIcon />}
                  disabled={loading}
                >
                  {loading ? 'Saving...' : isEditMode ? 'Update Product' : 'Create Product'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default AdminProductForm;

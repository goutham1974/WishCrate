import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Container,
  Box,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination,
  Chip,
} from '@mui/material';
import ProductCard from '../components/ProductCard/ProductCard';
import { productAPI, categoryAPI } from '../services/api';

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [sortBy, setSortBy] = useState('id');
  const [sortDir, setSortDir] = useState('DESC');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    fetchCategories();
    // Get category from URL query parameter
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [page, sortBy, sortDir, searchParams, selectedCategory]);

  const fetchCategories = async () => {
    try {
      const response = await categoryAPI.getAll();
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const searchQuery = searchParams.get('search');
      const params = {
        page,
        size: 12,
        sortBy,
        sortDir,
      };

      let response;
      if (searchQuery) {
        response = await productAPI.search(searchQuery, params);
      } else if (selectedCategory) {
        response = await productAPI.getByCategory(selectedCategory, params);
      } else {
        response = await productAPI.getAll(params);
      }

      setProducts(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setPage(0); // Reset to first page when category changes
  };

  const clearCategory = () => {
    setSelectedCategory('');
    setPage(0);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h3"
          sx={{
            fontFamily: '"Playfair Display", serif',
            fontWeight: 700,
            mb: 3,
          }}
        >
          All Products
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Category</InputLabel>
            <Select
              value={selectedCategory}
              label="Category"
              onChange={(e) => handleCategoryChange(e.target.value)}
            >
              <MenuItem value="">
                <em>All Categories</em>
              </MenuItem>
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Sort By</InputLabel>
            <Select
              value={sortBy}
              label="Sort By"
              onChange={(e) => setSortBy(e.target.value)}
            >
              <MenuItem value="id">Latest</MenuItem>
              <MenuItem value="price">Price</MenuItem>
              <MenuItem value="name">Name</MenuItem>
              <MenuItem value="averageRating">Rating</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Order</InputLabel>
            <Select
              value={sortDir}
              label="Order"
              onChange={(e) => setSortDir(e.target.value)}
            >
              <MenuItem value="ASC">Ascending</MenuItem>
              <MenuItem value="DESC">Descending</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {selectedCategory && (
          <Box sx={{ mt: 2 }}>
            <Chip
              label={`Filtered by: ${categories.find(c => c.id === selectedCategory)?.name || 'Category'}`}
              onDelete={clearCategory}
              color="primary"
              sx={{ mr: 1 }}
            />
          </Box>
        )}
      </Box>

      {loading ? (
        <Typography>Loading...</Typography>
      ) : products.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h5" color="text.secondary">
            No products found
          </Typography>
        </Box>
      ) : (
        <>
          <Grid container spacing={3}>
            {products.map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>

          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
              <Pagination
                count={totalPages}
                page={page + 1}
                onChange={handlePageChange}
                color="primary"
                size="large"
              />
            </Box>
          )}
        </>
      )}
    </Container>
  );
};

export default ProductsPage;

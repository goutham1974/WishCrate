# WishCrate - Full Stack E-Commerce Platform

![WishCrate](https://img.shields.io/badge/WishCrate-E--Commerce-blue)
![Java](https://img.shields.io/badge/Java-21-orange)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2.2-green)
![React](https://img.shields.io/badge/React-18.2-blue)
![MySQL](https://img.shields.io/badge/MySQL-8.0-blue)
![Maven](https://img.shields.io/badge/Maven-3.9.5-red)

A modern, feature-rich e-commerce platform built with Java Spring Boot backend and React frontend, offering Amazon-like shopping experience with stunning UI. Fully functional with 32 pre-loaded products across 8 categories, category filtering, and admin dashboard with real-time statistics.

## 🚀 Features

### Customer Features
- **User Authentication & Authorization** - Secure JWT-based authentication
- **Product Catalog** - Browse 32+ pre-loaded products with advanced search and filters
- **Category Filtering** - Filter products by 8 categories (Electronics, Clothing, Home & Kitchen, Books, Sports & Fitness, Beauty Care, Toys & Games, Automotive)
- **Shopping Cart** - Add, update, and manage cart items
- **Wishlist** - Save favorite products for later
- **Order Management** - Place orders, track status, and view history
- **Product Reviews & Ratings** - Rate products and read reviews
- **Multiple Payment Options** - Credit card, PayPal, Cash on Delivery
- **Address Management** - Save multiple shipping addresses
- **Responsive Design** - Beautiful UI that works on all devices

### Admin Features
- **Admin Dashboard** - Real-time statistics displaying:
  - Total Products Count
  - Total Orders Count
  - Total Users Count
  - Total Categories Count
- **Product Management** - Create, update, and manage products
- **Category Management** - Organize products into categories
- **Order Management** - View and update order statuses
- **User Management** - Manage customer accounts

### Seller Features
- **Seller Dashboard** - Manage your own products
- **Inventory Management** - Track stock levels
- **Sales Analytics** - View your sales performance

## 🛠️ Technology Stack

### Backend
- **Java 21** - Programming language
- **Spring Boot 3.2.2** - Framework
- **Spring Security** - Authentication & Authorization with JWT
- **Spring Data JPA** - Database ORM with Hibernate
- **MySQL 8.0** - Primary database
- **JWT** - Token-based authentication
- **Maven 3.9.5** - Build tool
- **Apache Commons** - Utilities library

### Frontend
- **React 18.2** - UI library
- **Material-UI (MUI)** - Component library
- **Framer Motion** - Animations
- **Zustand** - State management
- **Axios** - HTTP client
- **React Router** - Navigation
- **Vite** - Build tool

## 📋 Prerequisites

- Java JDK 21 or higher
- Node.js 16+ and npm
- MySQL 8.0+
- Maven 3.9.5 (already installed at D:\maven)

## 🔧 Installation & Setup

### Database Configuration

The database is automatically created and populated when the backend starts for the first time.

Update database credentials in `backend/src/main/resources/application.yml`:

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/wishcrate_db?allowPublicKeyRetrieval=true&serverTimezone=UTC
    username: root
    password: root
```

### Backend Setup using Maven

Navigate to backend directory:

```bash
cd backend
```

Build and run with Maven:

```bash
# Using Maven directly (installed at D:\maven)
D:\maven\bin\mvn.cmd clean install -DskipTests

# Start the server
java -jar target/wishcrate-backend-1.0.0.jar
```

The backend will start on `http://localhost:8080`

**Note:** All database tables are created automatically by Hibernate on first startup.

### Frontend Setup

Navigate to frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will start on `http://localhost:3000`

## 🔐 Default Admin Credentials

An admin user is automatically created in the database with the following credentials:

```
Email: admin@wishcrate.com
Password: Admin@123
Role: ADMIN
```

Use these credentials to log in to the admin dashboard at `http://localhost:3000/admin`

## ⚙️ Configuration

### JWT Secret (Optional)
Update the JWT secret in `backend/src/main/resources/application.yml`:
```yaml
app:
  security:
    jwt:
      secret: YourSecretKeyHere
      expiration: 86400000 # 24 hours
```

### CORS Configuration
Frontend URL is configured to access backend at:
- `http://localhost:8080` (Backend)
- `http://localhost:3000` (Frontend)

## 📁 Project Structure

```
Ecommerce/
├── backend/                           # Java Spring Boot Backend
│   ├── src/main/java/com/wishcrate/
│   │   ├── controller/               # REST API Controllers
│   │   │   ├── AuthController        # Authentication endpoints
│   │   │   ├── ProductController     # Product management
│   │   │   ├── CategoryController    # Category management
│   │   │   ├── CartController        # Shopping cart
│   │   │   ├── OrderController       # Order management
│   │   │   └── AdminController       # Admin statistics
│   │   ├── model/                    # JPA Entities
│   │   │   ├── User
│   │   │   ├── Product
│   │   │   ├── Category
│   │   │   ├── Cart
│   │   │   ├── Order
│   │   │   └── Review
│   │   ├── repository/               # Spring Data JPA Repositories
│   │   ├── service/                  # Business Logic
│   │   │   ├── ProductService
│   │   │   ├── CategoryService
│   │   │   ├── AdminService
│   │   │   └── ...
│   │   ├── dto/                      # Data Transfer Objects
│   │   ├── security/                 # Security Configuration
│   │   │   ├── JwtTokenProvider
│   │   │   ├── JwtAuthenticationFilter
│   │   │   └── SecurityConfig
│   │   └── WishCrateApplication      # Main Application Class
│   ├── src/main/resources/
│   │   └── application.yml           # Application Configuration
│   ├── pom.xml                       # Maven Dependencies
│   └── target/                       # Build Output
│
└── frontend/                          # React + Vite Frontend
    ├── src/
    │   ├── components/               # Reusable Components
    │   │   ├── Navbar
    │   │   ├── ProductCard
    │   │   ├── AdminRoute
    │   │   └── ...
    │   ├── pages/                    # Page Components
    │   │   ├── HomePage
    │   │   ├── ProductsPage
    │   │   ├── AdminDashboard
    │   │   ├── AdminProducts
    │   │   └── ...
    │   ├── services/
    │   │   └── api.js               # API Integration
    │   │       ├── authAPI
    │   │       ├── productAPI
    │   │       ├── categoryAPI
    │   │       ├── cartAPI
    │   │       ├── orderAPI
    │   │       └── adminAPI
    │   ├── store/                    # Zustand State Management
    │   ├── App.jsx
    │   └── main.jsx
    ├── package.json
    └── vite.config.js
```

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Products (32 Pre-loaded Products)
- `GET /api/products` - Get all products (paginated)
- `GET /api/products/{id}` - Get product by ID
- `GET /api/products/search` - Search products
- `GET /api/products/category/{categoryId}` - Get products by category
- `GET /api/products/featured` - Get featured products
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/{id}` - Update product (Admin)
- `DELETE /api/products/{id}` - Delete product (Admin)

### Categories (8 Pre-configured Categories)
- `GET /api/categories` - Get all categories
- `GET /api/categories/{id}` - Get category by ID
- `POST /api/categories` - Create category (Admin)
- `PUT /api/categories/{id}` - Update category (Admin)
- `DELETE /api/categories/{id}` - Delete category (Admin)

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update/{cartItemId}` - Update cart item
- `DELETE /api/cart/remove/{cartItemId}` - Remove item from cart
- `DELETE /api/cart/clear` - Clear cart

### Orders
- `POST /api/orders/create` - Create new order
- `GET /api/orders` - Get user's orders
- `GET /api/orders/{orderId}` - Get order details
- `PUT /api/orders/{orderId}/cancel` - Cancel order
- `PUT /api/orders/{orderId}/status` - Update order status (Admin)

### Admin
- `GET /api/admin/stats` - Get admin dashboard statistics (Total Products, Orders, Users, Categories)

## 🎨 UI Features

- **Modern Design** - Clean, professional interface with Material-UI components
- **Smooth Animations** - Framer Motion animations throughout the app
- **Responsive Layout** - Fully responsive design that works on desktop, tablet, and mobile
- **Category Filtering** - Filter products by 8 categories with visual feedback
- **Dynamic Homepage** - Displays real categories as clickable cards with gradients
- **Product Search** - Advanced search with keyword filtering
- **Admin Dashboard** - Real-time statistics visualization
- **Image Galleries** - Product image displays
- **Toast Notifications** - User feedback for actions
- **Loading States** - Skeleton screens and spinners
- **Form Validation** - Client and server-side validation

## � Documentation & Resources

- **Setup Complete Guide:** See `SETUP-COMPLETE.md` for detailed setup instructions
- **Products Database:** See `PRODUCTS-ADDED.md` for list of pre-loaded products

## 🤝 Support & Troubleshooting

### Backend Won't Start
- Check MySQL is running: `mysql -u root -p`
- Verify Maven is installed at `D:\maven`
- Check port 8080 is available
- View logs in terminal for detailed error messages

### Frontend Won't Load
- Ensure backend is running on `http://localhost:8080`
- Check `src/services/api.js` has correct API URL
- Clear browser cache and refresh
- Run `npm install` again to ensure all dependencies are installed

### Database Connection Issues
- Default MySQL credentials: `root` / `root`
- Update in `backend/src/main/resources/application.yml` if different
- Ensure `allowPublicKeyRetrieval=true` in connection string

### Port Already in Use
- Backend (8080): Run `netstat -ano | findstr :8080` to find and kill the process
- Frontend (3000): Run `netstat -ano | findstr :3000` to find and kill the process

## 📄 License

This project is licensed under the MIT License.

## 👥 Authors & Contributors

- **WishCrate Team** - Full Stack Development

## 🙏 Acknowledgments

- Spring Boot and Spring Framework teams
- React and Vite development teams
- Material-UI for beautiful components
- MySQL community
- All open-source contributors

## 📧 Contact & Support

For questions, issues, or feature requests, please contact:
- **Email:** support@wishcrate.com
- **GitHub Issues:** Open an issue in the repository

---

<div align="center">

**Made with ❤️ by WishCrate Team**

*A modern e-commerce platform showcasing full-stack development with Java, Spring Boot, React, and MySQL*

</div>

## 🚀 Deployment

### Backend Deployment
1. Build the JAR file with Maven:
```bash
D:\maven\bin\mvn.cmd clean install -DskipTests
```

2. Run the JAR:
```bash
java -jar target/wishcrate-backend-1.0.0.jar
```

3. The application will automatically:
   - Create the MySQL database if it doesn't exist
   - Create all necessary tables via Hibernate
   - Populate with 32 sample products across 8 categories

### Frontend Deployment
1. Build for production:
```bash
npm run build
```

2. Deploy the `dist` folder to your hosting service (Vercel, Netlify, GitHub Pages, etc.)

## 📦 Database Content

The platform comes pre-loaded with:

**8 Product Categories:**
- Electronics
- Clothing
- Home & Kitchen
- Books
- Sports & Fitness
- Beauty Care
- Toys & Games
- Automotive

**32 Sample Products:** 4 products per category, each with:
- Product name, description, and pricing
- High-quality images
- Stock information
- Category assignment

## 📝 Environment Variables

### Backend (application.yml)
```yaml
# Database Configuration
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/wishcrate_db?allowPublicKeyRetrieval=true&serverTimezone=UTC
    username: root
    password: root

# Server Port
  port: 8080

# JPA/Hibernate Configuration
  jpa:
    hibernate:
      ddl-auto: update
    properties:
      hibernate:
        dialect: org.hibernate.dialect.MySQLDialect
        format_sql: true
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:8080/api
```

## 🎯 Quick Start Guide

1. **Start Backend:**
   ```bash
   cd backend
   D:\maven\bin\mvn.cmd clean install -DskipTests
   java -jar target/wishcrate-backend-1.0.0.jar
   ```
   Backend runs at `http://localhost:8080`

2. **Start Frontend:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   Frontend runs at `http://localhost:3000`

3. **Access the Platform:**
   - Homepage: `http://localhost:3000`
   - Admin Dashboard: `http://localhost:3000/admin`
   - Admin Email: `admin@wishcrate.com`
   - Admin Password: `Admin@123`

4. **Browse Products:**
   - Click on category cards to filter by category
   - Use the search bar to find specific products
   - Add products to cart and checkout

5. **Manage from Admin Panel:**
   - View real-time statistics
   - Add/edit/delete products
   - View and manage orders
   - Manage categories

## 🔒 Security Features

- **JWT Authentication** - Secure token-based authentication with 24-hour expiration
- **Password Encryption** - BCrypt hashing for all passwords
- **Role-Based Access Control** - USER, SELLER, and ADMIN roles with specific permissions
- **CORS Protection** - Cross-Origin Resource Sharing configured
- **SQL Injection Prevention** - Parameterized queries via Spring Data JPA
- **XSS Protection** - Input validation and output encoding
- **Secure Password Storage** - No plain text passwords in database

## 🎯 Future Enhancements

- [ ] Real-time chat support with customers
- [ ] AI-powered product recommendations
- [ ] Social media integration (Facebook, Google login)
- [ ] Multi-language support (i18n)
- [ ] Mobile app (React Native)
- [ ] Advanced analytics and reporting dashboard
- [ ] Subscription-based products
- [ ] Loyalty rewards and points system
- [ ] Email notification system
- [ ] SMS notifications

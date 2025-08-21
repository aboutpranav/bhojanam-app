# 🍽️ Bhojanam - Food Delivery App

A full-stack MERN (MongoDB, Express.js, React, Node.js) food delivery application that allows users to browse food items, manage cart and wishlist, place orders, and manage their profile.

## 🚀 Live Demo

**🌐 [Live Application](https://bhojanam-app.vercel.app/)** | **🔗 [Backend API](https://bhojanam-app-backend.vercel.app/)**

## 📱 Features

### 🏠 Core Functionality

- **Home Page** - Featured food categories and promotional sections
- **Product Listing** - Browse food items with filtering and sorting options
  - Filter by category and rating
  - Sort by price
- **Product Details** - Detailed view of food items with add to cart/wishlist options
- **Search** - Find food items using keywords from the navbar

### 🛒 Shopping Experience

- **Cart Management** - Add, remove, and update quantities of food items
- **Wishlist** - Save favorite items for later
- **Order Management** - Place orders with address selection
- **Order Confirmation** - Final order review with confetti celebration effect

### 👤 User Management

- **User Profile** - Manage personal information
- **Address Management** - Add, edit, and delete delivery addresses
- **Order History** - View all previous orders

### 🎨 User Experience

- **Responsive Design** - Works on desktop and mobile devices
- **Toast Notifications** - Real-time feedback for user actions
- **Intuitive Navigation** - Easy-to-use navbar and footer
- **Interactive UI** - Smooth user experience with modern design

## 🛠️ Tech Stack

### Frontend

- **React.js** - UI library
- **JavaScript (ES6+)** - Programming language
- **HTML5 & CSS3** - Markup and styling
- **Vite** - Build tool and development server

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling

### Deployment

- **Vercel** - Cloud platform for frontend
- **Vercel** - Serverless functions for backend API

## 🏗️ Project Structure

```
bhojanam-app/                     # Main repository (Frontend)
├── src/                          # Frontend source code
│   ├── assets/                   # Images and static files
│   ├── components/               # Reusable React components
│   ├── context/                  # React context for state management
│   │   └── StoreContext.jsx      # Main store context
│   ├── pages/                    # Page components
│   ├── App.jsx                   # Main App component
│   ├── main.jsx                  # Entry point
│   ├── index.css                 # Global styles
│   └── useFetch.jsx              # Custom hook for API calls
├── public/                       # Static files
├── package.json                  # Frontend dependencies
├── vite.config.js               # Vite configuration
└── README.md                    # Project documentation

bhojanam-app-backend/            # Backend repository (Deployed separately)
├── db/                          # Database configuration
├── models/                      # MongoDB data models
├── .env                         # Environment variables
├── index.js                     # Backend entry point
├── package.json                 # Backend dependencies
├── fooditems.json              # Food items data
└── vercel.json                 # Vercel deployment config
```

## 📋 Data Models

The application includes the following data models:

- **Food Items** - Product catalog with details, pricing, and categories
- **Cart** - User shopping cart management
- **Wishlist** - Saved items for later purchase
- **Orders** - Order history and current orders
- **Addresses** - User delivery addresses

## 🚀 Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

### 1. Clone the Repositories

```bash
# Clone the frontend repository
git clone https://github.com/aboutpranav/bhojanam-app.git
cd bhojanam-app

# Clone the backend repository
git clone https://github.com/aboutpranav/bhojanam-app-backend.git
```

### 2. Frontend Setup

```bash
# Install frontend dependencies
npm install

# Start the frontend development server
npm run dev
```

### 3. Backend Setup

```bash
# Navigate to backend directory
cd ../bhojanam-app-backend

# Install backend dependencies
npm install

# Create .env file with your configuration
# Add your MongoDB connection string and other environment variables

# Start the backend server
npm start
```

### 4. Environment Variables

Create a `.env` file in the `bhojanam-app-backend` repository:

```env
MONGODB_URI=your_mongodb_connection_string
PORT=5000
NODE_ENV=development
# Add other necessary environment variables
```

### 5. Access the Application

- Frontend: `http://localhost:5173` (Vite default port)
- Backend API: `http://localhost:5000`

## 🌐 API Endpoints

### Food Items

- `GET /api/food` - Get all food items
- `GET /api/food/:id` - Get specific food item
- `POST /api/food` - Add new food item
- `PUT /api/food/:id` - Update food item
- `DELETE /api/food/:id` - Delete food item

### Cart Management

- `GET /api/cart` - Get user cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:id` - Update cart item quantity
- `DELETE /api/cart/:id` - Remove item from cart

### Wishlist Management

- `GET /api/wishlist` - Get user wishlist
- `POST /api/wishlist` - Add item to wishlist
- `DELETE /api/wishlist/:id` - Remove item from wishlist

### Orders

- `GET /api/orders` - Get user orders
- `POST /api/orders` - Place new order
- `GET /api/orders/:id` - Get specific order

### Addresses

- `GET /api/addresses` - Get user addresses
- `POST /api/addresses` - Add new address
- `PUT /api/addresses/:id` - Update address
- `DELETE /api/addresses/:id` - Delete address

## 🎯 Key Features Implemented

✅ **Frontend Features:**

- Home page with featured categories
- Product listing with filters and sorting
- Product details page
- Cart and wishlist functionality
- Order management system
- User profile with address management
- Search functionality
- Responsive navigation and footer
- Toast notifications

✅ **Backend Features:**

- RESTful API design
- CRUD operations for all entities
- Data validation and error handling
- Database models and relationships
- Deployment-ready configuration

## 🚀 Deployment

The application is deployed on Vercel with separate deployments for frontend and backend:

### Frontend Deployment

- **Repository**: `aboutpranav/bhojanam-app`
- **Live URL**: https://bhojanam-app.vercel.app/
- Automatic deployments from the main branch
- Environment variables configured in Vercel dashboard

### Backend Deployment

- **Repository**: `aboutpranav/bhojanam-app-backend`
- **API URL**: https://bhojanam-app-backend.vercel.app/
- Serverless functions on Vercel
- MongoDB Atlas for database hosting
- Environment variables securely stored

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Pranav** - [@aboutpranav](https://github.com/aboutpranav)

## 🙏 Acknowledgments

- Inspiration from modern food delivery applications
- Vercel for seamless deployment experience

## 📞 Support

If you have any questions or run into issues, please create an issue on GitHub or reach out through the repository.

---

⭐ If you found this project helpful, please consider giving it a star on GitHub!

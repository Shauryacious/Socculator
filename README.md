# Socculator 1.0 ⚽

**Predict. Improve. Play.**

Socculator is an advanced AI-powered football player evaluation and goal prediction platform that leverages machine learning models to analyze player performance and predict goal-scoring potential in football matches.

## 🚀 Features

- **AI-Powered Predictions**: Multiple machine learning models (XGBoost, SVR, Linear Regression, KNN) for accurate goal predictions
- **Player Evaluation**: Comprehensive player statistics and performance analysis
- **Interactive Web Interface**: Modern, responsive UI built with Next.js and Tailwind CSS
- **User Authentication**: Secure login/signup system with JWT tokens
- **Real-time Analysis**: SHAP explanations for model predictions
- **Team Management**: Support for 200+ international football teams
- **Performance Reports**: Detailed player performance reports with visualizations

## 🏗️ Architecture

### Frontend (Client)
- **Framework**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS with custom components
- **UI Components**: NextUI, Framer Motion for animations
- **State Management**: React hooks and cookies for authentication
- **Charts**: Chart.js and Recharts for data visualization

### Backend (Server)
- **Runtime**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT-based authentication with bcrypt password hashing
- **ML Integration**: Python scripts for machine learning predictions
- **API**: RESTful API endpoints for predictions and user management

### Machine Learning
- **Models**: XGBoost, Support Vector Regression, Linear Regression, K-Nearest Neighbors
- **Data Processing**: Pandas for data manipulation
- **Feature Engineering**: Label encoding for categorical variables
- **Explainability**: SHAP values for model interpretability
- **Prediction Pipeline**: Automated model selection and prediction generation

## 📁 Project Structure

```
Socculator/
├── client/                    # Next.js frontend application
│   ├── src/
│   │   ├── app/              # App router pages
│   │   │   ├── (tabs)/       # Tab-based navigation
│   │   │   ├── form/         # Player prediction form
│   │   │   ├── login/        # Authentication pages
│   │   │   └── signup/
│   │   ├── components/       # Reusable UI components
│   │   │   ├── ui/           # Custom UI components
│   │   │   └── ...
│   │   ├── constants/        # Application constants
│   │   └── utils/           # Utility functions
│   ├── public/              # Static assets
│   └── package.json
├── server/                   # Node.js backend application
│   ├── routes/              # API route handlers
│   ├── middleware/          # Custom middleware
│   ├── modles/              # Database models
│   ├── Python/              # Machine learning scripts
│   ├── *.joblib             # Trained ML models
│   └── goalscorers_with_winner.csv  # Training data
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- Python (v3.8 or higher)
- MongoDB
- npm or yarn

### Frontend Setup
```bash
cd client
npm install
npm run dev
```

### Backend Setup
```bash
cd server
npm install
npm start
```

### Python Dependencies
```bash
pip install pandas scikit-learn joblib shap numpy
```

## 🎯 Key Features Explained

### 1. Player Prediction System
- **Input**: Player name, team, opponent team, match outcome
- **Output**: Predicted goals with detailed explanations
- **Models**: Multiple ML algorithms for robust predictions
- **Explainability**: SHAP values provide insights into prediction factors

### 2. Authentication System
- **Security**: JWT tokens with bcrypt password hashing
- **User Management**: Registration, login, and profile management
- **Protected Routes**: Authentication-required pages and API endpoints

### 3. Data Visualization
- **Charts**: Interactive charts for player performance
- **Reports**: Comprehensive player statistics and trends
- **UI/UX**: Modern, responsive design with smooth animations

### 4. Machine Learning Pipeline
- **Data Processing**: CSV data with player statistics and match outcomes
- **Feature Engineering**: Team and player encoding for ML models
- **Model Training**: Multiple algorithms for comparison and selection
- **Prediction API**: RESTful endpoints for real-time predictions

## 🔧 API Endpoints

### Authentication
- `POST /auth/` - User registration
- `POST /auth/login` - User login
- `POST /auth/fetchuser` - Get user details

### Predictions
- `POST /auth/submit` - Submit prediction request
- `POST /auth/getreport` - Get player performance report

## 📊 Machine Learning Models

### Available Models
1. **XGBoost**: Gradient boosting for complex pattern recognition
2. **Support Vector Regression (SVR)**: Non-linear regression with RBF kernel
3. **Linear Regression**: Simple linear relationship modeling
4. **K-Nearest Neighbors (KNN)**: Instance-based learning

### Model Features
- **Player Encoding**: Numerical representation of player names
- **Team Encoding**: Numerical representation of team names
- **Match Context**: Home/away team and match outcome
- **Performance Metrics**: Historical goal-scoring data

## 🎨 UI Components

### Custom Components
- **BackgroundBeams**: Animated background effects
- **MovingBorder**: Interactive border animations
- **AnimatedTooltip**: Hover tooltips with animations
- **NavbarMenu**: Responsive navigation menu
- **WavyBackground**: Dynamic wave animations

### Pages
- **Home**: Landing page with hero section
- **Form**: Player prediction interface
- **Login/Signup**: Authentication pages
- **Player Details**: Performance analysis and reports

## 🚀 Getting Started

1. **Clone the repository**
2. **Set up the database**: Configure MongoDB connection
3. **Install dependencies**: Run `npm install` in both client and server directories
4. **Start the development servers**:
   - Frontend: `npm run dev` (runs on port 3000)
   - Backend: `npm start` (runs on port 3002)
5. **Access the application**: Open `http://localhost:3000`

## 🔒 Security Features

- **Password Hashing**: bcrypt with salt rounds
- **JWT Authentication**: Secure token-based authentication
- **Input Validation**: Express-validator for request validation
- **CORS Configuration**: Cross-origin resource sharing setup
- **Environment Variables**: Secure configuration management

## 📈 Performance Optimizations

- **Model Caching**: Pre-trained models loaded once
- **Efficient Data Processing**: Pandas for fast data manipulation
- **Client-side Routing**: Next.js App Router for optimal performance
- **Component Optimization**: React best practices for rendering

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🏆 Acknowledgments

- **Data Source**: Football match data and player statistics
- **ML Libraries**: scikit-learn, XGBoost, SHAP
- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Node.js, Express.js, MongoDB

---

**Socculator 1.0** - Where AI meets Football ⚽🤖

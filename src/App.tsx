import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from '@store/store'
import { ROUTES } from '@constants/routes'

// Layout components
import Header from '@components/layout/Header'
import ProtectedRoute from '@components/common/ProtectedRoute'

// Auth pages
import LoginPage from '@pages/auth/LoginPage'

// Buyer pages
import ProductsPage from '@pages/buyer/ProductsPage'
import DashboardPage from '@pages/dashboard/DashboardPage'

// Error pages
import NotFoundPage from '@pages/common/NotFoundPage'

// Styles
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import '@styles/responsive-mobile.css'

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="App min-vh-100 bg-light">
          <Routes>
            {/* Rutas públicas */}
            <Route path={ROUTES.LOGIN} element={<LoginPage />} />
            
            {/* Rutas protegidas */}
            <Route
              path="/*"
              element={
                <ProtectedRoute requiredRole="Comprador">
                  <div className="d-flex flex-column min-vh-100">
                    <Header />
                    <main className="flex-grow-1 pb-4">
                      <Routes>
                        {/* Redirección por defecto */}
                        <Route path="/" element={<Navigate to={ROUTES.PRODUCTS} replace />} />
                        
                        {/* Rutas del comprador */}
                        <Route path={ROUTES.PRODUCTS} element={<ProductsPage />} />
                        <Route path="/dashboard" element={<DashboardPage />} />
                        
                        {/* Rutas de error */}
                        <Route path="*" element={<NotFoundPage />} />
                      </Routes>
                    </main>
                  </div>
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </Provider>
  )
}

export default App
import React, { useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth, useAppDispatch } from '@hooks/redux-hooks'
import { checkAuthAsync } from '@store/slices/auth-slice'
import { ROUTES } from '@constants/routes'
import LoadingSpinner from './LoadingSpinner'

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: 'Comprador' | 'Administrador'
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole 
}) => {
  const dispatch = useAppDispatch()
  const location = useLocation()
  const { isAuthenticated, user, loading } = useAuth()

  useEffect(() => {
    // Verificar autenticación al montar el componente
    if (!isAuthenticated) {
      dispatch(checkAuthAsync())
    }
  }, [dispatch, isAuthenticated])

  // Mostrar loading mientras verifica autenticación
  if (loading) {
    return <LoadingSpinner />
  }

  // Si no está autenticado, redirigir a login
  if (!isAuthenticated) {
    return (
      <Navigate 
        to={ROUTES.LOGIN} 
        state={{ from: location }} 
        replace 
      />
    )
  }

  // Si requiere un rol específico y el usuario no lo tiene
  if (requiredRole && user?.rol !== requiredRole) {
    return (
      <Navigate 
        to={ROUTES.UNAUTHORIZED} 
        replace 
      />
    )
  }

  return <>{children}</>
}

export default ProtectedRoute
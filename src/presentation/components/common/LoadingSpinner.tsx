import React from 'react'
import { Spinner } from 'reactstrap'

interface LoadingSpinnerProps {
  size?: 'sm' | 'lg'
  color?: string
  message?: string
  fullScreen?: boolean
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'lg',
  color = 'primary',
  message = 'Cargando...',
  fullScreen = true
}) => {
  const content = (
    <div className="text-center">
      <Spinner 
        color={color} 
        size={size}
        className="mb-2"
      />
      {message && (
        <div className="text-muted">
          {message}
        </div>
      )}
    </div>
  )

  if (fullScreen) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        {content}
      </div>
    )
  }

  return content
}

export default LoadingSpinner
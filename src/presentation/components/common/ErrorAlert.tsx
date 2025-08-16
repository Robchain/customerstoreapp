import React from 'react'
import { Alert, Button } from 'reactstrap'

interface ErrorAlertProps {
  message: string
  onRetry?: () => void
  onDismiss?: () => void
  dismissible?: boolean
  color?: string
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({
  message,
  onRetry,
  onDismiss,
  dismissible = true,
  color = 'danger'
}) => {
  return (
    <Alert 
      color={color} 
      isOpen={true}
      toggle={dismissible ? onDismiss : undefined}
      className="mb-3"
    >
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <strong>Error:</strong> {message}
        </div>
        {onRetry && (
          <Button
            color="outline-danger"
            size="sm"
            onClick={onRetry}
            className="ms-2"
          >
            Reintentar
          </Button>
        )}
      </div>
    </Alert>
  )
}

export default ErrorAlert
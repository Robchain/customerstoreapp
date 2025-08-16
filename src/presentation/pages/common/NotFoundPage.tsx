import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Row, Col, Button } from 'reactstrap'
import { ROUTES } from '@constants/routes'

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate()

  const handleGoHome = () => {
    navigate(ROUTES.HOME)
  }

  const handleGoBack = () => {
    window.history.back()
  }

  return (
    <Container>
      <Row className="justify-content-center text-center min-vh-100 align-items-center">
        <Col md={6}>
          <div className="mb-4">
            <h1 className="display-1 text-primary">404</h1>
            <h2 className="mb-3">Página no encontrada</h2>
            <p className="text-muted mb-4">
              Lo sentimos, la página que estás buscando no existe o ha sido movida.
            </p>
          </div>
          
          <div className="d-flex gap-2 justify-content-center">
            <Button color="primary" onClick={handleGoHome}>
              Ir al Inicio
            </Button>
            <Button color="secondary" onClick={handleGoBack}>
              Volver Atrás
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default NotFoundPage
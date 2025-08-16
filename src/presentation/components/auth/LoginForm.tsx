import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Form, 
  FormGroup, 
  Label, 
  Input, 
  Button, 
  Alert, 
  Card, 
  CardBody, 
  CardHeader,
  Spinner, 
  Container,
  Row,
  Col
} from 'reactstrap'
import { useAppDispatch, useAuth } from '@hooks/redux-hooks'
import { loginAsync, clearError } from '@store/slices/auth-slice'
import { ROUTES } from '@constants/routes'

const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { isAuthenticated, loading, error } = useAuth()
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({})

  // Redirigir si ya está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      navigate(ROUTES.HOME, { replace: true })
    }
  }, [isAuthenticated, navigate])

  // Limpiar error cuando se monta el componente
  useEffect(() => {
    dispatch(clearError())
  }, [dispatch])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = (): boolean => {
    const errors: { [key: string]: string } = {}
    
    if (!formData.email.trim()) {
      errors.email = 'El email es requerido'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'El formato del email no es válido'
    }
    
    if (!formData.password.trim()) {
      errors.password = 'La contraseña es requerida'
    } else if (formData.password.length < 6) {
      errors.password = 'La contraseña debe tener al menos 6 caracteres'
    }
    
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    try {
      await dispatch(loginAsync({
        email: formData.email.trim(),
        password: formData.password
      })).unwrap()
      
      // El redirect se maneja en el useEffect
    } catch (error) {
      // El error se maneja en el slice
      console.error('Error en login:', error)
    }
  }

  const handleRegisterRedirect = () => {
    navigate(ROUTES.REGISTER)
  }

  return (
    <div className="min-vh-100 bg-light d-flex align-items-center py-3">
      <Container fluid className="px-3">
        <Row className="justify-content-center">
          <Col xs={12} sm={10} md={8} lg={6} xl={4}>
            <Card className="shadow-sm border-0">
              <CardHeader className="text-center bg-primary text-white py-4">
                <h3 className="mb-0 fw-bold">Iniciar Sesión</h3>
                <small className="opacity-75">Accede a tu cuenta</small>
              </CardHeader>
              
              <CardBody className="p-4">
                {error && (
                  <Alert color="danger" className="mb-4 small">
                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                    {error}
                  </Alert>
                )}
                
                <Form onSubmit={handleSubmit}>
                  <FormGroup className="mb-3">
                    <Label for="email" className="form-label fw-semibold">
                      Email
                    </Label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="ejemplo@email.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      invalid={!!formErrors.email}
                      disabled={loading}
                      className="form-control-lg"
                      autoComplete="email"
                    />
                    {formErrors.email && (
                      <div className="invalid-feedback d-block small">
                        <i className="bi bi-exclamation-circle me-1"></i>
                        {formErrors.email}
                      </div>
                    )}
                  </FormGroup>
                  
                  <FormGroup className="mb-4">
                    <Label for="password" className="form-label fw-semibold">
                      Contraseña
                    </Label>
                    <Input
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Ingresa tu contraseña"
                      value={formData.password}
                      onChange={handleInputChange}
                      invalid={!!formErrors.password}
                      disabled={loading}
                      className="form-control-lg"
                      autoComplete="current-password"
                    />
                    {formErrors.password && (
                      <div className="invalid-feedback d-block small">
                        <i className="bi bi-exclamation-circle me-1"></i>
                        {formErrors.password}
                      </div>
                    )}
                  </FormGroup>
                  
                  <div className="d-grid gap-3">
                    <Button
                      type="submit"
                      color="primary"
                      size="lg"
                      disabled={loading}
                      className="fw-semibold py-3"
                    >
                      {loading ? (
                        <>
                          <Spinner size="sm" className="me-2" />
                          Iniciando sesión...
                        </>
                      ) : (
                        <>
                          <i className="bi bi-box-arrow-in-right me-2"></i>
                          Iniciar Sesión
                        </>
                      )}
                    </Button>
                  </div>
                </Form>
                
                <hr className="my-4" />
                
                <div className="text-center">
                  <p className="mb-2 text-muted small">¿No tienes cuenta?</p>
                  <Button
                    color="outline-primary"
                    onClick={handleRegisterRedirect}
                    disabled={loading}
                    className="fw-semibold"
                    size="sm"
                  >
                    <i className="bi bi-person-plus me-2"></i>
                    Crear cuenta nueva
                  </Button>
                </div>

                {/* Info de credenciales de prueba - Solo en desarrollo */}
                {import.meta.env.DEV && (
                  <div className="mt-4 p-3 bg-light rounded">
                    <h6 className="small fw-bold text-muted mb-2">
                      <i className="bi bi-info-circle me-1"></i>
                      Credenciales de Prueba:
                    </h6>
                    <div className="small text-muted">
                      <div><strong>Admin:</strong> admin@tienda.com / 123456</div>
                      <div><strong>Comprador:</strong> juan@email.com / 123456</div>
                    </div>
                  </div>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default LoginForm
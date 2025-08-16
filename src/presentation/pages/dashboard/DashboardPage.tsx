import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Button,
  Badge
} from 'reactstrap'
import { useAuth, useBuyer, useAppDispatch } from '@hooks/redux-hooks'
import { 
  fetchProductsAsync,
  fetchCartItemsAsync,
  fetchWishListAsync
} from '@store/slices/buyer-slice'
import { ROUTES } from '@constants/routes'

const DashboardPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { products, cartItems, wishListItems } = useBuyer()

  useEffect(() => {
    // Cargar datos del dashboard
    dispatch(fetchProductsAsync()) // Sin filtros
    dispatch(fetchCartItemsAsync())
    dispatch(fetchWishListAsync())
  }, [dispatch])

  const handleNavigation = (route: string) => {
    navigate(route)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-EC', {
      style: 'currency',
      currency: 'USD'
    }).format(price)
  }

  const cartTotal = cartItems.reduce((total, item) => total + item.subtotal, 0)

  return (
    <Container fluid className="px-3">
      <Row className="mb-4">
        <Col>
          <h2 className="h4 mb-1">¡Bienvenido, {user?.name}!</h2>
          <p className="text-muted small mb-0">
            Aquí tienes un resumen de tu actividad en la tienda
          </p>
        </Col>
      </Row>

      {/* Tarjetas de resumen - Responsive */}
      <Row className="g-3 mb-4">
        <Col xs={12} sm={6} lg={4}>
          <Card className="h-100 border-0 shadow-sm bg-primary text-white">
            <CardBody className="text-center p-3">
              <div className="mb-2">
                <i className="bi bi-cart3" style={{ fontSize: '2rem' }}></i>
              </div>
              <CardTitle tag="h6" className="mb-2">
                Carrito de Compras
              </CardTitle>
              <h4 className="mb-2 fw-bold">
                {cartItems.length}
                <small className="ms-1" style={{ fontSize: '0.7rem' }}>
                  {cartItems.length === 1 ? 'producto' : 'productos'}
                </small>
              </h4>
              <p className="small mb-3 opacity-75">
                {cartItems.length > 0 ? `Total: ${formatPrice(cartTotal)}` : 'Sin productos'}
              </p>
              <Button
                color="light"
                size="sm"
                onClick={() => handleNavigation(ROUTES.CART)}
                className="fw-semibold"
              >
                <i className="bi bi-arrow-right me-1"></i>
                Ver Carrito
              </Button>
            </CardBody>
          </Card>
        </Col>

        <Col xs={12} sm={6} lg={4}>
          <Card className="h-100 border-0 shadow-sm bg-info text-white">
            <CardBody className="text-center p-3">
              <div className="mb-2">
                <i className="bi bi-heart" style={{ fontSize: '2rem' }}></i>
              </div>
              <CardTitle tag="h6" className="mb-2">
                Lista de Deseos
              </CardTitle>
              <h4 className="mb-2 fw-bold">
                {wishListItems.length}
                <small className="ms-1" style={{ fontSize: '0.7rem' }}>
                  {wishListItems.length === 1 ? 'producto' : 'productos'}
                </small>
              </h4>
              <p className="small mb-3 opacity-75">
                {wishListItems.length > 0 ? 'Productos guardados' : 'Sin productos'}
              </p>
              <Button
                color="light"
                size="sm"
                onClick={() => handleNavigation(ROUTES.WISHLIST)}
                className="fw-semibold"
              >
                <i className="bi bi-arrow-right me-1"></i>
                Ver Lista
              </Button>
            </CardBody>
          </Card>
        </Col>

        <Col xs={12} lg={4}>
          <Card className="h-100 border-0 shadow-sm bg-success text-white">
            <CardBody className="text-center p-3">
              <div className="mb-2">
                <i className="bi bi-grid" style={{ fontSize: '2rem' }}></i>
              </div>
              <CardTitle tag="h6" className="mb-2">
                Productos Disponibles
              </CardTitle>
              <h4 className="mb-2 fw-bold">
                {products.filter(p => p.isAvailable).length}
                <small className="ms-1" style={{ fontSize: '0.7rem' }}>
                  de {products.length}
                </small>
              </h4>
              <p className="small mb-3 opacity-75">
                Productos en stock
              </p>
              <Button
                color="light"
                size="sm"
                onClick={() => handleNavigation(ROUTES.PRODUCTS)}
                className="fw-semibold"
              >
                <i className="bi bi-arrow-right me-1"></i>
                Ver Productos
              </Button>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* Productos destacados - Responsive */}
      {products.length > 0 && (
        <>
          <Row className="mb-3">
            <Col>
              <h4 className="h5 mb-1">Productos Destacados</h4>
              <p className="text-muted small mb-0">
                Algunos de nuestros productos disponibles
              </p>
            </Col>
          </Row>

          <Row className="g-3 mb-4">
            {products.slice(0, 3).map((product) => (
              <Col key={product.idProduct} xs={12} sm={6} lg={4}>
                <Card className="h-100 border-0 shadow-sm">
                  <div className="position-relative">
                    <div 
                      style={{ 
                        height: '120px', 
                        backgroundImage: `url(${product.imageUrl})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        borderRadius: '0.375rem 0.375rem 0 0'
                      }}
                    >
                      <Badge 
                        color="primary" 
                        className="position-absolute top-0 start-0 m-2 small"
                      >
                        {product.category}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardBody className="p-3">
                    <CardTitle tag="h6" className="mb-2 text-truncate">
                      {product.name}
                    </CardTitle>
                    <p className="text-muted small mb-2" style={{ 
                      height: '2.4rem',
                      overflow: 'hidden',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical'
                    }}>
                      {product.description}
                    </p>
                    <div className="d-flex justify-content-between align-items-center">
                      <strong className="text-primary">
                        {formatPrice(product.bestPrice)}
                      </strong>
                      <Badge color={product.isAvailable ? 'success' : 'danger'} className="small">
                        {product.isAvailable ? (
                          <>
                            <i className="bi bi-check-circle me-1"></i>
                            Disponible
                          </>
                        ) : (
                          <>
                            <i className="bi bi-x-circle me-1"></i>
                            Sin stock
                          </>
                        )}
                      </Badge>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>

          <Row>
            <Col className="text-center">
              <Button
                color="outline-primary"
                onClick={() => handleNavigation(ROUTES.PRODUCTS)}
                className="fw-semibold"
              >
                <i className="bi bi-grid me-2"></i>
                Ver Todos los Productos
              </Button>
            </Col>
          </Row>
        </>
      )}

      {/* Acciones rápidas - Grid responsive */}
      <Row className="mt-5 mb-3">
        <Col>
          <h4 className="h5 mb-1">Acciones Rápidas</h4>
          <p className="text-muted small mb-0">Accesos directos</p>
        </Col>
      </Row>

      <Row className="g-3">
        <Col xs={6} sm={3}>
          <Card className="text-center border-0 shadow-sm h-100">
            <CardBody className="p-3">
              <i className="bi bi-shop text-primary mb-2" style={{ fontSize: '1.5rem' }}></i>
              <h6 className="small mb-2">Explorar</h6>
              <Button
                color="outline-primary"
                size="sm"
                onClick={() => handleNavigation(ROUTES.PRODUCTS)}
                className="w-100"
              >
                Productos
              </Button>
            </CardBody>
          </Card>
        </Col>

        <Col xs={6} sm={3}>
          <Card className="text-center border-0 shadow-sm h-100">
            <CardBody className="p-3">
              <i className="bi bi-cart-check text-success mb-2" style={{ fontSize: '1.5rem' }}></i>
              <h6 className="small mb-2">Finalizar</h6>
              <Button
                color="outline-success"
                size="sm"
                onClick={() => handleNavigation(ROUTES.CART)}
                disabled={cartItems.length === 0}
                className="w-100"
              >
                Compra
              </Button>
            </CardBody>
          </Card>
        </Col>

        <Col xs={6} sm={3}>
          <Card className="text-center border-0 shadow-sm h-100">
            <CardBody className="p-3">
              <i className="bi bi-bag-check text-info mb-2" style={{ fontSize: '1.5rem' }}></i>
              <h6 className="small mb-2">Mis</h6>
              <Button
                color="outline-info"
                size="sm"
                onClick={() => handleNavigation(ROUTES.ORDERS)}
                className="w-100"
              >
                Órdenes
              </Button>
            </CardBody>
          </Card>
        </Col>

        <Col xs={6} sm={3}>
          <Card className="text-center border-0 shadow-sm h-100">
            <CardBody className="p-3">
              <i className="bi bi-person-circle text-secondary mb-2" style={{ fontSize: '1.5rem' }}></i>
              <h6 className="small mb-2">Mi</h6>
              <Button
                color="outline-secondary"
                size="sm"
                onClick={() => handleNavigation(ROUTES.PROFILE)}
                className="w-100"
              >
                Perfil
              </Button>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default DashboardPage
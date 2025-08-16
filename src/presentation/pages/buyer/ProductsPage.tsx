import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Container,
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Button,
  Badge,
  Input,
  FormGroup,
  Label,
  InputGroup
} from 'reactstrap'
import { useBuyer, useAppDispatch } from '@hooks/redux-hooks'
import { 
  fetchProductsAsync,
  addToWishListAsync,
  clearErrors
} from '@store/slices/buyer-slice'
import { ROUTES, PRODUCT_CATEGORIES, SORT_OPTIONS } from '@constants/index'
import LoadingSpinner from '@components/common/LoadingSpinner'
import ErrorAlert from '@components/common/ErrorAlert'

const ProductsPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { 
    products, 
    productsLoading, 
    productsError,
    wishListLoading,
    wishListError
  } = useBuyer()

  // Estados locales para filtros simples
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [sortBy, setSortBy] = useState('')
  const [filteredProducts, setFilteredProducts] = useState(products)

  // Cargar productos al montar el componente
  useEffect(() => {
    dispatch(fetchProductsAsync())
  }, [dispatch])

  // Limpiar errores al montar
  useEffect(() => {
    dispatch(clearErrors())
  }, [dispatch])

  // Aplicar filtros localmente
  useEffect(() => {
    let filtered = [...products]

    // Filtro por búsqueda
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filtro por categoría
    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory)
    }

    // Ordenamiento
    if (sortBy) {
      switch (sortBy) {
        case SORT_OPTIONS.NEWEST:
          filtered.sort((a, b) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime())
          break
        case SORT_OPTIONS.NAME:
          filtered.sort((a, b) => a.name.localeCompare(b.name))
          break
        case SORT_OPTIONS.PRICE_ASC:
          filtered.sort((a, b) => a.bestPrice - b.bestPrice)
          break
        case SORT_OPTIONS.PRICE_DESC:
          filtered.sort((a, b) => b.bestPrice - a.bestPrice)
          break
      }
    }

    setFilteredProducts(filtered)
  }, [products, searchTerm, selectedCategory, sortBy])

  const handleSearch = () => {
    // Los filtros se aplican automáticamente con useEffect
  }

  const handleClearFilters = () => {
    setSearchTerm('')
    setSelectedCategory('')
    setSortBy('')
  }

  const handleProductClick = (productId: number) => {
    navigate(ROUTES.PRODUCT_DETAIL.replace(':id', productId.toString()))
  }

  const handleAddToWishList = async (productId: number, e: React.MouseEvent) => {
    e.stopPropagation() // Prevenir navegación al producto
    try {
      await dispatch(addToWishListAsync(productId)).unwrap()
    } catch (error) {
      // Error se maneja en el slice
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-EC', {
      style: 'currency',
      currency: 'USD'
    }).format(price)
  }

  if (productsLoading && products.length === 0) {
    return <LoadingSpinner message="Cargando productos..." />
  }

  return (
    <Container fluid className="px-3">
      <Row className="mb-3">
        <Col>
          <h2 className="h4 mb-1">Productos</h2>
          <p className="text-muted small mb-0">Explora nuestro catálogo</p>
        </Col>
      </Row>

      {/* Filtros - Optimizado para móvil */}
      <Card className="mb-3 border-0 shadow-sm">
        <CardBody className="p-3">
          {/* Búsqueda principal */}
          <Row className="mb-3">
            <Col xs={12}>
              <Label className="form-label small fw-semibold text-muted mb-2">
                <i className="bi bi-search me-1"></i>Buscar productos
              </Label>
              <InputGroup>
                <Input
                  placeholder="¿Qué estás buscando?"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="border-end-0"
                />
                <Button 
                  color="primary" 
                  onClick={handleSearch}
                  disabled={productsLoading}
                  className="px-3"
                >
                  <i className="bi bi-search"></i>
                </Button>
              </InputGroup>
            </Col>
          </Row>
          
          {/* Filtros en fila para móvil */}
          <Row>
            <Col xs={6}>
              <Label className="form-label small fw-semibold text-muted mb-2">
                Categoría
              </Label>
              <Input
                type="select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                
              >
                <option value="">Todas</option>
                {PRODUCT_CATEGORIES.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </Input>
            </Col>
            
            <Col xs={6}>
              <Label className="form-label small fw-semibold text-muted mb-2">
                Ordenar
              </Label>
              <Input
                type="select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                
              >
                <option value="">Por defecto</option>
                <option value={SORT_OPTIONS.NEWEST}>Más nuevo</option>
                <option value={SORT_OPTIONS.NAME}>A-Z</option>
                <option value={SORT_OPTIONS.PRICE_ASC}>Precio ↑</option>
                <option value={SORT_OPTIONS.PRICE_DESC}>Precio ↓</option>
              </Input>
            </Col>
          </Row>
          
          {/* Botón limpiar filtros */}
          {(searchTerm || selectedCategory || sortBy) && (
            <Row className="mt-3">
              <Col xs={12}>
                <Button 
                  color="outline-secondary" 
                  onClick={handleClearFilters}
                  size="sm"
                  className="w-100"
                >
                  <i className="bi bi-x-circle me-1"></i>Limpiar filtros
                </Button>
              </Col>
            </Row>
          )}
        </CardBody>
      </Card>

      {/* Errores */}
      {productsError && (
        <ErrorAlert
          message={productsError}
          onRetry={() => dispatch(fetchProductsAsync())}
          onDismiss={() => dispatch(clearErrors())}
        />
      )}

      {wishListError && (
        <ErrorAlert
          message={wishListError}
          onDismiss={() => dispatch(clearErrors())}
        />
      )}

      {/* Loading indicator */}
      {productsLoading && products.length > 0 && (
        <div className="text-center mb-3">
          <LoadingSpinner size="sm" message="Actualizando..." fullScreen={false} />
        </div>
      )}

      {/* Contador de resultados */}
      {filteredProducts.length !== products.length && (
        <Row className="mb-3">
          <Col>
            <small className="text-muted">
              <i className="bi bi-funnel me-1"></i>
              Mostrando {filteredProducts.length} de {products.length} productos
            </small>
          </Col>
        </Row>
      )}

      {/* Lista de productos - Grid optimizado para móvil */}
      <Row className="g-3">
        {filteredProducts.length === 0 && !productsLoading ? (
          <Col xs={12}>
            <div className="text-center py-5">
              <i className="bi bi-search display-4 text-muted mb-3"></i>
              <h5 className="text-muted">No se encontraron productos</h5>
              <p className="text-muted small">
                {searchTerm || selectedCategory ? 
                  'Intenta cambiar los filtros de búsqueda' : 
                  'No hay productos disponibles'
                }
              </p>
              {(searchTerm || selectedCategory) && (
                <Button
                  color="outline-primary"
                  size="sm"
                  onClick={handleClearFilters}
                >
                  Limpiar filtros
                </Button>
              )}
            </div>
          </Col>
        ) : (
          filteredProducts.map((product) => (
            <Col key={product.idProduct} xs={6} lg={4} xl={3}>
              <Card 
                className="h-100 border-0 shadow-sm product-card-mobile"
                style={{ cursor: 'pointer' }}
                onClick={() => handleProductClick(product.idProduct)}
              >
                <div className="position-relative">
                  <CardImg
                    top
                    src={product.imageUrl}
                    alt={product.name}
                    style={{ 
                      height: '140px', 
                      objectFit: 'cover',
                      borderRadius: '0.375rem 0.375rem 0 0'
                    }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = 'https://via.placeholder.com/300x200?text=Sin+Imagen'
                    }}
                  />
                  
                  {/* Badge de categoría */}
                  <Badge 
                    color="primary" 
                    className="position-absolute top-0 start-0 m-2 small"
                    style={{ fontSize: '0.65rem' }}
                  >
                    {product.category}
                  </Badge>
                  
                  {/* Botón wishlist */}
                  <Button
                    color="light"
                    size="sm"
                    className="position-absolute top-0 end-0 m-2 p-1 rounded-circle shadow-sm"
                    onClick={(e) => handleAddToWishList(product.idProduct, e)}
                    disabled={wishListLoading}
                    style={{ width: '32px', height: '32px' }}
                  >
                    <i className="bi bi-heart text-danger" style={{ fontSize: '0.8rem' }}></i>
                  </Button>
                </div>
                
                <CardBody className="p-3">
                  <CardTitle tag="h6" className="mb-2 text-truncate" style={{ fontSize: '0.9rem' }}>
                    {product.name}
                  </CardTitle>
                  
                  <CardText className="text-muted small mb-2" style={{ 
                    fontSize: '0.75rem',
                    height: '2.4rem',
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical'
                  }}>
                    {product.description}
                  </CardText>
                  
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <strong className="text-primary" style={{ fontSize: '0.9rem' }}>
                      {formatPrice(product.bestPrice)}
                    </strong>
                    
                    <Badge color={product.isAvailable ? 'success' : 'danger'} className="small">
                      {product.isAvailable ? (
                        <>
                          <i className="bi bi-check-circle me-1"></i>
                          {product.totalStock}
                        </>
                      ) : (
                        <>
                          <i className="bi bi-x-circle me-1"></i>
                          Sin stock
                        </>
                      )}
                    </Badge>
                  </div>
                  
                  <div className="d-grid">
                    <Button
                      color="primary"
                      size="sm"
                      onClick={() => handleProductClick(product.idProduct)}
                      disabled={!product.isAvailable}
                      className="text-truncate"
                      style={{ fontSize: '0.8rem' }}
                    >
                      <i className="bi bi-eye me-1"></i>
                      Ver Detalles
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </Col>
          ))
        )}
      </Row>

      {/* Información adicional */}
      {filteredProducts.length > 0 && (
        <Row className="mt-4">
          <Col className="text-center">
            <p className="text-muted small mb-2">
              <i className="bi bi-grid me-1"></i>
              Mostrando {filteredProducts.length} productos
              {filteredProducts.length !== products.length && ` de ${products.length} total`}
            </p>
            {/* Botón para refrescar productos */}
            <Button 
              color="outline-primary" 
              size="sm"
              className="mt-2"
              onClick={() => dispatch(fetchProductsAsync())}
              disabled={productsLoading}
            >
              <i className="bi bi-arrow-clockwise me-1"></i>
              Actualizar productos
            </Button>
          </Col>
        </Row>
      )}
    </Container>
  )
}

export default ProductsPage
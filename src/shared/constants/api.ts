export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5100/api'

export const API_ENDPOINTS = {
  // Auth endpoints
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
    profile: '/auth/profile'
  },
  
  // Buyer endpoints - Rutas corregidas
  buyer: {
    products: '/buyer/ProductsControllerBuyer',           // ✅ Ruta correcta
    productDetail: (id: number) => `/buyer/ProductsControllerBuyer/${id}`,
    cart: '/buyer/cart',
    addToCart: '/buyer/cart',
    removeFromCart: (productId: number, supplierId: number) => 
      `/buyer/cart/${productId}/${supplierId}`,
    clearCart: '/buyer/cart/clear',
    wishlist: '/buyer/wishlist',
    addToWishlist: (productId: number) => `/buyer/wishlist/${productId}`,
    removeFromWishlist: (productId: number) => `/buyer/wishlist/${productId}`,
    orders: '/buyer/orders',
    createOrder: '/buyer/orders'
  },
  
  // Admin endpoints (para uso futuro)
  admin: {
    products: '/admin/products',
    suppliers: '/admin/suppliers',
    lots: '/admin/lots',
    productSuppliers: '/admin/productSuppliers',
    orders: '/admin/orders'
  }
}

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500
} as const

export const REQUEST_TIMEOUT = 30000 // 30 segundos
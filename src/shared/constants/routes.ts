export const ROUTES = {
  // Auth routes
  LOGIN: '/login',
  REGISTER: '/register',
  
  // Buyer routes
  HOME: '/',
  PRODUCTS: '/products',
  PRODUCT_DETAIL: '/products/:id',
  CART: '/cart',
  WISHLIST: '/wishlist',
  ORDERS: '/orders',
  PROFILE: '/profile',
  
  // Admin routes (para uso futuro)
  ADMIN_DASHBOARD: '/admin',
  ADMIN_PRODUCTS: '/admin/products',
  ADMIN_SUPPLIERS: '/admin/suppliers',
  ADMIN_LOTS: '/admin/lots',
  ADMIN_ORDERS: '/admin/orders',
  
  // Error routes
  NOT_FOUND: '/404',
  UNAUTHORIZED: '/401',
  ERROR: '/error'
} as const

export const PUBLIC_ROUTES = [
  ROUTES.LOGIN,
  ROUTES.REGISTER,
  ROUTES.NOT_FOUND,
  ROUTES.UNAUTHORIZED,
  ROUTES.ERROR
] as const

export const PROTECTED_ROUTES = [
  ROUTES.HOME,
  ROUTES.PRODUCTS,
  ROUTES.PRODUCT_DETAIL,
  ROUTES.CART,
  ROUTES.WISHLIST,
  ROUTES.ORDERS,
  ROUTES.PROFILE
] as const

export const ADMIN_ROUTES = [
  ROUTES.ADMIN_DASHBOARD,
  ROUTES.ADMIN_PRODUCTS,
  ROUTES.ADMIN_SUPPLIERS,
  ROUTES.ADMIN_LOTS,
  ROUTES.ADMIN_ORDERS
] as const
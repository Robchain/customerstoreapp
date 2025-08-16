export const APP_CONFIG = {
  name: import.meta.env.VITE_APP_NAME || 'Tienda Web Base',
  version: import.meta.env.VITE_APP_VERSION || '1.0.0',
  debug: import.meta.env.VITE_DEBUG === 'true'
}

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_INFO: 'user_info',
  CART_ITEMS: 'cart_items',
  THEME: 'theme',
  LANGUAGE: 'language'
} as const

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [5, 10, 20, 50],
  MAX_PAGE_SIZE: 100
} as const

export const USER_ROLES = {
  BUYER: 'Comprador',
  ADMIN: 'Administrador'
} as const

export const ORDER_STATES = {
  PENDING: 'Pendiente',
  PROCESSING: 'Procesando',
  SHIPPED: 'Enviado',
  DELIVERED: 'Entregado',
  CANCELLED: 'Cancelado'
} as const

export const PRODUCT_CATEGORIES = [
  'Electrónicos',
  'Ropa',
  'Hogar',
  'Deportes',
  'Libros',
  'Salud',
  'Belleza',
  'Automotriz',
  'Juguetes',
  'Otros'
] as const

export const SORT_OPTIONS = {
  NEWEST: 'newest',
  NAME: 'name',
  PRICE_ASC: 'price_asc',
  PRICE_DESC: 'price_desc'
} as const
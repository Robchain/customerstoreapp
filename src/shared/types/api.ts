// Base API Response
export interface ApiResponse<T = any> {
  success: boolean
  message: string
  data?: T
  errors?: string[]
}

// Auth Types
export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  idUser: number
  name: string
  email: string
  rol: 'Comprador' | 'Administrador'  // ✅ Cambiado de string a union type
  token: string
  loginTime: string
  tokenExpiration: string
}

export interface RegisterRequest {
  name: string
  email: string
  password: string
  rol: 'Comprador' | 'Administrador'
}

export interface RegisterResponse {
  idUser: number
  name: string
  email: string
  rol: 'Comprador' | 'Administrador'  // ✅ Cambiado de string a union type
  dateCreated: string
  message: string
}

export interface UserProfile {
  idUser: number
  name: string
  email: string
  rol: 'Comprador' | 'Administrador'  // ✅ Cambiado de string a union type
  dateCreated: string
}

// Product Types
export interface ProductListItem {
  idProduct: number
  name: string
  description: string
  category: string
  imageUrl: string
  bestPrice: number
  isAvailable: boolean
  totalStock: number
  creationDate: string
}

export interface ProductDetail {
  idProduct: number
  name: string
  description: string
  category: string
  imageUrl: string
  creationDate: string
  priceOptions: ProductPriceOption[]
  bestPrice: number
  isAvailable: boolean
  isInWishList: boolean
}

export interface ProductPriceOption {
  idSupplier: number
  supplierName: string
  price: number
  stock: number
  isAvailable: boolean
  lotCode: string
  lotExpDate: string
  isLotValid: boolean
}

// Cart Types
export interface CartItem {
  idProduct: number
  productName: string
  productImageUrl: string
  idSupplier: number
  supplierName: string
  unitPrice: number
  quantity: number
  subtotal: number
  availableStock: number
  isValidItem: boolean
}

export interface AddToCartRequest {
  idProduct: number
  idSupplier: number
  quantity: number
}

export interface UpdateCartItemRequest {
  quantity: number
}

// WishList Types
export interface WishListItem {
  idProduct: number
  productName: string
  productCategory: string
  productImageUrl: string
  dateAdded: string
  bestPrice: number
  isAvailable: boolean
}

export interface AddToWishListRequest {
  idProduct: number
}

// Order Types
export interface OrderItem {
  idProduct: number
  idSupplier: number
  quantity: number
}

export interface CreateOrderRequest {
  items: OrderItem[]
}

export interface MyOrder {
  idOrder: number
  orderDate: string
  state: string
  total: number
  totalItems: number
}

export interface OrderSummary {
  idOrder: number
  orderDate: string
  state: string
  total: number
  totalItems: number
  items: OrderItemSummary[]
}

export interface OrderItemSummary {
  productName: string
  productImageUrl: string
  supplierName: string
  quantity: number
  unitPrice: number
  subtotal: number
}

// Filter Types
export interface ProductFilter {
  pageNumber?: number
  pageSize?: number
  name?: string
  category?: string
  minPrice?: number
  maxPrice?: number
  inStock?: boolean
  sortBy?: 'price_asc' | 'price_desc' | 'name' | 'newest'
}

// Error Types
export interface ApiError {
  status: number
  message: string
  errors?: string[]
  timestamp: string
}

// Pagination
export interface PaginatedResponse<T> {
  items: T[]
  totalItems: number
  pageNumber: number
  pageSize: number
  totalPages: number
  hasPreviousPage: boolean
  hasNextPage: boolean
}
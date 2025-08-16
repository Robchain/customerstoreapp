import httpClient from './http-client'
import { API_ENDPOINTS } from '@constants/api'
import { 
  ProductListItem,
  ProductDetail,
  CartItem,
  AddToCartRequest,
  UpdateCartItemRequest,
  WishListItem,
  AddToWishListRequest,
  MyOrder,
  OrderSummary,
  CreateOrderRequest,
  ProductFilter,
  ApiResponse 
} from '@models/api'

export class BuyerService {
  // ============== PRODUCTOS ==============
  
  async getProducts(): Promise<ProductListItem[]> {
    // Sin filtros ni paginación - llamada directa
    const response = await httpClient.get<ProductListItem[]>(API_ENDPOINTS.buyer.products)
    
    if (response.success && response.data) {
      return response.data
    }
    
    throw new Error(response.message || 'Error al obtener productos')
  }
  
  async getProductDetail(productId: number): Promise<ProductDetail> {
    const response = await httpClient.get<ProductDetail>(
      API_ENDPOINTS.buyer.productDetail(productId)
    )
    
    if (response.success && response.data) {
      return response.data
    }
    
    throw new Error(response.message || 'Error al obtener detalle del producto')
  }
  
  // ============== CARRITO ==============
  
  async getCartItems(): Promise<CartItem[]> {
    const response = await httpClient.get<CartItem[]>(API_ENDPOINTS.buyer.cart)
    
    if (response.success && response.data) {
      return response.data
    }
    
    throw new Error(response.message || 'Error al obtener items del carrito')
  }
  
  async addToCart(item: AddToCartRequest): Promise<boolean> {
    const response = await httpClient.post<boolean>(
      API_ENDPOINTS.buyer.addToCart,
      item
    )
    
    if (response.success) {
      return response.data || true
    }
    
    throw new Error(response.message || 'Error al agregar al carrito')
  }
  
  async updateCartItem(
    productId: number, 
    supplierId: number, 
    update: UpdateCartItemRequest
  ): Promise<boolean> {
    const response = await httpClient.put<boolean>(
      API_ENDPOINTS.buyer.removeFromCart(productId, supplierId),
      update
    )
    
    if (response.success) {
      return response.data || true
    }
    
    throw new Error(response.message || 'Error al actualizar item del carrito')
  }
  
  async removeFromCart(productId: number, supplierId: number): Promise<boolean> {
    const response = await httpClient.delete<boolean>(
      API_ENDPOINTS.buyer.removeFromCart(productId, supplierId)
    )
    
    if (response.success) {
      return response.data || true
    }
    
    throw new Error(response.message || 'Error al remover del carrito')
  }
  
  async clearCart(): Promise<boolean> {
    const response = await httpClient.delete<boolean>(API_ENDPOINTS.buyer.clearCart)
    
    if (response.success) {
      return response.data || true
    }
    
    throw new Error(response.message || 'Error al limpiar carrito')
  }
  
  // ============== LISTA DE DESEOS ==============
  
  async getWishList(): Promise<WishListItem[]> {
    const response = await httpClient.get<WishListItem[]>(API_ENDPOINTS.buyer.wishlist)
    
    if (response.success && response.data) {
      return response.data
    }
    
    throw new Error(response.message || 'Error al obtener lista de deseos')
  }
  
  async addToWishList(productId: number): Promise<boolean> {
    const response = await httpClient.post<boolean>(
      API_ENDPOINTS.buyer.addToWishlist(productId)
    )
    
    if (response.success) {
      return response.data || true
    }
    
    throw new Error(response.message || 'Error al agregar a lista de deseos')
  }
  
  async removeFromWishList(productId: number): Promise<boolean> {
    const response = await httpClient.delete<boolean>(
      API_ENDPOINTS.buyer.removeFromWishlist(productId)
    )
    
    if (response.success) {
      return response.data || true
    }
    
    throw new Error(response.message || 'Error al remover de lista de deseos')
  }
  
  // ============== ÓRDENES ==============
  
  async getMyOrders(): Promise<MyOrder[]> {
    const response = await httpClient.get<MyOrder[]>(API_ENDPOINTS.buyer.orders)
    
    if (response.success && response.data) {
      return response.data
    }
    
    throw new Error(response.message || 'Error al obtener órdenes')
  }
  
  async getOrderDetail(orderId: number): Promise<OrderSummary> {
    const response = await httpClient.get<OrderSummary>(
      `${API_ENDPOINTS.buyer.orders}/${orderId}`
    )
    
    if (response.success && response.data) {
      return response.data
    }
    
    throw new Error(response.message || 'Error al obtener detalle de la orden')
  }
  
  async createOrder(order: CreateOrderRequest): Promise<OrderSummary> {
    const response = await httpClient.post<OrderSummary>(
      API_ENDPOINTS.buyer.createOrder,
      order
    )
    
    if (response.success && response.data) {
      return response.data
    }
    
    throw new Error(response.message || 'Error al crear orden')
  }
}

// Singleton instance
export const buyerService = new BuyerService()
export default buyerService
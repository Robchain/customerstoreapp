import axios, { 
  AxiosInstance, 
  AxiosRequestConfig, 
  AxiosResponse, 
  AxiosError 
} from 'axios'
import { API_BASE_URL, REQUEST_TIMEOUT, HTTP_STATUS } from '@constants/api'
import { STORAGE_KEYS } from '@constants/app'
import { ApiError, ApiResponse } from '@models/api'

class HttpClient {
  private client: AxiosInstance
  
  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: REQUEST_TIMEOUT,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    
    this.setupInterceptors()
  }
  
  private setupInterceptors() {
    // Request interceptor para agregar token
    this.client.interceptors.request.use(
      (config) => {
        const token = this.getStoredToken()
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
    
    // Response interceptor para manejo de errores
    this.client.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError) => {
        const apiError = this.handleError(error)
        
        // Si es 401, limpiar token y redirigir a login
        if (apiError.status === HTTP_STATUS.UNAUTHORIZED) {
          this.clearAuthData()
          // Solo redirigir si no estamos ya en login
          if (!window.location.pathname.includes('/login')) {
            window.location.href = '/login'
          }
        }
        
        return Promise.reject(apiError)
      }
    )
  }
  
  private getStoredToken(): string | null {
    return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN)
  }
  
  private clearAuthData(): void {
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN)
    localStorage.removeItem(STORAGE_KEYS.USER_INFO)
  }
  
  private handleError(error: AxiosError): ApiError {
    const apiError: ApiError = {
      status: error.response?.status || 500,
      message: 'Error interno del servidor',
      timestamp: new Date().toISOString()
    }
    
    if (error.response?.data) {
      const responseData = error.response.data as any
      
      // Si es una respuesta de nuestra API
      if (responseData.message) {
        apiError.message = responseData.message
      }
      
      if (responseData.errors && Array.isArray(responseData.errors)) {
        apiError.errors = responseData.errors
      }
    } else if (error.message) {
      // Error de red o timeout
      if (error.code === 'ECONNABORTED') {
        apiError.message = 'Tiempo de espera agotado'
      } else if (error.message === 'Network Error') {
        apiError.message = 'Error de conexión'
      } else {
        apiError.message = error.message
      }
    }
    
    return apiError
  }
  
  // Métodos públicos
  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.client.get<ApiResponse<T>>(url, config)
    return response.data
  }
  
  public async post<T>(
    url: string, 
    data?: any, 
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.client.post<ApiResponse<T>>(url, data, config)
    return response.data
  }
  
  public async put<T>(
    url: string, 
    data?: any, 
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.client.put<ApiResponse<T>>(url, data, config)
    return response.data
  }
  
  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.client.delete<ApiResponse<T>>(url, config)
    return response.data
  }
  
  public setAuthToken(token: string): void {
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token)
  }
  
  public removeAuthToken(): void {
    this.clearAuthData()
  }
}

// Singleton instance
export const httpClient = new HttpClient()
export default httpClient
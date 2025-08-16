import httpClient from './http-client'
import { API_ENDPOINTS } from '@constants/api'
import { STORAGE_KEYS } from '@constants/app'
import { 
  LoginRequest, 
  LoginResponse, 
  RegisterRequest, 
  RegisterResponse,
  UserProfile,
  ApiResponse 
} from '@models/api'

export class AuthService {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await httpClient.post<LoginResponse>(
      API_ENDPOINTS.auth.login,
      credentials
    )
    
    if (response.success && response.data) {
      // Guardar token y datos del usuario
      httpClient.setAuthToken(response.data.token)
      this.saveUserInfo(response.data)
      return response.data
    }
    
    throw new Error(response.message || 'Error en el login')
  }
  
  async register(data: RegisterRequest): Promise<RegisterResponse> {
    const response = await httpClient.post<RegisterResponse>(
      API_ENDPOINTS.auth.register,
      data
    )
    
    if (response.success && response.data) {
      return response.data
    }
    
    throw new Error(response.message || 'Error en el registro')
  }
  
  async logout(): Promise<void> {
    try {
      await httpClient.post(API_ENDPOINTS.auth.logout)
    } catch (error) {
      // Incluso si falla en el servidor, limpiamos local
      console.warn('Error al hacer logout en servidor:', error)
    } finally {
      this.clearAuthData()
    }
  }
  
  async getProfile(): Promise<UserProfile> {
    const response = await httpClient.get<UserProfile>(
      API_ENDPOINTS.auth.profile
    )
    
    if (response.success && response.data) {
      return response.data
    }
    
    throw new Error(response.message || 'Error al obtener perfil')
  }
  
  private saveUserInfo(userData: LoginResponse): void {
    const userInfo = {
      idUser: userData.idUser,
      name: userData.name,
      email: userData.email,
      rol: userData.rol,
      loginTime: userData.loginTime,
      tokenExpiration: userData.tokenExpiration
    }
    
    localStorage.setItem(STORAGE_KEYS.USER_INFO, JSON.stringify(userInfo))
  }
  
  public getUserInfo(): LoginResponse | null {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.USER_INFO)
      return stored ? JSON.parse(stored) : null
    } catch {
      return null
    }
  }
  
  public getToken(): string | null {
    return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN)
  }
  
  public isAuthenticated(): boolean {
    const token = this.getToken()
    const userInfo = this.getUserInfo()
    
    if (!token || !userInfo) {
      return false
    }
    
    // Verificar si el token ha expirado
    if (userInfo.tokenExpiration) {
      const expiration = new Date(userInfo.tokenExpiration)
      const now = new Date()
      
      if (now >= expiration) {
        this.clearAuthData()
        return false
      }
    }
    
    return true
  }
  
  private clearAuthData(): void {
    httpClient.removeAuthToken()
    localStorage.removeItem(STORAGE_KEYS.USER_INFO)
  }
}

// Singleton instance
export const authService = new AuthService()
export default authService
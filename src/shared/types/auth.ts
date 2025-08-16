export interface AuthState {
  isAuthenticated: boolean
  user: UserInfo | null
  token: string | null
  loading: boolean
  error: string | null
}

export interface UserInfo {
  idUser: number
  name: string
  email: string
  rol: 'Comprador' | 'Administrador'
  loginTime?: string
  tokenExpiration?: string
}

export interface AuthCredentials {
  email: string
  password: string
}

export interface RegisterData {
  name: string
  email: string
  password: string
  rol?: 'Comprador' | 'Administrador'
}
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { authService } from '@services/api/auth-service'
import { AuthState, UserInfo, AuthCredentials, RegisterData } from '@models/auth'
import { LoginResponse, RegisterResponse } from '@models/api'

// Estado inicial
const initialState: AuthState = {
  isAuthenticated: authService.isAuthenticated(),
  user: authService.getUserInfo(),
  token: authService.getToken(),
  loading: false,
  error: null
}

// Async thunks
export const loginAsync = createAsyncThunk(
  'auth/login',
  async (credentials: AuthCredentials, { rejectWithValue }) => {
    try {
      const response = await authService.login(credentials)
      return response
    } catch (error: any) {
      return rejectWithValue(error.message || 'Error en el login')
    }
  }
)

export const registerAsync = createAsyncThunk(
  'auth/register',
  async (data: RegisterData, { rejectWithValue }) => {
    try {
      const response = await authService.register({
        ...data,
        rol: data.rol || 'Comprador'
      })
      return response
    } catch (error: any) {
      return rejectWithValue(error.message || 'Error en el registro')
    }
  }
)

export const logoutAsync = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await authService.logout()
    } catch (error: any) {
      // Incluso si falla, seguimos con el logout local
      return rejectWithValue(error.message || 'Error en el logout')
    }
  }
)

export const checkAuthAsync = createAsyncThunk(
  'auth/checkAuth',
  async (_, { rejectWithValue }) => {
    try {
      if (!authService.isAuthenticated()) {
        throw new Error('No autenticado')
      }
      
      const userInfo = authService.getUserInfo()
      if (!userInfo) {
        throw new Error('No hay información del usuario')
      }
      
      return userInfo
    } catch (error: any) {
      return rejectWithValue(error.message || 'Error al verificar autenticación')
    }
  }
)

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    clearAuth: (state) => {
      state.isAuthenticated = false
      state.user = null
      state.token = null
      state.error = null
      state.loading = false
    }
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(loginAsync.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginAsync.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
        state.loading = false
        state.isAuthenticated = true
        state.user = {
          idUser: action.payload.idUser,
          name: action.payload.name,
          email: action.payload.email,
          rol: action.payload.rol,  // ✅ Ya no necesita casting
          loginTime: action.payload.loginTime,
          tokenExpiration: action.payload.tokenExpiration
        }
        state.token = action.payload.token
        state.error = null
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.loading = false
        state.isAuthenticated = false
        state.user = null
        state.token = null
        state.error = action.payload as string
      })
    
    // Register
    builder
      .addCase(registerAsync.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(registerAsync.fulfilled, (state) => {
        state.loading = false
        state.error = null
      })
      .addCase(registerAsync.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
    
    // Logout
    builder
      .addCase(logoutAsync.pending, (state) => {
        state.loading = true
      })
      .addCase(logoutAsync.fulfilled, (state) => {
        state.loading = false
        state.isAuthenticated = false
        state.user = null
        state.token = null
        state.error = null
      })
      .addCase(logoutAsync.rejected, (state, action) => {
        state.loading = false
        // Incluso si falla, limpiamos el estado local
        state.isAuthenticated = false
        state.user = null
        state.token = null
        state.error = action.payload as string
      })
    
    // Check auth
    builder
      .addCase(checkAuthAsync.fulfilled, (state, action) => {
        state.isAuthenticated = true
        state.user = {
          idUser: action.payload.idUser,
          name: action.payload.name,
          email: action.payload.email,
          rol: action.payload.rol,  // ✅ Ya no necesita casting
          loginTime: action.payload.loginTime,
          tokenExpiration: action.payload.tokenExpiration
        }
        state.token = authService.getToken()
      })
      .addCase(checkAuthAsync.rejected, (state) => {
        state.isAuthenticated = false
        state.user = null
        state.token = null
      })
  }
})

export const { clearError, clearAuth } = authSlice.actions
export default authSlice.reducer
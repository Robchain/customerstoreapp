import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { buyerService } from '@services/api/buyer-service'
import { 
  ProductListItem, 
  ProductDetail, 
  CartItem, 
  WishListItem, 
  AddToCartRequest
} from '@models/api'

interface BuyerState {
  // Products
  products: ProductListItem[]
  productDetail: ProductDetail | null
  productsLoading: boolean
  productsError: string | null
  
  // Cart
  cartItems: CartItem[]
  cartLoading: boolean
  cartError: string | null
  
  // WishList
  wishListItems: WishListItem[]
  wishListLoading: boolean
  wishListError: string | null
  
  // Filters locales (sin servidor)
  searchTerm: string
  selectedCategory: string
  sortBy: string
}

const initialState: BuyerState = {
  products: [],
  productDetail: null,
  productsLoading: false,
  productsError: null,
  
  cartItems: [],
  cartLoading: false,
  cartError: null,
  
  wishListItems: [],
  wishListLoading: false,
  wishListError: null,
  
  searchTerm: '',
  selectedCategory: '',
  sortBy: ''
}

// Async thunks - Products
export const fetchProductsAsync = createAsyncThunk(
  'buyer/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      return await buyerService.getProducts() // Sin filtros
    } catch (error: any) {
      return rejectWithValue(error.message || 'Error al cargar productos')
    }
  }
)

export const fetchProductDetailAsync = createAsyncThunk(
  'buyer/fetchProductDetail',
  async (productId: number, { rejectWithValue }) => {
    try {
      return await buyerService.getProductDetail(productId)
    } catch (error: any) {
      return rejectWithValue(error.message || 'Error al cargar detalle del producto')
    }
  }
)

// Async thunks - Cart
export const fetchCartItemsAsync = createAsyncThunk(
  'buyer/fetchCartItems',
  async (_, { rejectWithValue }) => {
    try {
      return await buyerService.getCartItems()
    } catch (error: any) {
      return rejectWithValue(error.message || 'Error al cargar carrito')
    }
  }
)

export const addToCartAsync = createAsyncThunk(
  'buyer/addToCart',
  async (item: AddToCartRequest, { rejectWithValue, dispatch }) => {
    try {
      await buyerService.addToCart(item)
      // Refrescar carrito después de agregar
      dispatch(fetchCartItemsAsync())
      return item
    } catch (error: any) {
      return rejectWithValue(error.message || 'Error al agregar al carrito')
    }
  }
)

export const removeFromCartAsync = createAsyncThunk(
  'buyer/removeFromCart',
  async ({ productId, supplierId }: { productId: number, supplierId: number }, { rejectWithValue, dispatch }) => {
    try {
      await buyerService.removeFromCart(productId, supplierId)
      // Refrescar carrito después de remover
      dispatch(fetchCartItemsAsync())
      return { productId, supplierId }
    } catch (error: any) {
      return rejectWithValue(error.message || 'Error al remover del carrito')
    }
  }
)

export const clearCartAsync = createAsyncThunk(
  'buyer/clearCart',
  async (_, { rejectWithValue }) => {
    try {
      await buyerService.clearCart()
    } catch (error: any) {
      return rejectWithValue(error.message || 'Error al limpiar carrito')
    }
  }
)

// Async thunks - WishList
export const fetchWishListAsync = createAsyncThunk(
  'buyer/fetchWishList',
  async (_, { rejectWithValue }) => {
    try {
      return await buyerService.getWishList()
    } catch (error: any) {
      return rejectWithValue(error.message || 'Error al cargar lista de deseos')
    }
  }
)

export const addToWishListAsync = createAsyncThunk(
  'buyer/addToWishList',
  async (productId: number, { rejectWithValue, dispatch }) => {
    try {
      await buyerService.addToWishList(productId)
      // Refrescar wishlist después de agregar
      dispatch(fetchWishListAsync())
      return productId
    } catch (error: any) {
      return rejectWithValue(error.message || 'Error al agregar a lista de deseos')
    }
  }
)

export const removeFromWishListAsync = createAsyncThunk(
  'buyer/removeFromWishList',
  async (productId: number, { rejectWithValue, dispatch }) => {
    try {
      await buyerService.removeFromWishList(productId)
      // Refrescar wishlist después de remover
      dispatch(fetchWishListAsync())
      return productId
    } catch (error: any) {
      return rejectWithValue(error.message || 'Error al remover de lista de deseos')
    }
  }
)

// Slice
const buyerSlice = createSlice({
  name: 'buyer',
  initialState,
  reducers: {
    clearProductDetail: (state) => {
      state.productDetail = null
    },
    clearErrors: (state) => {
      state.productsError = null
      state.cartError = null
      state.wishListError = null
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload
    },
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload
    },
    setSortBy: (state, action: PayloadAction<string>) => {
      state.sortBy = action.payload
    },
    resetBuyerState: () => initialState
  },
  extraReducers: (builder) => {
    // Products
    builder
      .addCase(fetchProductsAsync.pending, (state) => {
        state.productsLoading = true
        state.productsError = null
      })
      .addCase(fetchProductsAsync.fulfilled, (state, action) => {
        state.productsLoading = false
        state.products = action.payload
      })
      .addCase(fetchProductsAsync.rejected, (state, action) => {
        state.productsLoading = false
        state.productsError = action.payload as string
      })
    
    // Product Detail
    builder
      .addCase(fetchProductDetailAsync.pending, (state) => {
        state.productsLoading = true
        state.productsError = null
      })
      .addCase(fetchProductDetailAsync.fulfilled, (state, action) => {
        state.productsLoading = false
        state.productDetail = action.payload
      })
      .addCase(fetchProductDetailAsync.rejected, (state, action) => {
        state.productsLoading = false
        state.productsError = action.payload as string
      })
    
    // Cart
    builder
      .addCase(fetchCartItemsAsync.pending, (state) => {
        state.cartLoading = true
        state.cartError = null
      })
      .addCase(fetchCartItemsAsync.fulfilled, (state, action) => {
        state.cartLoading = false
        state.cartItems = action.payload
      })
      .addCase(fetchCartItemsAsync.rejected, (state, action) => {
        state.cartLoading = false
        state.cartError = action.payload as string
      })
    
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.cartLoading = true
        state.cartError = null
      })
      .addCase(addToCartAsync.fulfilled, (state) => {
        state.cartLoading = false
      })
      .addCase(addToCartAsync.rejected, (state, action) => {
        state.cartLoading = false
        state.cartError = action.payload as string
      })
    
    builder
      .addCase(removeFromCartAsync.pending, (state) => {
        state.cartLoading = true
        state.cartError = null
      })
      .addCase(removeFromCartAsync.fulfilled, (state) => {
        state.cartLoading = false
      })
      .addCase(removeFromCartAsync.rejected, (state, action) => {
        state.cartLoading = false
        state.cartError = action.payload as string
      })
    
    builder
      .addCase(clearCartAsync.pending, (state) => {
        state.cartLoading = true
        state.cartError = null
      })
      .addCase(clearCartAsync.fulfilled, (state) => {
        state.cartLoading = false
        state.cartItems = []
      })
      .addCase(clearCartAsync.rejected, (state, action) => {
        state.cartLoading = false
        state.cartError = action.payload as string
      })
    
    // WishList
    builder
      .addCase(fetchWishListAsync.pending, (state) => {
        state.wishListLoading = true
        state.wishListError = null
      })
      .addCase(fetchWishListAsync.fulfilled, (state, action) => {
        state.wishListLoading = false
        state.wishListItems = action.payload
      })
      .addCase(fetchWishListAsync.rejected, (state, action) => {
        state.wishListLoading = false
        state.wishListError = action.payload as string
      })
    
    builder
      .addCase(addToWishListAsync.pending, (state) => {
        state.wishListLoading = true
        state.wishListError = null
      })
      .addCase(addToWishListAsync.fulfilled, (state) => {
        state.wishListLoading = false
      })
      .addCase(addToWishListAsync.rejected, (state, action) => {
        state.wishListLoading = false
        state.wishListError = action.payload as string
      })
    
    builder
      .addCase(removeFromWishListAsync.pending, (state) => {
        state.wishListLoading = true
        state.wishListError = null
      })
      .addCase(removeFromWishListAsync.fulfilled, (state) => {
        state.wishListLoading = false
      })
      .addCase(removeFromWishListAsync.rejected, (state, action) => {
        state.wishListLoading = false
        state.wishListError = action.payload as string
      })
  }
})

export const { 
  clearProductDetail, 
  clearErrors, 
  setSearchTerm,
  setSelectedCategory,
  setSortBy,
  resetBuyerState 
} = buyerSlice.actions

export default buyerSlice.reducer
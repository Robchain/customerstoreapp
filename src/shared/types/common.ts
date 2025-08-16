export interface LoadingState {
  isLoading: boolean
  error: string | null
}

export interface Option {
  value: string | number
  label: string
  disabled?: boolean
}

export interface TableColumn<T = any> {
  key: keyof T
  title: string
  sortable?: boolean
  render?: (value: any, record: T) => React.ReactNode
}

export interface PaginationProps {
  currentPage: number
  pageSize: number
  totalItems: number
  onPageChange: (page: number) => void
  onPageSizeChange?: (size: number) => void
}

export interface FilterState {
  [key: string]: any
}

export type SortDirection = 'asc' | 'desc'

export interface SortState {
  field: string
  direction: SortDirection
}
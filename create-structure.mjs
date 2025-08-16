import fs from 'fs';
import path from 'path';

console.log('🚀 Creando estructura de carpetas para React TypeScript Clean Architecture...');

const directories = [
    'src/presentation/components/common',
    'src/presentation/components/auth',
    'src/presentation/components/layout',
    'src/presentation/pages/auth',
    'src/presentation/pages/dashboard',
    'src/presentation/pages/buyer',
    'src/presentation/pages/admin',
    'src/presentation/pages/common',
    'src/presentation/styles',
    'src/infrastructure/services/api',
    'src/infrastructure/services/storage',
    'src/infrastructure/store/slices',
    'src/infrastructure/store/middleware',
    'src/infrastructure/config',
    'src/domain/entities',
    'src/domain/repositories',
    'src/domain/use-cases/auth',
    'src/domain/use-cases/buyer',
    'src/domain/use-cases/admin',
    'src/shared/types',
    'src/shared/constants',
    'src/shared/utils',
    'src/shared/hooks',
    'src/shared/context',
    'src/shared/styles',
    'tests/__mocks__',
    'tests/components',
    'tests/services',
    'tests/utils',
    'docs'
];

const indexFiles = {
    'src/shared/types/index.ts': `// Barrel exports for types
export * from './api'
export * from './auth'
export * from './common'
export * from './components'`,

    'src/shared/utils/index.ts': `// Barrel exports for utils
export * from './storage'
export * from './validators'
export * from './formatters'
export * from './http-utils'
export * from './date-utils'
export * from './string-utils'`,

    'src/shared/hooks/index.ts': `// Barrel exports for hooks
export * from './redux-hooks'
export * from './use-auth'
export * from './use-form'
export * from './use-api'
export * from './use-local-storage'
export * from './use-debounce'`,

    'src/shared/constants/index.ts': `// Barrel exports for constants
export * from './api'
export * from './app'
export * from './routes'
export * from './validation'`,

    'src/presentation/components/index.ts': `// Barrel exports for components
export * from './common'
export * from './auth'
export * from './layout'`,

    'src/presentation/components/common/index.ts': `// Barrel exports for common components
export { default as LoadingSpinner } from './LoadingSpinner'
export { default as ErrorAlert } from './ErrorAlert'
export { default as ProtectedRoute } from './ProtectedRoute'`,

    'src/presentation/components/auth/index.ts': `// Barrel exports for auth components
export { default as LoginForm } from './LoginForm'
export { default as RegisterForm } from './RegisterForm'`,

    'src/presentation/components/layout/index.ts': `// Barrel exports for layout components
export { default as Header } from './Header'
export { default as Footer } from './Footer'
export { default as Sidebar } from './Sidebar'`,

    'src/presentation/pages/index.ts': `// Barrel exports for pages
export * from './auth'
export * from './dashboard'
export * from './buyer'
export * from './admin'
export * from './common'`,

    'src/presentation/pages/auth/index.ts': `// Barrel exports for auth pages
export { default as LoginPage } from './LoginPage'`,

    'src/presentation/pages/dashboard/index.ts': `// Barrel exports for dashboard pages
export { default as DashboardPage } from './DashboardPage'`,

    'src/presentation/pages/buyer/index.ts': `// Barrel exports for buyer pages
export { default as ProductsPage } from './ProductsPage'
export { default as CartPage } from './CartPage'
export { default as WishListPage } from './WishListPage'`,

    'src/presentation/pages/admin/index.ts': `// Barrel exports for admin pages
export { default as ProductManagementPage } from './ProductManagementPage'
export { default as SupplierManagementPage } from './SupplierManagementPage'
export { default as LotManagementPage } from './LotManagementPage'`,

    'src/presentation/pages/common/index.ts': `// Barrel exports for common pages
export { default as NotFoundPage } from './NotFoundPage'
export { default as ErrorPage } from './ErrorPage'`,

    'src/infrastructure/services/index.ts': `// Barrel exports for services
export * from './api'
export * from './storage'`,

    'src/infrastructure/services/api/index.ts': `// Barrel exports for API services
export * from './http-client'
export * from './auth-service'
export * from './buyer-service'
export * from './admin-service'`,

    'src/infrastructure/services/storage/index.ts': `// Barrel exports for storage services
export * from './local-storage'
export * from './session-storage'`,

    'src/infrastructure/store/index.ts': `// Barrel exports for store
export * from './store'
export * from './types'
export * from './slices'`,

    'src/infrastructure/store/slices/index.ts': `// Barrel exports for slices
export * from './auth-slice'
export * from './buyer-slice'
export * from './admin-slice'`,

    'src/domain/entities/index.ts': `// Barrel exports for entities
export * from './User'
export * from './Product'
export * from './Order'`,

    'src/domain/repositories/index.ts': `// Barrel exports for repositories
export * from './IAuthRepository'
export * from './IProductRepository'`,

    'src/domain/use-cases/index.ts': `// Barrel exports for use cases
export * from './auth'
export * from './buyer'
export * from './admin'`,

    'src/shared/index.ts': `// Barrel exports for shared
export * from './types'
export * from './constants'
export * from './utils'
export * from './hooks'`,

    'src/presentation/index.ts': `// Barrel exports for presentation
export * from './components'
export * from './pages'`,

    'src/infrastructure/index.ts': `// Barrel exports for infrastructure
export * from './services'
export * from './store'`,

    'src/domain/index.ts': `// Barrel exports for domain
export * from './entities'
export * from './repositories'
export * from './use-cases'`,

    'src/index.ts': `// Main barrel export
export * from './presentation'
export * from './infrastructure'
export * from './domain'
export * from './shared'`
};

// Crear directorios
console.log('📁 Creando directorios...');
directories.forEach(dir => {
    const fullPath = path.resolve(dir);
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(`✅ ${dir}`);
});

console.log('\n📄 Creando archivos index.ts...');

// Crear archivos index.ts
Object.entries(indexFiles).forEach(([filePath, content]) => {
    const fullPath = path.resolve(filePath);
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`✅ ${filePath}`);
});

// Crear archivo de configuración adicional
const viteEnvContent = `/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
  readonly VITE_APP_NAME: string
  readonly VITE_APP_VERSION: string
  readonly VITE_NODE_ENV: string
  readonly VITE_DEBUG: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}`;

fs.writeFileSync('src/vite-env.d.ts', viteEnvContent, 'utf8');

console.log('\n🎯 Creando archivos de configuración adicionales...');

// Crear .env.example
const envExampleContent = `# API Configuration
VITE_API_BASE_URL=https://localhost:5100/api
VITE_APP_NAME=Tienda Web Base
VITE_APP_VERSION=1.0.0

# Environment
VITE_NODE_ENV=development

# Debug
VITE_DEBUG=true`;

fs.writeFileSync('.env.example', envExampleContent, 'utf8');
console.log('✅ .env.example');

// Crear README.md
const readmeContent = `# Tienda Web Base - TypeScript Clean Architecture

## 🏗️ Arquitectura

Esta aplicación sigue los principios de Clean Architecture con TypeScript:

### 📁 Estructura de Carpetas

\`\`\`
src/
├── presentation/     # 🎨 UI Components & Pages
├── infrastructure/   # 🔧 Services & Store  
├── domain/          # 🏛️ Business Logic
└── shared/          # 🛠️ Utilities & Constants
\`\`\`

### 🚀 Comandos

\`\`\`bash
npm run dev          # Desarrollo
npm run build        # Construcción
npm run type-check   # Verificar tipos
npm run lint         # Linting
\`\`\`

### 🔧 Tecnologías

- React 18 + TypeScript
- Vite
- Redux Toolkit
- React Router DOM
- Axios
- Bootstrap + Reactstrap

## 📝 Uso

1. Instalar dependencias: \`npm install\`
2. Configurar \`.env\` basado en \`.env.example\`
3. Ejecutar: \`npm run dev\`

## 🔄 Para Duplicar

Esta base se puede duplicar para crear:
- **App Comprador**: Usar endpoints buyer
- **App Administrador**: Usar endpoints admin
`;

fs.writeFileSync('README.md', readmeContent, 'utf8');
console.log('✅ README.md');

console.log('\n🎉 ¡Estructura creada exitosamente!');
console.log('\n📋 Próximos pasos:');
console.log('1. npm install');
console.log('2. Copiar .env.example a .env y configurar');
console.log('3. npm run dev');
console.log('\n🚀 ¡Tu proyecto TypeScript Clean Architecture está listo!');
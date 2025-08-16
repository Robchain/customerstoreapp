# Tienda Web Base - TypeScript Clean Architecture

## 🏗️ Arquitectura

Esta aplicación sigue los principios de Clean Architecture con TypeScript:

### 📁 Estructura de Carpetas

```
src/
├── presentation/     # 🎨 UI Components & Pages
├── infrastructure/   # 🔧 Services & Store  
├── domain/          # 🏛️ Business Logic
└── shared/          # 🛠️ Utilities & Constants
```

### 🚀 Comandos

```bash
npm run dev          # Desarrollo
npm run build        # Construcción
npm run type-check   # Verificar tipos
npm run lint         # Linting
```

### 🔧 Tecnologías

- React 18 + TypeScript
- Vite
- Redux Toolkit
- React Router DOM
- Axios
- Bootstrap + Reactstrap

## 📝 Uso

1. Instalar dependencias: `npm install`
2. Configurar `.env` basado en `.env.example`
3. Ejecutar: `npm run dev`

## 🔄 Para Duplicar

Esta base se puede duplicar para crear:
- **App Comprador**: Usar endpoints buyer
- **App Administrador**: Usar endpoints admin

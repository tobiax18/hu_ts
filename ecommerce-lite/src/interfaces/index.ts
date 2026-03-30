/**
 * @file interfaces/index.ts
 * @description Definición centralizada de todas las interfaces del sistema e-commerce.
 *
 * ¿Por qué centralizar aquí?
 * - Evita duplicación y mantiene una única fuente de verdad (Single Source of Truth).
 * - Facilita el refactoring: si cambia una interfaz, el compilador avisa en todos los usos.
 * - Mejora la experiencia del desarrollador con autocompletado en el editor.
 */

// ─────────────────────────────────────────────
// INTERFACES AUXILIARES
// ─────────────────────────────────────────────

/**
 * Dimensiones físicas de un producto (útil para cálculo de envío).
 * Todas las medidas en centímetros y gramos.
 */
export interface Dimensions {
  width: number;   // Ancho en cm
  height: number;  // Alto en cm
  depth: number;   // Profundidad en cm
  weight: number;  // Peso en gramos
}

/**
 * Dirección postal del usuario.
 * Se separa en su propia interfaz para reutilizarla
 * en facturas, envíos, etc.
 */
export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

// ─────────────────────────────────────────────
// ENUMS — Valores fijos del dominio
// ─────────────────────────────────────────────

/**
 * Roles posibles de un usuario en el sistema.
 * Usar un enum (o union type) evita strings "mágicos" en el código.
 */
export type UserRole = 'admin' | 'customer' | 'vendor' | 'support';

/**
 * Categorías de productos disponibles en el e-commerce.
 */
export type ProductCategory =
  | 'Electronics'
  | 'Clothing'
  | 'Home & Garden'
  | 'Sports'
  | 'Books'
  | 'Beauty'
  | 'Toys'
  | 'Automotive';

// ─────────────────────────────────────────────
// INTERFAZ PRINCIPAL: Product
// ─────────────────────────────────────────────

/**
 * Representa un producto en el catálogo del e-commerce.
 *
 * Propiedades obligatorias: datos críticos para mostrar y vender el producto.
 * Propiedades opcionales (?): datos enriquecidos que pueden no estar siempre disponibles.
 */
export interface Product {
  // — Identificación —
  sku: string;          // Stock Keeping Unit: identificador único del producto
  name: string;         // Nombre visible en el catálogo
  brand: string;        // Marca del fabricante

  // — Inventario y precio —
  quantity: number;     // Unidades disponibles en stock
  price: number;        // Precio en USD (sin formato, ej: 29.99)

  // — Estado y clasificación —
  isActive: boolean;    // false = producto oculto/descontinuado
  category: ProductCategory; // Categoría principal
  imageUrl: string;     // URL de la imagen principal

  // — Metadatos —
  createdAt: Date;      // Fecha de alta del producto

  // — Propiedades opcionales (enriquecimiento del catálogo) —
  description?: string;     // Descripción larga del producto
  tags?: string[];           // Etiquetas para búsqueda y filtrado
  dimensions?: Dimensions;  // Dimensiones físicas (necesario para envío)
  discount?: number;         // Porcentaje de descuento activo (0–100)
  rating?: number;           // Valoración media (0.0–5.0)
  reviewCount?: number;      // Número de reseñas
}

// ─────────────────────────────────────────────
// INTERFAZ PRINCIPAL: User
// ─────────────────────────────────────────────

/**
 * Representa un usuario registrado en el sistema.
 *
 * Nota de diseño: separamos `fullName` de first/last name
 * para simplificar la interfaz. En un sistema más complejo,
 * tendríamos firstName y lastName por separado.
 */
export interface User {
  // — Identificación —
  id: string;           // UUID único del usuario (ej: "usr_abc123")
  fullName: string;     // Nombre completo para mostrar
  email: string;        // Email único — también usado para login

  // — Estado y permisos —
  isActive: boolean;    // false = cuenta suspendida
  role: UserRole;       // Nivel de acceso al sistema

  // — Información de contacto —
  address: Address;     // Dirección principal de envío

  // — Metadatos —
  createdAt: Date;      // Fecha de registro

  // — Opcionales —
  avatarUrl?: string;   // Foto de perfil
  phone?: string;       // Teléfono de contacto
}

// ─────────────────────────────────────────────
// TIPOS DE PROPS PARA COMPONENTES REACT
// ─────────────────────────────────────────────

/**
 * Props del componente ProductCard.
 * Usamos Pick para seleccionar solo los campos que el componente necesita
 * — principio de mínima dependencia.
 */
export interface ProductCardProps {
  product: Product;
  onAddToCart?: (sku: string) => void; // Callback opcional para acción de compra
  onWishlist?: (sku: string) => void;  // Callback opcional para lista de deseos
}

/**
 * Props del componente ProductList.
 */
export interface ProductListProps {
  products: Product[];
  title?: string;           // Título de la sección (opcional)
  emptyMessage?: string;    // Mensaje cuando no hay productos
}

/**
 * Props del componente UserCard.
 */
export interface UserCardProps {
  user: User;
  showRole?: boolean;       // Controla si se muestra el badge de rol
  compact?: boolean;        // Versión compacta para sidebars
}
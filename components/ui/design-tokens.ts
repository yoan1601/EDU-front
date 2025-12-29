// Design system constants for consistent UI
export const designTokens = {
  colors: {
    brand: {
      primary: 'brand-600',
      primaryHover: 'brand-700',
      primaryLight: 'brand-50',
      primaryDark: 'brand-900',
    },
    semantic: {
      success: 'success-500',
      successLight: 'success-50',
      warning: 'warning-500',
      warningLight: 'warning-50',
      error: 'error-500',
      errorLight: 'error-50',
    },
    neutral: {
      background: 'neutral-50',
      surface: 'white',
      border: 'neutral-200',
      borderHover: 'neutral-300',
      text: {
        primary: 'neutral-900',
        secondary: 'neutral-600',
        muted: 'neutral-500',
      },
    },
  },
  spacing: {
    section: 'py-8 px-6',
    card: 'p-6',
    cardCompact: 'p-4',
    button: 'px-4 py-2',
    buttonLarge: 'px-6 py-3',
  },
  shadows: {
    card: 'shadow-soft',
    cardHover: 'shadow-medium',
    modal: 'shadow-strong',
    focus: 'shadow-glow',
  },
  radii: {
    card: 'rounded-xl',
    button: 'rounded-lg',
    input: 'rounded-lg',
    badge: 'rounded-full',
  },
  typography: {
    heading: {
      h1: 'text-3xl font-bold text-neutral-900',
      h2: 'text-2xl font-semibold text-neutral-900',
      h3: 'text-xl font-semibold text-neutral-900',
      h4: 'text-lg font-medium text-neutral-900',
    },
    body: {
      large: 'text-lg text-neutral-700',
      base: 'text-base text-neutral-700',
      small: 'text-sm text-neutral-600',
      caption: 'text-xs text-neutral-500 uppercase tracking-wide',
    },
  },
} as const;

// Animation classes
export const animations = {
  fadeIn: 'animate-in fade-in duration-200',
  slideIn: 'animate-in slide-in-from-bottom-4 duration-200',
  scaleIn: 'animate-in zoom-in-95 duration-200',
} as const;

// Component variant classes
export const variants = {
  button: {
    primary: `bg-brand-600 hover:bg-brand-700 text-white border-transparent shadow-soft hover:shadow-medium transition-all duration-200`,
    secondary: `bg-white hover:bg-neutral-50 text-neutral-700 border-neutral-200 hover:border-neutral-300 shadow-soft hover:shadow-medium transition-all duration-200`,
    ghost: `bg-transparent hover:bg-neutral-100 text-neutral-600 hover:text-neutral-900 border-transparent transition-all duration-200`,
    danger: `bg-error-500 hover:bg-error-600 text-white border-transparent shadow-soft hover:shadow-medium transition-all duration-200`,
  },
  input: {
    default: `bg-white border-neutral-200 hover:border-neutral-300 focus:border-brand-500 focus:ring-brand-500/20 text-neutral-900 placeholder-neutral-500 transition-all duration-200`,
    error: `bg-white border-error-300 focus:border-error-500 focus:ring-error-500/20 text-neutral-900 placeholder-neutral-500`,
  },
  card: {
    default: `bg-white border border-neutral-200 shadow-soft hover:shadow-medium transition-all duration-200`,
    interactive: `bg-white border border-neutral-200 shadow-soft hover:shadow-medium hover:border-neutral-300 cursor-pointer transition-all duration-200`,
  },
  badge: {
    default: `bg-neutral-100 text-neutral-700 border border-neutral-200`,
    success: `bg-success-100 text-success-700 border border-success-200`,
    warning: `bg-warning-100 text-warning-700 border border-warning-200`,
    error: `bg-error-100 text-error-700 border border-error-200`,
    brand: `bg-brand-100 text-brand-700 border border-brand-200`,
  },
} as const;

// Layout constants
export const layout = {
  sidebar: {
    width: 'w-64',
    mobileWidth: 'w-80',
  },
  header: {
    height: 'h-16',
  },
  container: {
    maxWidth: 'max-w-7xl',
    padding: 'px-6 lg:px-8',
  },
} as const;
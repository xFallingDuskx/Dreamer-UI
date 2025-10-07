import { SymbolProps } from '@moondreamsdev/dreamer-ui/symbols';

export function GoogleIcon({ size = 20, className = 'inline', ...props }: SymbolProps) {
  return (
    <svg
      {...props}
      width={size}
      height={size}
      className={className}
      viewBox='0 0 48 48'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g>
        <path
          fill='#4285F4'
          d='M24 9.5c3.54 0 6.7 1.22 9.19 3.23l6.85-6.85C35.64 2.36 30.13 0 24 0 14.82 0 6.73 5.48 2.69 13.44l7.98 6.2C12.36 13.13 17.74 9.5 24 9.5z'
        />
        <path
          fill='#34A853'
          d='M46.1 24.55c0-1.64-.15-3.22-.42-4.74H24v9.01h12.42c-.54 2.9-2.18 5.36-4.65 7.01l7.2 5.6C43.98 37.13 46.1 31.36 46.1 24.55z'
        />
        <path
          fill='#FBBC05'
          d='M10.67 28.65A14.5 14.5 0 0 1 9.5 24c0-1.62.28-3.19.77-4.65l-7.98-6.2A23.97 23.97 0 0 0 0 24c0 3.87.92 7.54 2.54 10.85l8.13-6.2z'
        />
        <path
          fill='#EA4335'
          d='M24 48c6.13 0 11.27-2.03 15.03-5.53l-7.2-5.6c-2.01 1.35-4.59 2.15-7.83 2.15-6.26 0-11.64-3.63-13.33-8.85l-8.13 6.2C6.73 42.52 14.82 48 24 48z'
        />
        <path fill='none' d='M0 0h48v48H0z' />
      </g>
    </svg>
  );
}

export function GitHubIcon({ size = 20, color = 'currentColor', className = 'inline', ...props }: SymbolProps) {
  return (
    <svg
      {...props}
      width={size}
      height={size}
      className={className}
      fill={color}
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        d='M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z'
        clipRule='evenodd'
      />
    </svg>
  );
}

export function FacebookIcon({ size = 20, color = 'currentColor', className = 'inline', ...props }: SymbolProps) {
  return (
    <svg
      {...props}
      width={size}
      height={size}
      className={className}
      fill={color}
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' />
    </svg>
  );
}

export function AppleIcon({ size = 20, color = 'currentColor', className = 'inline', ...props }: SymbolProps) {
  return (
    <svg
      {...props}
      width={size}
      height={size}
      className={className}
      fill={color}
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z' />
    </svg>
  );
}
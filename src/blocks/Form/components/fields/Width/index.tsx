export const Width: React.FC<{
  children: React.ReactNode
  className?: string
  width?: number | string
}> = ({ children, className, width }) => {
  const calculatedWidth = typeof width === 'number' ? `${width}%` : width;

  return (
    <div
      className={`w-full px-2 mb-4 sm:w-[var(--field-width)] ${className || ''}`}
      style={{
        '--field-width': calculatedWidth || '100%'
      } as React.CSSProperties}
    >
      {children}
    </div>
  )
}
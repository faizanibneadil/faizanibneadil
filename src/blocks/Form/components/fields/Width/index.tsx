export const Width: React.FC<{
  children: React.ReactNode
  className?: string
  width?: number | string
}> = ({ children, className, width }) => {
  const calculatedWidth = typeof width === 'number' ? `${width}%` : width;

  return (
    <div
      className={`w-full ${className || ''} px-2 mb-4`}
      style={{
        flex: calculatedWidth ? `0 0 ${calculatedWidth}` : '0 0 100%',
        maxWidth: calculatedWidth || '100%'
      }}
    >
      {children}
    </div>
  )
}
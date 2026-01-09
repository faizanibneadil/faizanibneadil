import { cn } from "@/lib/utils"

export const Width: React.FC<{
  children: React.ReactNode
  className?: string
  width?: number | string
}> = ({ children, className, width }) => {

  const style = {
    '--field-width': typeof width === 'number' ? `${width}%` : width || '100%'
  } as React.CSSProperties

  return (
    <div className={cn('w-full px-2 mb-4 sm:w-[var(--field-width)]', className)} style={style}>
      {children}
    </div>
  )
}
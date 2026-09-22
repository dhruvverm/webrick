import { ArrowRight, ArrowUpRight } from 'lucide-react'

/**
 * Button — `as` can be 'a' (default) or 'button'.
 * variants: primary | secondary | ghost
 * icon: 'arrow' | 'diag' | null
 */
export default function Button({
  as = 'a',
  variant = 'primary',
  icon = 'arrow',
  className = '',
  children,
  ...rest
}) {
  const Comp = as
  const Icon = icon === 'diag' ? ArrowUpRight : icon === 'arrow' ? ArrowRight : null
  return (
    <Comp className={`btn btn-${variant} ${className}`} {...rest}>
      <span className="relative z-10">{children}</span>
      {Icon && (
        <Icon
          size={17}
          strokeWidth={2.2}
          className={`relative z-10 btn-icon ${icon === 'diag' ? 'btn-icon-diag' : ''}`}
        />
      )}
    </Comp>
  )
}

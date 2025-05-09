import { cn } from '@/lib/utils'
import { ReactNode } from 'react'
import { Button } from '@/components/ui/button'

interface FeatureCardProps {
  icon: ReactNode
  title: string
  description: string
  borderColor?: string
  buttonLabel: string
}

export function FeatureCard({
  icon,
  title,
  description,
  borderColor = 'border-green-800',
  buttonLabel,
}: FeatureCardProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center text-center gap-4 rounded-2xl border p-6 shadow-md transition hover:scale-[1.02] hover:shadow-xl bg-[#0a0a0a]',
        borderColor
      )}
    >
      <div className="text-5xl">{icon}</div>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="text-sm text-white/80 max-w-xs">{description}</p>
      <Button
        variant="outline"
        className="mt-2 border-green-500 text-green-300 hover:bg-green-800/10 rounded-full px-6 py-2"
      >
        {buttonLabel}
      </Button>
    </div>
  )
}

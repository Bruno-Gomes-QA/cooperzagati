import { Inbox } from 'lucide-react'

export function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex items-center justify-center h-[60vh]">
      <div className="flex flex-col items-center text-white/70">
        <Inbox className="w-16 h-16 mb-4 text-green-600" />
        <p className="text-lg font-medium">{message}</p>
      </div>
    </div>
  )
}

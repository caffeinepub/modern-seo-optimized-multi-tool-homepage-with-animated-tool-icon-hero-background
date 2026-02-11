import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ToolIconProps {
  icon: LucideIcon;
  className?: string;
}

export default function ToolIcon({ icon: Icon, className }: ToolIconProps) {
  return (
    <div 
      className={cn(
        'tool-icon-pack',
        className
      )}
    >
      <Icon className="w-6 h-6 text-white" strokeWidth={2} />
    </div>
  );
}

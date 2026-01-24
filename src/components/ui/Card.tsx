import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    'rounded-xl border border-gray-100 bg-white p-6 shadow-lg shadow-gray-200/50',
                    className
                )}
                {...props}
            />
        );
    }
);
Card.displayName = 'Card';

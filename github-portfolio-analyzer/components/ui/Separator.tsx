
import React from 'react';

const Separator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { orientation?: 'horizontal' | 'vertical' }
>(({ className, orientation = 'horizontal', ...props }, ref) => (
  <div
    ref={ref}
    className={`${
      orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]'
    } shrink-0 bg-border ${className}`}
    {...props}
  />
));
Separator.displayName = 'Separator';

export { Separator };

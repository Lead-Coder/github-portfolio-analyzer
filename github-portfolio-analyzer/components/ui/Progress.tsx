
import React from 'react';
import { motion } from 'framer-motion';

const Progress = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { value?: number }
>(({ className, value, ...props }, ref) => (
  <div
    ref={ref}
    className={`relative h-4 w-full overflow-hidden rounded-full bg-secondary ${className}`}
    {...props}
  >
    <motion.div
      className="h-full w-full flex-1 bg-primary transition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      initial={{ width: 0 }}
      animate={{ width: `${value || 0}%` }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    />
  </div>
));
Progress.displayName = 'Progress';

export { Progress };

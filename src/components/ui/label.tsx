'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import * as LabelPrimitive from '@radix-ui/react-label';

import { type VariantProps, cva } from 'class-variance-authority';

const labelVariants = cva('peer-disabled:opacity-70 font-medium text-sm leading-none peer-disabled:cursor-not-allowed');

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root ref={ref} className={cn(labelVariants(), className)} {...props} />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };

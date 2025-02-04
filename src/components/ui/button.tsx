import { TextClassContext } from '@/components/ui/text';
import { cn } from '@/lib/rnr/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { ActivityIndicator, Pressable } from 'react-native';

const buttonVariants = cva('group flex items-center justify-center rounded-md', {
	variants: {
		variant: {
			default: 'bg-primary active:opacity-90',
			destructive: 'bg-destructive active:opacity-90',
			outline: 'border border-input bg-background active:bg-accent',
			secondary: 'bg-secondary web:hover:opacity-80 active:opacity-80',
			ghost: 'active:bg-accent',
			link: '',
		},
		size: {
			default: 'h-10 px-4 py-2 native:h-12 native:px-5 native:py-3',
			sm: 'h-9 rounded-md px-3',
			lg: 'h-11 rounded-md px-8 native:h-14',
			icon: 'h-10 w-10',
		},
	},
	defaultVariants: {
		variant: 'default',
		size: 'default',
	},
});

const buttonTextVariants = cva('text-base font-medium text-foreground', {
	variants: {
		variant: {
			default: 'text-primary-foreground',
			destructive: 'text-destructive-foreground',
			outline: 'group-active:text-accent-foreground',
			secondary: 'text-secondary-foreground group-active:text-secondary-foreground',
			ghost: 'group-active:text-accent-foreground',
			link: 'text-primary group-active:underline',
		},
		size: {
			default: '',
			sm: '',
			lg: 'text-lg',
			icon: '',
		},
	},
	defaultVariants: {
		variant: 'default',
		size: 'default',
	},
});

type ButtonProps = {
	isLoading?: boolean;
} & React.ComponentPropsWithoutRef<typeof Pressable> &
	VariantProps<typeof buttonVariants>;

const Button = React.forwardRef<React.ElementRef<typeof Pressable>, ButtonProps>(
	({ className, variant, size, disabled, isLoading, children, ...props }, ref) => {
		return (
			<TextClassContext.Provider value={buttonTextVariants({ variant, size })}>
				<Pressable
					aria-busy={isLoading}
					disabled={disabled || isLoading}
					className={cn(disabled && 'opacity-50', buttonVariants({ variant, size, className }))}
					ref={ref}
					role='button'
					{...props}
				>
					{isLoading ? <ActivityIndicator color={'rgba(255, 255, 255, 0.8)'} /> : children}
				</Pressable>
			</TextClassContext.Provider>
		);
	}
);

Button.displayName = 'Button';

export { Button, buttonTextVariants, buttonVariants };
export type { ButtonProps };

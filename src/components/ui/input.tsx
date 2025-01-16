import { cn } from '@/lib/rnr/utils';
import * as React from 'react';
import { TextInput, type TextInputProps } from 'react-native';

const Input = React.forwardRef<React.ElementRef<typeof TextInput>, TextInputProps>(
	({ className, placeholderClassName, ...props }, ref) => {
		return (
			<TextInput
				ref={ref}
				className={cn(
					'h-16 rounded-lg border border-input bg-transparent px-3 text-base lg:text-sm text-lg leading-[1.25] text-foreground placeholder:text-muted-foreground file:border-0 file:bg-transparent file:font-medium',
					props.editable === false && 'opacity-50',
					className
				)}
				placeholderClassName={cn('text-muted-foreground', placeholderClassName)}
				{...props}
			/>
		);
	}
);

Input.displayName = 'Input';

export { Input };

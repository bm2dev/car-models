import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Muted } from '@/components/ui/typography';
import React from 'react';
import { Controller, FieldErrors, FieldValues, UseControllerProps } from 'react-hook-form';
import { TextInputProps, View } from 'react-native';

export type ControlledInputProps<FormType extends FieldValues = FieldValues> = {
	label?: string;
	errors?: FieldErrors<FormType>;
} & Omit<TextInputProps, 'editable' | 'onChangeText' | 'value'> &
	UseControllerProps<FormType>;

export function ControlledInput<FormType extends FieldValues>({
	control,
	name,
	rules,
	disabled,
	defaultValue,
	shouldUnregister,
	label,
	errors,
	...textInputProps
}: ControlledInputProps<FormType>) {
	return (
		<Controller
			control={control}
			name={name}
			rules={rules}
			disabled={disabled}
			defaultValue={defaultValue}
			shouldUnregister={shouldUnregister}
			render={({ field: { name, value, disabled, onChange, onBlur, ref } }) => (
				<View className='gap-1'>
					{label && <Label nativeID={name}>{label}</Label>}
					<Input
						{...textInputProps}
						aria-labelledby={name}
						value={value}
						editable={!disabled}
						onChangeText={onChange}
						onBlur={onBlur}
						ref={ref}
					/>
					{!!errors?.[name]?.message && (
						<Muted className='text-destructive'>{String(errors[name].message)}</Muted>
					)}
				</View>
			)}
		/>
	);
}

export interface LanguageSelectorProps {
    modelValue: string;
    options: Array<string>
}

export interface LanguageSelectorEmits {
    (e: 'update:modelValue', value: string): void;
}
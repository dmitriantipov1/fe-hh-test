export interface RunButtonProps {
    canRunCode: boolean;
    isLoading: boolean;
}

export interface RunButtonEmits {
    (e: 'on-click'): void;
}
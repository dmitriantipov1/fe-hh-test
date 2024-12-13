import {Theme} from "~/composables/types";

interface UseToggleComposable {
    theme: Ref<Theme>;
    setTheme: () => void;
}

export function useToggler(): UseToggleComposable {
    const theme = ref<Theme>(Theme.WHITE);

    function setTheme(): void {
        theme.value = theme.value === Theme.WHITE ? Theme.DARK : Theme.WHITE;
    }

    return {
        theme,
        setTheme
    }
}
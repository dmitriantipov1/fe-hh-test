import type {Theme} from "~/composables/types";

export interface TogglerEmits {
    (e: 'change-theme', theme: Theme): void;
}
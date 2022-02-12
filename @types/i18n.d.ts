import { useI18N } from "@/plugins/i18n/"

type TranslationDictionary = ReturnType<typeof useI18N>;
type TranslatorFunction = (key: string, replacements?: Record<string, string | number>) => string;

export type i18n = TranslationDictionary & TranslatorFunction;

declare module '@vue/runtime-core' {
    export interface ComponentCustomProperties {
        $t: i18n;
    }
}
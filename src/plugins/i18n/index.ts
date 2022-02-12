import { reactive, Plugin } from "vue";
import _ from "lodash";
import { TranslationDictionary, TranslatorFunction } from "@/i18n";
import dictionary from "./dictionary.json"

export function useI18N() {
    const translationDictionary = reactive({ ...dictionary });
    return translationDictionary;
}

export function i18nPlugin(dict: TranslationDictionary): Plugin {
    return {
        install(app) {
            // translator function
            const translator: TranslatorFunction = (key, replacements) => {
                const translation = _.get(dict, key);
                if (translation) return translation;
                else return key;
            }
            // as object (todo)
            const $t = new Proxy(translator, {
                get(target, prop: keyof TranslationDictionary) {
                    if (typeof prop == "string") {
                        if (dict.hasOwnProperty(prop)) {
                            return dict[prop];
                        }
                        else return prop;
                    }
                    else throw new Error("Translation prop must be string");
                }
            });
            // mixin
            app.mixin({
                created() {
                    if (this.$.type.__i18n) {
                        Object.assign(dict, this.$.type.__i18n);
                    }
                }
            });
            // global var
            app.config.globalProperties.$t = $t;
        }
    }
}
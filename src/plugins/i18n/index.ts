import { reactive, Plugin } from "vue";
import _ from "lodash";
import { TranslationDictionary, TranslatorFunction } from "@/i18n";
import dictionary from "./dictionary.json"
import { componentPropertyName } from "./webpack.loader";

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
                else {
                    console.warn("Tanslation missing:", key);
                    return key;
                }
            }
            // missing translations object
            const missing: Record<string, any> = {

            }
            // save path
            const parentPathPropertyName = "__parentPath";
            function setParent(obj: Object, parentPath: string) {
                if (parentPathPropertyName in obj == false) {
                    Object.defineProperty(obj, parentPathPropertyName, { value: parentPath });
                }
            }
            // translator object
            const $t: Record<string, any> = new Proxy(translator, {
                get(target, prop: keyof TranslationDictionary) {
                    if (typeof prop == "string") {
                        const res = _.get(dict, prop);
                        switch (typeof res) {
                            // translation found
                            case "string":
                                return res;
                            // handle object
                            case "object":
                                setParent(res, prop);
                                return new Proxy(res, {
                                    get(target, prop) {
                                        if (typeof prop == "string") {
                                            switch (prop) {
                                                case "toString":
                                                    return Object.prototype.toString;
                                                case "toJSON":
                                                    return () => res;
                                                default:
                                                    const path = target[parentPathPropertyName] + "." + prop;
                                                    return $t[path];
                                            }
                                        }
                                    }
                                });
                            // key not found
                            case "undefined":
                                const missingTranslationObj: Record<string, any> = {
                                    toString() {
                                        return prop;
                                    }
                                }
                                setParent(missingTranslationObj, prop);
                                _.set(missing, prop, missingTranslationObj);

                                return new Proxy(missingTranslationObj, {
                                    get(target, prop) {
                                        if (typeof prop == "string") {
                                            const path = target[parentPathPropertyName] + "." + prop;
                                            if (prop == "toString") return target[prop];
                                            else {
                                                console.warn("Tanslation missing:", path);
                                                return $t[path]
                                            };
                                        }
                                    }
                                });
                        }
                    }
                    else throw new Error("Translation prop must be string");
                }
            });
            // mixin
            app.mixin({
                created() {
                    if (this.$.type[componentPropertyName]) {
                        Object.assign(dict, this.$.type[componentPropertyName]);
                    }
                }
            });
            // global var
            app.config.globalProperties.$t = $t;
        }
    }
}
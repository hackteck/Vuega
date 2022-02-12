import { useApp } from "@/main";

useApp(false, { name: "Evgeniy" }).then(async ({ app, router, store }) => {
    // MOUNT
    await router.isReady();
    const selector = "#app";
    const $app = document.querySelector(selector);
    if ($app == null) console.warn("Element to mount app not found!");
    else if ($app instanceof HTMLElement) app.mount(selector);
    else console.warn("App root element is not div!");
})
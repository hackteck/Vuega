import { useApp } from "@/main";
const { app, router, store } = useApp(false, { name: "Evgeniy" });

// MOUNT
router.isReady().then(() => {
    const selector = "#app";
    const $app = document.querySelector(selector);
    if ($app == null) console.warn("Element to mount app not found!");
    else if ($app instanceof HTMLElement) app.mount(selector);
    else console.warn("App root element is not div!");
});
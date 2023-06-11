import { createApp } from "vue";
import renderContent from "../renderContent";
import Primary from "./App.vue";
import { Button, Drawer } from 'ant-design-vue';
renderContent(
    import.meta.PLUGIN_WEB_EXT_CHUNK_CSS_PATHS,
    (appRoot: HTMLElement) => {
        const app = createApp(Primary)
        app.use(Drawer).use(Button)
        app.mount(appRoot);
    }
);

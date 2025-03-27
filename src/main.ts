import {createApp} from "vue";
import Application from "@/App.vue";
import {DynamixPlugin} from "@/index";

import "@/assets/style.css";

const app = createApp(Application);

app.use(DynamixPlugin);

app.mount("#app");

import {createApp} from "vue";
import Application from "@/app/App.vue";
import {DynamixPlugin} from "@/index";

import "@/assets/local.css";
import "@/assets/style.css";
import {router} from "@/app/routes/router.ts";
import 'prismjs/themes/prism.css';
const app = createApp(Application);

app.use(DynamixPlugin);

app.use(router)

app.mount("#app");

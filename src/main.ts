import {createApp} from "vue";
import Application from "@/app/App.vue";
import {DynamixPlugin} from "@/index";

import "@/assets/style.css";
import {router} from "@/app/routes/router.ts";
import 'prismjs/themes/prism.css';
const app = createApp(Application);

app.use(DynamixPlugin, {
  buttonPresets: {
    severityMap: {
      base: {
        primary: 'bg-green-600 hover:bg-green-700 text-white focus:ring-4 focus:ring-green-300',
        danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-4 focus:ring-red-300',
      },
      outlined: {
        primary: 'border border-green-600 text-green-600 hover:bg-green-600 hover:text-white focus:ring-4 focus:ring-green-300',
        danger: 'border border-red-600 text-red-600 hover:bg-red-600 hover:text-white focus:ring-4 focus:ring-red-300',
      },
      text: {
        primary: 'text-green-600 hover:bg-green-50 focus:ring-2 focus:ring-green-300',
        danger: 'text-red-600 hover:bg-red-50 focus:ring-2 focus:ring-red-300',
      }
    }
  }
});


app.use(router)

app.mount("#app");

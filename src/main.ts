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
        primary: 'bg-primary-600 hover:bg-primary-700 text-white focus:ring-4 focus:ring-primary-300',
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
  },
  tabPresets: {
    classMap: {
      base: 'bg-white text-gray-500 hover:bg-primary-50/10 hover:text-primary',
      active: 'bg-primary-50/25 text-primary border-b-2 border-primary',
    }
  },
  tabsPresets: {
    scrollbar: {
      thumbRadius: 2,
      thumbBorder: '1px solid var(--color-blue-400)',
      trackColor: 'var(--color-blue-50)',
      thumbColor: 'var(--color-blue-400)',
      trackHoverColor: 'var(--color-blue-100)',
      thumbHoverColor: 'var(--color-blue-500)',
    }
  }
});


app.use(router)

app.mount("#app");

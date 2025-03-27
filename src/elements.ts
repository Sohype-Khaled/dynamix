import {defineCustomElement} from "vue";
import DXButton from "@/components/DXButton/DXButton.vue";


const elements = {
  "dx-button": DXButton,

};

for (const name in elements) {
  if (elements.hasOwnProperty(name)) {
    const element = defineCustomElement(elements[name as keyof typeof elements]);

    // Ensure the element is registered only once
    if (!customElements.get(name)) {
      customElements.define(name, element);
    }
  }
}

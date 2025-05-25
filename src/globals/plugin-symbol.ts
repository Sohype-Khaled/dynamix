import type {InjectionKey} from 'vue';
import {inject} from "vue";

import type {DynamixOptions} from '@/types/plugin-options';

export const DYNAMIX_OPTIONS_KEY: InjectionKey<DynamixOptions> = Symbol('DynamixOptions');

export function useDynamixOptions() {
  return inject(DYNAMIX_OPTIONS_KEY, {});
}
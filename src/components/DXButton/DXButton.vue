<script setup lang="ts">
import type {ButtonProps} from '@/types/button.d.ts';
import {computed, useAttrs} from 'vue';
import {Icon} from '@iconify/vue';
import {useDynamixOptions} from '@/globals/plugin-symbol';
import {vRipple} from "@/directives/ripple.ts";

// Props
const props = withDefaults(defineProps<ButtonProps>(), {
	as: 'button',
	label: '',
	href: '',
	icon: '',
	text: false,
	outlined: false,
	rounded: false,
	disabled: false,
	ripple: true,
	loading: false,
	iconPosition: 'left',
	severity: 'primary',
	size: 'base',
});



// Plugin presets
const options = useDynamixOptions();
const presets = options?.buttonPresets ?? {};
const severityMap = presets.severityMap ?? {};
const defaultSize = presets.defaultSize ?? 'base';
const defaultRounded = presets.defaultRounded ?? false;

// Merged values
const size = computed(() => props.size || defaultSize);
const rounded = computed(() => props.rounded || defaultRounded);

// Determine variant
const variant = computed<'base' | 'outlined' | 'text'>(() =>
	props.text ? 'text' : props.outlined ? 'outlined' : 'base'
);

// Get severity class
const severityClass = computed(() => {
	if (props.severityClass) return props.severityClass;

	const map = severityMap?.[variant.value] ?? {};
	return map[props.severity] ?? '';
});


// Final class list
const buttonClasses = computed(() => [
	'btn',
	`btn-${size.value}`,
	props.icon ? 'btn-icon' : '',
	props.outlined ? 'btn-outlined' : '',
	props.text ? 'btn-text' : '',
	rounded.value ? 'btn-rounded' : '',
	props.disabled || props.loading ? 'btn-disabled' : '',
	props.loading ? 'btn-loading' : '',
	severityClass.value,
]);

const attrs = useAttrs();
</script>

<template>
	<component
		:is="props.as"
		v-bind="attrs"
		v-ripple="props.ripple !== true ? props.ripple : undefined"
		:href="props.as === 'a' && !props.disabled && !props.loading ? props.href : undefined"
		:disabled="props.disabled || props.loading"
		:class="buttonClasses"
	>
		<!-- Spinner on left (default) -->
		<span v-if="props.loading && props.iconPosition === 'left'" class="btn-spinner" aria-hidden="true"/>

		<!-- Icon (only if not loading) -->
		<Icon v-if="props.icon && !props.loading && props.iconPosition === 'left'" :icon="props.icon"/>

		<!-- Label -->
		<span v-if="props.label">{{ props.label }}</span>

		<!-- Icon or spinner on right -->
		<Icon v-if="props.icon && !props.loading && props.iconPosition === 'right'" :icon="props.icon"/>
		<span v-if="props.loading && props.iconPosition === 'right'" class="btn-spinner" aria-hidden="true"/>
	</component>
</template>

<style scoped>
@import "tailwindcss";

/* Base */
.btn {
	@apply inline-flex cursor-pointer items-center justify-center rounded-lg text-center font-medium transition duration-150 ease-in-out focus:outline-none;
}

/* Sizes */
.btn.btn-xs {
	@apply gap-1 px-3 py-2 text-xs;
}

.btn.btn-sm {
	@apply gap-1.5 px-3 py-2 text-sm;
}

.btn.btn-base {
	@apply gap-2 px-5 py-2.5 text-sm;
}

.btn.btn-lg {
	@apply gap-2 px-5 py-3 text-base;
}

.btn.btn-xl {
	@apply gap-2.5 px-6 py-3.5 text-base;
}

.btn.btn-xs.btn-icon {
	@apply p-1.5 ;
}

.btn.btn-sm.btn-icon {
	@apply p-2;
}

.btn.btn-base.btn-icon {
	@apply p-2.5 ;
}

.btn.btn-lg.btn-icon {
	@apply p-3
}

.btn.btn-xl.btn-icon {
	@apply p-3.5  ;
}

.btn.btn-xs.btn-icon svg {
	@apply w-3 h-3;
}

.btn.btn-sm.btn-icon svg {
	@apply w-4 h-4;
}

.btn.btn-base.btn-icon svg,
.btn.btn-lg.btn-icon svg {
	@apply w-5 h-5;
}

.btn.btn-xl.btn-icon svg {
	@apply w-6 h-6;
}


/* Disabled */
.btn-disabled {
	@apply opacity-50 cursor-default pointer-events-none;
}

/* === ROUNDED FULL === */
.btn-rounded {
	@apply rounded-full;
}

/* === PILL === */
.btn-pill {
	@apply rounded-full px-4 py-1.5 text-sm;
}

/* === LOADING === */
.btn-loading {
	@apply pointer-events-none opacity-70 relative;
}

.btn-spinner {
	@apply inline-block animate-spin rounded-full border-2 border-white border-t-transparent;
	width: 1rem;
	height: 1rem;
}
</style>





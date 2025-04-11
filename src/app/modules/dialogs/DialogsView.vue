<script setup lang="ts">
import {useDialog} from "@/composables/useDialog.ts";
import ExampleDialog from "./ExampleDialog.vue";
import {DXButton} from "@/components/DXButton";
import CodeBlock from "@/app/components/CodeBlock.vue";
import ApiTable from "@/app/components/ApiTable.vue";

const {open} = useDialog();

function openDialog() {
	open(ExampleDialog, {
		title: "Example Dialog",
		description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae consectetur debitis earum est facere incidunt, iusto mollitia officiis praesentium vitae!",
	}, {
		title: "Example Dialog",
	});
}

const examples = {
	useDialog: `import { useDialog } from '@vue-dynamix/useDialog';
import ExampleDialog from './ExampleDialog.vue'

const { open } = useDialog()

open(ExampleDialog, {
  message: 'Hello from the docs!'
})`.trim(),

	useOverlay: `import { useOverlay } from '@vue-dynamix/useOverlay'
import ExampleOverlay from './ExampleOverlay.vue'

const { open, close, overlayStack, isOpen } = useOverlay()

open(ExampleOverlay, {
  props: { message: 'Overlay message' },
  listeners: {
    close: () => close()
  },
  type: 'overlay'
})`.trim(),
	useConfirmation: `const { confirm } = useConfirmation()

confirm({ title: 'Are you sure?' }, (confirmed) => {
  if (confirmed) {
    doSomething()
  } else {
    cancelSomething()
  }
})

// or

const { confirm } = useConfirmation()

const result = await confirm({ title: 'Delete this item?' })

if (result) {
  // Proceed with deletion
}

`.trim()
}

const apiDialog = [
	{
		name: "open(component, props?, dialogProps?, listeners?)",
		description: "Opens a dialog with given component and optional props and listeners."
	},
	{
		name: "close(id?)",
		description: "Closes the top-most dialog or a specific one by ID."
	},
	{
		name: "overlayStack",
		description: "A Ref<OverlayInstance[]> representing the open overlays stack."
	},
	{
		name: "isOpen",
		description: "A ComputedRef<boolean> that’s true if any dialog is open."
	}
];

const apiOverlay = [
	{
		name: "open(component, options?, overlayProps?)",
		description: "Opens an overlay with component, props, listeners, and custom overlay settings."
	},
	{
		name: "close(id?)",
		description: "Closes the top-most overlay or a specific one by ID."
	},
	{
		name: "overlayStack",
		description: "A Ref<OverlayInstance[]> array for tracking active overlays."
	},
	{
		name: "topOverlay",
		description: "Computed ref returning the overlay instance on top of the stack."
	},
	{
		name: "isOpen",
		description: "Computed ref that returns true if any overlay is active."
	}
];

const apiConfirmation = [
	{
		name: "confirm(options?)",
		description: "Opens a confirmation dialog. Returns a Promise that resolves to <code>true</code> (confirmed) or <code>false</code> (cancelled)."
	},
	{
		name: "close(id?)",
		description: "Closes the confirmation dialog or any top-most overlay."
	},
	{
		name: "overlayStack",
		description: "A Ref<OverlayInstance[]> for active overlays, including confirmation dialogs."
	},
	{
		name: "topOverlay",
		description: "Computed ref of the top overlay (could be a confirmation)."
	},
	{
		name: "isOpen",
		description: "Computed ref. Returns <code>true</code> if any overlay is active."
	}
]
</script>

<template>
	<div class="max-w-5xl mx-auto px-4 py-12">
		<h1 class="text-3xl font-bold mb-2">Overlay and Dialogs</h1>

		<!-- ----------------------------- -->
		<!-- 🧩 useOverlay Section -->
		<hr class="mb-8 mt-12">
		<h2 class="text-xl font-semibold mb-4"><code>useOverlay</code></h2>
		<p class="text-gray-600 mb-8">
			Core composable used to manage stack-based overlays (dialogs, modals, confirmations).
		</p>

		<!-- Code Block -->
		<section class="mb-12">
			<h2 class="text-xl font-semibold mb-4">Usage Code</h2>
			<CodeBlock :code="examples.useOverlay" language="typescript"/>
		</section>

		<!-- API Table -->
		<section>
			<h2 class="text-xl font-semibold mb-4">API Reference</h2>
			<ApiTable :items="apiOverlay"/>
		</section>

		<hr class="mb-8 mt-12">
		<h2 class="text-xl font-semibold mb-4"><code>useDialog</code></h2>
		<p class="text-gray-600 mb-8">
			The dialog composable built on top of <code>useOverlay()</code>.
		</p>

		<!-- Live Preview -->
		<section class="mb-10">
			<h2 class="text-xl font-semibold mb-4">Live Example</h2>
			<div class="bg-gray-50 border border-gray-200 rounded-lg p-6">
				<DXButton label="Open Dialog" severity="primary" @click="openDialog"/>
			</div>
		</section>

		<!-- Code Block -->
		<section class="mb-12">
			<h2 class="text-xl font-semibold mb-4">Usage Code</h2>
			<CodeBlock :code="examples.useDialog" language="typescript"/>
		</section>

		<!-- API Reference -->
		<section class="mb-20">
			<h2 class="text-xl font-semibold mb-4">API Reference</h2>
			<ApiTable :items="apiDialog"/>
		</section>

		<!-- 🧩 useConfirmation Section -->
		<hr class="mb-8 mt-20">
		<h2 class="text-xl font-semibold mb-4"><code>useConfirmation</code></h2>
		<p class="text-gray-600 mb-8">
			A helper composable that opens a confirmation dialog and returns a <code>Promise&lt;boolean&gt;</code>.
		</p>

		<!-- Code Block -->
		<section class="mb-12">
			<h2 class="text-xl font-semibold mb-4">Usage Code</h2>
			<CodeBlock :code="examples.useConfirmation" language="typescript" />
		</section>

		<!-- API Table -->
		<section>
			<h2 class="text-xl font-semibold mb-4">API Reference</h2>
			<ApiTable :items="apiConfirmation" />
		</section>
	</div>
</template>

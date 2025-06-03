<script setup lang="ts">

import DXButton from "@/components/DXButton.vue";
</script>

<template>
	<form class="w-full [view-transition-name:var(--vt-composer)]" data-type="unified-composer">
		<div
			class="flex w-full cursor-text flex-col items-center justify-center rounded-[28px] bg-clip-padding contain-inline-size overflow-clip shadow-short bg-gray-100 dark:bg-gray-800">
			<div class="relative flex w-full items-end px-2.5 py-2.5">
				<div class="relative flex w-full flex-auto flex-col">
					<div class="relative mx-2.5 grid grid-cols-[auto_minmax(0,1fr)]">
						<div class="items-top flex justify-center">
							<div style="opacity: 1;"></div>
						</div>
						<div class="relative flex-auto bg-transparent pt-1.5"
						     style="margin-bottom: -18px; transform: translateY(-7px);">
							<div class="flex flex-col justify-start" style="min-height: 0px;">
								<div class="flex min-h-12 items-start">
									<div class="max-w-full min-w-0 flex-1">
										<div
											class="_prosemirror-parent_kfgfu_2 text-token-text-primary max-h-[25dvh] max-h-52 -mx-3 px-3 overflow-auto [scrollbar-width:thin] default-browser vertical-scroll-fade-mask min-h-12 pe-3">
												<textarea
													class="text-token-text-primary placeholder:text-token-text-tertiary block h-10 w-full resize-none border-0 bg-transparent px-0 py-2 ring-0 placeholder:ps-px"
													placeholder="Ask anything" data-virtualkeyboard="true" style="display: none;"></textarea>


											<div contenteditable="true" translate="no" class="ProseMirror" id="prompt-textarea"
											     data-virtualkeyboard="true"><p data-placeholder="Ask anything" class="placeholder"><br
												class="ProseMirror-trailingBreak"></p></div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="justify-content-end relative ms-2 flex w-full flex-auto flex-col">
						<div class="flex-auto"></div>
					</div>
					<div style="height: 48px;"></div>
				</div>
				<div class="bg-primary-surface-primary absolute start-2.5 end-0 bottom-2.5 z-2 flex items-center">
					<div class="w-full">
						<div class="flex items-center">
							<DXButton type="button"
							          text
							          icon="mdi:paperclip"
							          severity="primary"
							          size="sm" rounded ripple/>

							<DXButton type="button"
							          text
							          icon="mdi:face-outline"
							          severity="primary"
							          size="sm" rounded ripple/>
						</div>
						<div class="absolute end-2.5 bottom-0 flex items-center gap-2">
							<div class="ms-auto flex items-center gap-1.5">
								<DXButton type="button"
								          text
								          icon="mdi:microphone"
								          severity="primary"
								          size="sm" rounded ripple/>
								<DXButton type="button" icon="mdi:send" severity="primary" size="sm" rounded ripple/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</form>
</template>

<style scoped>

</style>
<script setup lang="ts">
import {computed, nextTick, onMounted, ref, watch} from "vue";
import {Icon} from "@iconify/vue";
import {useTipTapOutput} from "@/composables/useTipTapOutput.ts";
import {vTimeUpdate} from "@/directives/timeUpdate.ts";

const props = defineProps<{
	isSent: boolean;
	username: string;
	content: any;
	sentAt: string | Date;
	state: 'sent' | 'delivered' | 'seen';
}>();
const {content} = useTipTapOutput(props.content, {
	outputType: 'html'
});

const stateIcon = {
	sent: 'mdi:clock-outline',
	delivered: 'mdi:check',
	seen: 'mdi:check-all',
}
const statusIcon = computed(() => stateIcon[props.state]);


const expanded = ref(false);
const showToggle = ref(false);
const contentRef = ref<HTMLElement | null>(null);

const lineHeight = 20;
const maxLines = 5;

const textClampClass = computed(() =>
	!expanded.value && showToggle.value ? 'line-clamp-5' : ''
);

function checkOverflow() {
	nextTick(() => {
		const el = contentRef.value;
		if (el) {
			const fullHeight = el.scrollHeight;
			const limitedHeight = lineHeight * maxLines;
			showToggle.value = fullHeight > limitedHeight;
		}
	});
}

onMounted(checkOverflow);
watch(() => props.content, checkOverflow);

</script>

<template>
	<div
		class="vue-dynamix flex items-start gap-2.5 mb-2"
		:class="{ 'flex-row-reverse': isSent }"
	>
		<div
			class="flex flex-col w-full max-w-79 leading-1.5 p-2 relative"
			:class="{
        'border-gray/50 bg-gray-50/50 border-1 rounded-e-xl rounded-es-xl': !isSent,
        'border-primary/50 bg-primary/20 border-1 rounded-s-xl rounded-se-xl': isSent,
      }"
		>
		<span
			class="flex items-center text-xs font-semibold capitalize"
			:class="isSent ? 'flex-row-reverse text-primary-700' : 'text-gray-900'"
			v-text="username"/>

			<!-- Dynamically loaded bubble component -->
			<div v-if="content" class="text-xs font-normal mb-1 text-gray-700 max-w-100 break-words whitespace-pre-wrap">
				<div
					:class="textClampClass"
					v-html="content"
					ref="contentRef"
				/>
				<button
					v-if="showToggle"
					class="text-[10px] font-semibold cursor-pointer mb-2"
					:class="{ 'text-gray-500': !isSent, 'text-primary-500': isSent }"
					@click="expanded = !expanded"
				>
					{{ expanded ? 'Show less' : 'See more' }}
				</button>
			</div>

			<!--			<BubbleAttachment v-if="message?.attachment_id" :message="message"/>-->
			<span
				class="flex items-center justify-baseline absolute bottom-0.5 left-2.5"
				:class="{ 'text-gray-500': !isSent, 'text-primary': isSent }"
			>
			  <Icon :icon="statusIcon as string" class="w-3 h-3 mr-1"/>
				<span
					class="text-[10px] font-semibold"
					:class="{ 'text-gray-500': !isSent, 'text-primary-500': isSent }"
					v-time-update.time="sentAt"
				/>
			</span>
		</div>

		<!-- Bubble Actions -->
		<!--    <BubbleActions/>-->
	</div>
</template>
<!--

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto dolore eligendi eos facere ipsum modi quia sapiente! Aliquam illo non saepe totam voluptatibus. Blanditiis corporis dolore eos error explicabo fugiat inventore iure minima, nostrum quod! Ab aliquam autem dicta dolorum ea eaque, earum explicabo, facere fugit illo illum libero mollitia, nisi nobis nulla perspiciatis possimus quae quam quia repellat saepe sunt velit voluptatem. Atque delectus enim est eum harum magni maxime modi officiis tempora voluptatibus! Alias, beatae commodi, culpa deserunt eaque eligendi, error exercitationem explicabo facere in incidunt nisi quibusdam repellat repellendus repudiandae. Asperiores consequatur cumque cupiditate, esse est facere ipsum mollitia saepe tenetur veniam! Alias animi consequatur et harum inventore, iste labore magni omnis, optio pariatur qui quidem sequi voluptates. A ad asperiores cum deleniti dolore dolorem, doloribus ea eos, ex excepturi, hic impedit itaque libero maiores minus nam nesciunt nobis nulla officia placeat quae quaerat quasi quidem recusandae reiciendis repellat repellendus sequi tenetur ullam unde ut voluptate voluptatem voluptates. A ad amet animi corporis cupiditate doloribus ea error esse eveniet, fugiat iusto mollitia odit pariatur perferendis placeat provident quae, quibusdam quisquam quod ratione rem rerum veniam voluptas? Aspernatur consequatur ea illo modi perferendis provident quidem quo suscipit! Amet dolorem est ex libero magni maxime possimus quis repellat veritatis voluptatem. Ad blanditiis consequatur culpa dicta dolor ducimus illum inventore ipsa ipsam ipsum, labore laudantium minima molestias nesciunt nihil odio odit quam quia repudiandae similique soluta vel voluptas voluptate. Amet doloremque harum, ipsa saepe tempora voluptas! Ad aliquam aut beatae cum excepturi facere harum illo, illum in inventore laborum magnam nihil nobis officiis pariatur praesentium quaerat quam quas quidem quis quisquam recusandae rem repellendus reprehenderit repudiandae sapiente suscipit tempora temporibus ut voluptatibus! Accusamus dignissimos dolorum eaque nisi, non porro quia quidem velit? Adipisci consequatur consequuntur deleniti deserunt earum esse exercitationem facilis ipsum iusto, laudantium molestiae non, omnis, quam quia sed sint sunt temporibus veniam veritatis voluptatibus. Alias assumenda blanditiis doloribus quibusdam similique. Dolor esse iusto maxime mollitia tempora ullam ut! Adipisci atque corporis cum cupiditate deserunt eum id libero nam, necessitatibus nulla omnis tenetur ullam vel voluptate voluptatem. Delectus, ipsum magni quae quibusdam sequi suscipit veritatis. Alias debitis eos eveniet illum modi reiciendis sint voluptatibus. Aliquid asperiores commodi debitis distinctio doloribus eius fugiat harum, magnam nostrum, obcaecati praesentium, sed suscipit voluptates. A aperiam aspernatur, deserunt dolor ea earum enim esse eum eveniet excepturi facere iste necessitatibus nihil odio officiis optio quidem repellat sunt ut voluptates. Ab architecto autem beatae, consectetur delectus, deleniti, deserunt dolor dolore dolorem doloremque dolorum earum est eum exercitationem expedita fugiat ipsam labore libero molestiae molestias mollitia quae quam quas qui quibusdam quis repudiandae rerum voluptate voluptates voluptatibus! Beatae commodi culpa fugiat id temporibus? Eveniet ex nam nesciunt repellendus suscipit? Amet atque corporis dignissimos dolorem doloribus eius explicabo inventore ipsa libero magnam nobis non nostrum pariatur perspiciatis placeat quaerat quia sed tenetur ullam vel veritatis, vitae voluptates. Numquam quod saepe sapiente? Adipisci distinctio, doloribus eveniet facilis id illo molestiae quam sint tempora vero? Distinctio ipsa nihil quasi.
-->
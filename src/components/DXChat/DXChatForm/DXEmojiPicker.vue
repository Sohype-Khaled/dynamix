<script setup lang="ts">
import {computed, onMounted, ref, watch} from 'vue'
import {onClickOutside} from '@vueuse/core'
import DXTabs from "@/components/DXTabs/DXTabs.vue";
import DXTab from "@/components/DXTabs/DXTab.vue";
import DXTabPanel from "@/components/DXTabs/DXTabPanel.vue";

interface Emoji {
	name: string
	category: string
	group: string
	htmlCode: string[]
	unicode: string[]
}

const emit = defineEmits<{
	(e: 'select', emoji: string): void
}>()

const props = defineProps<{
	ignoreRefs?: Array<HTMLElement | null>
}>()

// internal state
const root = ref<HTMLElement | null>(null)
const isOpen = ref(false)
const emojis = ref<Emoji[]>([])
const selectedCategory = ref('all')
const searchQuery = ref('')
const loading = ref(true)
const sectionRefs: Record<string, HTMLElement | null> = {}

const categories = computed(() => ['all', ...new Set(emojis.value.map(e => e.category))])

const filtered = computed(() =>
	emojis.value.filter((e) => {
		const matchesCategory =
			selectedCategory.value === 'all' || e.category === selectedCategory.value
		const matchesSearch = e.name.toLowerCase().includes(searchQuery.value.toLowerCase())
		return matchesCategory && matchesSearch
	})
)

const emojisByCategory = (category: string) =>
	emojis.value.filter((e) => {
		const matchesCategory = category === 'all' || e.category === category
		const matchesSearch = e.name.toLowerCase().includes(searchQuery.value.toLowerCase())
		return matchesCategory && matchesSearch
	})

// methods
const close = () => (isOpen.value = false)
const toggle = () => (isOpen.value = !isOpen.value)
const handleSelect = (emoji: string) => (emit('select', emoji))
const decodeUnicode = (unicode: string): string =>
	String.fromCodePoint(parseInt(unicode.replace('U+', ''), 16))

const loadFromCache = (): Emoji[] | null => {
	const cached = localStorage.getItem('emojiHubCache')
	const cachedTime = localStorage.getItem('emojiHubCacheTime')
	if (cached && cachedTime && Date.now() - +cachedTime < 1000 * 60 * 60 * 24) {
		try {
			return JSON.parse(cached)
		} catch {
			return null
		}
	}
	return null
}

const fetchEmojis = async () => {
	const cached = loadFromCache()
	if (cached) {
		emojis.value = cached
		loading.value = false
		return
	}
	try {
		const res = await fetch('https://emojihub.yurace.pro/api/all')
		const data: Emoji[] = await res.json()
		emojis.value = data
		localStorage.setItem('emojiHubCache', JSON.stringify(data))
		localStorage.setItem('emojiHubCacheTime', Date.now().toString())
	} catch (err) {
		console.error('Failed to fetch emojis:', err)
	} finally {
		loading.value = false
	}
}

defineExpose({isOpen, close, toggle})

onClickOutside(
	root,
	() => (isOpen.value = false),
	{
		ignore: () => props.ignoreRefs ?? []
	}
)
onMounted(() => {
	fetchEmojis()
	selectedCategory.value = 'all'
})
const scrollContainer = ref<HTMLElement | null>(null)

watch(selectedCategory, (category) => {
	if (category && sectionRefs[category] && scrollContainer.value) {
		scrollContainer.value.scrollTo({
			top: sectionRefs[category]!.offsetTop - scrollContainer.value.offsetTop,
			behavior: 'smooth',
		})
	}
})

const getCategoryIcon = (category: string): string => {
	const emoji = emojis.value.find(e => e.category === category)
	return emoji ? decodeUnicode(emoji.unicode[0]) : '❓'
}


</script>

<template>
	<Transition
		enter-active-class="transition ease-out duration-150"
		enter-from-class="opacity-0 translate-y-1"
		enter-to-class="opacity-100 translate-y-0"
		leave-active-class="transition ease-in duration-100"
		leave-from-class="opacity-100 translate-y-0"
		leave-to-class="opacity-0 translate-y-1"
	>
		<div
			ref="root"
			v-if="isOpen"
			class="vue-dynamix menu"
		>
			<!-- Search -->
			<div class="p-2 border-b">
				<input
					v-model="searchQuery"
					type="text"
					placeholder="Search emojis..."
					class="w-full px-3 py-1.5 rounded-md border text-sm focus:outline-none focus:ring-1 focus:ring-blue-300"
				/>
			</div>

			<DXTabs v-model="selectedCategory" singlePanel scrollable scrollSize="thin">
				<template #tabs>
<!--					<DXTab-->
<!--						size="xs"-->
<!--						v-for="category in categories"-->
<!--						:key="category"-->
<!--						:name="category"-->
<!--						:label="category === 'all' ? '🌐' : getCategoryIcon(category)"-->
<!--					/>-->
				</template>

<!--				<div class="max-h-64  p-2 scrollbar space-y-6">-->
<!--					<div v-if="loading" class="text-center text-gray-400 py-6">Loading emojis...</div>-->
<!--					<div v-else-if="filtered.length === 0" class="text-center text-gray-400 py-6">No results</div>-->
<!--					<div v-else>-->
<!--						<DXTabPanel name="all">-->
<!--							<div-->
<!--								class="max-h-64 overflow-y-auto p-2 scrollbar space-y-6"-->
<!--								ref="scrollContainer"-->
<!--							>-->
<!--								&lt;!&ndash; Optional loading or empty &ndash;&gt;-->
<!--								<div v-if="loading" class="text-center text-gray-400 py-6">Loading emojis...</div>-->
<!--								<div v-else-if="filtered.length === 0" class="text-center text-gray-400 py-6">No results</div>-->
<!--								<div v-else>-->
<!--									&lt;!&ndash; Loop through all categories as sections &ndash;&gt;-->
<!--									<div-->
<!--										v-for="category in categories"-->
<!--										:key="category"-->
<!--										:ref="el => {-->
<!--											if (el && '$el' in el) {-->
<!--												sectionRefs[category] = (el as any).$el as HTMLElement-->
<!--											} else {-->
<!--												sectionRefs[category] = el as HTMLElement-->
<!--											}-->
<!--										}"-->
<!--									>-->
<!--										<h3 class="text-sm font-semibold mb-2 capitalize">{{ category }}</h3>-->
<!--										<div class="grid grid-cols-8 gap-1">-->
<!--											<button-->
<!--												v-for="emoji in emojisByCategory(category)"-->
<!--												:key="`${emoji.name}-${emoji.unicode[0]}`"-->
<!--												type="button"-->
<!--												class="text-lg hover:bg-gray-100 rounded-md p-1"-->
<!--												@click="handleSelect(decodeUnicode(emoji.unicode[0]))"-->
<!--											>-->
<!--												{{ decodeUnicode(emoji.unicode[0]) }}-->
<!--											</button>-->
<!--										</div>-->
<!--									</div>-->
<!--								</div>-->
<!--							</div>-->
<!--						</DXTabPanel>-->
<!--					</div>-->
<!--				</div>-->
			</DXTabs>
		</div>
	</Transition>
</template>

<style scoped>
@import "tailwindcss";

.menu {
	@apply absolute bottom-full -translate-y-2 right-0 w-72 mt-2 rounded-xl border border border-gray-100 bg-white shadow-lg text-sm z-50;
}



</style>

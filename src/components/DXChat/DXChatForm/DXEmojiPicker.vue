<script setup lang="ts">
import {computed, onMounted, ref} from 'vue'
import {onClickOutside} from '@vueuse/core'

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

const categories = computed(() => ['all', ...new Set(emojis.value.map(e => e.category))])

const filtered = computed(() =>
	emojis.value.filter((e) => {
		const matchesCategory =
			selectedCategory.value === 'all' || e.category === selectedCategory.value
		const matchesSearch = e.name.toLowerCase().includes(searchQuery.value.toLowerCase())
		return matchesCategory && matchesSearch
	})
)


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
onMounted(fetchEmojis)
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
			class="absolute bottom-full right-0 w-72 mt-2 rounded-xl border bg-white shadow-lg text-sm z-50"
		>
			<!-- Tabs -->
			<div class="flex overflow-x-auto border-b">
				<button
					v-for="category in categories"
					:key="category"
					type="button"
					@click="selectedCategory = category"
					:class="[
					'px-3 py-2 whitespace-nowrap capitalize',
					selectedCategory === category
						? 'bg-blue-100 text-blue-600 font-semibold'
						: 'text-gray-500 hover:text-black'
				]"
				>
					{{ category === 'all' ? 'All' : category }}
				</button>
			</div>

			<!-- Search -->
			<div class="p-2 border-b">
				<input
					v-model="searchQuery"
					type="text"
					placeholder="Search emojis..."
					class="w-full px-3 py-1.5 rounded-md border text-sm focus:outline-none focus:ring-1 focus:ring-blue-300"
				/>
			</div>

			<!-- Emoji Grid -->
			<div class="max-h-64 overflow-y-auto p-2">
				<div v-if="loading" class="text-center text-gray-400 py-6">Loading emojis...</div>
				<div v-else-if="filtered.length === 0" class="text-center text-gray-400 py-6">No results</div>
				<div v-else class="grid grid-cols-8 gap-1">
					<button
						v-for="emoji in filtered"
						:key="`${emoji.name}-${emoji.unicode[0]}`"
						type="button"
						class="text-lg hover:bg-gray-100 rounded-md p-1"
						@click="handleSelect(decodeUnicode(emoji.unicode[0]))"
					>
						{{ decodeUnicode(emoji.unicode[0]) }}
					</button>
				</div>
			</div>
		</div>
	</Transition>
</template>

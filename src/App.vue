<script setup lang="ts">

import {computed, onMounted, ref, watch} from "vue";
import {DXAlert} from "@/components";
import DXAlertPreview from "@/previews/DXAlertPreview.vue";


const radio = ref<string>();

const isDark = ref(localStorage.getItem("theme") === "dark");

// Apply dark mode on mount
onMounted(() => {
	document.documentElement.classList.toggle("dark", isDark.value);
});

// Watch for changes & update `localStorage`
watch(isDark, (newValue) => {
	document.documentElement.classList.toggle("dark", newValue);
	localStorage.setItem("theme", newValue ? "dark" : "light");
});

const completedTasks = ref<string[]>([]);
const tasks = ["Task 1", "Task 2", "Task 3"];

// Compute checkbox states
const allTasksCompleted = computed(() => completedTasks.value.length === tasks.length);
const someTasksCompleted = computed(() => completedTasks.value.length > 0 && completedTasks.value.length < tasks.length);

// Toggle all tasks
const toggleAllTasks = () => {
	completedTasks.value = allTasksCompleted.value ? [] : [...tasks];
};


const toggles = ref(["Toggle 1", "Toggle 2", "Toggle 3"]);
const completedToggles = ref<string[]>([]);

// Compute if all toggles are selected
const allTogglesCompleted = computed({
	get: () => completedToggles.value.length === toggles.value.length,
	set: (value: boolean) => {
		completedToggles.value = value ? [...toggles.value] : [];
	},
});

// Compute if some toggles are selected (for indeterminate state)
const someTogglesCompleted = computed(() => completedToggles.value.length > 0 && completedToggles.value.length < toggles.value.length);

// Function to toggle all toggles
const toggleAllToggles = () => {
	allTogglesCompleted.value = !allTogglesCompleted.value;
};

const search = ref('');

const form = ref({
	email: '',
	bio: '',
	tags: ''
});
</script>

<template>

	<div class="p-2 mb-3">
		<DXAlertPreview/>
	</div>
		<div class="p-2 mb-3">
			<div class="card">
				<div class="card-header">
					<div class="card-title">Card Title</div>
					<div class="card-toolbar">
						<div class="flex items-center gap-2 p-2">
							<DXToggle v-model="isDark" id="dark-mode-toggle"/>
							<label for="dark-mode-toggle" class="text-sm font-medium text-gray-900 dark:text-gray-300">
								{{ isDark ? "☀️ Light Mode" : "🌙 Dark Mode" }}
							</label>
						</div>
					</div>
				</div>
				<div class="card-body space-y-4">
					<DXInput label="email" type="email" v-model="form.email"/>
					<DXTextarea
						v-model="form.bio"
						label="Your Bio"
						state="default"
						message="Tell us about yourself"
						name="user_bio"
						rows="4"
					/>
					<DXTagInput
						v-model="form.tags"
						label="Tags"
						message="Press Tab or comma to add"
						state="default"
					/>
				</div>
				<div class="card-footer">
					<DXButton label="Submit" severity="primary"/>
					<DXButton label="Cancel" text severity="danger"/>
				</div>
			</div>

			{{ form }}
		</div>


	<!--	<div class="p-2 mb-3">-->
	<!--		<DXButton label="Button" text severity="warning"/>-->

	<!--	</div>-->

	<!--	<div class="flex justify-between p-2 mb-3">-->
	<!--		<h2 class="text-sm font-medium text-gray-900 dark:text-gray-300">Value: {{ radio }}</h2>-->
	<!--		<div class="flex items-center">-->
	<!--			<DXRadio v-model="radio" name="default-radio" value="first" id="default-radio-1"/>-->
	<!--			<label for="default-radio-1" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">First radio</label>-->
	<!--		</div>-->
<!--			<div class="flex items-center">-->
<!--				<DXRadio v-model="radio" name="default-radio" value="second" id="default-radio-2"/>-->
<!--				<label for="default-radio-2" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Second-->
<!--					radio</label>-->
<!--			</div>-->
	<!--	</div>-->

	<!--	<div class="flex justify-between p-2 mb-3">-->

	<!--		<div class="flex items-center">-->
	<!--			<DXCheckbox v-model="allTasksCompleted" :indeterminate="someTasksCompleted" @change="toggleAllTasks"-->
	<!--			            id="all-tasks"/>-->
	<!--			<label for="all-tasks" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Mark-->
	<!--				All Tasks</label>-->
	<!--		</div>-->
	<!--		<div v-for="task in tasks" :key="task">-->
	<!--			<div class="flex items-center">-->
	<!--				<DXCheckbox v-model="completedTasks" :value="task" :id="task"/>-->
	<!--				<label :for="task" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{{-->
	<!--						task-->
	<!--					}}</label>-->
	<!--			</div>-->
	<!--		</div>-->
	<!--	</div>-->


	<!--	<div class="flex justify-between gap-2 p-2 mb-3">-->
	<!--		&lt;!&ndash; Select All Toggle &ndash;&gt;-->
	<!--		<div class="flex items-center">-->
	<!--			<DXToggle-->
	<!--				v-model="allTogglesCompleted"-->
	<!--				:indeterminate="someTogglesCompleted"-->
	<!--				@change="toggleAllToggles"-->
	<!--				id="all-toggles"-->
	<!--			/>-->
	<!--			<label for="all-toggles" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">-->
	<!--				Mark All Toggles-->
	<!--			</label>-->
	<!--		</div>-->

	<!--		&lt;!&ndash; Individual Toggles &ndash;&gt;-->
	<!--		<div v-for="toggle in toggles" :key="toggle" class="flex items-center">-->
	<!--			<DXToggle v-model="completedToggles" :value="toggle" :id="`toggle-${toggle}`"/>-->
	<!--			<label :for="`toggle-${toggle}`" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">-->
	<!--				{{ toggle }}-->
	<!--			</label>-->
	<!--		</div>-->
	<!--	</div>-->

	<!--	<DXListing-->
	<!--		list-url="http://localhost:8081/3efcbcf7-d0a9-4154-ba41-922c989edf57/sessions"-->
	<!--		axios-config=""-->
	<!--		:columns="[-->
	<!--			{name: 'id', label: 'ID', extraClass: 'w-[20px]'},-->
	<!--			{name: 'title', label: 'title', extraClass: 'min-w-[200px] max-w-[300px]'},-->
	<!--			{name: 'start_time', label: 'Start Time'},-->
	<!--			{name: 'end_time', label: 'End Time'},-->

	<!--		]"-->
	<!--		type="table"/>-->
</template>


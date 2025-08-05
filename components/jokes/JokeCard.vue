<template>
    <v-card v-for="joke in jokes" :key="joke.id" class="mx-auto my-12" width="374" elevated>
        <v-img height="250" alt="Joke Picture" :src="handleImg(joke.imgUrl)" :cover="true"
            @error="markImgFailed(joke.imgUrl)">
            <template v-slot:placeholder>
                <v-row align="center" class="fill-height ma-0" justify="center">
                    <v-progress-circular color="grey-lighten-5" indeterminate />
                </v-row>
            </template>
        </v-img>
        <v-card-item>
            <v-card-title>{{ joke.name }}</v-card-title>
            <v-card-subtitle>{{ joke.author }}</v-card-subtitle>
            <v-card-text class="pr-0 pl-0">{{ joke.text }}</v-card-text>
        </v-card-item>
        <v-divider class="mx-4 mb-1" />

        <v-card-actions class="justify-center">
            <v-btn icon variant="tonal" color="primary" @click="handleEdit(joke, 'edit')">
                <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon variant="tonal" color="red-lighten-2" @click="handleDelete(joke.id)">
                <v-icon>mdi-delete-outline</v-icon>
            </v-btn>
        </v-card-actions>
    </v-card>
    <ConfirmDeleteDialog v-model="showConfirmDeleteDialog" message="Are you sure you want to delete this?"
        @confirm="removeJoke(jokeToDelete)" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Joke } from '@/models/Joke';
import { useJokesStore } from '@/stores/jokes';
import ConfirmDeleteDialog from '@/components/ConfirmDeleteDialog.vue';
const jokesStore = useJokesStore();
const { jokes } = storeToRefs(jokesStore);
const { removeJoke, setSelectedJoke, toggleDialog, setAction } = jokesStore;

const failedUrls = ref<Record<string, boolean>>({});
const fallbackUrl = 'https://picsum.photos/seed/picsum/400/700';

const jokeToDelete = ref(null as string | null);
const showConfirmDeleteDialog = ref(false as boolean);

function handleImg(url: string): string {
    return failedUrls.value[url] ? fallbackUrl : url;
}

function handleDelete(jokeId: string) {
    jokeToDelete.value = jokeId;
    showConfirmDeleteDialog.value = true;
}

function markImgFailed(url: string) {
    failedUrls.value[url] = true;
}
function handleEdit(joke: Joke, action: string) {
    setAction(action);
    setSelectedJoke(joke);
    toggleDialog();
}
</script>
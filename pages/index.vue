<template>
    <v-container>
        <v-row class="my-4">
            <v-col cols="12">
                <h1 class="text-center">Make a' Da Jokes</h1>
                <p class="text-center">You think you're funny huh? Oh yeah??</p>
            </v-col>
        </v-row>
        <v-row class="my-4">
            <v-col cols="12" class="text-center">
                <v-btn color="deep-purple-lighten-2" variant="tonal" @click="handleAddJoke()">
                    Add a Joke
                </v-btn>
            </v-col>
        </v-row>

        <!-- Loading Skeleton Grid -->
        <v-row v-if="loading" dense>
            <v-col v-for="n in 6" :key="n" cols="12" sm="6" md="4">
                <v-skeleton-loader type="card" />
            </v-col>
        </v-row>

        <!-- No Jokes Found -->
        <v-row v-else-if="!jokes.length" class="text-center">
            <v-col cols="12" class="d-flex flex-column align-center">
                <p>No jokes found. This is a tragedy. Please add some jokes to make it less sad.</p>
                <v-img :width="600" aspect-ratio="16/9" cover :src="Pug"></v-img>
            </v-col>
        </v-row>

        <!-- Joke Cards -->
        <v-row v-else>
            <JokeCard />
        </v-row>

        <!-- Add Joke Dialog -->
        <v-row>
            <v-col cols="12" class="text-center">
                <JokeDialog />
            </v-col>
        </v-row>


    </v-container>
</template>

<script setup>
import { onMounted } from 'vue';
import { useJokesStore } from '@/stores/jokes';
import { storeToRefs } from 'pinia';
import JokeCard from '@/components/JokeCard.vue';
import JokeDialog from '@/components/JokeDialog.vue';
import Pug from '@/assets/images/pug.webp';

const jokesStore = useJokesStore();
const { jokes, loading } = storeToRefs(jokesStore);
const { fetchJokes, toggleDialog, setAction } = jokesStore;

onMounted(async () => {
    await fetchJokes();
});

function handleAddJoke() {
    setAction('add');
    toggleDialog();
}

</script>
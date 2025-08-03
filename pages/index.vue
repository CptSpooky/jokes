<template>
      <v-container>
            <v-row class="my-4">
                <v-col cols="12">
                    <h1 class="text-center">Make a' Da Jokes</h1>
                    <p class="text-center">You think you're funny huh? Oh yeah??</p>
                </v-col>
            </v-row>
            <!-- Loading Skeleton Grid -->
            <v-row v-if="loading" dense>
                <v-col v-for="n in 6" :key="n" cols="12" sm="6" md="4">
                    <v-skeleton-loader type="card" />
                </v-col>
            </v-row>

            <!-- Joke Cards -->
            <JokeCard v-else  :jokes="jokes" />

          
    </v-container>
</template>

<script setup>
    import { onMounted } from 'vue';
    import {useUsersStore} from '@/stores/users'
    import { useJokesStore } from '@/stores/jokes';

    import { storeToRefs } from 'pinia';
    import JokeCard from '@/components/JokeCard.vue';

    const jokesStore = useJokesStore();
    const { jokes, loading } = storeToRefs(jokesStore);
    const { fetchJokes } = jokesStore;

    // const usersStore = useUsersStore();
    // const { counter, users, loading } = storeToRefs(usersStore);
    // const { increment, fetchUsers } = usersStore;

    // onMounted(async () => {
    //     await fetchUsers();
    // });
    onMounted(() => {
        fetchJokes();
    });

</script>
  
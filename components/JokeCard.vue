<template>
    <client-only>
        <v-card 
            v-for="joke in jokes" 
            :key="joke.id" 
            class="mx-auto my-12"
            width="374"
            elevated
        >
            <v-img
            height="250"
            :src="joke.imgUrl"
            alt="Joke Picture"
            :cover="true"
            />
            <v-card-item>
                <v-card-title>{{ joke.name }}</v-card-title>
                <v-card-subtitle>{{ joke.author }}</v-card-subtitle>
                <v-card-text class="pr-0 pl-0">{{ joke.text }}</v-card-text>
            </v-card-item>
            <v-divider class="mx-4 mb-1"/>

            <v-card-actions class="justify-center">
                <v-btn
                    icon
                    variant="tonal"
                    color="deep-purple-lighten-2"
                    @click="handleEdit(joke, 'edit')"
                >
                    <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn
                    icon
                    variant="tonal"
                    color="deep-purple-lighten-2"
                    @click="removeJoke(joke.id)"
                >
                    <v-icon>mdi-delete-outline</v-icon>
                </v-btn>
            </v-card-actions>
        </v-card>
    </client-only>
</template>

<script setup>
const jokesStore = useJokesStore();
const { jokes } = storeToRefs(jokesStore);
const { removeJoke, setSelectedJoke, toggleDialog, setAction } = jokesStore;

async function handleEdit(joke, action) {
    setAction(action);
    await setSelectedJoke(joke);
    toggleDialog();
}

</script>
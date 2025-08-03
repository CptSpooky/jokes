<template>
     <v-row>
        <client-only>
              <v-card 
                v-for="joke in jokes" 
                :key="joke.id" 
                class="mx-auto my-12"
                max-width="374"
                >
                <v-img
                height="250"
                :src="joke.imgUrl"
                alt="Joke Picture"
                cover
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
                        @click=""
                    >
                        <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn
                        icon
                        variant="tonal"
                        color="deep-purple-lighten-2"
                        @click=""
                    >
                        <v-icon>mdi-delete-outline</v-icon>
                    </v-btn>
                </v-card-actions>
            </v-card>
        </client-only>
    </v-row>
</template>

<script setup>
import { Joke } from '@/models/Joke';
defineProps({
    jokes: {
        type: Array,
        required: true
    }
});

</script>
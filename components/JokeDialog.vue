<template>
    <v-dialog
      v-model="dialog"
      width="auto"
    >
      <v-card
        width="400"
        prepend-icon="mdi-emoticon-happy-outline"
        text="If you can't make it funny at least make it cringe."
        :title="action === 'edit' ? 'Edit Joke' : 'Add a Joke'"
      >
      <v-form ref="jokeform" class="pa-4">
        <v-text-field
          v-model="newJoke.name"
          :counter="10"
          :rules="nameRules"
          label="Name"
          required
        />
        <v-text-field
          v-model="newJoke.author"
          :rules="authorRules"
          label="Author"
          required
        />
        <v-textarea
          v-model="newJoke.text"
          :rules="textRules"
          label="Joke Text"
          required
        />

      </v-form>
        <template v-slot:actions>
          <v-btn
            class="ms-auto"
            text="Cancel"
            @click="handleCancel()"
          ></v-btn>
          <v-btn
            class="ms-auto"
            text="Save Joke"
            @click="handleSave()"
          ></v-btn>
        </template>
      </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { Joke } from '@/models/Joke';
  import type { VForm } from 'vuetify/components'

  const jokeform = ref<VForm | null>(null);

  const jokesStore = useJokesStore();
  const { dialog, selectedJoke, action } = storeToRefs(jokesStore);

  const { toggleDialog, setSelectedJoke, addJoke, updateJoke } = jokesStore;


  const newJoke = ref(new Joke(null));

  watch(selectedJoke, (joke) => {
    newJoke.value = new Joke(joke);
  });

  // Reset the form when the dialog is closed
  watch(dialog, (isOpen) => {
    if (!isOpen) {
      // Delay until the dialog is fully unmounted
      setTimeout(() => {
        jokeform.value?.resetValidation();
        const emptyJoke = new Joke(null);
        newJoke.value = emptyJoke;
        setSelectedJoke(emptyJoke);
      }, 200);
    }
  });
  

  const nameRules = [
    (v: string) => !!v || 'Name is required',
    (v: string) => (v && v.length <= 10) || 'Name must be less than 10 characters',
  ];
  const authorRules = [
    (v: string) => !!v || 'Author is required',
  ];
  const textRules = [
    (v: string) => !!v || 'Joke text is required',
  ];


  function handleCancel() {
    toggleDialog();
  }

  function handleAddJoke() {
      const jokeToAdd = newJoke.value
      addJoke(jokeToAdd);
  }

  function handleUpdateJoke() {
    const jokeToUpdate = newJoke.value
    updateJoke(jokeToUpdate);
  }

  async function handleSave() {
    const userAction = action.value;
    const form = jokeform.value;

    if (!form) return;

    const { valid } = await form.validate();

    if (valid) {
      if (userAction === 'add') {
        handleAddJoke();
      } else {
        handleUpdateJoke();
      }
      // Close and reset the form
      toggleDialog();

    } else {
      console.warn('Form is invalid');
      
    }
  }

</script>
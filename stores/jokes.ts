import { Joke } from '@/models/Joke';
import type { RawJoke } from '@/models/Joke';
import MockData from '@/assets/mockdata.json'; // Assuming you have a mock data file

// if we wanted to use a state from another store, we could import it in an action
// import { useUsersStore } from '@/stores/users';
// const usersStore = useUsersStore();
// const { getUsers } = usersStore; or usersStore.users 

export const useJokesStore = defineStore('jokes', {
  state: () => ({
    jokes: [] as Joke[],
    selectedJoke: null as Joke | null,
    loading: true as boolean,
    dialog: false as boolean,
    action: '' as string, // 'add' or 'edit',
    count: 3 as number
  }),

  getters: {
    getJokes: (state) => state.jokes,
    getLoading: (state) => state.loading,
    getDialog: (state) => state.dialog,
    getSelectedJoke: (state) => state.selectedJoke,
    getAction: (state) => state.action,
    getCount: (state) => state.jokes.length
  },

  actions: {
    async fetchJokes() {
      this.loading = true;
      try {
        // Simulating an API call with mock data
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
        const rawJokes: RawJoke[] = MockData;
        const jokes: Joke[] = rawJokes.map((joke: RawJoke) => new Joke(joke));
        this.jokes = jokes;
        this.count = jokes.length;
      } catch (error) {
        console.error('Error fetching jokes:', error);
      } finally {
        this.loading = false;
      }
    },
    addJoke(joke: Joke) {
      this.jokes.push(joke);
      this.count++;
    },
    removeJoke(jokeId: string) {
      this.jokes = this.jokes.filter(joke => joke.id !== jokeId);
      if (this.count > 0) {
        this.count--;
      }
    },
    updateJoke(updatedJoke: Joke) {
      const index = this.jokes.findIndex(joke => joke.id === updatedJoke.id);
      if (index !== -1) {
        this.jokes[index] = updatedJoke;
      }
    },
    toggleDialog() {
      this.dialog = !this.dialog;
    },
    async setSelectedJoke(joke: Joke | null) {
      this.selectedJoke = joke;
    },
    setAction(action: string) {
      this.action = action;
    }
  },
});

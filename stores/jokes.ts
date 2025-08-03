import { Joke } from '@/models/Joke';
import type { RawJoke } from '@/models/Joke';
import type { ApiFetchType } from '@/services/apiFetch';
import MockData from '@/assets/mockdata.json'; // Assuming you have a mock data file

export const useJokesStore = defineStore('jokes', {
  state: () => ({
    jokes: [] as Joke[],
    loading: false
  }),

  getters: {
    getJokes: (state) => state.jokes,
    getLoading: (state) => state.loading
  },

  actions: {
    fetchJokes() {
      this.loading = true;
      try {
        // Simulating an API call with mock data
        const rawJokes: RawJoke[] = MockData; // Directly use the mock data
        const jokes: Joke[] = rawJokes.map((joke: RawJoke) => new Joke(joke));
        this.jokes = jokes;
        console.log('Fetched jokes:', jokes);
        // const { $apiFetch } = useNuxtApp();
        // const apiFetch = $apiFetch as ApiFetchType;
        // const { results }: { results: RawUser[] }  = await apiFetch('/?results=10');
        // const users: User[] = results.map((user: RawUser) => new User(user));
        // this.users = users;
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        this.loading = false;
      }
    }
  },
});
  
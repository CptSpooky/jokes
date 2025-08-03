import { User } from '@/models/User';
import type { RawUser } from '@/models/User';
import type { ApiFetchType } from '@/services/apiFetch';

export const useUsersStore = defineStore('users', {
  state: () => ({
    counter: 0,
    users: [] as User[],
    loading: false
  }),

  getters: {
    getCounter: (state) => state.counter,
    getUsers: (state) => state.users,
    getLoading: (state) => state.loading
  },

  actions: {
    increment() {
      this.counter++;
    },
    async fetchUsers() {
      this.loading = true;
      try {
        const { $apiFetch } = useNuxtApp();
        const apiFetch = $apiFetch as ApiFetchType;
        const { results }: { results: RawUser[] }  = await apiFetch('/?results=10');
        const users: User[] = results.map((user: RawUser) => new User(user));
        this.users = users;
        console.log('Fetched users:', users);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        this.loading = false;
      }
    }
  },
});
  
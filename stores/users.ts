import { User } from '@/models/User';
import type { RawUser } from '@/models/User';
import { useApis } from '#imports';

export const useUsersStore = defineStore('users', {
  state: () => ({
    users: [] as User[],
    loading: false as boolean,
    errorMessage: '' as string | null
  }),

  getters: {
    getUsers: (state) => state.users,
    getLoading: (state) => state.loading,
    getErrorMessage: (state) => state.errorMessage
  },

  actions: {
    async fetchUsers() {
      this.loading = true;
      this.errorMessage = null;
      try {
        const { experienceApi } = useApis();
        const { results }: { results: RawUser[] } = await experienceApi.get('/?results=10');
        const users: User[] = results.map((user: RawUser) => new User(user));
        this.users = users;
        console.log('Fetched users:', users);
      } catch (error: any) {
        this.errorMessage = this.errorMessage = error?.message ?? 'Something went wrong';
        console.error('Error fetching users:', error);
      } finally {
        this.loading = false;
      }
    }
  },
});

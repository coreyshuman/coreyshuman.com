export const util = {
  methods: {
    formatDate(date) {
      if (!date) {
        return '';
      }

      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString('en', options);
    }
  }
};

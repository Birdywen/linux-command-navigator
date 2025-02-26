const app = Vue.createApp({
  data() {
    return {
      commands: [],
      categories: [],
      searchTerm: '',
      selectedLetter: '',
      selectedCategory: null,
      tips: [],
    };
  },
  computed: {
    filteredCommands() {
      let result = this.commands;

      if (this.selectedCategory) {
        result = result.filter(command => command.category === this.selectedCategory);
      }

      if (this.searchTerm) {
        result = result.filter(command =>
          command.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          command.description.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      }
      if (this.selectedLetter) {
        result = result.filter(command => command.alphabet === this.selectedLetter);
      }

      return result;
    },
  },
  mounted() {
    fetch('src/commands.json')
      .then(response => response.json())
      .then(data => {
        this.commands = data;
        this.categories = [...new Set(data.map(command => command.category))];
      });

    fetch('src/tips.json')
      .then(response => response.json())
      .then(data => {
        this.tips = data;
      });
  },
});

app.mount('#app');

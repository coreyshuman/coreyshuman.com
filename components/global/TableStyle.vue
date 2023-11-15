<template>
  <div :class="parentClass" :style="parentStyle">
    <div v-if="caption" class="text-center font-bold text-lg">{{ caption }}</div>
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: {
    caption: {
        type: String,
        default: ''
      },
    color: {
      type: String,
      default: 'green'
    },
    alternating: {
      type: Boolean,
      default: true
    },
    width: {
      type: String,
      default: '675px'
    },
    columnWidths: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    parentStyle() {
        return `max-width:${this.width};`;
    },
    parentClass() {
      let containerClass = 'tableStyle';
      if(this.color) {
        containerClass += ` table-${this.color}`;
      }
      if(this.alternating) {
        containerClass += ' alternating';
      }
      return containerClass;
    }
  },
  watch: {
    columnWidths() {
      this.setTableWidths();
    }
  },
  mounted() {
    this.setTableWidths();
  },
  methods: {
    setTableWidths() {
      const table = this.$el.querySelector('table');
      table.style.maxWidth = this.width;
      const columns = table.querySelectorAll('th');
      if(this.columnWidths.length) {
        if(this.columnWidths.length !== columns.length) {
          console.error(`Incorrect number of column widths provided. Expected:${columns.length} Received:${this.columnWidths.length}`);
        } else {
          for(const idx in columns) {
            if(Object.hasOwn(columns, idx)) {
              columns[idx].classList.remove(...columns[idx].classList);
              columns[idx].classList.add(this.columnWidths[idx]);
            }
          }
        }
      }
    }
  }
};
</script>
<style scoped>
/* Apply styles here so they are available, avoid tree shaking */
.keep-me {
  @apply table-auto table-fixed w-1/2 w-1/3 w-2/3 w-1/4 w-2/4 w-3/4 w-1/5 w-2/5 w-3/5 w-4/5 w-1/6 w-2/6 w-3/6 w-4/6 w-5/6;
}

.tableStyle {
  @apply w-full overflow-x-auto;
}

.tableStyle > div {
  @apply m-0;
}

.tableStyle table {
  @apply border-collapse table-auto w-full;

  th {
    @apply font-bold text-center py-0.5;
  }

  /* Each cell would need a max width for this to work... */
  td {
    @apply overflow-ellipsis overflow-hidden;
  }

  tr:nth-child(odd) {
    @apply bg-transparent !important;
  }
}

.tableStyle:not(.alternating) table {
  tr {
    @apply bg-transparent !important;
  }
}

.tableStyle.table-metal table {
  @apply border-metal border-1;

  th {
    @apply bg-metal;
  }

  tr {
    @apply bg-metal bg-opacity-40;
  }
}

.tableStyle.table-silver table {
  @apply border-silver border-1;

  th {
    @apply bg-silver text-black;
  }

  tr {
    @apply bg-silver bg-opacity-40;
  }
}

.tableStyle.table-ocean table {
  @apply border-ocean border-1;

  th {
    @apply bg-ocean;
  }

  tr {
    @apply bg-ocean bg-opacity-40;
  }
}

.tableStyle.table-blue table {
  @apply border-blue border-1;

  th {
    @apply bg-blue text-black;
  }

  tr {
    @apply bg-blue bg-opacity-40;
  }
}

.tableStyle.table-teal table {
  @apply border-teal border-1;

  th {
    @apply bg-teal text-black;
  }

  tr {
    @apply bg-teal bg-opacity-40;
  }
}

.tableStyle.table-celeste table {
  @apply border-celeste border-1;

  th {
    @apply bg-celeste text-black;
  }

  tr {
    @apply bg-celeste bg-opacity-40;
  }
}

.tableStyle.table-green table {
  @apply border-green border-1;

  th {
    @apply bg-green text-black;
  }

  tr {
    @apply bg-green bg-opacity-40;
  }
}

.tableStyle.table-red table {
  @apply border-red border-1;

  th {
    @apply bg-red text-black;
  }

  tr {
    @apply bg-red bg-opacity-40;
  }
}

.tableStyle.table-purple table {
  @apply border-purple border-1;

  th {
    @apply bg-purple text-black;
  }

  tr {
    @apply bg-purple bg-opacity-40;
  }
}

.tableStyle.table-lavender table {
  @apply border-lavender border-1;

  th {
    @apply bg-lavender text-black;
  }

  tr {
    @apply bg-lavender bg-opacity-40;
  }
}
</style>

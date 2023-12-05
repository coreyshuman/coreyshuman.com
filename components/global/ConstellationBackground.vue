<template>
  <div id="canvasdiv">
    <div id="statsdiv"></div>
  </div>
</template>
<script>
import {Constellation, Statistics} from './constellation'
import { util } from '~/util/util';

export default {
  mixins:[util],
  props: {
    config: {
      type: Object,
      required: false,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      configDefaults: {
        lineColor: '#AEF3E7',
        pointColor: '#37A1AE',
        pointInteractColor: '#C33C54',
        pingPongPhysicsUpdates: true,
        useQueuedDraws: false // !!this.chrome
      },
      workingConfig: {},
      constellation: null
    }
  },
  watch: {
    config(newConfig) {
      this.updateConfig(newConfig);
    }
  },
  created() {
    this.workingConfig = {...this.configDefaults, ...this.config};

    this.$root.$on('updateConstellation', (config) => {
      this.updateConfig(config);
    });
  },
  mounted() {
    const initConfig = {
      canvasContainer: 'canvasdiv'
    }

    const configuration = {...this.configDefaults, ...this.workingConfig, ...initConfig}
    this.constellation = new Constellation(configuration);

    this.$root.$on('startConstellation', () => {
      this.constellation.start();
    });

    this.$root.$on('stopConstellation', () => {
      this.constellation.stop();
    });

    this.constellation.start();

    Statistics.initStats();
    // Statistics.showStats('statsdiv');
  },
  methods: {
    updateConfig(newConfig) {
      if(!newConfig) {
        newConfig = {};
      }

      // oklch conversion - old Safari workaround
      if(!this.canvasSupportsOklchColors()) {
        for (const prop in newConfig) {
          if (Object.prototype.hasOwnProperty.call(newConfig, prop)) {
            const value = newConfig[prop];

            if(this.isOklchColor(value)) {
              newConfig[prop] = this.oklchToP3(value);
            }
          }
        }
      }

      this.workingConfig = {...this.configDefaults, ...newConfig};

      if(this.constellation) {
        this.constellation.stop();
        this.constellation.defaultSettings();
        for (const prop in this.workingConfig) {
          if (Object.prototype.hasOwnProperty.call(this.workingConfig, prop)) {
            this.constellation.updateSetting(prop, this.workingConfig[prop]);
          }
        }
        this.constellation.start();
      }
    }
  }
};
</script>

<style>
#canvasdiv {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: -100;
}

#statsdiv {
  position: fixed;
  top: 10;
  left: 10;
  width: 50;
  height: 20;
  color: white;
}

#statsdiv span {
  display: block;
}
</style>

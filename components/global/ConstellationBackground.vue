<template>
  <div id="canvasdiv">
    <div id="statsdiv"></div>
  </div>
</template>
<script>
import {Constellation, Statistics} from './constellation'

export default {
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
      // constellation: null,
      configDefaults: {
        lineColor: '#AEF3E7',
        pointColor: '#37A1AE',
        pointInteractColor: '#C33C54'
      }
    }
  },
  watch: {
    config(newConfig) {
      if(!newConfig) {
        newConfig = {};
      }
      newConfig = {...this.configDefaults, ...newConfig};
      window.constellation.defaultSettings();
      for (const prop in newConfig) {
        if (Object.prototype.hasOwnProperty.call(newConfig, prop)) {
          window.constellation.updateSetting(prop, newConfig[prop]);
        }
      }
    }
  },
  mounted() {
    const initConfig = {
      canvasContainer: 'canvasdiv',
      useQueuedDraws: !!window.chrome
    }
    const configuration = {...this.configDefaults, ...this.config, ...initConfig}
    window.constellation = new Constellation(configuration);
    window.constellation.init();
    window.constellation.start();

    Statistics.initStats();
    // Statistics.showStats('statsdiv');
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

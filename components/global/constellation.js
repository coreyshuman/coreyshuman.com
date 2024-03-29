/*
	Constellation.js 
	A physics-based animation in JavaScript which can produce many
	designs and effects, including constellation-like star fields.
  https://github.com/coreyshuman/Constellation

	
    Copyright (C) 2015 - 2023 Corey Shuman <ctshumancode@gmail.com>
	
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

class Statistics {
  static startTime = 0;
  static frameNumber = 0;
  static updateTimes = [];
  static updateTemp;
  static drawTimes = [];
  static drawTemp;
  static printInterval = null;
  static printElement = null;

  static initStats() {
    Statistics.startTime = Date.now();
    Statistics.frameNumber = 0;
    Statistics.updateTimes = [];
    Statistics.drawTimes = [];
    if (Statistics.printInterval) {
      clearInterval(Statistics.printInterval);
    }
  }

  static showStats(statsElement) {
    Statistics.printElement = statsElement;
    if (Statistics.printInterval) {
      clearInterval(Statistics.printInterval);
    }
    Statistics.printInterval = setInterval(Statistics.updateStats, 200);
  }

  static hideStats() {
    if (Statistics.printInterval) {
      clearInterval(Statistics.printInterval);
    }
  }

  static updateStats() {
    const d = Date.now();
    const currentTime = (d - Statistics.startTime) / 1000;
    const fps = Math.floor(Statistics.frameNumber / currentTime);
    let updateTime = 0;
    let drawTime = 0;

    if (Statistics.updateTimes.length) {
      updateTime = (Statistics.updateTimes.reduce((a, b) => a + b, 0) * 1000) / Statistics.updateTimes.length;

      updateTime = Math.round(updateTime);
    }

    if (Statistics.drawTimes.length) {
      drawTime = (Statistics.drawTimes.reduce((a, b) => a + b, 0) * 1000) / Statistics.drawTimes.length;

      drawTime = Math.round(drawTime);
    }

    const result = `<span>FPS: ${fps}</span><span>Physics: ${updateTime}us</span><span>Draw: ${drawTime}us</span>`;

    Statistics.startTime = Date.now();
    Statistics.frameNumber = 0;
    Statistics.updateTimes = [];
    Statistics.drawTimes = [];

    if (Statistics.printElement) {
      const el = document.getElementById(Statistics.printElement);
      if (el) {
        el.innerHTML = result;
      }
    }
    return result;
  }

  static incrementFrameCount() {
    Statistics.frameNumber++;
  }

  static startUpdate() {
    Statistics.updateTemp = Date.now();
  }

  static endUpdate() {
    Statistics.updateTimes.push(Date.now() - Statistics.updateTemp);
  }

  static startDraw() {
    Statistics.drawTemp = Date.now();
  }

  static endDraw() {
    Statistics.drawTimes.push(Date.now() - Statistics.drawTemp);
  }
}

class Point {
  constructor(x, y) {
    this.x = isNaN(x) ? 0 : x;
    this.y = isNaN(y) ? 0 : y;
  }

  update(x, y) {
    this.x = x;
    this.y = y;
  }
}

/* Individual point entity, contains location, movement, and drawing functions */
class DrawnPoint {
  constructor(x, y, dx, dy, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.dx = dx;
    this.dy = dy;
    this.neighbors = []; // array containing {point,distance,drawQueued} objects
  }

  update({ dt, points, maxDistance, maxX, maxY, friction, frictionMinV }) {
    this.updateLocation({ dt, maxX, maxY, friction, frictionMinV });
    this.updateNeighborList(points, maxDistance);
  }

  draw(ctx, pointSize, lineColor, lineWidth, maxLineLength) {
    this.drawPoint(ctx, this.color, pointSize, pointSize);
    this.drawLines(ctx, lineColor, lineWidth, maxLineLength);
  }

  drawQueued(queue, maxLineLength) {
    this.drawPointQueued(queue);
    this.drawActionsQueued(queue, maxLineLength);
  }

  drawPoint(ctx, pointColor, pointSize) {
    ctx.fillStyle = pointColor;
    ctx.globalAlpha = 0.9;
    ctx.beginPath();
    ctx.arc(this.x, this.y, pointSize, 0, Constellation.pi2);
    ctx.fill();
  }

  drawPointQueued(queue) {
    queue.points.push({
      x: this.x,
      y: this.y,
      color: this.color
    });
  }

  drawLines(ctx, lineColor, lineWidth, maxLineLength) {
    const neighbors = this.neighbors;
    const neighborsCount = neighbors.length;
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = lineWidth;

    for (let i = 0; i < neighborsCount; i++) {
      const pd = neighbors[i];
      if (pd.distance > maxLineLength) {
        continue;
      }
      ctx.globalAlpha = (maxLineLength - pd.distance) / maxLineLength;
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(pd.p.x, pd.p.y);
      ctx.stroke();
    }
  }

  // treat alpha values as keys in a hashmap
  // alpha can be 0.00 to 1.00
  getAlphaIndex(key) {
    let index = 0;
    if (key === '0') {
      return 0;
    }
    index += key[0] * 100;
    index += Number(key[2]) * 10;
    if (key[3]) {
      index += Number(key[3]);
    }
    return index;
  }

  drawActionsQueued(queue, maxLineLength) {
    const count = this.neighbors.length;
    const neighbors = this.neighbors;
    const alphas = queue.alphas;
    const segments = queue.segments;

    for (let i = 0; i < count; i++) {
      const pd = neighbors[i];
      if (pd.distance > maxLineLength) {
        continue;
      }

      // todo, don't draw twice for neighbor

      const alpha = (Math.round(((maxLineLength - pd.distance) / maxLineLength) * 100) / 100).toString();

      const alphaIdx = this.getAlphaIndex(alpha);

      if (!alphas[alphaIdx]) {
        alphas[alphaIdx] = alpha;
        segments[alphaIdx] = [];
      }

      // batch draws by alpha
      segments[alphaIdx].push({
        x1: this.x,
        y1: this.y,
        x2: pd.p.x,
        y2: pd.p.y
      });
    }
  }

  updateLocation({ dt, maxX, maxY, friction, frictionMinV }) {
    this.x += this.dx * dt;
    this.y += this.dy * dt;

    if (this.y < 0) {
      this.y = 0;
      this.dy = -this.dy;
    }
    if (this.x < 0) {
      this.x = 0;
      this.dx = -this.dx;
    }
    if (this.y > maxY) {
      this.y = maxY;
      this.dy = -this.dy;
    }
    if (this.x > maxX) {
      this.x = maxX;
      this.dx = -this.dx;
    }

    if (this.dx > frictionMinV) {
      this.dx -= friction * dt;
    }
    if (this.dy > frictionMinV) {
      this.dy -= friction * dt;
    }
    if (this.dx < -frictionMinV) {
      this.dx += friction * dt;
    }
    if (this.dy < -frictionMinV) {
      this.dy += friction * dt;
    }
  }

  updateNeighborList(allPoints, maxDistance) {
    this.neighbors = [];
    for (let i = 0; i < allPoints.length; i++) {
      const p = allPoints[i];

      if (this === p) {
        continue;
      }

      const dist = this.getDistanceFromPoint(p);

      if (dist < maxDistance) {
        this.neighbors.push({ p, distance: dist });
      }
    }
  }

  getDistanceFromPoint(p) {
    const x = p.x - this.x;
    const y = p.y - this.y;
    return Math.sqrt(x * x + y * y);
  }

  getAngleFromPoint(p) {
    return Math.atan2(this.y - p.y, this.x - p.x);
  }
}

class Constellation {
  static pi2 = 2 * Math.PI;
  constructor(userSettings) {
    this.this = this;
    this.lastFrameTime = Date.now();
    this.frameCount = 0;
    this.running = false;
    this.pointCount = 0;
    this.drawActionsQueue = null; // {points: [], alphas: [0...100], segments:[0:[], 1:[], ...]}

    this.settings = {
      canvasContainer: '',
      canvasWidth: -1,
      canvasHeight: -1,
      pointDensity: 30,
      maxVelocityX: 5,
      maxVelocityY: 5,
      friction: 0.03,
      frictionMinVelocity: 0.5,
      maxLineLength: 60,
      repelDistanceRange: [0, 20],
      repelForceRange: [0.1, 0],
      attractDistanceRange: [15, 30],
      attractForceRange: [0, 0.001],
      interactMode: 'repel',
      maxInteractDistance: 60,
      maxInteractForce: 0.3,
      lineColor: 'lightblue',
      pointColor: 'teal',
      pointInteractColor: 'red',
      pointSize: 3,
      lineSize: 1,
      screenBlur: 0.6,
      backgroundColor: 'black',
      useQueuedDraws: false,
      pingPongPhysicsUpdates: true
    };

    if (userSettings) {
      if (userSettings.canvasContainer) {
        this.settings.canvasContainer = userSettings.canvasContainer;
        delete userSettings.canvasContainer;
      }
      if (userSettings.canvasWidth) {
        this.settings.canvasWidth = userSettings.canvasWidth;
        delete userSettings.canvasWidth;
      }
      if (userSettings.canvasHeight) {
        this.settings.canvasHeight = userSettings.canvasHeight;
        delete userSettings.canvasHeight;
      }
    }

    this.canvas = document.createElement('canvas');
    const container = document.getElementById(this.settings.canvasContainer);

    if (!container) {
      throw new Error("'canvasContainer' setting must be a valid DOM element id.");
    }
    container.appendChild(this.canvas);
    if (this.displaySupportsP3Color() && this.canvasSupportsDisplayP3()) {
      this.context = this.canvas.getContext('2d', { colorSpace: 'display-p3' });
    } else {
      this.context = this.canvas.getContext('2d');
    }

    this.points = [];
    this.canvasOffset = this.getOffset(this.canvas);
    // stores cursor position
    this.cursor = new Point();
    // store touch positions on mobile
    this.touches = [];

    this.init();

    this.defaultSettings();
    if (userSettings) {
      for (const prop in userSettings) {
        if (Object.prototype.hasOwnProperty.call(this.settings, prop)) {
          this.updateSetting(prop, userSettings[prop]);
        }
      }
    }

    requestAnimationFrame(this.run.bind(this));
  }

  defaultSettings() {
    const defaultSettings = {
      pointDensity: 30,
      maxVelocityX: 5,
      maxVelocityY: 5,
      maxLineLength: 60,
      lineSize: 1,
      friction: 0.03,
      frictionMinVelocity: 0.5,
      screenBlur: 0.6,
      repelDistanceRange: [0, 20],
      repelForceRange: [0.1, 0],
      attractDistanceRange: [15, 30],
      attractForceRange: [0, 0.001],
      interactMode: 'repel',
      maxInteractDistance: 60,
      maxInteractForce: 0.3,
      lineColor: 'lightblue',
      pointColor: 'teal',
      pointInteractColor: 'red',
      pointSize: 3,
      backgroundColor: 'black'
    };

    this.settings = { ...this.settings, ...defaultSettings };
    this.updatePointCount();
  }

  updateSetting(settingName, value) {
    if (value === undefined || value === null) {
      throw new Error(`${settingName} value cannot be empty.`);
    }
    switch (settingName) {
      case 'canvasWidth':
      case 'canvasHeight':
        if (value < 1) {
          value = -1;
        }
        break;
      case 'pointDensity':
      case 'maxLineLength':
      case 'lineSize':
      case 'friction':
      case 'frictionMinVelocity':
      case 'maxInteractDistance':
      case 'maxInteractForce':
        if (value < 0) {
          value = 0;
        }
        break;
      case 'pointSize':
        if (value < 1) {
          value = 1;
        }
        break;
      case 'screenBlur':
        if (value < 0 || value > 1) {
          value = 0.5;
        }
        break;
      case 'repelDistanceRange':
      case 'attractDistanceRange':
        if (value.length !== 2) {
          throw new Error(`Value for ${settingName} must be an array with two integers.`);
        }
        if (value[1] < value[0]) {
          throw new Error(`Second value for ${settingName} must be large or equal to the first value.`);
        }
        break;
      case 'repelForceRange':
      case 'attractForceRange':
        if (value.length !== 2) {
          throw new Error(`Value for ${settingName} must be an array with two integers.`);
        }
        break;
      case 'lineColor':
      case 'backgroundColor':
      case 'pointColor':
      case 'pointInteractColor':
        // todo verify color
        break;
      case 'interactMode':
        if (value !== 'attract') {
          value = 'repel';
        }
        break;
      case 'useQueuedDraws':
      case 'pingPongPhysicsUpdates':
        value = !!value; // ensure boolean
        break;
      default:
        throw new Error(`Invalid setting name: ${settingName}`);
    }
    this.settings[settingName] = value;

    if (['pointDensity'].includes(settingName)) {
      this.updatePointCount();
    }
  }

  initPoints(count) {
    this.points = [];
    const pointColor = this.settings.pointColor;
    const pointSize = this.settings.pointSize;
    this.this.addPoints(count, pointColor, pointSize);
  }

  updatePointCount() {
    const pointCountDiff = this.points.length - this.getPointCountForGivenDensity(this.settings.pointDensity);
    if (pointCountDiff > 0) {
      this.removePoints(pointCountDiff);
    } else {
      this.addPoints(-pointCountDiff, this.settings.pointColor);
    }
  }

  removePoints(count) {
    if (count > this.points.length) {
      this.points = [];
      return;
    }

    this.points = this.points.slice(count);
  }

  addPoints(count, pointColor) {
    do {
      this.addPoint(pointColor);
    } while (count--);
  }

  addPoint(pointColor) {
    this.points.push(
      new DrawnPoint(
        this.getRandomInt(1, this.canvas.width - 1),
        this.getRandomInt(1, this.canvas.height - 1),
        Math.random() * this.getRandomInt(-1, 1),
        Math.random() * this.getRandomInt(-1, 1),
        pointColor
      )
    );
  }

  clearPointColor(p) {
    p.color = this.settings.pointColor;
  }

  updateCursorInfluence(p, pCursor) {
    const dist = p.getDistanceFromPoint(pCursor);
    const settings = this.settings;
    const maxInteractForceDistance = settings.maxInteractDistance;
    const maxInteractForceStrength = settings.maxInteractForce;
    const maxVelocityX = settings.maxVelocityX;
    const maxVelocityY = settings.maxVelocityY;
    const mode = settings.interactMode;

    if (dist < maxInteractForceDistance) {
      const pushForce = maxInteractForceStrength * ((maxInteractForceDistance - dist) / maxInteractForceDistance);
      const angle = p.getAngleFromPoint(pCursor);

      p.color = settings.pointInteractColor;
      if (mode === 'attract') {
        p.dx -= Math.cos(angle) * pushForce;
        p.dy -= Math.sin(angle) * pushForce;
      } else {
        p.dx += Math.cos(angle) * pushForce;
        p.dy += Math.sin(angle) * pushForce;
      }

      if (p.dx < -maxVelocityX) {
        p.dx = -maxVelocityX;
      }
      if (p.dx > maxVelocityX) {
        p.dx = maxVelocityX;
      }
      if (p.dy < -maxVelocityY) {
        p.dy = -maxVelocityY;
      }
      if (p.dy > maxVelocityY) {
        p.dy = maxVelocityY;
      }
    }
  }

  updatePullFromNeighbors(point) {
    const neighbors = point.neighbors;
    const neighborsCount = neighbors.length;
    const settings = this.settings;
    const repelDistanceRange = settings.repelDistanceRange;
    const repelForceRange = settings.repelForceRange;
    const attractDistanceRange = settings.attractDistanceRange;
    const attractForceRange = settings.attractForceRange;
    const maxVelocityX = settings.maxVelocityX;
    const maxVelocityY = settings.maxVelocityY;

    for (let i = 0; i < neighborsCount; i++) {
      const p = point.neighbors[i].p;

      const dist = point.neighbors[i].distance;
      const angle = p.getAngleFromPoint(point);

      if (dist >= repelDistanceRange[0] && dist <= repelDistanceRange[1]) {
        const rForce = this.linearMap(dist, repelForceRange, repelDistanceRange);
        p.dx += Math.cos(angle) * rForce;
        p.dy += Math.sin(angle) * rForce;
      }

      if (dist >= attractDistanceRange[0] && dist <= attractDistanceRange[1]) {
        const aForce = this.linearMap(dist, attractForceRange, attractDistanceRange);
        p.dx -= Math.cos(angle) * aForce;
        p.dy -= Math.sin(angle) * aForce;
      }

      if (p.dx < -maxVelocityX) {
        p.dx = -maxVelocityX;
      }
      if (p.dx > maxVelocityX) {
        p.dx = maxVelocityX;
      }
      if (p.dy < -maxVelocityY) {
        p.dy = -maxVelocityY;
      }
      if (p.dy > maxVelocityY) {
        p.dy = maxVelocityY;
      }
    }
  }

  draw() {
    const ctx = this.context;
    const points = this.points;
    const pointSize = this.settings.pointSize;
    const lineColor = this.settings.lineColor;
    const lineWidth = this.settings.lineSize;
    const maxLineLength = this.settings.maxLineLength;
    ctx.globalAlpha = 1 - this.settings.screenBlur;
    ctx.fillStyle = this.settings.backgroundColor;
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    const count = this.points.length;

    this.drawActionsQueue = {
      points: [],
      alphas: new Array(100),
      segments: []
    };
    for (let i = 0; i < count; i++) {
      if (this.this.settings.useQueuedDraws) {
        points[i].drawQueued(this.drawActionsQueue, maxLineLength);
      } else {
        points[i].draw(ctx, pointSize, lineColor, lineWidth, maxLineLength);
      }
    }

    if (this.settings.useQueuedDraws) {
      // execute the queued draw actions
      // draw points
      ctx.strokeStyle = 'rgb(0,0,0,0)';
      ctx.globalAlpha = 0.9;

      const points = this.drawActionsQueue.points;
      const pointsCount = points.length;
      const pointSize = this.settings.pointSize;

      // multiple arcs on a single path is actually slower,
      // so we use multiple begin/fill calls here
      for (let i = 0; i < pointsCount; i++) {
        const point = points[i];
        ctx.fillStyle = point.color;
        ctx.beginPath();
        ctx.arc(point.x, point.y, pointSize, 0, Constellation.pi2);
        ctx.fill();
      }

      // draw lines
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = lineWidth;

      const drawGroups = this.drawActionsQueue.alphas;
      const drawGroupsCount = drawGroups.length;
      const segmentsGroups = this.drawActionsQueue.segments;

      for (let i = 0; i < drawGroupsCount; i++) {
        if (!drawGroups[i]) {
          continue;
        }

        ctx.globalAlpha = drawGroups[i];
        ctx.beginPath();
        const segments = segmentsGroups[i];
        const segmentsCount = segments.length;
        for (let k = 0; k < segmentsCount; k++) {
          const line = segments[k];
          ctx.moveTo(line.x1, line.y1);
          ctx.lineTo(line.x2, line.y2);
        }
        ctx.stroke();
      }
    }
  }

  update(dt) {
    const points = this.points;
    const pointCount = points.length;
    const maxX = this.canvas.width;
    const maxY = this.canvas.height;
    const set = this.settings;
    const increment = this.settings.pingPongPhysicsUpdates ? 2 : 1;

    const maxDistance = Math.max(set.maxLineLength, set.repelDistanceRange[1], set.attractDistanceRange[1]);

    // scale dt for 60 fps
    dt /= this.settings.pingPongPhysicsUpdates ? 8.334 : 16.667;

    // alternate between even and odd points on each update for physics calculations
    let i = this.settings.pingPongPhysicsUpdates ? this.frameCount % 2 : 0;
    for (; i < pointCount; i += increment) {
      const p = points[i];
      p.update({
        dt,
        points,
        maxDistance,
        maxX,
        maxY,
        friction: this.settings.friction,
        frictionMinV: this.settings.frictionMinVelocity
      });
      this.updatePullFromNeighbors(p);
      this.clearPointColor(p);
      if (this.touches.length === 0) {
        this.updateCursorInfluence(p, this.cursor);
      } else {
        for (let j = 0; j < this.touches.length; j++) {
          this.updateCursorInfluence(p, this.touches[j]);
        }
      }
    }

    this.frameCount++;
  }

  setCanvasSize() {
    const containerEl = document.getElementById(this.settings.canvasContainer);
    this.canvas.width =
      this.settings.canvasWidth === -1
        ? containerEl
          ? containerEl.clientWidth
          : containerEl.innerWidth
        : this.settings.canvasWidth;
    this.canvas.height =
      this.settings.canvasHeight === -1
        ? containerEl
          ? containerEl.clientHeight
          : containerEl.innerHeight
        : this.settings.canvasHeight;
  }

  init() {
    this.context.fillStyle = this.settings.backgroundColor;
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.setCanvasSize();
    this.initPoints(this.getPointCountForGivenDensity(this.settings.pointDensity));

    document.body.addEventListener(
      'mousemove',
      function (evt) {
        this.cursor.update(evt.clientX - this.canvasOffset.left, evt.clientY - this.canvasOffset.top);
      }.bind(this)
    );

    // add support for touch events
    document.body.addEventListener(
      'touchstart',
      function (evt) {
        const ct = evt.changedTouches;
        for (let i = 0; i < ct.length; i++) {
          const touch = ct[i];
          this.touches.push({
            identifier: touch.identifier,
            x: touch.clientX - this.canvasOffset.left,
            y: touch.clientY - this.canvasOffset.top
          });
        }
      }.bind(this)
    );

    document.body.addEventListener(
      'touchmove',
      function (evt) {
        const ct = evt.changedTouches;
        for (let i = 0; i < ct.length; i++) {
          const idx = this.findTouchById(ct[i].identifier);
          const touch = ct[i];
          if (idx >= 0) {
            this.touches.splice(idx, 1, {
              identifier: touch.identifier,
              x: touch.clientX - this.canvasOffset.left,
              y: touch.clientY - this.canvasOffset.top
            });
          }
        }
      }.bind(this)
    );

    document.body.addEventListener(
      'touchend',
      function (evt) {
        const ct = evt.changedTouches;
        for (let i = 0; i < ct.length; i++) {
          const idx = this.findTouchById(ct[i].identifier);
          if (idx >= 0) {
            this.touches.splice(idx, 1);
          }
        }
      }.bind(this)
    );

    document.body.addEventListener(
      'touchcancel',
      function () {
        for (let i = 0; i < this.touches.length; i++) {
          this.touches.pop();
        }
      }.bind(this)
    );

    // redraw screen and points on a screen resize
    window.addEventListener(
      'resize',
      function () {
        this.setCanvasSize();
        this.updatePointCount();
      }.bind(this)
    );
  }

  start() {
    if (this.running) {
      return;
    }
    this.running = true;
    this.lastFrameTime = 0;
  }

  stop() {
    this.running = false;
  }

  run(timestamp) {
    if (this.this.running) {
      let dt = timestamp - this.lastFrameTime;
      this.lastFrameTime = timestamp;

      // if we were in the background, don't let dt run away
      if (dt > 200) {
        dt = 200;
      }

      Statistics.startUpdate();
      this.update(dt);
      Statistics.endUpdate();
      Statistics.startDraw();
      this.draw();
      Statistics.endDraw();
      Statistics.incrementFrameCount();
    }

    requestAnimationFrame(this.run.bind(this));
  }

  // calculate point count based on density setting and screen size
  getPointCountForGivenDensity(density) {
    return Math.max(Math.floor(((this.canvas.width * this.canvas.height) / 100000) * density), 10);
  }

  // match touch event with stored touch position id
  findTouchById(idToFind) {
    for (let i = 0; i < this.touches.length; i++) {
      const id = this.touches[i].identifier;

      if (id === idToFind) {
        return i;
      }
    }
    return -1; // not found
  }

  // get the element offset from bounding client
  getOffset(el) {
    const rect = el.getBoundingClientRect();
    return {
      left: rect.left,
      top: rect.top
    };
  }

  // get a random integer between two values
  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // map a value linearly from the range x1,x2 to the range y1,y2
  linearMap(value, yRange, xRange) {
    return ((value - xRange[0]) * (yRange[1] - yRange[0])) / (xRange[1] - xRange[0]) + yRange[0];
  }

  displaySupportsP3Color() {
    return matchMedia('(color-gamut: p3)').matches;
  }

  canvasSupportsDisplayP3() {
    const canvas = document.createElement('canvas');
    try {
      // Safari throws a TypeError if the colorSpace option is supported, but
      // the system requirements (minimum macOS or iOS version) for Display P3
      // support are not met.
      const context = canvas.getContext('2d', { colorSpace: 'display-p3' });
      return context.getContextAttributes().colorSpace === 'display-p3';
    } catch {}
    return false;
  }
}

export { Constellation, Statistics };
export default Constellation;

/* global AFRAME */

if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.');
}

/**
 * Lounge entry point component, usually for the camera rig
 * Sets position of entity to that of the entry point in a lounge,
 * usually on the floor.
 */
AFRAME.registerComponent('lounge-entry-point', {
  schema: {
    loungeId: {type: 'string', default: 'lounge'},
  },

  /**
   * Set if component needs multiple instancing.
   */
  multiple: false,

  /**
   * Called once when component is attached. Generally for initial setup.
   */
  init: function () {
    console.log("lounge-floor-locate component (init)");
    let lounge = document.getElementById(this.data.loungeId);
    let point = lounge.components.lounge.entry_point();
    let pointLocal = this.el.object3D.worldToLocal(point);
    this.el.object3D.position.copy(pointLocal);
  },

  update: function (oldData) {
  },

  remove: function () { }
});

/**
 * Floor component for the Lounge
 */
AFRAME.registerComponent('lounge-floor', {
  schema: {
    width: {type: 'number', default: 10},
    depth: {type: 'number', default: 7},
    color: {type: 'color', default: '#808080'},
    texture: {type: 'asset'},
    position: {type: 'vec3', default: {x: 0, y: 0, z: 0}}
  },

  /**
   * Set if component needs multiple instancing.
   */
  multiple: false,

  /**
   * Called once when component is attached. Generally for initial setup.
   */
  init: function () {
    console.log("lounge-floor component (init)");
    this.floor = document.createElement('a-plane');
    this.floor.setAttribute('class', 'lounge-floor');
    if(this.data.texture == '') {
        this.floor.setAttribute('color', this.data.color);
    } else {
        this.floor.setAttribute('src', this.data.texture);
    };
    this.floor.setAttribute('width', this.data.width);
    this.floor.setAttribute('height', this.data.depth);
    this.floor.setAttribute('position', this.data.position);
    this.floor.setAttribute('rotation', '270 0 0');
    this.floor.setAttribute('side', 'double');
//    this.floor.setAttribute('static-body', '');
    this.el.appendChild(this.floor);
  },
  update: function (oldData) {
  },

  remove: function () { }
});

/**
 * Ceiling component for the Lounge
 */
AFRAME.registerComponent('lounge-ceiling', {
  schema: {
    width: {type: 'number', default: 10},
    depth: {type: 'number', default: 7},
    color: {type: 'color', default: '#808080'},
    position: {type: 'vec3', default: {x: 0, y: 0, z: 0}}
  },

  /**
   * Set if component needs multiple instancing.
   */
  multiple: false,

  /**
   * Called once when component is attached. Generally for initial setup.
   */
  init: function () {
    console.log("lounge-ceiling component (init)");
    this.floor = document.createElement('a-plane');
    this.floor.setAttribute('class', 'lounge-ceiling');
    this.floor.setAttribute('color', this.data.color);
    this.floor.setAttribute('width', this.data.width);
    this.floor.setAttribute('height', this.data.depth);
    this.floor.setAttribute('position', this.data.position);
    this.floor.setAttribute('rotation', '90 0 0');
    this.floor.setAttribute('side', 'double');
//    this.floor.setAttribute('static-body', '');
    this.el.appendChild(this.floor);
  },
  update: function (oldData) {
  },

  remove: function () { }
});

/**
 * Wall component for the Lounge
 */
AFRAME.registerComponent('lounge-wall', {
  schema: {
    width: {type: 'number', default: 10},
    height: {type: 'number', default: 4},
    depth: {type: 'number', default: .3},
    color: {type: 'color', default: '#aaa4a4'},
    position: {type: 'vec3', default: {x: 0, y: 0, z: 0}}
  },

  /**
   * Set if component needs multiple instancing.
   */
  multiple: true,

  /**
   * Called once when component is attached. Generally for initial setup.
   */
  init: function () {
    console.log("lounge-wall component (init)");
    this.wall = document.createElement('a-box');
    this.wall.setAttribute('class', 'lounge-wall');
    this.wall.setAttribute('color', this.data.color);
    this.wall.setAttribute('width', this.data.width);
    this.wall.setAttribute('depth', this.data.depth);
    this.wall.setAttribute('height', this.data.height);
    this.wall.setAttribute('position', this.data.position);
    if (this.id == 'north') {
      this.wall.setAttribute('rotation', '0 0 0');
    } else if (this.id == 'east') {
      this.wall.setAttribute('rotation', '0 90 0');
    } else if (this.id == 'south') {
      this.wall.setAttribute('rotation', '0 180 0');
    } else if (this.id == 'west') {
      this.wall.setAttribute('rotation', '0 270 0');
    }
//    this.floor.setAttribute('static-body', '');
    this.el.appendChild(this.wall);
  },
  update: function (oldData) {
  },

  remove: function () { }
});

/**
 * Lounge component for A-Frame.
 */
AFRAME.registerComponent('lounge', {
  schema: {
    width: {type: 'number', default: 10},
    height: {type: 'number', default: 4},
    depth: {type: 'number', default: 7},
    floorColor: {type: 'color', default: '#808080'},
    wallColor: {type: 'color', default: '#aaa4a4'},
    ceiling: {type: 'boolean', default: true},
    entryPoint: {type: 'vec3', default: {}},
  },

  /**
   * Set if component needs multiple instancing.
   */
  multiple: false,

  /**
   * Called once when component is attached. Generally for initial setup.
   */
  init: function () {
    console.log("lounge component (init)");
    this.lounge = document.createElement('a-entity');
    this.lounge.setAttribute('lounge-floor', {
      'color': this.data.floorColor,
      'width': this.data.width,
      'depth': this.data.depth,
      'position': {x: 0, y: -this.data.height/2, z: 0}
    });
    let walls = {
      'north': {posX: 0, posZ: -this.data.depth/2,
        width: this.data.width},
      'east': {posX: this.data.width/2, posZ: 0,
        width: this.data.depth},
      'south': {posX: 0, posZ: this.data.depth/2,
        width: this.data.width},
      'west': {posX: -this.data.width/2, posZ: 0,
        width: this.data.depth},
    };
    for (const facing in walls) {
      const wall = walls[facing];
      this.lounge.setAttribute('lounge-wall__' + facing, {
        'color': this.data.wallColor,
        'width': wall.width,
        'height': this.data.height,
        'position': {x: wall.posX, y: 0, z: wall.posZ}
      });
    };
    if (this.data.ceiling) {
      this.lounge.setAttribute('lounge-ceiling', {
        'color': this.data.ceilingColor,
        'width': this.data.width,
        'depth': this.data.depth,
        'position': {x: 0, y: this.data.height/2, z: 0}
      });
    };
    this.el.appendChild(this.lounge);
  },

  /**
   * Called when component is attached and when component data changes.
   * Generally modifies the entity based on the data.
   */
  update: function (oldData) {
  },

  /**
   * Called when a component is removed (e.g., via removeAttribute).
   * Generally undoes all modifications to the entity.
   */
  remove: function () { },

  /**
   * Called on each scene tick.
   */
  // tick: function (t) { },

  /**
   * Called when entity pauses.
   * Use to stop or remove any dynamic or background behavior such as events.
   */
  pause: function () { },

  /**
   * Called when entity resumes.
   * Use to continue or add any dynamic or background behavior such as events.
   */
  play: function () { },

  /**
   * Event handlers that automatically get attached or detached based on scene state.
   */
  events: {
    // click: function (evt) { }
  },

  /**
   * Give a position located in the floor (in world coordinates)
   * that can act as an entry point for the room.
   */
  entry_point() {
    var point;
    if (Object.keys(this.data.entryPoint).length == 0) {
      point = new THREE.Vector3(0, -this.data.height/2, this.data.depth/4);
    } else {
      point = new THREE.Vector3(this.data.entryPoint.x,
                                this.data.entryPoint.y,
                                this.data.entryPoint.z);
    };
    this.el.object3D.updateMatrixWorld()
    return this.el.object3D.localToWorld(point);
  },
});

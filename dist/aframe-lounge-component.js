(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/* global AFRAME */\nif (typeof AFRAME === 'undefined') {\n  throw new Error('Component attempted to register before AFRAME was available.');\n}\n/**\n * Lounge plinth, to set up stuff in the lounge.\n */\n\n\nAFRAME.registerComponent('lounge-plinth', {\n  schema: {\n    width: {\n      type: 'number',\n      default: 1\n    },\n    depth: {\n      type: 'number',\n      default: 1\n    },\n    height: {\n      type: 'number',\n      default: .5\n    },\n    color: {\n      type: 'color',\n      default: '#404040'\n    }\n  },\n\n  /**\n   * Set if component needs multiple instancing.\n   */\n  multiple: false,\n\n  /**\n   * Called once when component is attached. Generally for initial setup.\n   */\n  init: function () {\n    let el = this.el;\n    let data = this.data;\n    console.log(\"lounge-plinth (init)\");\n    this.el.setAttribute('geometry', {\n      'primitive': 'box',\n      'width': this.data.width,\n      'depth': this.data.depth,\n      'height': this.data.height\n    });\n    this.el.setAttribute('material', {\n      'color': this.data.color\n    });\n    this.el.addEventListener(\"staydown\", function (event) {\n      // When \"staydown\" received, set position to to be on floor\n      let localPosition = el.object3D.worldToLocal(event.detail.worldPosition);\n      el.object3D.position.y = localPosition.y + data.height / 2;\n    });\n  },\n  update: function (oldData) {},\n  remove: function () {}\n});\n/**\n * Lounge staydown component, making the entity, if in a lounge,\n   to \"fall down\" to the floor.\n */\n\nAFRAME.registerComponent('lounge-staydown', {\n  schema: {},\n\n  /**\n   * Set if component needs multiple instancing.\n   */\n  multiple: false,\n\n  /**\n   * Emit an event with floor position\n   */\n  floor_level: function (position) {\n    localPosition = new THREE.Vector3(position.x, position.y, position.z);\n    this.el.object3D.updateMatrixWorld();\n    this.el.emit('staydown', {\n      worldPosition: this.el.object3D.localToWorld(localPosition)\n    }, false);\n  },\n\n  /**\n   * Called once when component is attached. Generally for initial setup.\n   */\n  init: function () {\n    console.log(\"lounge-staydown component (init)\");\n    let floor_level = this.floor_level.bind(this);\n    let el = this.el; // Find entity with lounge component\n\n    let ancestor = el;\n\n    while ((ancestor = ancestor.parentNode) && !(\"lounge\" in ancestor.attributes));\n\n    let loungeEntity = ancestor;\n    loungeEntity.addEventListener(\"loaded\", function () {\n      // When the entity with lounge is loaded, find floor level\n      let floorEntity = loungeEntity.querySelector(\"a-entity[lounge-floor]\");\n      let floorComponent = floorEntity.components[\"lounge-floor\"];\n\n      if ('data' in floorComponent) {\n        // floorComponent already initialized\n        floor_level(floorComponent.data.position);\n      } else {\n        // floorComponent not initialized yet, set a listener\n        floorEntity.addEventListener(\"componentinitialized\", function (event) {\n          if (event.detail.name == \"lounge-floor\") {\n            floor_level(floorComponent.data.position);\n          }\n\n          ;\n        });\n      }\n\n      ;\n    });\n  },\n  update: function (oldData) {},\n  remove: function () {}\n});\n/**\n * Lounge entry point component, usually for the camera rig\n * Sets position of entity to that of the entry point in a lounge,\n * usually on the floor.\n * If loungeId is not found, find the first lounge in the scene.\n */\n\nAFRAME.registerComponent('lounge-entry-point', {\n  schema: {\n    loungeId: {\n      type: 'string',\n      default: 'lounge'\n    }\n  },\n\n  /**\n   * Set if component needs multiple instancing.\n   */\n  multiple: false,\n\n  /**\n   * Called once when component is attached. Generally for initial setup.\n   */\n  init: function () {\n    console.log(\"lounge-entry-point component (init)\");\n    let lounge = document.getElementById(this.data.loungeId);\n\n    if (lounge == null) {\n      lounge = document.querySelector(\"a-entity[lounge]\");\n    }\n\n    ;\n    let point = lounge.components.lounge.entry_point();\n    let pointLocal = this.el.object3D.worldToLocal(point);\n    this.el.object3D.position.copy(pointLocal);\n  },\n  update: function (oldData) {},\n  remove: function () {}\n});\n/**\n * Floor component for the Lounge\n */\n\nAFRAME.registerComponent('lounge-floor', {\n  schema: {\n    width: {\n      type: 'number',\n      default: 10\n    },\n    depth: {\n      type: 'number',\n      default: 7\n    },\n    color: {\n      type: 'color'\n    },\n    texture: {\n      type: 'asset'\n    },\n    position: {\n      type: 'vec3',\n      default: {\n        x: 0,\n        y: 0,\n        z: 0\n      }\n    }\n  },\n\n  /**\n   * Set if component needs multiple instancing.\n   */\n  multiple: false,\n\n  /**\n   * Called once when component is attached. Generally for initial setup.\n   */\n  init: function () {\n    console.log(\"lounge-floor component (init)\");\n    this.floor = document.createElement('a-plane');\n    this.floor.setAttribute('class', 'lounge-floor');\n    this.floor.setAttribute('color', this.data.color);\n    this.floor.setAttribute('src', this.data.texture);\n    this.floor.setAttribute('width', this.data.width);\n    this.floor.setAttribute('height', this.data.depth);\n    this.floor.setAttribute('position', this.data.position);\n    this.floor.setAttribute('rotation', '270 0 0');\n    this.floor.setAttribute('side', 'double'); //    this.floor.setAttribute('static-body', '');\n\n    this.el.appendChild(this.floor);\n  },\n  update: function (oldData) {},\n  remove: function () {}\n});\n/**\n * Ceiling component for the Lounge\n */\n\nAFRAME.registerComponent('lounge-ceiling', {\n  schema: {\n    width: {\n      type: 'number',\n      default: 10\n    },\n    depth: {\n      type: 'number',\n      default: 7\n    },\n    color: {\n      type: 'color',\n      default: '#808080'\n    },\n    position: {\n      type: 'vec3',\n      default: {\n        x: 0,\n        y: 0,\n        z: 0\n      }\n    }\n  },\n\n  /**\n   * Set if component needs multiple instancing.\n   */\n  multiple: false,\n\n  /**\n   * Called once when component is attached. Generally for initial setup.\n   */\n  init: function () {\n    console.log(\"lounge-ceiling component (init)\");\n    this.floor = document.createElement('a-plane');\n    this.floor.setAttribute('class', 'lounge-ceiling');\n    this.floor.setAttribute('color', this.data.color);\n    this.floor.setAttribute('width', this.data.width);\n    this.floor.setAttribute('height', this.data.depth);\n    this.floor.setAttribute('position', this.data.position);\n    this.floor.setAttribute('rotation', '90 0 0');\n    this.floor.setAttribute('side', 'double'); //    this.floor.setAttribute('static-body', '');\n\n    this.el.appendChild(this.floor);\n  },\n  update: function (oldData) {},\n  remove: function () {}\n});\n/**\n * Wall component for the Lounge\n */\n\nAFRAME.registerComponent('lounge-wall', {\n  schema: {\n    width: {\n      type: 'number',\n      default: 10\n    },\n    height: {\n      type: 'number',\n      default: 4\n    },\n    depth: {\n      type: 'number',\n      default: .3\n    },\n    color: {\n      type: 'color',\n      default: '#aaa4a4'\n    },\n    position: {\n      type: 'vec3',\n      default: {\n        x: 0,\n        y: 0,\n        z: 0\n      }\n    }\n  },\n\n  /**\n   * Set if component needs multiple instancing.\n   */\n  multiple: true,\n\n  /**\n   * Called once when component is attached. Generally for initial setup.\n   */\n  init: function () {\n    console.log(\"lounge-wall component (init)\");\n    this.wall = document.createElement('a-box');\n    this.wall.setAttribute('class', 'lounge-wall');\n    this.wall.setAttribute('color', this.data.color);\n    this.wall.setAttribute('width', this.data.width);\n    this.wall.setAttribute('depth', this.data.depth);\n    this.wall.setAttribute('height', this.data.height);\n    this.wall.setAttribute('position', this.data.position);\n\n    if (this.id == 'north') {\n      this.wall.setAttribute('rotation', '0 0 0');\n    } else if (this.id == 'east') {\n      this.wall.setAttribute('rotation', '0 90 0');\n    } else if (this.id == 'south') {\n      this.wall.setAttribute('rotation', '0 180 0');\n    } else if (this.id == 'west') {\n      this.wall.setAttribute('rotation', '0 270 0');\n    } //    this.floor.setAttribute('static-body', '');\n\n\n    this.el.appendChild(this.wall);\n  },\n  update: function (oldData) {},\n  remove: function () {}\n});\n/**\n * Lounge component for A-Frame.\n */\n\nAFRAME.registerComponent('lounge', {\n  schema: {\n    width: {\n      type: 'number',\n      default: 10\n    },\n    height: {\n      type: 'number',\n      default: 4\n    },\n    depth: {\n      type: 'number',\n      default: 7\n    },\n    floorColor: {\n      type: 'color',\n      default: '#808080'\n    },\n    wallColor: {\n      type: 'color',\n      default: '#aaa4a4'\n    },\n    ceiling: {\n      type: 'boolean',\n      default: true\n    },\n    entryPoint: {\n      type: 'vec3',\n      default: {}\n    }\n  },\n\n  /**\n   * Set if component needs multiple instancing.\n   */\n  multiple: false,\n\n  /**\n   * Called once when component is attached. Generally for initial setup.\n   */\n  init: function () {\n    console.log(\"lounge component (init)\");\n    this.lounge = document.createElement('a-entity');\n    this.lounge.setAttribute('lounge-floor', {\n      'color': this.data.floorColor,\n      'width': this.data.width,\n      'depth': this.data.depth,\n      'position': {\n        x: 0,\n        y: -this.data.height / 2,\n        z: 0\n      }\n    });\n    let walls = {\n      'north': {\n        posX: 0,\n        posZ: -this.data.depth / 2,\n        width: this.data.width\n      },\n      'east': {\n        posX: this.data.width / 2,\n        posZ: 0,\n        width: this.data.depth\n      },\n      'south': {\n        posX: 0,\n        posZ: this.data.depth / 2,\n        width: this.data.width\n      },\n      'west': {\n        posX: -this.data.width / 2,\n        posZ: 0,\n        width: this.data.depth\n      }\n    };\n\n    for (const facing in walls) {\n      const wall = walls[facing];\n      this.lounge.setAttribute('lounge-wall__' + facing, {\n        'color': this.data.wallColor,\n        'width': wall.width,\n        'height': this.data.height,\n        'position': {\n          x: wall.posX,\n          y: 0,\n          z: wall.posZ\n        }\n      });\n    }\n\n    ;\n\n    if (this.data.ceiling) {\n      this.lounge.setAttribute('lounge-ceiling', {\n        'color': this.data.ceilingColor,\n        'width': this.data.width,\n        'depth': this.data.depth,\n        'position': {\n          x: 0,\n          y: this.data.height / 2,\n          z: 0\n        }\n      });\n    }\n\n    ;\n    this.el.appendChild(this.lounge);\n  },\n\n  /**\n   * Called when component is attached and when component data changes.\n   * Generally modifies the entity based on the data.\n   */\n  update: function (oldData) {},\n\n  /**\n   * Called when a component is removed (e.g., via removeAttribute).\n   * Generally undoes all modifications to the entity.\n   */\n  remove: function () {},\n\n  /**\n   * Called on each scene tick.\n   */\n  // tick: function (t) { },\n\n  /**\n   * Called when entity pauses.\n   * Use to stop or remove any dynamic or background behavior such as events.\n   */\n  pause: function () {},\n\n  /**\n   * Called when entity resumes.\n   * Use to continue or add any dynamic or background behavior such as events.\n   */\n  play: function () {},\n\n  /**\n   * Event handlers that automatically get attached or detached based on scene state.\n   */\n  events: {// click: function (evt) { }\n  },\n\n  /**\n   * Give a position located in the floor (in world coordinates)\n   * that can act as an entry point for the room.\n   */\n  entry_point() {\n    var point;\n\n    if (Object.keys(this.data.entryPoint).length == 0) {\n      point = new THREE.Vector3(0, -this.data.height / 2, this.data.depth / 4);\n    } else {\n      point = new THREE.Vector3(this.data.entryPoint.x, this.data.entryPoint.y, this.data.entryPoint.z);\n    }\n\n    ;\n    this.el.object3D.updateMatrixWorld();\n    return this.el.object3D.localToWorld(point);\n  }\n\n});\n\n//# sourceURL=webpack:///./index.js?");

/***/ })

/******/ });
});
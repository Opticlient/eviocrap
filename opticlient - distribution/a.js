let t=document.createElement("a");t.setAttribute("onclick",`(()=>{



if (window.client) return (s => alert(s + " is not compatible with other clients. " + s + " no es compatible con otros clientes. " + s + " não é compatível com outros clientes. " + s + " несовместим с другими клиентами. " + s + " 與其他客戶端不相容。"))("Opticlient");
window.client = true;

const doNothing = function() {};

//version control for opticlient (1 / 3)
(() => {
 if (!localStorage.getItem("opticlient")) {
  localStorage.setItem("opticlient", JSON.stringify({
   zoomKeybind: "p",
   fov: 60,
   v: 9,
   zoomType: 0,
  }));
 };
})();

const ls = JSON.parse(localStorage.getItem("opticlient")),
saveData = () => localStorage.setItem("opticlient", JSON.stringify(ls));

//version control for opticlient (2 / 3)
(() => {
 let didVersionChange = false;
 if (ls.v === 1) {
  didVersionChange = true;
  ls.v = 2;
  ls.anim = 0;
 };
 if (ls.v <= 5) {
  didVersionChange = true;
  ls.v = 6;
  localStorage.removeItem("opticlient-three");
  localStorage.removeItem("opticlient-window");
 };
 if (ls.v === 6) {
  didVersionChange = true;
  ls.v = 7;
  localStorage.removeItem("opticlient-three");
 };
 if (ls.v === 7) {
  didVersionChange = true;
  ls.v = 8;
  ls.hh = 0;
  delete ls.anim;
 };
 if (ls.v === 8) {
  didVersionChange = true;
  ls.v = 9;
  delete ls.hh;
 };
 if (didVersionChange) saveData();
})();

//ad blocker (1 / 2)
(() => {
 const doc = document.createElement;
 document.createElement = function(i) {
  let f = doc.apply(this, arguments);
  if (i.toLowerCase() === "script") {
   f.__defineSetter__("src", doNothing);
   f.setAttribute = doNothing;
  };
  return f;
 };
 window.addEventListener("load", () => document.createElement = doc, { once: true });
})();

//disabled trackers
(() => {
 window.addEventListener("load", () => window.gtag = window.ga = doNothing, { once: true });
})();

//fixed a memory leak (1 / 2)
(_consoleLog => {
 for (let key in console) {
  if (typeof console[key] === "function") console[key] = doNothing;
 };
 console.log2 = _consoleLog;
})(console.log);

//no confirm quit
(() => {
 window.addEventListener("load", () => window.onbeforeunload = null, { once: true });
})();

//optimized rendering
(() => {
 const _set = Object.getOwnPropertyDescriptor(Image.prototype, "src").set,
 pixelated = "pixelated";
 Object.defineProperty(Image.prototype, "src", {
  get: Object.getOwnPropertyDescriptor(Image.prototype, "src").get,
  set: function(url) {
   this.style.imageRendering = pixelated;
   _set.apply(this, arguments);
  },
 });
 window.addEventListener("load", () => {
  let element = document.createElement("style");
  element.innerText = "img{image-rendering:pixelated}";
  document.head.appendChild(element);
 }, { once: true });
})();

//zoom keybind
(() => {
 let zoomKeybind = ls.zoomKeybind;
 const keybindCallback = e => {
  if (e.type === "mousedown") {
   e.preventDefault();
   e = e.button;
   ls.zoomKeybind = zoomKeybind = e;
   ls.zoomType = 1;
   saveData();
   set_zoom_display.innerText = "MOUSE" + e;
  } else {
   e = e.key;
   ls.zoomKeybind = zoomKeybind = e.toLowerCase();
   ls.zoomType = 0;
   saveData();
   set_zoom_display.innerText = e.toUpperCase();
  };
  let target = document.querySelectorAll(".module_content")[1];
  target.removeEventListener("keydown", keybindCallback);
  target.removeEventListener("mousedown", keybindCallback);
  updateZoomType();
 },
 updateZoomType = () => {
  window.removeEventListener("keydown", zoomKeydown);
  window.removeEventListener("keyup", zoomKeyup);
  window.removeEventListener("mousedown", zoomMousedown);
  window.removeEventListener("mouseup", zoomMouseup);
  if (ls.zoomType) {
   window.addEventListener("mousedown", zoomMousedown);
   window.addEventListener("mouseup", zoomMouseup);
  } else {
   window.addEventListener("keydown", zoomKeydown);
   window.addEventListener("keyup", zoomKeyup);
  };
 },
 zoomKeydown = e => {
  if (e.key.toLowerCase() !== zoomKeybind) return;
  intercept = true;
  camera.updateProjectionMatrix();
  window.removeEventListener("keydown", zoomKeydown);
 },
 zoomKeyup = e => {
  if (e.key.toLowerCase() !== zoomKeybind) return;
  intercept = false;
  camera.updateProjectionMatrix();
  window.addEventListener("keydown", zoomKeydown);
 },
 zoomMousedown = e => {
  if (e.button !== zoomKeybind) return;
  intercept = true;
  camera.updateProjectionMatrix();
  window.removeEventListener("mousedown", zoomMousedown);
 },
 zoomMouseup = e => {
  if (e.button !== zoomKeybind) return;
  intercept = false;
  camera.updateProjectionMatrix();
  window.addEventListener("mousedown", zoomMousedown);
 };
 let fov,
 camera,
 alternative = ls.fov,
 intercept = false;
 Object.defineProperty(window, "THREE", {
  get: doNothing,
  set: i => {
   Object.defineProperty(i, "PerspectiveCamera", {
    get: doNothing,
    set: f => {
     Object.defineProperty(i, "PerspectiveCamera", {
      value: function(a, b, c, d) {
       camera = new THREE.PerCam(a, b, c, d);
       fov = camera.fov;
       Object.defineProperty(camera, "fov", {
        get: () => intercept ? alternative : fov,
        set: i => fov = i,
        configurable: true,
       });
       return camera;
      },
     });
     THREE.PerCam = f;
    },
    configurable: true,
   });
   Object.defineProperty(window, "THREE", { value: i });
  },
  configurable: true,
 });
 let changing = false,
 prev = null,
 last;
 const requestMenuChanges = () => {
  if (!changing) return;
  let slider = document.querySelector("#frame_cap_slider");
  if (!slider) {
   requestAnimationFrame(requestMenuChanges);
   return;
  } else {
   requestAnimationFrame(requestMenuChanges);
   let parent = slider.parentElement,
   forced = Date.now() > last;
   if (prev !== parent || forced) {
    if (prev === null) {
     prev = parent;
     if (!forced) {
      requestAnimationFrame(requestMenuChanges);
     } else {
      prev = null;
      changing = false;
     };
    } else {
     prev = null;
     changing = false;
     slider.step = 2;
     slider.min = 20;
     slider.max = 500;
     parent = slider.parentElement.parentElement.parentElement;
     let form = document.createElement("form");
     form.innerHTML = '<div class="form-group"><label for="zoom_keybind" id="zoom_keybind_label">Zoom Keybind FOV: <span class="settings_value">' + ~~alternative + '</span></label><input type="range" class="form-control-range" id="zoom_keybind" min="10" max="140" value="' + ~~alternative + '"></div>' +
     '<button id="set_zoom_btn" class="btn btn-outline-primary">Set Zoom Keybind (<strong id="set_zoom_display"></strong>)</button>';
     parent.appendChild(form);
     set_zoom_btn.onclick = e => {
      parent.removeEventListener("keydown", keybindCallback);
      parent.removeEventListener("mousedown", keybindCallback);
      parent.addEventListener("keydown", keybindCallback, { once: true });
      parent.addEventListener("mousedown", keybindCallback, { once: true });
      set_zoom_display.innerText = "awaiting input... press any key...";
      e.preventDefault();
     };
     if (ls.zoomType) {
      set_zoom_display.innerText = "MOUSE" + zoomKeybind;
     } else {
      set_zoom_display.innerText = zoomKeybind.toUpperCase();
     };
     zoom_keybind.addEventListener("input", () => {
      zoom_keybind_label.children[0].innerText = ls.fov = alternative = ~~zoom_keybind.value;
      saveData();
     });
    };
   };
  };
 };
 window.addEventListener("load", () => {
  let button = document.querySelector("#settings_button");
  if (button === null) return;
  button.addEventListener("click", () => {
   if (!changing) {
    last = Date.now() + 3000;
    changing = true;
    requestAnimationFrame(requestMenuChanges);
   };
  }, { once: true });
  updateZoomType();
 });
})();

//fixed a memory leak (2 / 2)
(() => {
 let queue = [];
 window.setTimeout = function(callback, timeout) {
  if (typeof callback === "string") {
   const _callback = callback;
   callback = () => eval(_callback);
  };
  timeout -= 0;
  if (isNaN(timeout)) {
   timeout = 0;
  } else if (!isFinite(timeout)) {
   return -1;
  };
  let index = 0;
  while (queue[index] !== undefined) index++;
  queue[index] = [(!timeout ? 0 : performance.now() + timeout), callback];
  return index;
 };
 window.clearTimeout = function(index) {
  delete queue[index];
 };
 let prev = performance.now();
 setInterval(() => {
  let current = performance.now(),
  delta = current + (current - prev);
  prev = current;
  for (let index = 0, length = queue.length; index < length; index++) {
   let item = queue[index];
   if (item && delta > item[0]) {
    delete queue[index];
    item[1]();
   };
  };
 });
})();

//fixed resetting settings bug
(() => {
 for (let key in localStorage) {
  if (typeof localStorage[key] === "string" && !(key.includes("ev") || key.includes("client"))) localStorage.removeItem(key);
 };
})();

//play any map with any game mode
(() => {
 const private_game_modes = {
  last_man_standing: "Battle Royale",
  capture_the_flag: "Capture the Flag",
  deathmatch: "Deathmatch",
  instagib: "Instagib",
  last_team_standing: "Last Team Standing",
  mayhem: "Mayhem",
  search_and_destroy: "Search and Destroy",
  snipe_the_streamer: "Snipe the Streamer",
  sniper_shotgun: "Sniper Shotgun",
  survival: "Survival",
  swords: "Swords",
  team_deathmatch: "Team Deathmatch",
  social: "Social",
  snipe_the_streamer: "Snipe The Streamer",
  deathmatch_earn: "Deathmatch (earn)",
  team_deathmatch_earn: "Team Deathmatch (earn)",
  last_team_standing_earn: "Last Team Standing (earn)",
  survival_earn: "Survival (earn)",
 },
 private_game_modes_string = (() => {
  let output = [], name;
  output.push("Battle Royale");
  for (name in private_game_modes) {
   name = name.split("_");
   name.forEach((i, f) => name[f] = i.slice(0, 1).toUpperCase() + i.slice(1));
   output.push(name.join(" "));
  };
  return output.join(", ");
 })();
 window.addEventListener("load", () => {
  const get = $.get;
  $.get = function(url, callback, param) {
   if (url?.includes?.("/map")) {
    return get.apply($, [ url, function(json) {
     json.forEach(item => {
      item.field_game_modes = private_game_modes_string;
      item.field_is_community_map = "0";
      item.field_allow_private_games = "1";
      item.field_in_public_rotation = "1";
     });
     callback(json);
    }, param ]);
   } else {
    return get.apply($, arguments);
   };
  };
  priv_game.addEventListener("click", () => {
   let loop = () => {
    let menu = document.querySelector("#select_game_mode_select");
    if (menu) {
     Object.entries(private_game_modes).forEach(item => {
      if (!menu.querySelector("[value=" + item[0] + "]")) {
       let option = document.createElement("option");
       option.value = item[0];
       option.innerText = item[1];
       menu.appendChild(option);
      };
     });
    } else {
     requestAnimationFrame(loop);
    };
   };
   requestAnimationFrame(loop);
  }, { once: true });
 }, { once: true });
})();

//disabled capslock
(() => {
 window.addEventListener("load", () => {
  chat_input.addEventListener("keydown", function(e) {
   if (e.getModifierState("CapsLock") && !e.ctrlKey && e.key.length === 1) {
    if (e.shiftKey) {
     e.preventDefault();
     this.value += e.key.toUpperCase();
    } else if (e.key !== e.key.toLowerCase()) {
     e.preventDefault();
     this.value += e.key.toLowerCase();
    };
   };
  });
 }, { once: true });
})();

//auto switch on empty
(() => {
 const down = [],
 up = [],
 ev = {
  keyCode: 0,
  isTrusted: true,
  altKey: false,
  bubbles: true,
  cancelBubble: false,
  cancelable: true,
  charCode: 0,
  composed: true,
  ctrlKey: false,
  currentTarget: null,
  defaultPrevented: false,
  detail: 0,
  eventPhase: 0,
  isComposing: false,
  location: 0,
  metaKey: false,
  repeat: false,
  returnValue: true,
  shiftKey: false,
 };
 let running = true,
 prev;
 const ls_callback = () => {
  if (!running) return;
  try {
   const _ls = JSON.parse(localStorage.getItem("ev_settings_k"));
   if (_ls == null) {
    requestAnimationFrame(ls_callback);
   } else {
    let search = _ls.inputs.keyCodeToActionMap;
    for (let key in search) {
     let value = search[key];
     if (value == 12) {
      running = false;
      ev.keyCode = key - 0;
      return;
     };
    };
    requestAnimationFrame(ls_callback);
   };
  } catch(e) {
   requestAnimationFrame(ls_callback);
  };
 },
 set = localStorage.setItem;
 ls_callback();
 localStorage.setItem = function(key, value) {
  set.apply(localStorage, arguments);
  if (key === "ev_settings_k" && !running) {
   running = true;
   ls_callback();
  };
 };
 window.addEventListener("load", () => {
  const weaponsDiv = document.querySelector("#weaponsDiv"),
  loop = () => {
   if (!prev) {
    let target = weaponsDiv.querySelector(".activeWeapon");
    if (target && (target = target.querySelector(".ammo_amt")) && target.innerText == "0 / 0") {
     prev = target;
     down.forEach(i => i(ev));
    };
   } else {
    let target = weaponsDiv.querySelector(".activeWeapon");
    if (target && (target = target.querySelector(".ammo_amt")) && target !== prev) {
     prev = undefined;
     up.forEach(i => i(ev));
    };
   };
   requestAnimationFrame(loop);
  };
  loop();
 }, { once: true });
 const el = document.addEventListener;
 document.addEventListener = function(type, callback, options) {
  if (type == "keydown") {
   down.push(callback);
  } else if (type == "keyup") {
   up.push(callback);
  };
  return el.apply(this, arguments);
 };
})();

//retain session information when changing account (1 / 3)
(() => {
 const _fetch = window.fetch;
 let last_match = "",
 correction = false;
 window.fetch = function(url, options) {
  if (url?.includes?.("/seek?req=")) {
   return new Promise(resolve => {
    const retry = () => {
     _fetch(url, options).then(e => {
      e.text().then(f => {
       let g = JSON.parse(f).lobbyId;
       if (g !== last_match) {
        last_match = g;
        if (correction) {
         history.replaceState(null, "", location.origin);
         document.title = location.origin;
         document.querySelector("title")?.remove?.();
         correction = false;
        };
        _fetch("data:text/json;base64," + btoa(f)).then(resolve);
       } else retry();
      });
     });
    };
    retry();
   });
  };
  return _fetch(url, options);
 };
 sessionStorage.removeItem("opticlient-continue");
 if (location.search) {
  if (!location.search.includes("&") && location.search.startsWith("?game=")) correction = true;
 } else {
  if (sessionStorage.getItem("opticlient-continue2")) {
   location.search = sessionStorage.getItem("opticlient-continue2");
  }
 };
 sessionStorage.removeItem("opticlient-continue2");
 window.addEventListener("load", () => {
  let button = document.querySelector("#login_button");
  if (button) {
   button.addEventListener("click", () => {
    let time = document.querySelector("#time_icon");
    if (time && time.parentElement.innerText.trim().split(":")[0] - 0) {
     if (location.search.length <= 1 || (location.search.startsWith("?game=") && !location.search.includes("&"))) {
      sessionStorage.setItem("opticlient-continue", "?game=" + last_match);
     } else {
      sessionStorage.setItem("opticlient-continue", location.search);
     };
    };
   });
  } else {
   button = document.querySelector("#logout_button");
   if (button) {
    button.addEventListener("click", () => {
     let time = document.querySelector("#time_icon");
     if (time && time.parentElement.innerText.trim().split(":")[0] - 0) {
      if (location.search.length <= 1 || (location.search.startsWith("?game=") && !location.search.includes("&"))) {
       sessionStorage.setItem("opticlient-continue2", "?game=" + last_match);
      } else {
       sessionStorage.setItem("opticlient-continue2", location.search);
      };
     };
    });
   };
  };
 }, { once: true });
})();

//ad blocker (2 / 2)
(() => {
 window.addEventListener("load", () => document.querySelector("style").innerText += "#stats_ad_right{opacity:0!important;pointer-events:none!important}", { once: true });
})();

//version control for opticlient (3 / 3)
(() => {
 const list = {};
 window.addEventListener("load", () => {
  const ver = Object.values(document.querySelectorAll("script[src]")).filter(i => i.src.includes("bundle.js"))[0]?.src?.split?.("dist/")?.[1]?.split?.("/")?.[0];
  if (localStorage.getItem("opticlient-game-version") !== ver) {
   for (let key in localStorage) {
    if (key.startsWith("opticlient-")) localStorage.removeItem(key);
   };
   localStorage.setItem("opticlient-game-version", ver);
  };
 }, { once: true });
})();

//removing unused internals (1 / 2)
(() => {
 window.addEventListener("load", () => {
  document.querySelectorAll("script, meta").forEach(i => i.remove());
  document.querySelectorAll("link").forEach(i => {
   if (i.rel !== "stylesheet") i.remove();
  });
  document.querySelector("title")?.remove();
  document.querySelector("noscript")?.remove();
  let temp = document.documentElement.children[0];
  if (temp.nodeName === "A") temp.remove();
  temp = item => {
   item = item.childNodes;
   let remove = [];
   item.forEach(i => {
    let f = i.nodeName;
    if ((f.startsWith("#") || f.toUpperCase() !== f) && f !== "#text") {
     remove.push(i);
    } else {
     temp(i);
    };
   });
   remove.forEach(i => i.remove());
  };
  temp(document);
 }, { once: true });
})();

//benchmark performance optimizations (1 / 2)
(() => {
 window.addEventListener("load", () => setTimeout(() => {
  let data = localStorage.getItem("opticlient-three");
  if (data) {
   data = data.split(",");
   for (let key in THREE) {
    if (!data.includes(key)) delete THREE[key];
   };
   return;
  };
  const original = {},
  keep = [];
  for (let key in THREE) {
   const value = THREE[key];
   original[key] = value;
   Object.defineProperty(THREE, key, {
    get() {
     Object.defineProperty(THREE, key, { value: original[key] });
     delete original[key];
     keep.push(key);
     return value;
    },
    set(value) {
     delete original[key];
     keep.push(key);
     Object.defineProperty(THREE, key, { value: value });
    },
   });
  };
  setTimeout(() => {
   for (let key in original) delete THREE[key];
   localStorage.setItem("opticlient-three", keep.join(","));
  }, 1000 * 60 * 5.5);
 }, 0), { once: true });
})();

//benchmark performance optimizations (2 / 2)
(() => {
 let data = localStorage.getItem("opticlient-prototypes");
 if (data) {
  data = data.split(",");
  Object.getOwnPropertyNames(window).forEach(key => {
   if (typeof window[key] === "function" && key[0].toUpperCase() === key[0] && key !== "Object" && !data.includes(key)) {
    delete window[key];
   };
  });
  return;
 };
 const original = {},
 keep = [];
 Object.getOwnPropertyNames(window).forEach(key => {
  const value = window[key];
  if (typeof value === "function" && key[0].toUpperCase() === key[0] && key !== "Object") {
   original[key] = value;
   Object.defineProperty(window, key, {
    get() {
     Object.defineProperty(window, key, { value: original[key] });
     delete original[key];
     keep.push(key);
     return value;
    },
    set(value) {
     delete original[key];
     keep.push(key);
     Object.defineProperty(window, key, { value: value });
    },
   });
  };
 });
 window.THREE;
 window.addEventListener("load", () => setTimeout(() => {
  for (let key in original) delete window[key];
  localStorage.setItem("opticlient-prototypes", keep.join(","));
 }, 1000 * 60 * 5.5), { once: true });
})();

//removing unused internals (2 / 2)
(() => {
 window.addEventListener("load", () => {
  for (let key in window) {
   if (!window[key]) delete window[key];
  };
 }, { once: true });
})();

//removed billboards
(() => {
 const open = XMLHttpRequest.prototype.open,
 alt_url = "data:text/json;base64," + btoa(JSON.stringify([
  {
   field_billboard: "/sites/default/files/custom_crosshairs/B.png",
   field_weighted_chance_to_appear: 1,
   title: "Izzy was here :b",
  },
 ]));
 XMLHttpRequest.prototype.open = function(type, url) {
  if (url?.includes?.("/billboards")) {
   url = alt_url;
  };
  open.apply(this, arguments);
 };
})();

//packet sync
(() => {
 const _websocket = WebSocket,
 _send = WebSocket.prototype.send;
 let reply = [],
 send = [],
 msg = doNothing,
 ws;
 window.WebSocket = class {
  constructor(url) {
   if (url?.includes?.("ev.io")) {
    window.ws = ws = new _websocket(url);
    window.WebSocket = _websocket;
    ws.send = function(data) {
     send.push(data);
    };
    Object.defineProperty(ws, "onmessage", {
     get: doNothing,
     set: _msg => {
      msg = _msg;
      ws.addEventListener("message", e => reply.push(e));
      Object.defineProperty(ws, "onmessage", {
       get: () => msg,
       set: _msg => msg = _msg,
      });
     },
     configurable: true,
    });
    setInterval(() => {
     send.forEach(i => _send.apply(ws, [ i ]));
     send = [];
     reply.forEach(msg);
     reply = [];
    }, 50);
    return ws;
   } else {
    return new _websocket(url);
   };
  };
 };
})();



})();`);document.documentElement.appendChild(t);t.click();t.removeAttribute("onclick");
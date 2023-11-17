let t=document.createElement("a");t.setAttribute("onclick",`(()=>{



if (window.client) return alert((i=>i[(i=>i.slice(0,i[2]=="-"?2:3))(navigator.language)]||i.en)({en:"Opticlient failed to start because of one of your extensions!",es:"¡Opticlient no pudo iniciarse debido a una de sus extensiones!",pt:"O Opticlient falhou ao iniciar devido a uma de suas extensões!",ru:"Opticlient не запустился из-за одного из ваших расширений!",uk:"Opticlient не вдалося запустити через одне з ваших розширень!",zh:"由於您的擴充功能之一，Opticlient 無法啟動！",ja:"拡張機能の 1 つが原因で、Opticlient を起動できませんでした。",ko:"확장 중 하나로 인해 Opticlient를 시작하지 못했습니다!",hi:"आपके एक एक्सटेंशन के कारण ऑप्टिकल क्लाइंट प्रारंभ होने में विफल रहा!",ar:"فشل Opticlient في البدء بسبب أحد ملحقاتك!"}));
window.client = true;

//version control for opticlient (1 / 3)
(() => {
 if (!localStorage.getItem("opticlient")) {
  localStorage.setItem("opticlient", JSON.stringify({
   zoom: {
    keybind: "p",
    type: 0,
    fov: 60,
   },
   v: 11,
  }));
 };
})();

const doNothing = function() {},
saveData = () => localStorage.setItem("opticlient", JSON.stringify(ls)),
ls = JSON.parse(localStorage.getItem("opticlient"));

//fixed a memory leak (1 / 3)
(_consoleLog => {
 for (let key in console) {
  if (typeof console[key] === "function") console[key] = doNothing;
 };
 console.log2 = _consoleLog;
})(console.log);

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
 if (ls.v === 9) {
  didVersionChange = true;
  ls.v = 10;
  ls.zoom = {
   keybind: ls.zoomKeybind,
   type: ls.zoomType,
   fov: ls.fov,
  };
  delete ls.zoomKeybind;
  delete ls.zoomType;
  delete ls.fov;
 };
 if (ls.v === 10) {
  didVersionChange = true;
  ls.v = 10;
  localStorage.removeItem("opticlient-prototypes");
 };
 if (didVersionChange) saveData();
})();

//fixed a memory leak (2 / 3)
(() => {
 const el = window.addEventListener,
 el2 = document.addEventListener,
 once = { once: true },
 isLoadEvent = {
  load: true,
  domcontentloaded: true,
 };
 window.addEventListener = function(type, callback, options) {
  if (typeof callback !== "function") return;
  if (isLoadEvent[type?.toLowerCase?.()]) {
   if (typeof options === "boolean") {
    options = {
     capture: options,
     once: true,
    };
   } else if (options && typeof options === "object") {
    options.once = true;
   } else {
    options = once;
   };
  };
  el.apply(window, arguments);
 };
 document.addEventListener = function(type, callback, options) {
  if (typeof callback !== "function") return;
  if (isLoadEvent[type?.toLowerCase?.()]) {
   if (typeof options === "boolean") {
    options = {
     capture: options,
     once: true,
    };
   } else if (options && typeof options === "object") {
    options.once = true;
   } else {
    options = once;
   };
  };
  el2.apply(document, arguments);
 };
 window.addEventListener("load", () => setTimeout(() => {
  window.addEventListener = el;
  document.addEventListener = el2;
 }, 1000 * 5));
})();

//ad blocker (1 / 2)
(() => {
 const doc = document.createElement;
 document.createElement = function(i) {
  const f = doc.apply(this, arguments);
  if (i.toLowerCase() === "script") {
   Object.defineProperty(f, "src", { value: "" });
   f.setAttribute = doNothing;
  };
  return f;
 };
 window.addEventListener("load", () => document.createElement = doc);
})();

//disabled trackers
(() => {
 window.addEventListener("load", () => window.cpmstarAPI = window.gtag = window.ga = doNothing);
})();

//no confirm quit
(() => {
 window.addEventListener("load", () => window.onbeforeunload = null);
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
  const element = document.createElement("style");
  element.innerText = "img{image-rendering:pixelated}";
  document.head.appendChild(element);
 });
})();

//zoom keybind
(() => {
 let zoomKeybind = ls.zoom.keybind;
 const keybindCallback = e => {
  if (e.type === "mousedown") {
   e.preventDefault();
   e = e.button;
   ls.zoom.keybind = zoomKeybind = e;
   ls.zoom.type = 1;
   saveData();
   set_zoom_display.innerText = "MOUSE" + e;
  } else {
   e = e.key;
   ls.zoom.keybind = zoomKeybind = e.toLowerCase();
   ls.zoom.type = 0;
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
  if (ls.zoom.type) {
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
 alternative = ls.zoom.fov,
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
 const translated = [
  (i=>i[(i=>i.slice(0,i[2]=="-"?2:3))(navigator.language)]||i.en)({en:"Zoom Keybind FOV:",es:"Combinación de teclas de zoom CDV:",pt:"Tecla de zoom CDV:",ru:"Привязка клавиши масштабирования — поле зрения:",uk:"Клавіатура масштабування - поле зору:",zh:"縮放鍵綁定 - 視野：",ja:"ズームキーバインド - 視野:",ko:"확대/축소 키 바인딩 - 시야:",hi:"ज़ूम कीबाइंड - देखने का क्षेत्र:",ar:"مفتاح التكبير/التصغير - مجال الرؤية:"}),
  (i=>i[(i=>i.slice(0,i[2]=="-"?2:3))(navigator.language)]||i.en)({en:"Set Zoom Keybind",es:"Establecer la combinación de teclas de zoom",pt:"Defina o atalho de teclado do zoom",ru:"Установите привязку клавиш масштабирования",uk:"Встановіть сполучення клавіш для масштабування",zh:"設定縮放按鍵綁定",ja:"ズームのキーバインドを設定する",ko:"확대/축소 키 바인딩 설정",hi:"ज़ूम का कीबाइंड सेट करें",ar:"قم بتعيين رابط مفتاح التكبير/التصغير"}),
  (i=>i[(i=>i.slice(0,i[2]=="-"?2:3))(navigator.language)]||i.en)({en:"awaiting input... press any key...",es:"esperando entrada... presione cualquier tecla...",pt:"aguardando entrada... pressione qualquer tecla...",ru:"ждёт ввода... нажмите любую клавишу...",uk:"очікує введення... натисніть будь-яку клавішу...",zh:"等待輸入...按任何鍵...",ja:"入力を待っています...任意のキーを押してください...",ko:"입력 대기 중... 아무 키나 누르세요...",hi:"इनपुट की प्रतीक्षा में... कोई भी कुंजी दबाएँ...",ar:"في انتظار الإدخال...اضغط على أي مفتاح..."}),
  (i=>i[(i=>i.slice(0,i[2]=="-"?2:3))(navigator.language)]||i.en)({en:"MOUSE",es:"RATÓN",pt:"RATO",ru:"МЫШЬ",uk:"МИША",zh:"滑鼠",ja:"のマウス",ko:"마우스",hi:"माउस",ar:"فأرة الحاسوب"}),
 ],
 requestMenuChanges = () => {
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
     form.innerHTML = '<div class="form-group"><label for="zoom_keybind" id="zoom_keybind_label">' + translated[0] + ' <span class="settings_value">' + ~~alternative + '</span></label><input type="range" class="form-control-range" id="zoom_keybind" min="10" max="140" value="' + ~~alternative + '"></div>' +
     '<button id="set_zoom_btn" class="btn btn-outline-primary">' + translated[1] + ' (<strong id="set_zoom_display"></strong>)</button>';
     parent.appendChild(form);
     set_zoom_btn.onclick = e => {
      parent.removeEventListener("keydown", keybindCallback);
      parent.removeEventListener("mousedown", keybindCallback);
      parent.addEventListener("keydown", keybindCallback, { once: true });
      parent.addEventListener("mousedown", keybindCallback, { once: true });
      set_zoom_display.innerText = translated[2];
      e.preventDefault();
     };
     if (ls.zoom.type) {
      set_zoom_display.innerText = translated[3] + zoomKeybind;
     } else {
      set_zoom_display.innerText = zoomKeybind.toUpperCase();
     };
     zoom_keybind.addEventListener("input", () => {
      zoom_keybind_label.children[0].innerText = ls.zoom.fov = alternative = ~~zoom_keybind.value;
      saveData();
     });
    };
   };
  };
 };
 window.addEventListener("load", () => {
  const button = document.querySelector("#settings_button");
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

//fixed a memory leak (3 / 3)
(() => {
 const queue = [];
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
  const current = performance.now(),
  delta = current + (current - prev);
  prev = current;
  for (let item, index = 0, length = queue.length; index < length; index++) {
   if ((item = queue[index]) && delta > item[0]) {
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
  const output = [];
  let name;
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
   const loop = () => {
    const menu = document.querySelector("#select_game_mode_select");
    if (menu) {
     Object.entries(private_game_modes).forEach(item => {
      if (!menu.querySelector("[value=" + item[0] + "]")) {
       const option = document.createElement("option");
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
 });
})();

//disabled capslock
(() => {
 window.addEventListener("load", () => {
  document.querySelector("#chat_input")?.addEventListener?.("keydown", function(e) {
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
 });
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
 });
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
    const time = document.querySelector("#time_icon");
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
     const time = document.querySelector("#time_icon");
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
 });
})();

//ad blocker (2 / 2)
(() => {
 window.addEventListener("load", () => document.querySelector("style").innerText += "#stats_ad_right{opacity:0!important;pointer-events:none!important}");
})();

//version control for opticlient (3 / 3)
(() => {
 const list = {};
 window.addEventListener("load", () => {
  const ver = Object.values(document.querySelectorAll("script[src]")).filter(i => i.src.includes("bundle.js"))[0]?.src?.split?.("dist/")?.[1]?.replace?.("/public/bundle.js", "");
  if (localStorage.getItem("opticlient-game-version") !== ver) {
   for (let key in localStorage) {
    if (key.startsWith("opticlient-")) localStorage.removeItem(key);
   };
   localStorage.setItem("opticlient-game-version", ver);
  };
 });
})();

//removing unused internals (1 / 3)
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
 });
})();

//benchmark performance optimizations
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
  document.querySelector("#canvas")?.addEventListener?.("click", () => setTimeout(() => {
   if (!keep.length) return;
   for (let key in original) delete THREE[key];
   localStorage.setItem("opticlient-three", keep.join(","));
  }, 1000 * 60 * 5.5), { once: true });
 }, 0));
})();

//removing unused internals (2 / 3)
(() => {
 window.addEventListener("load", () => {
  for (let key in window) {
   if (!window[key]) delete window[key];
  };
 });
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
 const _websocket = WebSocket;
 let reply = [],
 msg = doNothing,
 ws;
 window.WebSocket = class {
  constructor(url) {
   if (url?.includes?.("ev.io")) {
    ws = new _websocket(url);
    window.WebSocket = _websocket;
    Object.defineProperty(ws, "onmessage", {
     get: doNothing,
     set: _msg => {
      msg = _msg;
      ws.addEventListener("message", e => reply.push(e));
      Object.defineProperty(ws, "onmessage", {
       get: () => msg,
       set: _msg => {
        if (typeof _msg !== "function") _msg = doNothing;
        msg = _msg;
       },
      });
     },
     configurable: true,
    });
    setInterval(() => {
     reply.forEach(msg);
     reply = [];
    }, 25);
    return ws;
   } else {
    return new _websocket(url);
   };
  };
 };
})();

//removing unused internals (3 / 3)
(() => {
 const prev = navigator.serviceWorker.register;
 navigator.serviceWorker.register = function() {
  navigator.serviceWorker.register = prev;
  return { then: doNothing };
 };
})();



})();`);document.documentElement.appendChild(t);t.click();t.removeAttribute("onclick");
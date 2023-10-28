let t=document.createElement("a");t.setAttribute("onclick",`(()=>{



const doNothing = function() {};

(_consoleLog => {
 for (let key in console) {
  if (typeof console[key] === "function") console[key] = doNothing;
 };
 console.log2 = _consoleLog;
})(console.log);

(() => {
 window.addEventListener("load", () => {
  window.onbeforeunload = null;
 }, { once: true });
})();

(() => {
 const createElement = document.createElement;
 document.createElement = function(type) {
  let output = createElement.apply(this, arguments);
  if (type.toLocaleString() === "script") {
   Object.defineProperty(output, "src", {
    value: "",
   });
   output.setAttribute = doNothing;
  };
  return output;
 };
 let prev = "";
 window.addEventListener("load", () => {
  const _gtag = gtag;
  window.gtag = function(a, b, c) {
   if (typeof c === "object" && c.event_category !== prev) {
    prev = c.event_category;
    _gtag(a, b, c);
   };
  };
  window.ga = doNothing;
 }, { once: true });
})();

(() => {
 let blob_prefix;
 const _get = Object.getOwnPropertyDescriptor(Image.prototype, "src").get,
 blob_exports = {};
 Object.defineProperty(Image.prototype, "src", {
  get: function() {
   return this._ || _get.apply(this, []);
  },
  set: function(url) {
   this.style.imageRendering = "pixelated";
   url += "";
   let target = this,
   exportURL = url.split("/").slice(-1)[0].split(".")[0],
   a;
   if (url.slice(3, 5) === "a:") target.setAttribute("src", url); else {
    if (a = blob_exports[exportURL]) target.setAttribute("src", blob_prefix + a); else {
     target._ = url;
     fetch(url).then(e => {
      if (e.redirected || e.status !== 200) {
       target.setAttribute("src", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACAAQMAAAD58POIAAAAA1BMVEUAAACnej3aAAAAGElEQVRIx2MYBaNgFIyCUTAKRsEooDMAAAiAAAGNmLNuAAAAAElFTkSuQmCC");
      } else {
       e.blob().then(e => {
        a = window.URL.createObjectURL(e);
        target.setAttribute("src", a);
        a = a.split("/");
        if (!blob_prefix) blob_prefix = a.slice(0, -1).join("/") + "/";
        blob_exports[exportURL] = a.slice(-1)[0];
       });
      };
     });
    };
   };
  },
 });
 window.addEventListener("load", () => {
  let element = document.createElement("style");
  element.innerText = "img{image-rendering:pixelated}";
  document.head.appendChild(element);
 }, { once: true });
})();

(() => {
 window.cancelAnimationFrame = function(i) {
  clearTimeout(i);
 };
 window.requestAnimationFrame = function(i) {
  return setTimeout(() => i(performance.now()), time);
 };
 let here = true,
 time = 50,
 strength = 1 / 50,
 up = true,
 timeout;
 loop = () => {
  setTimeout(loop, time - 4);
  let now = Date.now();
  if (here) {
   if (now > timeout) {
    if (!up) up = true; else time += strength;
    if (time > 200) time = 200;
   } else if (now < timeout) {
    if (up) up = false; else time -= strength;
    if (time < 0) time = 0;
   };
  };
  timeout = now + time;
 };
 window.addEventListener("load", () => {
  document.body.addEventListener("click", () => {
   document.body.addEventListener("blur", () => here = false);
   document.body.addEventListener("focus", () => here = true);
   time = 16;
   timeout = Date.now() + time;
   setTimeout(loop, time);
  }, { once: true });
 });
})();

(() => {
 const send = WebSocket.prototype.send,
 send2 = function() {
  if (this.run) {
   this.run = false;
   let target = this;
   setTimeout(() => {
    target.run = true;
    target.queue.forEach(i => send.apply(target, [i]));
    target.queue = [];
   }, 13);
   send.apply(this, arguments);
  } else {
   this.queue.push(arguments[0]);
  };
 };
 WebSocket.prototype.send = function() {
  this.queue = [];
  this.run = true;
  this.send = send2;
  send.apply(this, arguments);
 };
})();



})();`);document.documentElement.appendChild(t);t.click();t.removeAttribute("onclick");
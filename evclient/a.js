let t=document.createElement("a");t.setAttribute("onclick",`
(()=>{

if (window.client) return (s => alert(s + " is not compatible with other clients. " + s + " no es compatible con otros clientes. " + s + " não é compatível com outros clientes. " + s + " несовместим с другими клиентами. " + s + " 與其他客戶端不相容。"))("Ev Client");
window.client = true;

if (window.communitypatch) return;
window.communitypatch = true;

const features = {
 input_and_netcode_changes: false,
 onbeforeunload_override: false,
 shut_up_console: false,
 optimize_savedata: false,
 submenu: false,
 hide_tips: false,
 audio_mixer: false,
 chat_message_bind: false,
 hide_hands: false,
 optimize_movement: false,
 comments: false,
 toggle_crouch: false,
 menu_icons: false,
 right_menu_changes: false,
 hide_hotkeys: false,
 swearing: false,
 ad_blocker: false,
};

if (!features.shut_up_console) {
 let $ = console;
 $.log2 = $.log;
 $.debug=$.log=$.warn=$.error=function(){};
};

const giveError = e => (console.log2||console.log)("Yo shit broke, Izzy!", e);

const setTimeout = window.setTimeout;

try{Node.prototype.on = window.on = document.on = function(a, b) {
 this.addEventListener(a, b);
}}catch(e){giveError(e)};

const ls_features = {
 mx: {}, //was originally going to be an audio mixer but it was too laggy
 au: 1, //au = audio (or australian I guess, lol)
 chat: {
  msg: "",
  bind: 48,
 },
 //hh: 0, //hh = hide hands
 tc1: 0, //tc1 = toggle crouch enable/disable
 tc2: 67, //tc2 = toggle crouch key
 v: 12, //v = version
 s: 0, //s = lemme fuckin swear, goddamnit
 //un: [], //unlocked codes
 //oc: 0, //overclock mode
 //oc2: 250, //overclock mode 1000 / oc2
};

const ls_list = [
 "ev_settings_k",
 "ev-client",
];

//let stop = false;

(new BroadcastChannel("kys")).postMessage(1);

/*if (stop) {
 window.addEventListener("load", () => window.alert("- ev client -\\nHey! Your settings are broken.\\nRefresh the page when they're not broken."));
 return;
};*/

window.ls = null;

const saveData = () => localStorage.setItem("ev-client", JSON.stringify(ls));

try{(() => {
 let temp = localStorage.getItem("community_patch");
 if (temp !== null) {
  localStorage.removeItem("community_patch");
  localStorage.setItem("ev-client", temp);
 } else temp = localStorage.getItem("ev-client");
 if (!temp) {
  ls = ls_features;
 } else {
  try {
   ls = JSON.parse(temp);
  } catch(e) {
   ls = ls_features;
  };
  Object.keys(ls_features).forEach(i => {
   if (ls[i] === 0[0] && i !== "v") ls[i] = ls_features[i];
  });
  if (ls.v === ls_features.v) return;
  if (ls.v === 0[0]) {
   ls.v = 1;
   if (ls.mixer) {
    Object.keys(ls.mixer).forEach(i => {
     ls.mx[i.split(".")[0]] = ls.mixer[i][0];
    });
    delete ls.mixer;
    saveData();
   };
   temp = localStorage.getItem("ev_settings_k");
   let success = 0[0];
   try {
    temp = JSON.parse(temp);
    success = true;
   } catch(e) {
    success = false;
   };
   if (success) {
    let blocked = [
     "resolution",
     "uiScale",
     "fov",
     "primaryWeaponId",
    ];
    let list = [
     "Volume",
     "zoom",
    ];
    Object.keys(temp).filter(i => !i.includes("Volume") && !i.includes("zoom") && !blocked.includes(i)).forEach(i => {
     let f = temp[i];
     if (typeof f !== "number") return;
     if (f === 1) f = true; else if (f === 0) f = false;
     temp[i] = f;
    });
    localStorage.setItem("ev_settings_k", JSON.stringify(temp));
   };
   if (ls.chat.msg) {
    try {
     ls.chat.msg = encodeURIComponent(ls.chat.msg).slice(0, 1e3);
    } catch(e) {
     ls.chat.msg = "";
    };
   };
  };
  if (ls.v === 1) {
   ls.v = 2;
   if (ls.s === 0[0]) ls.s = 0;
   //if (ls.ad === 0[0]) ls.ad = 1;
  };
  if (ls.v === 2) {
   ls.v = 3;
   if (ls.un === 0[0]) ls.un = [];
  };
  if (ls.v === 3) {
   ls.v = 4;
   //if (ls.tk === 0[0]) ls.tk = 1;
  };
  if (ls.v === 4) {
   ls.v = 5;
   if (ls.ad !== 0[0]) delete ls.ad;
  };
  if (ls.v === 5) {
   ls.v = 6;
   if (ls.tk !== 0[0]) delete ls.tk;
  };
  if (ls.v === 6) {
   ls.v = 7;
   ls.oc = 0;
   if (ls.pf === 3) ls.oc = 1;
   delete ls.pf;
  };
  if (ls.v === 7) {
   ls.v = 8;
   ls.oc2 = 250;
  };
  if (ls.v === 8) {
   ls.v = 9;
   delete ls.hh;
  };
  if (ls.v === 9) {
   ls.v = 10;
   delete ls.un;
  };
  if (ls.v === 10) {
   ls.v = 11;
   delete ls.oc;
   delete ls.oc2;
  };
  saveData();
 };
 if (ls.v === 11) {
  ls.v = 12;
  let getItem;
  (()=>{let e=e=>((e=e.split("")).forEach((t,r)=>e[r]=t.charCodeAt()),e),t=e=>(e.forEach((t,r)=>e[r]=String.fromCharCode(t)),e.join("")),r="0".repeat(15),l=(e,t)=>(e.forEach((l,n)=>e[n]=(r+l.toString(2)).slice(-t)),e),n=e=>(e.forEach((t,r)=>e[r]=parseInt(t,2)),e),p=e=>{let t=e.length-1;for(;"0"===e[t];)t--;return e.slice(0,t)},a=r=>{if(!r.length)return r;r=e(r);let p=(r=(r=l(r,7)).join("").match(/.{1,16}/g)).length-1,a=16-r[p].length;return a?r[p]+="1"+"0".repeat(a-1):r.push("1"+"0".repeat(15)),r=n(r),r=t(r)},o=r=>{if(!r.length)return r;r=e(r);let a=(r=l(r,16)).length-1,o=p(r[a]);return o?r[a]=o:r.pop(),r=n(r=r.join("").match(/.{7}/g)),r=t(r)},h=localStorage,u=h.setItem,c=h.getItem,i=h.removeItem;getItem=function(e){e+="";let t=c.apply(h,[e]);return false?null:null!==(t=c.apply(h,[a(e)]))?o(t):null}})();
  Object.keys(localStorage).forEach(i => {
   if (typeof localStorage[i] === "string" && !(/^[\x00-\x7F]*$/.test(i))) {
    localStorage.setItem(i, getItem(i));
   };
  });
  let cp = getItem("community_patch"),
  settings = getItem("ev_settings_k");
  Object.keys(localStorage).forEach(i => {
   if (typeof localStorage[i] === "string" && !(/^[\x00-\x7F]*$/.test(i))) {
    localStorage.removeItem(i);
   };
  });
  if (cp !== null) localStorage.setItem("community_patch", cp);
  if (settings !== null) localStorage.setItem("ev_settings_k", settings);
  cp = localStorage.getItem("community_patch");
  if (cp !== null) {
   localStorage.removeItem("community_patch");
   localStorage.setItem("ev-client", cp);
  };
 };
})()}catch(e){giveError(e)};

if (!features.optimize_savedata) try{
 /*let changedSettings = localStorage.getItem("ev_settings_k"),
 changedSettings2;
 (()=>{let e=e=>((e=e.split("")).forEach((t,r)=>e[r]=t.charCodeAt()),e),t=e=>(e.forEach((t,r)=>e[r]=String.fromCharCode(t)),e.join("")),r="0".repeat(15),l=(e,t)=>(e.forEach((l,n)=>e[n]=(r+l.toString(2)).slice(-t)),e),n=e=>(e.forEach((t,r)=>e[r]=parseInt(t,2)),e),p=e=>{let t=e.length-1;for(;"0"===e[t];)t--;return e.slice(0,t)},a=r=>{if(!r.length)return r;r=e(r);let p=(r=(r=l(r,7)).join("").match(/.{1,16}/g)).length-1,a=16-r[p].length;return a?r[p]+="1"+"0".repeat(a-1):r.push("1"+"0".repeat(15)),r=n(r),r=t(r)},o=r=>{if(!r.length)return r;r=e(r);let a=(r=l(r,16)).length-1,o=p(r[a]);return o?r[a]=o:r.pop(),r=n(r=r.join("").match(/.{7}/g)),r=t(r)},h=localStorage,u=h.setItem,c=h.getItem,i=h.removeItem;h.setItem=function(e,t){return e+="",t+="",u.apply(h,[a(e),a(t)])},h.removeItem=function(e){e+="",i.apply(h,[e]),i.apply(h,[a(e)])},h.getItem=function(e){e+="";let t=c.apply(h,[e]);return null!==t?(i.apply(h,[e]),u.apply(h,[a(e),a(t)]),t):null!==(t=c.apply(h,[a(e)]))?o(t):null}})();
 const loc = localStorage,
 set = loc.setItem,
 get = loc.getItem,
 del = loc.removeItem,
 db = {};
 localStorage.getItem = function(i) {
  return db[i] || get.apply(loc, [i]) || null;
 };
 localStorage.setItem = function(i, f) {
  if (!ls_list.includes(i)) db[i] = f + ""; else set.apply(loc, [i, f]);
 };
 changedSettings2 = localStorage.getItem("ev_settings_k");
 if (changedSettings && changedSettings2) {
  localStorage.removeItem("ev_settings_k");
 };
 localStorage.removeItem = function(i) {
  del.apply(loc, [i]);
  delete db[i];
 };
 if (!changedSettings && !changedSettings2) stop = true;
 Object.keys(localStorage).forEach(i => {
  if (typeof localStorage[i] === "string" && /^[\x00-\x7F]*$/.test(i)) localStorage.setItem(i, localStorage[i]);
 });*/


 Object.keys(localStorage).forEach(i => {
  if (!ls_list.includes(i) && typeof localStorage[i] === "string") {
   localStorage.removeItem(i);
  };
 });


}catch(e){giveError(e)};

let _onplayerdataload = [],
playerdata = null;

window.onplayerdataload = fct => {
 if (playerdata) {
  fct(playerdata);
 } else {
  _onplayerdataload.push(fct);
 };
};

try {
 let req = new XMLHttpRequest;
 req.open("GET", location.origin + "/me");
 req.onload = () => {
  try {
   playerdata = JSON.parse(req.responseText);
   playerdata = playerdata[1] || playerdata[0];
   _onplayerdataload.forEach(i => i(playerdata));
  } catch(e) {
   giveError(e);
  };
  _onplayerdataload = 0[0];
 };
 req.send();
} catch(e) {
 giveError(e);
};

if (!features.ad_blocker) try{
 const doc = document.createElement;
 DocumentFragment.prototype.setAttribute=function(){};
 document.createElement = function(i) {
  i = i.toLowerCase();
  let f = doc.apply(this, [i]);
  if (i === "script") {
   f.__defineSetter__("src", function(){});
   f.setAttribute=function(){};
  };
  return f;
 };
}catch(e){giveError(e)};

if (!features.optimize_movement && false) try{(el=>{
 const el2 = [];
 let key = false,
 lng = 0;
 document.on("keydown", e => {
  if (e.key !== key) {
   key = e.key;
   for (let i = lng; i--; el2[i](e));
  };
 });
 document.on("keyup", e => {
  if (e.key === key) key = null;
 });
 document.addEventListener = function(e, fct) {
  if (this === document && e === "keydown") {
   el2.push(fct);
   lng++;
  } else return el.apply(this, arguments);
 };
})(HTMLElement.prototype.addEventListener)}catch(e){giveError(e)};

let init_oc = () => {};

/*if (!features.input_and_netcode_changes) try{
 window._requestAnimationFrame = requestAnimationFrame;
 window.cancelAnimationFrame = () => {};
 if (!ls.oc) {
  (() => {
   let _fallback = false;
   let initialLoop = () => {
    if (frameEvents.length < 60) {
     requestAnimationFrame(initialLoop);
     frameEvents.push(Date.now());
    } else {
     loop();
    };
   };
   const frameEvents = [],
   zero = 0,
   fallback = _function => {
    requestIdleCallback(() => {
     _function(performance.now());
    }, { timeout: 90 });
    return zero;
   },
   loop = () => {
    _requestAnimationFrame(loop);
    let delta = frameEvents.shift(),
    currentTime = Date.now();
    frameEvents.push(currentTime);
     delta = currentTime - delta;
    if (_fallback) {
     if (delta < 1200) {
      //console.log("Switched to default");
      _fallback = false;
      requestAnimationFrame = _requestAnimationFrame;
     };
    } else {
     if (delta > 1200) {
      //console.log("Switched to fallback");
      _fallback = true;
      requestAnimationFrame = fallback;
     };
    };
   };
   requestAnimationFrame(initialLoop);
  })();
 } else {
  const anim = [];
  const zero = 0;
  requestAnimationFrame = _function => {
   anim.push(_function);
   return zero;
  },
  loopFPS = () => {
   let lng = anim.length;
   while (lng--) anim.shift()();
  },
  _loop = setInterval(loopFPS, 1000 / ls.oc2);
  init_oc = () => {
   clearInterval(_loop);
   _loop = setInterval(loopFPS, 1000 / ls.oc2);
  };
 };
}catch(e){giveError(e)};*/

/*(() => {
 window.cancelAnimationFrame = function(i) {
  clearTimeout(i);
 };
 window.requestAnimationFrame = function(i) {
  return setTimeout(() => i(performance.now()), ~~time);
 };
 let here = true,
 time = 50,
 strength = 0,
 up = true,
 timeout;
 loop = () => {
  setTimeout(loop, time - 4);
  let now = Date.now();
  if (here) {
   if (now > timeout) {
    if (!up) {
     up = true;
     strength /= 2;
    } else time += strength;
    if (time > 200) time = 200;
    strength += 0.125;
   } else if (now < timeout) {
    if (up) {
     up = false;
     strength /= 2;
    } else time -= strength;
    if (time < 4) {
     time = 3;
     loop = () => {};
    };
    strength += 0.125;
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
})();*/

const timeout2 = setTimeout; //true story, there was no timeout1
let hasSwitchedTimeout = false;

/*let optimizeWebSocket = false;

(o => {
 const ws = WebSocket;
 ws.prototype.send = function(a) {
  if (optimizeWebSocket) this.onmessage({data:""});
  return o.apply(this, [a]);
 };
 WebSocket = function(a) {
  return new ws(a.replace(":443", ""));
 };
})(WebSocket.prototype.send);*/

window.addEventListener("load", ()=>{try{

if (!window.feature_disable) window.feature_disable = features; else {
 Object.keys(features).forEach(i => {
  if (feature_disable[i] === 0[0]) feature_disable[i] = features[i];
 });
};

const awaitSelector = (selector, fct) => {
 let a = setInterval(() => {
  let b = document.querySelector(selector);
  if (b) {
   clearInterval(a);
   fct(b);
  };
 }, 99);
};

/*//dont forget this
const hash=s=>s.split("").reduce((a,b)=>{a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);

const valid_codes = [ //valid codes
 1496102890, //maphacker
];

try{ //adding unlocks from the search parameter
 (changed => {
  if (!location.search) return;
  let list = [];
  location.search.slice(1).split("&").forEach(f => {
   let i = f.split("=");
   i = [i[0].toLowerCase(), decodeURI(i.slice(1).join("=")).toLowerCase()];
   if (i[0] === "cheatcode" && !ls.un.includes(i[1])) {
    if (valid_codes.includes(hash(i[1]))) ls.un.push(i[1]);
    changed = true;
   } else list.push(f);
  });
  if (changed) {
   saveData();
   history.replaceState(history.state, "", "?" + list.join("&"));
  };
  list = 0[0];
 })();
}catch(e){giveError(e)};

const unlocked_codes = {};

const tryCode=i=>(i=valid_codes.indexOf(hash(i)))!==-1&&(unlocked_codes[i]=!0);

try{ //checking all preloaded codes
 (changed => {
  ls.un.forEach(i => {
   if (!tryCode(i)) {
    delete ls.un[i];
    changed = true;
   };
  });
  if (changed) saveData();
 })();
}catch(e){giveError(e)};*/

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
};

if (true) { //unlocked maphacker
 try {
 (o => {
  const convertName = o => {
   o = o.split("_");
   o.forEach((i, f) => {
    o[f] = i.slice(0, 1).toUpperCase() + i.slice(1);
   });
   return o.join(" ");
  };
  $.get = function(a, b, c) {
   if (a.includes("ev.io/maps")) {
    return o.apply($, [a, function(r) {
     onplayerdataload(data => {
      let all_game_modes = {};
      Object.keys(private_game_modes).forEach(i => all_game_modes[convertName(i)] = true);
      r.forEach(i => {
       i.field_game_modes.split(", ").forEach(f => {
        all_game_modes[f] = true;
       });
      });
      let name = data.name[0].value;
      //if (name === "Guest") name = "Forgeable";
      all_game_modes = Object.keys(all_game_modes).join(", ");
      r.forEach((i, f) => {
       i.author = name;
       i.field_game_modes = all_game_modes;
       i.field_is_community_map = "0";
       i.field_allow_private_games = "1";
       i.field_in_public_rotation = "1";
       r[f] = i;
      });
      b(r);
     });
    }, c]);
   } else {
    return o.apply($, [a, b, c]);
   };
  };
 })($.get);
 }catch(e){giveError(e)};
 try{
 awaitSelector("#priv_game", e => {
  e.addEventListener("click", () => {
   awaitSelector("#select_game_mode_select", t => {
    Object.entries(private_game_modes).forEach(i => {
     let a = document.createElement("option");
     a.value = i[0];
     a.innerText = i[1];
     if (!t.querySelector("[value=" + i[0] + "]")) t.appendChild(a);
    });
   });
   /*awaitSelector("#time_limit_select", e => {
    let a = document.createElement("option");
    a.value = "72000";
    a.innerText = "60 min";
    if (!e.querySelector('[value="72000"]')) e.appendChild(a);
   });*/
  }, {once: true});
 });
 }catch(e){giveError(e)};
};

/*if (unlocked_codes[1]) {
 (o => {
  WebSocket.prototype.send = function(a) {
   setTimeout(() => o.apply(this, [a]), 12);
  };
 })(WebSocket.prototype.send);
};*/

if (!feature_disable.onbeforeunload_override) onbeforeunload=null;

/*if (!feature_disable.hide_hands && ls.hh) try{
 const ver = Object.values(document.querySelectorAll("script[src]")).filter(i => i.src.includes("bundle.js"))[0].src.split("dist/")[1].split("/")[0];
 (open=>{
  XMLHttpRequest.prototype.open = function(type, loc) {
   if (type === "GET") console.log(false, loc);
   if (loc.endsWith("arm.evobj")) return open.apply(this, [type, "https://ev.io/dist/" + ver + "/public/data/grenade_flash.evobj"]);
   return open.apply(this, [type, loc]);
  };
 })(XMLHttpRequest.prototype.open);
}catch(e){giveError(e)};*/

//(_UI=function($){$._UI=_UI;$.UI?0:$.Node.prototype.UI=$.UI=function(){let d="shift",f="setAttribute",j=function(k,n,m,o,v,r,s,q){if(n&&!((r=j(n))?o=0:m=new Text(n)))if((v=n.length)!=q)for(;o<v;j(k,n[o++]));else if(!(m=n instanceof Node?n:(m=n["@"])&&new Comment(m))){m=document.createElement(n.$||"a");for(o=j(s=n.val)||[];v=o[d]();m[v]=s[v]);for(o=j(s=n.atr)||o;v=o[d]();m[f](v,s[v]));for(o=j(s=n.css)||o;v=o[d]();m.style[v]=s[v]);for(;v=r[d]();"atr_"==o?m[f](s,q):"css_"==o?m.style[s]=q:m[v]=q)q=n[v],o=v.slice(0,4),s=v.slice(4);j(n.var?$[n.var]=m:m,n._)}return"object"!=typeof k?0:m?k.appendChild(m):Object.keys(k)},c=this==$?new DocumentFragment:this;c.innerHTML="";j(c,arguments);return c}})(self);
(_UI=e=>{e._UI=_UI;let t,n=e.document,r=e.Node,i=r.prototype,o=e.Object.keys,s="forEach",u="value",f="slice",l="length",c="object",a="childNodes",h="function",d="string",S=e=>typeof e,m=e=>({val_:e[0],css_:e[1],atr_:e[2]}),v=(e,n,r,i,o)=>{if(i=[t=>e[t],t=>e.style[t],t=>e.getAttribute(t)],r!=t)return i[r](n);if(r=m(i)[n[f](0,4)])return r(n[f](4));for(r=0;(o=i[r++](n))===t;);return o},y=(e,n,r,i,o)=>{if(o=[t=>e[t]=r,t=>e.style[t]=r,t=>e.setAttribute(t,r)],(i=m(o)[n[f](0,4)])?i(n[f](4))-t:e["on"+n]===t||S(r)!=h||e.removeEventListener(n,r)+e.addEventListener(n,r)){for(i=0;v(e,n,i)===t;)i++;o[i](n)}},_=(i,f,a,h,m)=>{if((a=1+~~a)<101?f||0==f:0){if(f instanceof r)h=f;else if(S(f)==c)if((m=f[l])===~~m){for(h=0;h<m;_(i,f[h++],a));h=0}else{if(h=_(n.createElement(f.$||"a"),f._,a),(a=f.as)&&S(a)==c&&null!=a)if((m=a[l])===~~m)while(m--)h.SS(a[m]);else h.SS(a);o(f)[s](((e,t)=>({$:1,_:1,as:1,var:1}[e]||y(h,e,f[e])))),(a=f.var)!==t?e[a]=h:0}else h=new e.Text(f),S(i[u])==d?i[u]+=f:0;h&&i.append(h)}return i};e.html=n.documentElement,e.head=n.head,e.body=n.body,i.SS=function(e,n,r){return r=this,S(e)!=c||null==e?(n!==t&&y(r,e,n),v(r,e)):(o(e)[s]((t=>r.SS(t,e[t]))),r)},e.QS=i.QS=function(t,r){return t=(this==e?n:this)["querySelector"+(r?"All":"")](t),S(r)==h&&t[s](r),t},e.UI=function(){let t=_(new e.DocumentFragment,arguments);return 1==t[a][l]?t[a][0]:t},i.UI=function(){return this.innerHTML="",_(this,arguments)},i.ADDUI=function(){return _(this,arguments)},i.TEXT=function(e,n){return n=this,e!==t?n.innerText=S(n[u])==d?n[u]=e:e:0,n[u]||n.innerText}})(self);

let toggle_listeners = () => {};

if (!feature_disable.toggle_crouch) try{
 let norm = true;
 const target = document.body,
 keyup_evt = e => {
  if (e.keyCode === ls.tc2) {
   if (norm) {
    e.preventDefault();
    e.stopPropagation();
   };
   norm = !norm;
  };
 };
 toggle_listeners = () => {
  target.removeEventListener("keyup", keyup_evt);
  norm = true;
  if (ls.tc1) {
   target.addEventListener("keyup", keyup_evt);
  };
 };
 toggle_listeners();
}catch(e){giveError(e)};

if (!feature_disable.submenu) try{
 if (!feature_disable.audio_mixer) {
  const hwl = Howl.prototype.play;
  Howl.prototype.play = function() {
   if (ls.au && !this._src.startsWith("data:")) {
    let temp = this._src.split("/").slice(-1)[0].split(".")[0];
    if (!ls.mx[temp]) {
     ls.mx[temp] = this._muted?1:0;
     saveData();
    } else this._muted = ls.mx[temp];
   };
   return hwl.apply(this, arguments);
  };
 };
 let elem = document.head.appendChild(document.createElement("style"));
 elem.innerText = "#filler_button,#logo,#nfts_button{display:none;!important}";
 elem = top_bar_cont.appendChild(document.createElement("button"));
 elem.id = "community_patch_submenu";
 window.submenu = {closed:true,focus:()=>{}};
 onbeforeunload=()=>(new BroadcastChannel("kys")).postMessage(1);
 elem.onclick = () => {
  if (!submenu.closed) return submenu.focus();
  submenu = window.open("about:blank");
  submenu.document.title = "Mods | ev.io";
  let temp = submenu.document.documentElement.style;
  temp.backgroundColor = "#171717";
  temp.color = "#f0f0f0";
  temp.fontFamily = "monospace";
  temp.fontSize = "130%";
  temp.textAlign = "center";
  temp.textShadow = "2px 2px 3px #888";
  submenu.document.head.appendChild(document.createElement("style")).innerText="button,input,select,option{cursor:pointer}";
  _UI(submenu);
  submenu.eval('(new BroadcastChannel("kys")).onmessage=()=>self.close();');
  submenu.eval("setInterval(()=>!opener&&self.close(),99)");
  let loop = setInterval(() => {
   if (submenu.closed) {
    clearInterval(loop);
   } else if (submenu.document.title === "") {
    clearInterval(loop);
    submenu.close();
   };
  }, 99);
  UI.BR = { $: "br" };
  UI.HR = { $: "hr" };
  UI.BR3 = [
   UI.BR,
   UI.BR,
   UI.BR,
   UI.HR,
  ];
  submenu.document.body.UI(
   UI.HR,
   /*{
    $: "h1",
    _: {
     $: "u",
     _: "Ads",
    },
    css_marginBottom: "9px",
   },
   {
    $: "a",
    _: "I don't click ads:",
   },
   " ",
   {
    $: "input",
    type: "checkbox",
    onclick: function() {
     ls.ad = this.checked ? 0 : 1;
     saveData();
    },
    checked: !ls.ad,
   },
   " (will require a restart)",
   UI.BR,
   {
    $: "i",
    _: [
     "(this is more effective and efficient than your ad blocker, I promise)",
     UI.BR,
     "(they don't make money off of an ad unless you click it, anyway)",
    ],
   },*/
   {
    $: "h1",
    _: {
     $: "u",
     _: "NOTICE",
    },
    css_marginBottom: "9px",
   },
   "This client is no longer supported. I currently maintain ",
   {
    href: "https://chrome.google.com/webstore/detail/fdlclgkklhlidogcffebkmhanpmpfphh",
    target: "_blank",
    color: "#77f",
    _: "Opticlient",
   },
   ".",
   { $: "br" },
   "It is NOT compatible with this client.",
   UI.BR3,
   {
    $: "h1",
    _: {
     $: "u",
     _: "Miscellaneous",
    },
    css_marginBottom: "9px",
   },
   /*"Set Target FPS: ",
   {
    $: "input",
    type: "checkbox",
    checked: !!ls.oc,
    onclick: function() {
     ls.oc = this.checked ? 1 : 0;
     //submenu.oc2.disabled = !ls.oc;
     saveData();
    },
   },
   " ",
   {
    $: "i",
    _: "(will require a restart)",
   },
   UI.BR,
   "Target FPS: ",
   {
    $: "input",
    type: "number",
    var: "oc2",
    value: ls.oc2,
    disabled: !ls.oc,
    css_cursor: "text",
    onblur: function() {
     let _value = Math.min(Math.max(~~this.value, 1), 3000) - 0;
     this.value = _value;
     ls.oc2 = _value;
     //console.log2(init_oc);
     init_oc();
     saveData();
    },
   },
   UI.BR,*/
   {
    $: "a",
    _: "Audio Module:",
   },
   " ",
   {
    $: "select",
    _: [
     {
      $: "option",
      _: "Enabled",
      value: 1,
     },
     {
      $: "option",
      _: "Disabled",
      value: 0,
     },
    ],
    var: "enable_audio",
   },
   /*UI.BR,
   "Chat Filter: ",
   {
    $: "input",
    type: "checkbox",
    checked: !ls.s,
    onclick: function() {
     ls.s = this.checked ? 0 : 1;
     saveData();
    },
   },*/
   UI.BR3,
   {
    $: "h1",
    _: {
     $: "u",
     _: "Chat Message",
    },
    css_marginBottom: "9px",
   },
   {
    $: "a",
    _: "Message:",
   },
   " ",
   {
    $: "input",
    placeholder: "...",
    value: decodeURIComponent(ls.chat.msg),
    css_cursor: "text",
    var: "input_msg2",
   },
   UI.BR,
   {
    $: "a",
    _: "Bind:",
   },
   " ",
   {
    $: "button",
    _: JSON.stringify(String.fromCharCode(ls.chat.bind)).slice(1, -1),
    css_cursor: "help",
    var: "input_msg1",
   },
   {
    $: "a",
    _: " <-- Click to change.",
    css_cursor: "default",
   },
   UI.BR3,
   /*{
    $: "h1",
    _: {
     $: "u",
     _: "Perspective",
    },
    css_marginBottom: "9px",
   },
   {
    $: "a",
    _: "Hide Hands:",
   },
   " ",
   {
    $: "input",
    type: "checkbox",
    onclick: function() {
     ls.hh = this.checked ? 1 : 0;
     saveData();
    },
    checked: !!ls.hh,
   },
   " ",
   {
    $: "i",
    _: "(will require a restart)",
   },
   UI.BR3,*/
   {
    $: "h1",
    _: {
     $: "u",
     _: "Toggle Crouch",
    },
    css_marginBottom: "9px",
   },
   "Enable: ",
   {
    $: "input",
    type: "checkbox",
    checked: !!ls.tc1,
    onclick: function() {
     ls.tc1 = this.checked ? 1 : 0;
     toggle_listeners();
     saveData();
    },
   },
   UI.BR,
   "Crouch Key: ",
   {
    $: "button",
    _: String.fromCharCode(ls.tc2),
    onclick: function() {
     const $ = this;
     $.disabled = true;
     $.innerText = "...";
     let temp = e => {
      if ($.innerText !== "...") return;
      $.disabled = false;
      let f = e.keyCode;
      ls.tc2 = f;
      saveData();
      toggle_listeners();
      $.innerText = String.fromCharCode(f);
      submenu.removeEventListener("keydown", temp);
     };
     submenu.addEventListener("keydown", temp);
    },
   },
   " <-- Click to change.",
   UI.BR3,
   {
    $: "h1",
    _: {
     $: "u",
     _: "[\\u{1F6E0}]",
    },
    css_marginBottom: "9px",
   },
   {
    $: "button",
    _: "My settings are broken.",
    onclick: function() {
     this.disabled = true;
     localStorage.removeItem("ev_settings_k");
     location.reload();
    },
   },
   UI.BR,
   {
    $: "button",
    _: "The extension is broken.",
    onclick: function() {
     this.disabled = true;
     ls = ls_features;
     localStorage.removeItem("ev-client");
     location.reload();
    },
   },
   UI.BR,
   {
    $: "button",
    _: "I'm shadow banned.",
    onclick: function() {
     this.disabled = true;
     location.href = "https://www.youtube.com/embed/hiRacdl02w4?controls=0&start=80";
    },
   },
   UI.BR3,
   {
    $: "h1",
    _: {
     $: "u",
     _: "Backups",
    },
    css_marginBottom: "9px",
   },
   "Export: ",
   {
    $: "button",
    _: "Click Here",
    onclick: function() {
     let temp = {};
     ls_list.forEach(i => {
      let f = localStorage.getItem(i);
      if (typeof f === "string") temp[i] = f;
     });
     temp = "data:," + encodeURIComponent(JSON.stringify(temp));
     let elm = document.createElement("a");
     elm.href = temp;
     elm.download = "evio_savedata.json";
     elm.click();
    },
   },
   UI.BR,
   "Import: ",
   {
    $: "input",
    type: "file",
    accept: ".json",
    oninput: function() {
     let file = this.files[0];
     if (!file) return;
     this.disabled = true;
     let reader = new FileReader();
     reader.onload = function(e) {
      e = e.target.result;
      try {
       e = JSON.parse(e);
       if (typeof e !== "object") e = {};
      } catch(e) {
       e = {};
      };
      localStorage.clear();
      Object.keys(e).forEach(i => {
       localStorage.setItem(i, e[i]);
      });
      try {
       ls = JSON.parse(localStorage.getItem("community_patch"));
      } catch(e) {};
      location.reload();
     };
     reader.readAsText(file, "UTF-8");
    },
   },
   UI.BR3,
   {
    $: "h1",
    _: {
     $: "u",
     _: "Audio",
    },
    css_marginBottom: "9px",
   },
   {
    $: "button",
    _: "Refresh",
    css_marginBottom: "7px",
    var: "refresh_btn",
   },
   " ",
   {
    $: "button",
    _: "Clear",
    onclick: () => {
     ls.mx = {};
     saveData();
     submenu.mixer_display.UI();
    },
   },
   UI.BR,
   {
    $: "a",
    var: "mixer_display",
   },
   UI.BR,
   UI.BR,
   UI.HR,
   //UI.BR3,
   /*ls.un.length && [
    {
     $: "h1",
     _: {
      $: "u",
      _: "Cheatcodes",
     },
     css_marginBottom: "9px",
    },
    {
     var: "cheatcodes",
    },
    UI.BR3,
   ],*/
  );
  /*if (ls.un.length) {
   let temp = [];
   ls.un.forEach(i => {
    temp.push(
    {
     _: [
       {
        $: "button",
        _: "Remove",
        onclick: function() {
         if (this.disabled) return;
         this.disabled = true;
         ls.un = ls.un.filter(f => f !== i);
         saveData();
        },
       },
       ' "' + i + '"',
      ],
     },
     UI.BR,
    );
   });
   submenu.cheatcodes.UI(temp.slice(0, -1));
  };*/
  const showMixerOptions = () => {
   let list = [];
   Object.keys(ls.mx).forEach(i => {
    list.push(
     {
      $: "u",
      css_cursor: "default",
      _: i,
     },
     " ",
     {
      $: "input",
      type: "checkbox",
      checked: !ls.mx[i],
      oninput: function() {
       ls.mx[i] = this.checked ? 0 : 1;
       saveData();
      },
     },
     UI.BR,
    );
   });
   submenu.mixer_display.UI(list);
  };
  showMixerOptions();
  let fake_load = false;
  submenu.refresh_btn.onclick = () => {
   if (fake_load) return;
   submenu.refresh_btn.style.cursor = "wait";
   submenu.refresh_btn.style.color = "#fff";
   fake_load = true;
   submenu.mixer_display.UI();
   setTimeout(() => {
    fake_load = false;
    submenu.refresh_btn.style.cursor = "pointer";
    submenu.refresh_btn.style.color = "";
    showMixerOptions();
   }, 1e3);
  };
  submenu.ls = ls;
  submenu.saveData = saveData;
  submenu.enable_audio.value = ls.au;
  submenu.enable_audio.oninput = () => {
   ls.pf = submenu.enable_audio.value - 0;
   saveData();
  };
  submenu.input_msg1.onclick = () => {
   let a = submenu.input_msg1;
   if (a.innerText !== "...") {
    a.innerText = "...";
    submenu.input_msg2.disabled = true;
    let temp = e => {
     ls.chat.bind = e.keyCode;
     saveData();
     submenu.input_msg2.disabled = false;
     a.innerText = JSON.stringify(String.fromCharCode(e.keyCode)).slice(1, -1);
     submenu.removeEventListener("keyup", temp);
    };
    submenu.addEventListener("keyup", temp);
   };
  };
  submenu.input_msg2.onkeyup = () => {
   try {
    ls.chat.msg = encodeURIComponent(submenu.input_msg2.value).slice(0, 1e3);
   } catch(e) {};
   saveData();
  };
 };
 elem.innerText = "Mods";
 let elem2 = load_div_cont.appendChild(document.createElement("a"));
 elem2.innerText = "Mods";
 elem2.onclick = elem.onclick;
 elem2 = elem2.style;
 elem2.position = "absolute";
 elem2.bottom = elem2.right = "12px";
 elem2.cursor = "pointer";
 elem2.color = "#99f";
 elem2.fontWeight = "bold";
}catch(e){giveError(e)};

if (!feature_disable.hide_tips) try{
 document.head.appendChild(document.createElement("style")).innerText = "#tip{visibility:hidden}";
}catch(e){giveError(e)};

if (!feature_disable.chat_message_bind) try{
 let canSendBind = true;
 const openChat = () => {
  let a=jQuery.Event("keydown");
  a.key="Enter";
  $(document).trigger(a);
 };
 const chat_input = document.querySelector("#chat_input");
 document.onkeyup = e => {
  if (e.keyCode === ls.chat.bind && canSendBind && chat_input.style.display === "none") {
   canSendBind = false;
   setTimeout(() => canSendBind = true, 3e3);
   chat_input.value = decodeURIComponent(ls.chat.msg);
   openChat();
   openChat();
  };
 };
}catch(e){giveError(e)};

if (!feature_disable.comments) try{
 const target = document.querySelector("#game_menu_overlay"),
 shuffle=array=>{let currentIndex=array.length,randomIndex;while(currentIndex!=0){randomIndex=Math.floor(Math.random()*currentIndex);currentIndex--;[array[currentIndex],array[randomIndex]]=[array[randomIndex],array[currentIndex]]};return array};
 let comments = shuffle([
  //["cutt1ng-sw0rd", "He doesn't use a sword."],
  //["Sgt. Fugazi", "The artist! You'll see his work on the billboards sometimes."],
  //["AriDev", 'VERSION 2.7.3:\\n\\u{1F784} Replaced moderator "AriDev" with bot "\\u{1F4A9}"'],
  //["Opal29", '"git merge push pull commit init"'],
  //["slink", '"UwU UwU UwU"'],
  //["Wolfmann Games", "Plot twist: It's actually Xen0"],
  //["BicBoiii", "Harder, better, faster, stronger."],
  //["cutt1ng-sw0rd", '"selling xeno\\x27s hacks for 5000k e dm me :D"'],
  //["IzzyGama", "They say legends never die. In fact, they become a part of you."],
  //["Forgeable", "Ignorance is bliss."],
  //["NOOTNOOTMOFO", "Maxed out charisma stat IRL."],
  //["TurboChang", "lex1 is hacking"],
  //["Yeetbo29332948", 'All of the lobbies are filled with sweats.'],
  //["TombStone\\u30B7", "REMEMBER THE NAME!"],
  
  ["cutt1ng-sw0rd", "Rush him with a sword. I'm sure you'll live."],
  ["BicBoiii", "Light em' up!"],
  ["Izzy", "Legends never die."],
  ["LEX1", "I fear no man. But that thing, it scares me."],
  ["iminthebibleson", "Better start praying because..."],
  ["Sgt. Fugazi", "Peace is not an option."],
  ["TurboChang", "\\u{1F480}\\u{1F480}\\u{1F480}"],
  ["Opal29", "Gimme da loot!"],
  ["Opal29", "gg wp"],
  ["nightslash41716", "Why aim when you can AR?"],
  ["Izzy", "Rattle em', boys!"],
  ["Wolfmann Games", "THE LAAAAGGGG!!!"],
  ["Fawn", "No drip???"],
  ["TombStone\\u30B7", "rip"],
  ["elialol", "Our work is never over."],
  ["seerev", 'Saying "ow" in a good way to cope with EXPLODING!'],
  ["kanjiwhite", 'Cheer up, the worst is yet to come.'],
  ["Yeetbo29332948", "Some live to tell the tale? Nah, front lines."],
  ["NumberZERO", "There is no number one, there is only \\u{1D440}\\u{1D438}."],
  ["bochkazwer", "It's a bird, it's a plane, no, it's- I'm dead."],
  ["Jonatax1", "I have a sniper rifle. Lemme prove it!"],
  [
   "Yeetbo29332948", 
   {
    $: "i",
    _: "Aurum potestas est.",
    color: "#ff3",
    fontWeight: "bold",
    pointerEvents: "none",
    letterSpacing: "1.5px",
    textShadow: "2px 1px 15px rgba(255, 255, 77, 0.55)",
   },
  ],
  ["Kawata89", "Failure doesn't mean the game is over, it means try again with experience!"],
  [
   "Eien",
   [
    "I ",
    {
     $: "i",
     _: "will",
    },
    " make it, don't give up!",
   ],
  ],
  ["AnaL0G",
   [
    "Don't talk to me that way, kid. My dad owns Microsoft! ",
    {
     $: "img",
     src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAzxJREFUeJzlmE1qJDEMhRtykL7/ts82+4RZGIR4kp5kya4Qg2F6UmX7ffp1vV6v19cfn9cPcHteP8DteW6z9/v9Lzt/NQAt5vP5fFtzjfXv9f8HQMwJ1+KqYxjEjPCpsWA8CkCntdnR6BHPtngE4QqACeHLtbNrNkC4J14mt531NvNCLd7RIWTp0mUMzQkPGgXAHtqr95PJsggh5/ojJ28chepwJvZPekI7gJ241YnuVL+QgMCLl0IiGNWy1jlICDnra0sikae7QmuQSZG3PivsCeLXKAOI7um3hWVGAIHL+vrOftLKu3ulATzR0ijPZN51IPTX/IkhjVHxwBKA7AaTLa4MxYpn/n+PAlCxfvVQlfV3QBteYANgNzr1GWw3L4UAtPWZzaatv87R0VnSAOSm0TgJYHcvoxpgD2A3OhX/HTlgvR8CyCbCKQDWJ7PmPGB7ALtRVxLUlyzPEI2VwL71oYmqAwOA+UZo7WetV/EECsB6EAlHX3Q8K2UFZ7yp4gUhAN1x6VDQTcnETKvqBCAPgKxihQlqV7OWvgrA6gI1GNmQWGIYAHqtRwFAucASroExAORhUNjJA2cr0hgAz401gOhZ9Jz8rYV3dIFyzRSAjDuzpU4eSOcOL7SOA2DdWm/ChAT6wuOtewVA9aDrsDp/ZKYlYGcA8fb3gAwEqwlCz1nrR+LlmscBROGAAKEyqp+3OksPQHUY7s8DkMlOi/EaGgZoRkR1GOL9j6Keq1pXVdQvIEtXIVwFgOLU+h3BW8+egOC4fx1AFB7MNZZpbjq8xRGPATAQUP9u1X8mRyDRO/lCr9UOwEpy6LAWBAkRie8Ij0C8DWBB8JqYqHWVoiIAeq0u8VsAGE+QIpE7y7/r3zp00LrVQbj+HgAU39nDW7F/0PoxAAsCuqJ6WT0Kg+j9IfEcAAQCVQFLqPybB2W3119rJMTnAGgIckPZ32e8oBOAzCNjADwIDACUN7oAyHONAkAQLI/wDrme15CyQ1egIwAkBOQBUSvsQdgRfxQASoxsKeyo+zohXwGAQGQEVawf7XMFAAqL7sG2yslS2AsAgdiFgfoP5p2rALw8ETVL7CXr1wBgwKC54z0sgB8mZCBOM+OEpgAAAABJRU5ErkJggg==",
     css_height: "max(3.6vw, 20px)",
     css_width: "max(3.6vw, 20px)",
    },
   ],
  ],
  [
   "Forgeable",
   [
    "Alright so there's a bug with-",
    {
     $: "i",
     _: " I KNOW IT'S NOT WORKING, STOP TEXTING ME!",
     fontWeight: "bold",
    },
   ],
  ],
  [
   "Forgeable",
   {
    href: "https://youtu.be/0oBx7Jg4m-o",
    _: "https://youtu.be/0oBx7Jg4m-o",
    color: "#eee",
    textDecoration: "underline",
   },
  ],
  ["SgtWalker", "Yeah, not much of a warning."],
  ["ALGUY", "Say my name."],
  ["AlGirl", "You're... Dragonborn!"],
  ["They killed Kenny.", "Oh my god..."],
  ["xen0",
   {
    $: "audio",
    src: "data:audio/mpeg;base64,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",
    controls: true,
    marginTop: "10px",
    css_textShadow: "0px 0px 0px #000",
   },
  ],
 ]),
 comments2 = [];
 const randomMsg = e => {
  let a = 0[0];
  if (comments.length) {
   comments2.push(a = comments.pop());
  } else {
   comments = shuffle(comments2);
   comments2 = [];
   comments2.push(a = comments.pop());
   console.log("Recycling comments...");
  };
  window.msg_name.innerText = a[0];
  window.msg_text.UI(a[1]);
  if (e) {
   e.preventDefault();
   e.stopPropagation();
  };
 };
 target.appendChild(UI(
  {
   $: "style",
   _: ".sm_link,#full_screen_button{display:none}",
  },
  {
   $: "a",
   css_marginTop: "100%",
   css_display: "block",
   css_position: "absolute",
   css_bottom: "0px",
   css_left: "0px",
   css_width: "100vw",
   css_border: "2px outset #909",
   css_backgroundColor: "rgba(0, 0, 0, 0.5)",
   css_padding: "5px",
   as: UI.MSG = {
    textDecoration: "none",
    textAlign: "center",
    fontFamily: "monospace",
    fontSize: "max(1.5vw, 12px)",
    textShadow: "2px 1px 1px #000",
    userSelect: "none",
    cursor: "pointer",
    color: "#fff",
    letterSpacing: "1px",
   },
   onclick: () => setTimeout(randomMsg),
   _: [
    {
     var: "msg_name",
     as: UI.MSG,
     css_color: "#fb1",
     css_paddingLeft: "5px",
     css_paddingRight: "5px",
     css_borderBottom: "1.5px solid #909",
    },
    { $: "br" },
    {
     var: "msg_text",
     as: UI.MSG,
    },
   ],
  },
 ));
 //randomMsg();
 game_menu_overlay.style.__defineSetter__("display", function(e) {
  if (!e) {
   optimizeWebSocket = true;
   console.log2(true);
   game_menu_overlay.removeAttribute("style");
   delete_things();
  } else {
   game_menu_overlay.setAttribute("style", "display: " + e);
   if (!hasSwitchedTimeout) window.setTimeout = timeout2;
  };
  randomMsg();
 });
}catch(e){giveError(e)};

if (!feature_disable.right_menu_changes) try{
 document.head.appendChild(document.createElement("style")).innerText = "#mint_countdown { display: none } #bottom_bar_left > * {text-shadow: 0px 0px 2px #000,0px 0px 2px #000 !important; color: #fff; font-size: 100%} #tt_cont_inner > p, #twitch_follow_link, #editor_button {display:none} #any_promos > * > * { border: outset 3px #777; border-radius: 10px !important }";
 document.querySelectorAll("#bottom_bar_left > *").forEach(i => i.style.display = "none");
 const add = (text, id, loc) => {
  let a = bottom_bar_left.appendChild(document.createElement("button"));
  a.id = "community_patch_" + id;
  a.setAttribute("class", "btn btn-secondary btn-sm");
  a.onclick = () => {
   window.open(loc);
  };
  a = a.appendChild(document.createElement("a"));
  a.innerText = text;
 };
 add("ev.io / user", "stats", "/user");
 add("ev.io / clans", "clans", "/clans");
 add("discord.com / login", "discord", "https://discord.com/login");
 add("fractal.is / ev", "fractal", "https://www.fractal.is/ev");
 add("gamerpay.gg / buy", "gamerpay", "https://gamerpay.gg/buy");
}catch(e){giveError(e)};

if (!feature_disable.hide_hotkeys) try{
 document.head.appendChild(document.createElement("style")).innerText = ".ab_hotkey,.weapons_hotkey{display:none}";
}catch(e){giveError(e)};

if ("\\x00".charCodeAt()) {
 let msg = "You're a fucking idiot, Izzy.";
 if (console.log2) console.log2(msg);
 if (console.log) console.log(msg);
 alert(msg);
};

if (!feature_disable.swearing) try{
 awaitSelector("#chat_input", e => {
  e.onkeydown = function(ev) {
   //if (ev.key !== "Enter") {
    if (ev.getModifierState("CapsLock") && !ev.ctrlKey && ev.key.length === 1) {
     if (ev.shiftKey) {
      ev.preventDefault();
      e.value += ev.key.toUpperCase();
     } else {
      if (ev.key !== ev.key.toLowerCase()) {
       ev.preventDefault();
       e.value += ev.key.toLowerCase();
      };
     };
    };
   //};
   /* else {
    if (!ls.s) return;
    if (e.value.startsWith("/")) return;
    //"\\u{E0020}"
    let item = e.value.trim().split("");
    let doChange = false;
    item.forEach((i, f) => {
     if (i === " ") {
      doChange = false;
     } else {
      if (doChange) {
       item[f] = i + "\\u00AD";
      } else {
       doChange = true;
      };
     };
    });
    e.value = item.join("");
   };*/
  };
 });
}catch(e){giveError(e)};

//onplayerdataload(() => console.log2(playerdata));

}catch(e){giveError(e)}}, { once: true });

})();
`);document.documentElement.appendChild(t);t.click();t.removeAttribute("onclick");
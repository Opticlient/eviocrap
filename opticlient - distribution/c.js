let t=document.createElement("a");t.setAttribute("onclick",`(()=>{



//retain session information when changing account (2 / 3)
(() => {
 const search = sessionStorage.getItem("opticlient-continue");
 if (search) {
  location.search = search;
  sessionStorage.removeItem("opticlient-continue");
 };
 sessionStorage.removeItem("opticlient-continue2");
})();

//retain session information when changing account (3 / 3)
(() => {
 window.addEventListener("load", () => {
  document.querySelector("#edit-submit").addEventListener("click", e => {
   if (location.search) sessionStorage.setItem("opticlient-continue2", location.search);
  });
 }, { once: true });
})();



})();`);document.documentElement.appendChild(t);t.click();t.removeAttribute("onclick");
var s = document.createElement("script");
function getMainSave() {
  alert(
    "Thank you for using the Prism Backup Utility! You can transfer your data using the Prism Upload Utility on the Bookmarklets page."
  );
  var e = {},
    a = Object.entries(localStorage);
  (a = btoa(JSON.stringify(a))), (e.localStorage = a);
  var t = document.cookie;
  return (
    (t = btoa(t)),
    (e.cookies = t),
    (e = btoa(JSON.stringify(e))),
    (e = CryptoJS.AES.encrypt(e, "egamepass").toString())
  );
}
function downloadMainSave() {
  var e = new Blob([getMainSave()]),
    a = window.URL.createObjectURL(e),
    t = document.createElement("a");
  (t.href = a),
    (t.download = "your.prism.save"),
    t.click(),
    URL.revokeObjectURL(a);
}
(s.src =
  "https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js"),
  document.head.appendChild(s);
s.onload = function () {
  downloadMainSave();
};

const urlInput = document.getElementById("urlInput");
const goBtn = document.getElementById("goBtn");
const browserFrame = document.getElementById("browserFrame");

goBtn.addEventListener("click", () => {
  let url = urlInput.value.trim();
  if (!url.startsWith("http")) {
    url = "https://" + url;
  }
  browserFrame.src = url;
});

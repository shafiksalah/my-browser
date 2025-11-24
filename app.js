const urlInput = document.getElementById("urlInput");
const goBtn = document.getElementById("goBtn");
const historyList = document.getElementById("historyList");
const bookmarkList = document.getElementById("bookmarkList");
const bookmarkBtn = document.getElementById("bookmarkBtn");
const newTabBtn = document.getElementById("newTabBtn");
const tabsContainer = document.getElementById("tabsContainer");

let historyArr = [];
let bookmarksArr = [];
let tabs = [];
let activeTab = null;

// فتح الرابط في نافذة جديدة
function navigate(url) {
  if (!url.startsWith("http")) url = "https://" + url;

  window.open(url, "_blank");

  // حفظ التاريخ
  if (!historyArr.includes(url)) {
    historyArr.push(url);
    renderHistory();
  }

  // تحديث التبويب الحالي
  if (activeTab !== null) {
    tabs[activeTab].url = url;
    renderTabs();
  }
}

// تحديث History
function renderHistory() {
  historyList.innerHTML = "";
  historyArr.slice().reverse().forEach(url => {
    const li = document.createElement("li");
    li.textContent = url;
    li.onclick = () => navigate(url);
    historyList.appendChild(li);
  });
}

// تحديث Bookmarks
function renderBookmarks() {
  bookmarkList.innerHTML = "";
  bookmarksArr.forEach(url => {
    const li = document.createElement("li");
    li.textContent = url;
    li.onclick = () => navigate(url);
    bookmarkList.appendChild(li);
  });
}

// إضافة Bookmark
bookmarkBtn.addEventListener("click", () => {
  const url = urlInput.value.trim();
  if (url && !bookmarksArr.includes(url)) {
    bookmarksArr.push(url);
    renderBookmarks();
  }
});

// زر Go
goBtn.addEventListener("click", () => navigate(urlInput.value.trim()));

// الضغط على Enter
urlInput.addEventListener("keypress", e => {
  if (e.key === "Enter") goBtn.click();
});

// إدارة التبويبات
function addTab(url = "") {
  const tab = { url };
  tabs.push(tab);
  activeTab = tabs.length - 1;
  renderTabs();
}

function renderTabs() {
  tabsContainer.innerHTML = "";
  tabs.forEach((tab, index) => {
    const tabBtn = document.createElement("div");
    tabBtn.textContent = tab.url || "New Tab";
    tabBtn.className = "tab" + (index === activeTab ? " active" : "");
    tabBtn.onclick = () => {
      activeTab = index;
      urlInput.value = tabs[index].url;
      renderTabs();
    };
    tabsContainer.appendChild(tabBtn);
  });
}

// زر إضافة تبويب جديد
newTabBtn.addEventListener("click", () => addTab());

addTab(); // تبويب افتراضي عند الفتح

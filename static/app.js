// WorkfxHUB - 纯 HTML/CSS/JS 版本，无需构建，直接刷新即可生效

// ========== 状态 ==========
const state = {
  tab: "brand",
  brand: {
    stage: "empty", // empty | inputting | processing | chat
    items: [],
    archive: {
      sections: [
        { title: "1. 品牌基础身份与故事", content: ["品牌定位：纯植物提取护肤", "Slogan：科技还原自然之美"] },
        { title: "2. 目标人群与痛点", content: ["核心人群：25-35岁一二线城市新锐白领"] },
        { title: "3. 文本语感与调性", content: ["沟通语气：专业严谨、温柔治愈"] },
      ],
    },
    messages: [
      { role: "assistant", content: "太棒了！我已经阅读完毕并为您提取了右侧的档案。您看看有什么需要修改的吗？" },
    ],
  },
};

// ========== Tab 切换 ==========
function setTab(tabId) {
  state.tab = tabId;
  document.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
  document.querySelector(`.tab[data-tab="${tabId}"]`)?.classList.add("active");
  document.querySelectorAll(".page").forEach((p) => p.classList.remove("active"));
  document.getElementById(`page-${tabId}`)?.classList.add("active");
}

document.querySelectorAll(".tab, .sidebar-logo").forEach((el) => {
  el.addEventListener("click", (e) => {
    if (el.dataset.tab) {
      e.preventDefault();
      setTab(el.dataset.tab);
      window.location.hash = el.dataset.tab;
    }
  });
});

window.addEventListener("hashchange", () => {
  const hash = (window.location.hash || "#brand").slice(1);
  if (["brand", "channels", "inspiration"].includes(hash)) setTab(hash);
});

if (window.location.hash) {
  const hash = window.location.hash.slice(1);
  if (["brand", "channels", "inspiration"].includes(hash)) setTab(hash);
}

// ========== 品牌大脑 ==========
const typeIcons = { file: "📄", image: "🖼️", text: "📝", link: "🔗" };

function renderBrandItems() {
  const container = document.getElementById("brand-items");
  if (!container) return;
  container.innerHTML = state.brand.items
    .map(
      (item) =>
        `<div class="item-card"><span>${typeIcons[item.type] || "📎"}</span><span>${item.type === "text" ? item.preview : item.name}${item.size ? " (" + item.size + ")" : ""}</span></div>`
    )
    .join("");
}

function addBrandItem(item) {
  state.brand.items.push(item);
  renderBrandItems();
}

function setBrandStage(stage) {
  state.brand.stage = stage;
  document.querySelectorAll("#page-brand .page-state").forEach((s) => s.classList.add("hidden"));
  const el = document.getElementById(`brand-${stage}`);
  if (el) el.classList.remove("hidden");
  if (stage === "inputting") renderBrandItems();
  if (stage === "chat") renderBrandArchive();
}

function renderBrandArchive() {
  const el = document.getElementById("brand-archive");
  if (!el) return;
  el.innerHTML = state.brand.archive.sections
    .map(
      (s) =>
        `<div class="section"><h2>${s.title}</h2><ul>${s.content.map((c) => `<li>${c}</li>`).join("")}</ul></div>`
    )
    .join("");
}

function renderBrandMessages() {
  const el = document.getElementById("brand-messages");
  if (!el) return;
  el.innerHTML = state.brand.messages
    .map((m) => `<div class="msg ${m.role}"><div class="msg-inner">${m.content}</div></div>`)
    .join("");
}

// 输入栏通用逻辑
document.querySelectorAll(".input-bar").forEach((bar) => {
  const input = bar.querySelector('input[type="text"]');
  const sendBtn = bar.querySelector('[data-send]');
  const submitId = bar.dataset.submit;

  bar.querySelectorAll('input[type="file"]').forEach((fileInput) => {
    fileInput.addEventListener("change", (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const uploadTarget = fileInput.dataset.upload || "";
      if (uploadTarget.includes("brand")) {
        addBrandItem({
          id: Date.now(),
          type: file.type.startsWith("image/") ? "image" : "file",
          name: file.name,
          size: (file.size / 1024 / 1024).toFixed(1) + "MB",
        });
        if (state.brand.stage === "empty") setBrandStage("inputting");
      }
      e.target.value = "";
    });
  });

  bar.querySelectorAll(".voice-btn").forEach((btn) => {
    btn.addEventListener("click", () => alert("语音输入功能即将上线"));
  });

  function doSubmit() {
    const text = input?.value?.trim();
    if (!text) return;

    if (submitId === "brand-send" || submitId === "brand-add") {
      addBrandItem({ id: Date.now(), type: "text", name: "用户输入", preview: text.slice(0, 50) + (text.length > 50 ? "…" : "") });
      if (state.brand.stage === "empty") setBrandStage("inputting");
      input.value = "";
    } else if (submitId === "channels-send") {
      alert("已提交，渠道配置功能开发中");
      input.value = "";
    } else if (submitId === "inspiration-send") {
      alert("已存入灵感库");
      input.value = "";
    } else if (submitId === "brand-chat") {
      state.brand.messages.push({ role: "user", content: text });
      renderBrandMessages();
      input.value = "";
      setTimeout(() => {
        state.brand.messages.push({ role: "assistant", content: "收到！已为您在右侧面板实时更新了目标人群信息。" });
        renderBrandMessages();
      }, 800);
    }
  }

  input?.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      doSubmit();
    }
  });

  sendBtn?.addEventListener("click", doSubmit);
});

document.getElementById("brand-link-btn")?.addEventListener("click", () => {
  const url = prompt("请输入品牌官网或公众号链接");
  if (url) {
    addBrandItem({ id: Date.now(), type: "link", name: url });
    setBrandStage("inputting");
  }
});

document.getElementById("brand-parse-btn")?.addEventListener("click", () => {
  setBrandStage("processing");
  setTimeout(() => setBrandStage("chat"), 3000);
});

document.getElementById("brand-confirm")?.addEventListener("click", () => {
  setBrandStage("empty");
  state.brand.items = [];
});

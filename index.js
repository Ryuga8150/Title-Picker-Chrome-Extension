let pickTitleButtonEl = document.querySelector(".pick-btn");
let titleDisplayEl = document.querySelector(".title-text");
let titleBoxEl = document.querySelector(".title-box");

pickTitleButtonEl.addEventListener("click", async function () {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  console.log(tab);
  chrome.scripting.executeScript(
    {
      target: { tabId: tab.id },
      function: pickTitle,
    },
    (injectionResults) => {
      console.log(injectionResults);
      const [data] = injectionResults;
      if (data.result) {
        titleBoxEl.style.display = "flex";
        titleDisplayEl.innerHTML = data.result;
      }
    }
  );
});

function pickTitle() {
  console.log(document.title);
  return document.title;
}

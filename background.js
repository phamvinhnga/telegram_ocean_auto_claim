// Khai báo biến để lưu ID của interval
let intervalID;

// Bắt đầu vòng lặp click tự động
function startAutoClick() {
  intervalID = setInterval(() => {
    // Nút Claim Now 1: ở giao diện ngoài của ví để vào Ocean Game
    clickElementBySelector("#section-home > div > div > div.block-claim.flex.flex-row.relative.z-0 > div.item-1 > div._item-1_2 > div.ml-auto.mt-3 > button > span");
    // Nút Claim Now 2: Claim OCEAN ở trong giao diện của Ocean Game
    clickElementBySelector("#section-transaction > div.block-data.h-full > div > div.overlay.relative > div > div > div > div.flex.flex-row.items-center.item-2.mt-2.mb-3 > div > div");
  }, 10000); // Thực hiện mỗi 10 giây
}

// Dừng vòng lặp click tự động
function stopAutoClick() {
  clearInterval(intervalID);
  console.log('Dừng tự động click.');
}

// Thực hiện click vào phần tử bằng JavaScript selector
function clickElementBySelector(selector) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.scripting.executeScript({
      target: {tabId: tabs[0].id},
      function: (selector) => {
        const element = document.querySelector(selector);
        if (element) {
          element.click();
        }
      },
      args: [selector]
    });
  });
}
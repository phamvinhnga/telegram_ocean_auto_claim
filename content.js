let accounts = [];
// so luong user
let accountCount = 100;
let processingTurn = 0;

// Thực hiện click vào phần tử bằng JavaScript selector
function clickElementBySelector(selector) {
  const element = document.querySelector(selector);
  if (element) {
    element.click();
    return true;
  }
  else {
    console.log("không tìm thấy", selector)
    return false;
  }
}

// Tạo danh sách accounts
function loadAccounts() {
  for (let i = 1; i <= accountCount; i++) {
    accounts.push(`#section-setting > div > div:nth-child(2) > div:nth-child(${i}) > button`);
  }
}

function process() {
  // Bắt đầu vòng lặp click tự động
  try {
    console.log(processingTurn);
    // Mở menu
    clickElementBySelector("#section-home > div > header > button.relative.p-4");
    setTimeout(() => {
      // Chon user
      let hasUser = clickElementBySelector(accounts[processingTurn]);
      if (!hasUser) {
        processingTurn = accountCount;
        nextAccount(1000);
        return;
      }
      setTimeout(() => {
        // Nút Claim ở ngoài của ví để vào Ocean Game
        clickElementBySelector("#section-home > div > div > div.swiper.swiper-initialized.swiper-horizontal.mySwiper > div.swiper-wrapper > div.swiper-slide.swiper-slide-active > div > div.item-1 > div._item-1_2 > div.ml-auto.mt-3 > button");

        setTimeout(() => {
          // Nút Claim OCEAN ở trong Ocean Game
          let claimButton = clickElementBySelector("#section-transaction > div.block-data.h-full > div > div.overlay.relative > div > div > div > button");
          if (claimButton) {
            nextAccount(15000);
          }
          else {
            nextAccount(1000);
          }
        }, 1000);

      }, 1000);
    }, 1000);
  }
  catch {
    alert("Có lỗi cmnr huhu");
  }
}

function nextAccount(timeout) {
  setTimeout(() => {
    processingTurn++;
    if (processingTurn >= accountCount) {
      processingTurn = 0;
    }
    history.back();
    setTimeout(() => {
      process();
    }, 1000);
  }, timeout);
}

loadAccounts();
process();
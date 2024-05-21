let accounts = []; 
// so luong user
let accountCount = 100;
let processingTurn = 0;
let flag = true;
let timeouts = [];

// Thực hiện click vào phần tử bằng JavaScript selector
function clickElementBySelector(selector) {
  const element = document.querySelector(selector);
  if (element) {
    element.click();
    return true;
  }
  else{
    console.log("không tìm thấy", selector)
    return false;
  }
}
function clearMyTimeOut(){
  for (let i = 0; i < timeouts.length; i++) {
    clearTimeout(timeouts[i]);
  }
}

  // Làm mới trang
function refreshPage(secount){
  let refreshTimeout = setTimeout(function() {			
    processingTurn++;
    if(processingTurn >= accountCount){
      processingTurn = 0;
    }
    // Đổi account
    localStorage.setItem('TelegramOceanProcessingTurn', processingTurn);
    window.location.href = 'https://walletapp.waveonsui.com/';
  }, secount);
  timeouts.push(refreshTimeout);
}


// Tạo danh sách accounts
function loadAccounts()
{
	for(let i = 1; i <= accountCount; i++)
	{
		accounts.push(`#section-setting > div > div:nth-child(2) > div:nth-child(${i}) > button`);
	}
}

// Bắt đầu vòng lặp click tự động
setTimeout(function() {

  loadAccounts();

  let telegramOceanProcessingTurn = localStorage.getItem('TelegramOceanProcessingTurn', processingTurn);
  if(telegramOceanProcessingTurn){
    processingTurn = telegramOceanProcessingTurn;
  }
      
  // Mở menu
  clickElementBySelector("#section-home > div > header > button.relative.p-4");

  setTimeout(() => {
    // Chon user
    let hasUser = clickElementBySelector(accounts[processingTurn]);
    if(!hasUser){
      processingTurn = accountCount;
      clearMyTimeOut();
      refreshPage(0);
      return;
    }
    setTimeout(function() {

    // Nút Claim ở ngoài của ví để vào Ocean Game
      clickElementBySelector("#section-home > div > div > div.block-claim.flex.flex-row.relative.z-0 > div.item-1 > div._item-1_2 > div.ml-auto.mt-3 > button > span");
      
      setTimeout(() => {
        // Nút Claim OCEAN ở trong Ocean Game
        for(let i = 0; i < 70; i++){
          let claimTimeOut = setTimeout(function() {		
            let claimButton = clickElementBySelector("#section-transaction > div.block-data.h-full > div > div.overlay.relative > div > div > div > button");
            if(!claimButton){
              clearMyTimeOut();
              // không có nút claim sẽ đổi acc khác
              refreshPage(0);
              return;
            }
          }, 100);
          timeouts.push(claimTimeOut);
        }
      }, 1000);
      // quay lại
    }, 1000);
  }, 2000)
}, 1000);

// 15s sẽ làm mới trang
refreshPage(15000);

//TODO: Please write code in this file.
function countNumber(code) {
  var map = {};
  for (var i = 0; i < code.length; i++) {
    var array = code[i].split("-")
    if (array.length === 2) {
      map[array[0]] = parseInt(array[1]);
    }else {
      if (map[array[0]] != undefined) {
        map[array[0]] += 1;
      }else {
        map[array[0]] = 1;
      }
    }
  }
  return map;
}

function getItemsDetail(map) {
  var itemList = loadAllItems();
  var itemDetails = [];
  for (var barcode in map) {
    var detail = new Object();
    for (var i = 0; i < itemList.length; i++) {
      if (barcode === itemList[i].barcode) {
        detail.item = itemList[i];
        detail.count = map[barcode];
        itemDetails.push(detail);
      }
    }
  }
  return itemDetails;
}

function saleCalculate(itemDetails) {
  var promotions = loadPromotions();
  var curtItems = [];
  for (var n in itemDetails){
    var buyNumber = getBuyNumber(getRole(itemDetails[n].item.barcode,promotions),itemDetails[n].count);
    var curtItem = new Object();
    curtItem.details = itemDetails[n];
    curtItem.subCost = itemDetails[n].item.price*buyNumber;
    curtItem.subSaving = itemDetails[n].item.price*(itemDetails[n].count - buyNumber);
    curtItems.push(curtItem);
  }
  return curtItems;
}

function formatNumber(number) {
  var formated = new Number(number);
  return formated.toFixed(2);
}

function getBuyNumber(roleType,count) {
  if (roleType === 'BUY_TWO_GET_ONE_FREE') {
    return count - Math.floor(count/3);
  }else {
    return count;
  }
}

function createCurtItems(itemDetails,subCost,subSaving) {
  var curtItem = new Object();
  curtItem.details = itemDetails;
  curtItem.subCost = subCost;
  curtItem.subSaving = subSaving;
  return curtItem;
}

function getRole(barcode,promotions) {
  for (var role in promotions) {
    var barcodes = promotions[role].barcodes;
    for (var code in barcodes) {
      if (barcodes[code] === barcode) {
        return promotions[role].type;
      }
    }
  }
}

function getReceipt(curtItems) {
  var totalCost = 0;
  var totalSaving = 0;
  var receipt = '***<没钱赚商店>收据***\n' ;
  for (var n in curtItems) {
    receipt += printDetails(curtItems[n]);
    totalCost += curtItems[n].subCost;
    totalSaving += curtItems[n].subSaving;
  }
  receipt +=
    '----------------------\n' +
    '总计：' + formatNumber(totalCost) + '(元)\n' +
    '节省：' + formatNumber(totalSaving) + '(元)\n' +
    '**********************';
  return receipt;
}

function printDetails(curtItem) {
  return '名称：' + curtItem.details.item.name +
    '，数量：' + curtItem.details.count + curtItem.details.item.unit +
    '，单价：' + formatNumber(curtItem.details.item.price) + '(元)，小计：' + formatNumber(curtItem.subCost) + '(元)\n';
}

function printReceipt(inputs) {
  var receipt = getReceipt(saleCalculate(getItemsDetail(countNumber(inputs))));
  console.log(receipt);
}

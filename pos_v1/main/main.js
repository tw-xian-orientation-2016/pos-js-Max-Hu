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

function getBuyNumber(roleType,count) {
  if (roleType === 'BUY_TWO_GET_ONE_FREE') {
    return count - Math.floor(count/3);
  }else {
    return count;
  }
}

function createCurtItems(itemDetails,subcost,subsaving) {
  var curtItem = new Object();
  curtItem.details = itemDetails;
  curtItem.subcost = subcost;
  curtItem.subsaving = subsaving;
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

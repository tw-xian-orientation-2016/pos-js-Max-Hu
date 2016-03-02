function countNumber(tags) {
  var shopList = {};

  tags.forEach( function(tag) {

    var splitTagArr = tag.split("-");
    var barCode = splitTagArr[0];

    if (splitTagArr[1]) {
      shopList[barCode] = parseFloat(splitTagArr[1]);
    } else {
      var existBarCode = shopList[barCode];
      existBarCode? shopList[barCode] += 1 : shopList[barCode] = 1 ;
    }
  });

  return shopList;
}

function getItemsDetail(shopList) {

  var items = loadAllItems();
  var shopListDetail = [];

  for (var barcode in shopList) {
    var itemDetail = {};
    items.forEach(function(item) {
      if (barcode === item.barcode) {
        itemDetail.item = item;
        itemDetail.count = shopList[barcode];

        shopListDetail.push(itemDetail);
      }
    });
  }

  return shopListDetail;
}

function saleCalculate(shopListDetail) {

  var promotions = loadPromotions();
  var cartItems = [];

  shopListDetail.forEach(function (payedItem) {
    var cartItem = {};
    var barcode = payedItem.item.barcode;
    var count = payedItem.count;

    var role = getRole(barcode, promotions);
    var buyNumber = getBuyNumber(role, count);

    var price = payedItem.item.price;

    cartItem.subCost = price * buyNumber;
    cartItem.subSaving = price * (count - buyNumber);
    cartItem.details = payedItem;

    cartItems.push(cartItem);
  });

  return cartItems;
}

function getBuyNumber(roleType, count) {
  if (roleType === 'BUY_TWO_GET_ONE_FREE') {
    return count - Math.floor(count/3);
  } else {
    return count;
  }
}

function getRole(barcode, promotions) {
  var type;

  promotions.forEach(function (promotion) {
    var promotionBarcodes = promotion.barcodes;
    promotionBarcodes.forEach(function (promotionBarcode) {
      if (barcode === promotionBarcode) type = promotion.type;
    });
  });

  return type;
}

function getReceipt(cartItems) {
  var totalCost = 0;
  var totalSaving = 0;
  var receipt = '***<没钱赚商店>收据***\n' ;

  cartItems.forEach(function(cartItem) {
    receipt += printDetails(cartItem);
    totalCost += cartItem.subCost;
    totalSaving += cartItem.subSaving;
  });

  receipt +=
    '----------------------\n' +
    '总计：' + formatNumber(totalCost) + '(元)\n' +
    '节省：' + formatNumber(totalSaving) + '(元)\n' +
    '**********************';

  return receipt;
}

function printDetails(curtItem) {
  return '名称：' + curtItem.details.item.name + '，' +
    '数量：' + curtItem.details.count + curtItem.details.item.unit + '，' +
    '单价：' + formatNumber(curtItem.details.item.price) + '(元)' + '，' +
    '小计：' + formatNumber(curtItem.subCost) + '(元)\n';
}

function formatNumber(number) {
  return parseFloat(number).toFixed(2);
}

function printReceipt(inputs) {
  var shopList = countNumber(inputs);
  var shopListDetail = getItemsDetail(shopList);
  var cartItem = saleCalculate(shopListDetail);
  var receipt = getReceipt(cartItem);

  console.log(receipt);
}

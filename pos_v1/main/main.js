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

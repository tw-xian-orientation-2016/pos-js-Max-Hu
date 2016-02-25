describe('pos', function() {
  var allItems;
  var inputs;

  beforeEach(function() {
    allItems = loadAllItems();
    inputs = [
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000003-2',
      'ITEM000005',
      'ITEM000005',
      'ITEM000005'
    ];
  });

  it('should print correct text', function() {

    spyOn(console, 'log');

    printReceipt(inputs);

    var expectText =
      '***<没钱赚商店>收据***\n' +
      '名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)\n' +
      '名称：荔枝，数量：2斤，单价：15.00(元)，小计：30.00(元)\n' +
      '名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)\n' +
      '----------------------\n' +
      '总计：51.00(元)\n' +
      '节省：7.50(元)\n' +
      '**********************';

    expect(console.log).toHaveBeenCalledWith(expectText);
  });

  it('should get number correctly', function() {
    var items = countNumber(inputs);
    expect(items["ITEM000001"]).toEqual(5);
    expect(items["ITEM000003"]).toEqual(2);
    expect(items["ITEM000005"]).toEqual(3);
  });

  it('should get item detail correctly', function() {
    var items = getItemsDetail(countNumber(inputs));
    var itemList = loadAllItems();
    expect(items[0].item.name).toEqual(itemList[1].name);
    expect(items[1].item.name).toEqual(itemList[3].name);
    expect(items[2].item.name).toEqual(itemList[5].name);
  });

  it('should get item subtotal correctly', function() {
    var curtItems = saleCalculate(getItemsDetail(countNumber(inputs)));
    expect(curtItems[0].subCost).toEqual(12);
    expect(curtItems[1].subCost).toEqual(30);
    expect(curtItems[2].subCost).toEqual(9);
  });


});

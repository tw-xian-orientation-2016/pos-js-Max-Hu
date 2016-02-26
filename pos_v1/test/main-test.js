describe('pos', function() {
  var allItems;
  var inputs;
  var shopList;
  var shopListDetail;
  var cartItem

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

    shopList = {ITEM000001:5,ITEM000003:2,ITEM000005:3};

    shopListDetail = [
      {
        count: 5,
        item: {
          barcode: 'ITEM000001',
          name: '雪碧',
          unit: '瓶',
          price: 3.00
        }
      },
      {
        count: 2,
        item:{
          barcode: 'ITEM000003',
          name: '荔枝',
          unit: '斤',
          price: 15.00
        }
      },
      {
        count: 3,
        item:{
          barcode: 'ITEM000005',
          name: '方便面',
          unit: '袋',
          price: 4.50
        }
      }];

    cartItem = [
      {
        subCost: 12,
        subSaving: 3,
        details: {
          count: 5,
          item: {
            barcode: 'ITEM000001',
            name: '雪碧',
            unit: '瓶',
            price: 3.00
          }
        },
      },
      {
        subCost: 30,
        subSaving: 0,
        details: {
          count: 2,
          item:{
            barcode: 'ITEM000003',
            name: '荔枝',
            unit: '斤',
            price: 15.00
          }
        }
      },
      {
        subCost: 9,
        subSaving: 4.5,
        details: {
          count: 3,
          item:{
            barcode: 'ITEM000005',
            name: '方便面',
            unit: '袋',
            price: 4.50
          }
        }
      }
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

  it('should get count correctly', function() {
    var outputs = countNumber(inputs);
    expect(outputs).toEqual(shopList);
  });

  it('should get item detail correctly', function() {

    var outputs = getItemsDetail(shopList);
    expect(outputs).toEqual(shopListDetail);
  });

  it('should get item subtotal correctly', function() {

    var outputs = saleCalculate(shopListDetail);

    expect(outputs).toEqual(cartItem);
  });

  it('should get receipt correctly', function() {

    var receipt = getReceipt(cartItem);

    var expectText =
      '***<没钱赚商店>收据***\n' +
      '名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)\n' +
      '名称：荔枝，数量：2斤，单价：15.00(元)，小计：30.00(元)\n' +
      '名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)\n' +
      '----------------------\n' +
      '总计：51.00(元)\n' +
      '节省：7.50(元)\n' +
      '**********************';
    expect(receipt).toEqual(expectText);
  });

});

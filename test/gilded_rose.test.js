const { Shop, Item } = require("../src/gilded_rose");

describe("Regular Items", function () {
  test("Should be able to create new item within shop", function () {
    const gildedRose = new Shop([new Item("testItem", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("testItem");
  });

  test("Regular items should degrade in quality at the end of each day(when updateQuality is invoked)", () => {
    const gildedRose = new Shop([new Item("Baguette", 10, 25)]);
    const qualityBeforeCallingUpdateQuality = gildedRose.items[0].quality;
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(qualityBeforeCallingUpdateQuality - 1);
  })

  test("Regular items sell in days should decrease by one at the end of each day", () => {
    const gildedRose = new Shop([new Item("Goat Cheese", 30, 35)]);
    const sellInDaysBeforeCallingUpdateQuality = gildedRose.items[0].sellIn;
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(sellInDaysBeforeCallingUpdateQuality - 1);
  })

  test("Regular items quality should decrease by two if sellIn is equal to or less than zero", () => {
    const gildedRose = new Shop([new Item("Beer", 0, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(8)
  })

  test("Regular items quality should never decrease below zero", () => {
    const gildedRose = new Shop([new Item("Ale", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  })

  test("Regular items should never be created with a negative value", () => {
    const gildedRose = new Shop([new Item("Ale", 0, -10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBeFalsy();
  })

  test("Regular items quality should never be more than fifty", () => {
    const gildedRose = new Shop([new Item("Playing Cards", 10, 55)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBeFalsy();
  })

});

describe("Aged Brie", () => {
  test("Aged Brie should increase in quality at the end of each day", () => {
    const gildedRose = new Shop([new Item("Aged Brie", 10, 10)]);
    const agedBrieQualityBeforeUpdate = gildedRose.items[0].quality;
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(agedBrieQualityBeforeUpdate + 1);
  })

  test("Aged Brie quality should never be more than fifty", () => {
    const gildedRose = new Shop([new Item("Aged Brie", 10, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(50)
  })

  test("Aged Brie should never be created with a negative value", () => {
    const gildedRose = new Shop([new Item("Aged Brie", 0, -10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBeFalsy();
  })
})

describe("Sulfuras, Hand of Ragnaros", () => {
  test("Sulfuras, Hand of Ragnaros quality should never change", () => {
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 0, 80)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(80);
  })

  test("Sulfuras, Hand of Ragnaros cannot be created with a quality besides eighty and below fifty", () => {
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 0, 30)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBeFalsy();
  })

  test("Sulfuras, Hand of Ragnaros cannot be created with a quality besides eighty and above fifty", () => {
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 0, 65)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBeFalsy();
  })

  test("Sulfuras, Hand of Ragnaros sellIn days do not decrease", () => {
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 10, 80)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(10);
  })
})

describe("Backstage passes to a TAFKAL80ETC concert", () => {
  test("Backstage passes quality should increase by one as sellIn value decreases but is greater than ten", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20)]);
    const passQualityBeforeUpdate = gildedRose.items[0].quality;
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(passQualityBeforeUpdate + 1);
  })

  test("Backstage passes quality should increase by two when sellIn value is equal to ten", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 10, 20)]);
    const passQualityBeforeUpdate = gildedRose.items[0].quality;
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(passQualityBeforeUpdate + 2);
  })

  test("Backstage passes quality should increase by two when sellIn value is equal to or less than ten but greater than five", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 6, 26)]);
    const passQualityBeforeUpdate = gildedRose.items[0].quality;
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(passQualityBeforeUpdate + 2);
  })

  test("Backstage passes quality should increase by three when sellIn value is equal to five", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 5, 20)]);
    const passQualityBeforeUpdate = gildedRose.items[0].quality;
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(passQualityBeforeUpdate + 3);
  })

  test("Backstage passes quality should increase by three when sellIn value is equal to or less than five but greater than 0", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 1, 30)]);
    const passQualityBeforeUpdate = gildedRose.items[0].quality;
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(passQualityBeforeUpdate + 3);
  })

  test("Backstage passes quality should be zero when sellIn equals zero", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 0, 30)]);
    const passQualityBeforeUpdate = gildedRose.items[0].quality;
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  })
})

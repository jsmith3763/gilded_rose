// All items have a SellIn value which denotes the number of days we have to sell the item
// All items have a Quality value which denotes how valuable the item is
// At the end of each day our system lowers both values for every item
// Pretty simple, right? Well this is where it gets interesting:

// Once the sell by date has passed, Quality degrades twice as fast
// The Quality of an item is never negative
// “Aged Brie” actually increases in Quality the older it gets
// The Quality of an item is never more than 50
// “Sulfuras”, being a legendary item, never has to be sold or decreases in Quality
// “Backstage passes”, like aged brie, increases in Quality as its SellIn value approaches;
// Quality increases by 2 when there are 10 days or less and by 3 when there are 5 days or less but
// Quality drops to 0 after the concert


class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }

  checkIfItemIsValid() {
    if (this.name === "Sulfuras, Hand of Ragnaros" && this.quality === 80) {
      return true;
    } else if (this.quality > 50 || this.quality < 0 || this.name === "Sulfuras, Hand of Ragnaros" && this.quality != 80) {
      return false;
    }
    return true;
  }

  updateRegularItem() {
    if (this.sellIn > 0 || this.quality === 1) {
      this.quality = this.quality - 1;
    } else if (this.quality != 0) {
      this.quality = this.quality - 2;
    }
    this.sellIn = this.sellIn - 1;
  }

  updateAgedBrie() {
    if (this.quality < 50) {
      this.quality++
    }
  }

  updateBackstagePasses() {
    if (this.sellIn <= 0) {
      this.quality = 0;
      return
    } else {
      this.quality = this.quality + 1;
    }

    if (this.sellIn < 11) {
      this.quality = this.quality + 1;
    }
    if (this.sellIn < 6) {
      this.quality = this.quality + 1;
    }

  }
}

class Shop {
  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    const backStagePass = "Backstage passes to a TAFKAL80ETC concert";
    const sulfuras = "Sulfuras, Hand of Ragnaros";
    const agedBrie = "Aged Brie";



    for (let currentIndex = 0; currentIndex < this.items.length; currentIndex++) {
      let currentItem = this.items[currentIndex]
      let currentItemName = this.items[currentIndex].name;

      if (!currentItem.checkIfItemIsValid()) {
        currentItem.quality = false;
        break;
      }

      if (currentItemName != agedBrie && currentItemName != sulfuras && currentItemName != backStagePass) {
        currentItem.updateRegularItem();
      } else if (currentItemName === agedBrie) {
        currentItem.updateAgedBrie();
      } else if (currentItemName === backStagePass) {
        currentItem.updateBackstagePasses();
      }

    }
    return this.items;
  }

}

module.exports = {
  Item,
  Shop
}

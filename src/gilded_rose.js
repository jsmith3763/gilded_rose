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
    if (name === "Sulfuras, Hand of Ragnaros" && quality === 80) {
      this.name = name;
      this.sellIn = sellIn;
      this.quality = quality;
    } else if (quality > 50 || quality < 0 || name === "Sulfuras, Hand of Ragnaros" && quality != 80) {
      return false;
    } else {
      this.name = name;
      this.sellIn = sellIn;
      this.quality = quality;
    }


  }
}

class Shop {
  constructor(items = []) {
    this.items = items;
  }
  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].name != 'Aged Brie' && this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
        if (this.items[i].quality > 0) {
          if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
            this.items[i].quality = this.items[i].quality - 1;
          }
        }
      } else {
        if (this.items[i].quality < 50) {
          this.items[i].quality = this.items[i].quality + 1;
          if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
            if (this.items[i].sellIn < 11) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1;
              }
            }
            if (this.items[i].sellIn < 6) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1;
              }
            }
          }
        }
      }
      if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }
      if (this.items[i].sellIn < 0) {
        if (this.items[i].name != 'Aged Brie') {
          if (this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
            if (this.items[i].quality > 0) {
              if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
                this.items[i].quality = this.items[i].quality - 1;
              }
            }
          } else {
            this.items[i].quality = this.items[i].quality - this.items[i].quality;
          }
        } else {
          if (this.items[i].quality < 50) {
            this.items[i].quality = this.items[i].quality + 1;
          }
        }
      }
    }

    return this.items;
  }
}

module.exports = {
  Item,
  Shop
}

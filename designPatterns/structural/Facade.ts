// Facade for an order-placing system
class InventoryService {
  productInStore() {
    console.log('Product is available');
    return true;
  }
}
class DiscountsService {
  isEligibleForDiscount() {
    console.log('Product is eligible for discount');
    return true;
  }
  getDiscount() {
    return 5;
  }
  applyDiscount(amount: number) {
    console.log(amount + '% discount applied successfully');
  }
}
class OrderingService {
  placeOrder() {
    console.log('Order placed successfully');
  }
}

class PlaceOrderFacade {
  private inventoryService: InventoryService = new InventoryService();
  private discountsService: DiscountsService = new DiscountsService();
  private orderingService: OrderingService = new OrderingService();

  placeOrder() {
    if (this.inventoryService.productInStore()) {
      if (this.discountsService.isEligibleForDiscount()) {
        const amount = this.discountsService.getDiscount();
        this.discountsService.applyDiscount(amount);
        this.orderingService.placeOrder();
      } else {
        this.orderingService.placeOrder();
      }
    } else {
      console.log('Product is not available');
    }
  }
}

const store = new PlaceOrderFacade();

store.placeOrder();

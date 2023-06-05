import { Component, h } from "@stencil/core";

@Component({
  tag: "uc-stock-price",
  styleUrl: "./stock-price.css",
  shadow: true,
})
export class StockPrice {
  onFetchStockPrice(e: Event) {
    e.preventDefault();
  }
  render() {
    return [
      <form onSubmit={this.onFetchStockPrice.bind(this)}>
        <input id="stock-symbol"> </input>
        <button type="submit">Fetch</button>
      </form>,
      <div>
        <p>Price: {0}</p>
      </div>,
    ];
  }
}

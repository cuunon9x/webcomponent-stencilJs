import { Component, State, Element, h, Prop } from "@stencil/core";
import { API_KEY } from "../../global/global";
@Component({
  tag: "uc-stock-price",
  styleUrl: "./stock-price.css",
  shadow: true,
})
export class StockPrice {
  stockInput: HTMLInputElement;
  @Element() el: HTMLElement;
  @State() fetchedPrice: number;
  @State() stockSymbolValue: string;
  @State() isStockInputValid = false;
  @State() error: string;

  @Prop() stockSymbol: string;

  onStockValueChange(event: Event) {
    this.stockSymbolValue = (event.target as HTMLInputElement).value;
    if (this.stockSymbolValue.trim() !== "") {
      this.isStockInputValid = true;
    } else {
      this.isStockInputValid = false;
    }
  }
  onFetchStockPrice(e: Event) {
    e.preventDefault();
    // const stockSymbol = (
    //   this.el.shadowRoot.querySelector("#stock-symbol") as HTMLInputElement
    // ).value;
    const stockSymbol = this.stockInput.value;
    this.fetchStockPrice(stockSymbol);
  }
  componentWillLoad() {
    console.log("will load");
  }
  componentDidLoad() {
    console.log("did load");

    if (this.stockSymbol) {
      this.fetchStockPrice(this.stockSymbol);
    }
  }
  componentWillUpdate() {
    console.log("will update");
  }
  componentDidUpdate() {
    console.log("did update");
  }
  disconnectedCallback() {
    console.log("disconnectedCallback");
  }
  fetchStockPrice(stockSymbol: string) {
    fetch(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=MSFT&apikey=demo`
      // `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${API_KEY}`
    )
      .then((result) => {
        if (!result.ok) {
          throw new Error("Invalid!");
        }
        return result.json();
      })
      .then((parsedRes) => {
        if (!parsedRes["Global Quote"]) {
          this.error = "Invalid Stock Symbol!";
          throw new Error("Invalid Stock Symbol!");
        }
        this.error = "";
        this.fetchedPrice = +parsedRes["Global Quote"]["05. price"];
      })
      .catch((err) => {
        this.error = err.message;
      });
  }
  render() {
    return [
      <form onSubmit={this.onFetchStockPrice.bind(this)}>
        <input
          id="stock-symbol"
          ref={(el) => (this.stockInput = el)}
          value={this.stockSymbolValue}
          onInput={this.onStockValueChange.bind(this)}
        ></input>
        <button type="submit" disabled={!this.isStockInputValid}>
          Fetch
        </button>
      </form>,
      <div>
        <p>Price: ${this.fetchedPrice}</p>
      </div>,
      this.error && <p>{this.error}</p>,
    ];
  }
}

import {
  Component,
  State,
  Element,
  h,
  Prop,
  Listen,
  Watch,
} from "@stencil/core";
import { API_KEY } from "../../global/global";
@Component({
  tag: "uc-stock-price",
  styleUrl: "./stock-price.css",
  shadow: true,
})
export class StockPrice {
  stockInput: HTMLInputElement;
  // initialStockSymbol: string;
  @Element() el: HTMLElement;
  @State() fetchedPrice: number;
  @State() stockSymbolValue: string;
  @State() isStockInputValid = false;
  @State() error: string;
  @State() loading = false;
  @Prop() stockSymbol: string;
  @Watch("stockSymbol")
  stockSymbolChanged(newValue: string, oldValue: string) {
    if (newValue !== oldValue) {
      this.stockSymbolValue = newValue;
      this.isStockInputValid = true;
      // this.fetchStockPrice(newValue);
    }
  }
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
      // this.initialStockSymbol = this.stockSymbol;
      this.stockSymbolValue = this.stockSymbol;
      this.isStockInputValid = true;
      this.fetchStockPrice(this.stockSymbol);
    }
  }
  componentWillUpdate() {
    console.log("will update");
  }
  componentDidUpdate() {
    console.log("did update");
    // this.fetchStockPrice(this.stockInput.value);
  }
  disconnectedCallback() {
    console.log("disconnectedCallback");
  }
  @Listen("ucSymbolSelected", { target: "body" })
  onStockSymbolSelected(event: CustomEvent) {
    console.log("Stock symbol selected" + event.detail);
    if (event?.detail !== this.stockSymbol) {
      this.stockSymbol = event.detail;
      this.fetchStockPrice(event.detail);
    }
  }
  fetchStockPrice(stockSymbol: string) {
    this.loading = true;
    fetch(
      // `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=MSFT&apikey=demo`
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${API_KEY}`
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
        this.loading = false;
      })
      .catch((err) => {
        this.error = err.message;
        this.loading = false;
      });
  }
  hostData() {
    return { class: this.error ? "error" : "" };
  }
  render() {
    let dataContent = <p>Please enter a symbol!</p>;
    if (this.error) {
      dataContent = <p>{this.error}</p>;
    }
    if (this.fetchedPrice) {
      dataContent = <p>Price: ${this.fetchedPrice}</p>;
    }
    if (this.loading) {
      dataContent = <uc-spinner-loading></uc-spinner-loading>;
    }
    return [
      <form onSubmit={(e) => this.onFetchStockPrice(e)}>
        <input
          id="stock-symbol"
          ref={(el) => (this.stockInput = el)}
          value={this.stockSymbolValue}
          onInput={this.onStockValueChange.bind(this)}
        ></input>
        <button
          type="submit"
          disabled={!this.isStockInputValid || this.loading}
        >
          Fetch
        </button>
      </form>,
      <div>{dataContent}</div>,
    ];
  }
}

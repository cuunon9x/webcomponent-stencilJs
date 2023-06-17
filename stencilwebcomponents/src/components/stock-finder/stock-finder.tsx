import { Component, State, h, Event, EventEmitter } from "@stencil/core";
import { API_KEY } from "../../global/global";

@Component({
  tag: "uc-stock-finder",
  styleUrl: "./stock-finder.css",
  shadow: true,
})
export class StockFinder {
  stockNameInput: HTMLInputElement;
  @State() searchResults: { name: string; symbol: string }[] = [];
  @State() loading: boolean = false;
  @Event({ bubbles: true, composed: true })
  ucSymbolSelected: EventEmitter<string>;

  onFindStock(event: Event) {
    event.preventDefault();
    const stockName = this.stockNameInput.value;
    this.onFetch(stockName);
  }
  onSelectSymbol(symbol: string) {
    this.ucSymbolSelected.emit(symbol);
  }
  // @Listen('ucSymbolSelected', { target: 'body' })
  onFetch(stockSymbol: string) {
    // event.preventDefault();
    this.loading = true;
    fetch(
      //   "https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=tencent&apikey=demo"
      `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${stockSymbol}&apikey=${API_KEY}`
    )
      .then((res) => {
        return res.json();
      })
      .then((parsedResponse) => {
        this.searchResults = parsedResponse["bestMatches"].map((matches) => {
          return { name: matches["2. name"], symbol: matches["1. symbol"] };
        });
        this.loading = false;
      })
      .catch((err) => {
        // this.error = err.message;
        console.log(err);
        this.loading = false;
      });
  }
  render() {
    let content = (
      <ul>
        {this.searchResults.map((result) => (
          <li onClick={this.onSelectSymbol.bind(this, result.symbol)}>
            <strong>{result.symbol}</strong> = {result.name}
          </li>
        ))}
      </ul>
    );
    if (this.loading) {
      content = <uc-spinner-loading></uc-spinner-loading>;
    }
    return [
      <form onSubmit={this.onFindStock.bind(this)}>
        <input
          id="stock-symbol-find"
          ref={(el) => {
            this.stockNameInput = el;
          }}
        ></input>
        <button type="submit">Find</button>
      </form>,
      content,
    ];
  }
}

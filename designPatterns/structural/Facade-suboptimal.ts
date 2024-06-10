interface Parser {
  parse(): void;
}

class GoogleParser implements Parser {
  parse(): void { console.log('Parsing Google Searsch results') }
}
class BingParser implements Parser {
  parse(): void { console.log('Parsing Bing Searches results') }
}
class YahooParser implements Parser {
  parse(): void { console.log('Parsing Yahoo Searches results') }
}


class SearchEngineParserFacade {
    private googleParser: GoogleParser;
    private bingParser: BingParser;
    private yahooParser: YahooParser;

    constructor() {
        this.googleParser = new GoogleParser();
        this.bingParser = new BingParser();
        this.yahooParser = new YahooParser();
    }

    public parseAllResults(): void {
        this.googleParser.parse();
        this.bingParser.parse();
        this.yahooParser.parse();
    }
}

// Example usage
const searchFacade = new SearchEngineParserFacade();
searchFacade.parseAllResults();
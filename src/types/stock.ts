export interface Stock {
    description: string;
    symbol: string;
}

export interface StockNews {
    datetime: number;
    headline: string;
    id: number;
    image: string;
    source: string;
    summary: string;
    url: string;
}

export type StockFinancials = {[key:string]: number}

export interface CompanyProfile {
    country: string;
    finnhubIndustry: string;
    logo: string;
    name: string;
    ticker: string;
    weburl: string;
}

export interface Company {
    priceHistory: number[];
    news: StockNews[];
    financials:StockFinancials;
    companyProfile: CompanyProfile
}
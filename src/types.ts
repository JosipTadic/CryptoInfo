import { Dispatch, SetStateAction } from "react";

export interface IlabelProps {
  labelProp: string;
}

export interface IcheckBoxProps {
  labelText: string;
  name: string;
  isChecked: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface IcheckBoxGroupProps {
  showTwoCharts: boolean;
  showLocalHigh: boolean;
  showLocalLow: boolean;
  handleIsTwoCharts: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleShowLocalHigh: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleShowLocalLow: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface IchartProps {
  historicalData: IhistoricalData;
  showLocalHigh: boolean;
  showLocalLow: boolean;
  getFormattedDate(date: Date): string
}

export interface IlineChartPrice extends IchartProps {
  priceLocalHigh: number;
  priceLocalLow: number;
}

export interface IareaChartVolume extends IchartProps {
  volumeLocalHigh: number;
  volumeLocalLow: number;
}

export interface IcomboChart extends IlineChartPrice, IareaChartVolume {}

interface Iinterval {
  interval: string;
  setPeriodInterval?: (value: React.SetStateAction<IntervalType>) => void;
  getInterval?: (interval: number) => void;
}

export interface IdateFromButton extends Iinterval {
  buttonText: string;
  amountOfDays: string;
}

export interface IdateFromButtonGroup extends Iinterval {
  fromInterval: string;
}

export interface IintervalButton extends Iinterval {
  buttonText: string;
  amountOfDays: string;
}

export interface IintervalButtonGroup extends Iinterval {
  fromInterval: number;
}

export interface IitemPageHeader {
  itemPageTitle: string | undefined;
}

export interface ItableBodyProps {
  value: string;
  setValue?: Dispatch<SetStateAction<string>>;
  skipPage: number[];
}

export interface ItableFooterProps {
  skipPage: number[];
  setSkipPage?: Dispatch<SetStateAction<Array<number>>>;
}

export type IntervalType = "1h" | "1d" | "7d" | "30d" | "90d" | "365d";

export interface IhistoricalData {
  timestamp: Date | string;
  price: number;
  volume_24h: number;
  market_cap: number;
}

export interface IhistoricalData extends Array<IhistoricalData> {}

export interface IcoinInfoDataBoolean {
  is_new: boolean | undefined;
  is_active: boolean | undefined;
  open_source: boolean | undefined;
  hardware_wallet: boolean | undefined;
}
export interface IcoinInfoDataString {
  type?: string;
  contract?: string;
  platform?: string;
  development_status?: string;
  proof_type?: string;
  org_structure?: string;
}
export interface IcoinInfo extends IcoinInfoDataBoolean, IcoinInfoDataString {
  id: string;
  name: string;
  symbol: string;
  description: string;
  first_data_at: string;
}
export interface Idata {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: Date;
  last_updated: Date;
  quotes: Iqoutes;
}
export interface Iqoutes {
  USD: IUSD;
}
export interface IUSD {
  price: number;
  volume_24h: number;
  volume_24h_change_24h: number;
  market_cap: number;
  market_cap_change_24h: number;
  percent_change_15m: number;
  percent_change_30m: number;
  percent_change_1h: number;
  percent_change_6h: number;
  percent_change_12h: number;
  percent_change_24h: number;
  percent_change_7d: number;
  percent_change_30d: number;
  percent_change_1y: number;
  ath_price: number;
  ath_date: Date;
  percent_from_price_ath: number;
}

export interface ApiResponse {
  ID: number;
  IsVip: boolean;
  BusType: string;
  Price: number;
  MidwayCity: string;
  MidwayCityCode: string;
  MidwayEnglishName: string;
  CompanyCode: string;
  OriginTerminalName: string;
  OriginTerminalPersianName: string;
  OriginTerminalCode: string;
  DestinationTerminalPersianName: string;
  DestinationTerminalName: string;
  DestinationTerminalCode: string;
  CompanyName: string;
  CompanyPersianName: string;
  DepartureTime: string;
  DepartureDate: string;
  Description: string;
  BriefDescription?: any;
  DestinationCode: string;
  AvailableSeatCount: number;
  DiscountPercentage: number;
  CompanyLogo: string;
  CompanyId: number;
  CompanyUrl: string;
  OriginTerminalUrl: string;
  DestinationTerminalUrl: string;
  Status: number;
}

export interface Item {
  Date: string;
  OriginPersianName: string;
  OriginEnglishName: string;
  OriginCode: string;
  DestinationPersianName: string;
  DestinationEnglishName: string;
  DestinationCode: string;
  Today: string;
  Logo: string;
  Items: Item[];
}

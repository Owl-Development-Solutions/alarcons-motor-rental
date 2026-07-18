export interface Country {
  name: string;
  flag: string;
  alpha2Code: string;
  alpha3Code: string;
  region: string;
  capital: string;
  flags: {
    png: string;
    svg: string;
  };
}

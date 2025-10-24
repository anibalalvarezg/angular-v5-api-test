export interface Beer {
  sku: string;
  name: string;
  brewery: string;
  abv: string;
  ibu: string;
  country: string;
}

export interface BeerApiData {
  sku: string;
  name: string;
  brewery: string;
  rating: string;
  category: string;
  sub_category_1: string;
  sub_category_2: string;
  sub_category_3: string;
  description: string;
  region: string;
  country: string;
  abv: string;
  ibu: string;
  calories_per_serving_12oz: string;
  carbs_per_serving_12oz: string;
  tasting_notes: string;
  food_pairing: string;
  suggested_glassware: string;
  serving_temp_f: string;
  serving_temp_c: string;
  beer_type: string;
  features: string;
}

export interface BeerApiResponse {
  code: number;
  error: boolean;
  data: BeerApiData[];
}

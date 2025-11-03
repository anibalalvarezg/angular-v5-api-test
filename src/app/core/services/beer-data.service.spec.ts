import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { BeerDataService } from './beer-data.service';
import { Beer, BeerApiResponse } from '../models/beer.model';
import { environment } from '../../../environments/environment';

fdescribe('BeerDataService', () => {
  let service: BeerDataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BeerDataService],
    });

    service = TestBed.get(BeerDataService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getBeers', () => {
    it('should get beers successfully from the API', done => {
      const mockApiResponse: BeerApiResponse = {
        code: 200,
        error: false,
        data: [
          {
            sku: '123',
            name: 'IPA Test',
            brewery: 'Test Brewery',
            abv: '5.5',
            ibu: '40',
            country: 'USA',
            rating: '4.5',
            category: 'IPA',
            sub_category_1: '',
            sub_category_2: '',
            sub_category_3: '',
            description: 'Test beer',
            region: 'West Coast',
            calories_per_serving_12oz: '200',
            carbs_per_serving_12oz: '15',
            tasting_notes: 'Hoppy',
            food_pairing: 'Burgers',
            suggested_glassware: 'Pint',
            serving_temp_f: '45',
            serving_temp_c: '7',
            beer_type: 'Ale',
            features: '',
          },
          {
            sku: '456',
            name: 'Stout Test',
            brewery: 'Stout Brewery',
            abv: '6.0',
            ibu: '50',
            country: 'Ireland',
            rating: '4.8',
            category: 'Stout',
            sub_category_1: '',
            sub_category_2: '',
            sub_category_3: '',
            description: 'Dark beer',
            region: 'Dublin',
            calories_per_serving_12oz: '220',
            carbs_per_serving_12oz: '18',
            tasting_notes: 'Roasted',
            food_pairing: 'Oysters',
            suggested_glassware: 'Tulip',
            serving_temp_f: '50',
            serving_temp_c: '10',
            beer_type: 'Stout',
            features: '',
          },
        ],
      };

      const expectedBeers: Beer[] = [
        {
          sku: '123',
          name: 'IPA Test',
          brewery: 'Test Brewery',
          abv: '5.5',
          ibu: '40',
          country: 'USA',
        },
        {
          sku: '456',
          name: 'Stout Test',
          brewery: 'Stout Brewery',
          abv: '6.0',
          ibu: '50',
          country: 'Ireland',
        },
      ];

      service.getBeers().subscribe(beers => {
        expect(beers).toEqual(expectedBeers);
        expect(beers.length).toBe(2);
        expect(beers[0].sku).toBe('123');
        expect(beers[1].name).toBe('Stout Test');
        done();
      });

      const req = httpMock.expectOne(environment.api.url);
      expect(req.request.method).toBe('GET');
      expect(req.request.headers.has('x-rapidapi-host')).toBe(true);
      expect(req.request.headers.has('x-rapidapi-key')).toBe(true);
      expect(req.request.headers.get('x-rapidapi-host')).toBe(
        environment.api.host
      );
      expect(req.request.headers.get('x-rapidapi-key')).toBe(
        environment.api.key
      );

      req.flush(mockApiResponse);
    });

    it('should use mock data when API fails', done => {
      const mockLocalResponse = {
        code: 200,
        error: false,
        data: [
          {
            sku: 'MOCK-001',
            name: 'Mock IPA',
            brewery: 'Mock Brewery',
            abv: '5.0',
            ibu: '35',
            country: 'Mock Country',
            rating: '4.0',
            category: 'IPA',
            sub_category_1: '',
            sub_category_2: '',
            sub_category_3: '',
            description: 'Mock beer',
            region: 'Mock Region',
            calories_per_serving_12oz: '200',
            carbs_per_serving_12oz: '15',
            tasting_notes: 'Mock notes',
            food_pairing: 'Mock food',
            suggested_glassware: 'Mock glass',
            serving_temp_f: '45',
            serving_temp_c: '7',
            beer_type: 'Ale',
            features: '',
          },
        ],
      };

      const expectedBeers: Beer[] = [
        {
          sku: 'MOCK-001',
          name: 'Mock IPA',
          brewery: 'Mock Brewery',
          abv: '5.0',
          ibu: '35',
          country: 'Mock Country',
        },
      ];

      service.getBeers().subscribe(beers => {
        expect(beers).toEqual(expectedBeers);
        expect(beers.length).toBe(1);
        expect(beers[0].sku).toBe('MOCK-001');
        done();
      });

      const apiReq = httpMock.expectOne(environment.api.url);
      apiReq.error(new ErrorEvent('Network error'));

      const mockReq = httpMock.expectOne('assets/mock-api.json');
      expect(mockReq.request.method).toBe('GET');
      mockReq.flush(mockLocalResponse);
    });

    it('should correctly map API data to Beer model', done => {
      const mockApiResponse: BeerApiResponse = {
        code: 200,
        error: false,
        data: [
          {
            sku: 'SKU-TEST',
            name: 'Cerveza de Prueba',
            brewery: 'Cervecería Test',
            abv: '7.5',
            ibu: '60',
            country: 'España',
            rating: '5.0',
            category: 'IPA',
            sub_category_1: 'American IPA',
            sub_category_2: 'West Coast',
            sub_category_3: '',
            description: 'Una cerveza excelente',
            region: 'Cataluña',
            calories_per_serving_12oz: '250',
            carbs_per_serving_12oz: '20',
            tasting_notes: 'Notas cítricas',
            food_pairing: 'Carnes asadas',
            suggested_glassware: 'Copa tulipa',
            serving_temp_f: '48',
            serving_temp_c: '9',
            beer_type: 'Ale',
            features: 'Artesanal',
          },
        ],
      };

      service.getBeers().subscribe(beers => {
        const beer = beers[0];
        expect(beer.sku).toBe('SKU-TEST');
        expect(beer.name).toBe('Cerveza de Prueba');
        expect(beer.brewery).toBe('Cervecería Test');
        expect(beer.abv).toBe('7.5');
        expect(beer.ibu).toBe('60');
        expect(beer.country).toBe('España');

        expect((beer as any).rating).toBeUndefined();
        expect((beer as any).category).toBeUndefined();
        expect((beer as any).description).toBeUndefined();
        done();
      });

      const req = httpMock.expectOne(environment.api.url);
      req.flush(mockApiResponse);
    });

    it('should return an empty array when API returns empty data', done => {
      const mockApiResponse: BeerApiResponse = {
        code: 200,
        error: false,
        data: [],
      };

      service.getBeers().subscribe(beers => {
        expect(beers).toEqual([]);
        expect(beers.length).toBe(0);
        done();
      });

      const req = httpMock.expectOne(environment.api.url);
      req.flush(mockApiResponse);
    });

    it('should handle multiple beers with complete data', done => {
      const mockApiResponse: BeerApiResponse = {
        code: 200,
        error: false,
        data: [
          {
            sku: '001',
            name: 'Beer 1',
            brewery: 'Brewery 1',
            abv: '4.0',
            ibu: '20',
            country: 'Country 1',
            rating: '3.5',
            category: 'Lager',
            sub_category_1: '',
            sub_category_2: '',
            sub_category_3: '',
            description: '',
            region: '',
            calories_per_serving_12oz: '',
            carbs_per_serving_12oz: '',
            tasting_notes: '',
            food_pairing: '',
            suggested_glassware: '',
            serving_temp_f: '',
            serving_temp_c: '',
            beer_type: '',
            features: '',
          },
          {
            sku: '002',
            name: 'Beer 2',
            brewery: 'Brewery 2',
            abv: '5.0',
            ibu: '30',
            country: 'Country 2',
            rating: '4.0',
            category: 'Ale',
            sub_category_1: '',
            sub_category_2: '',
            sub_category_3: '',
            description: '',
            region: '',
            calories_per_serving_12oz: '',
            carbs_per_serving_12oz: '',
            tasting_notes: '',
            food_pairing: '',
            suggested_glassware: '',
            serving_temp_f: '',
            serving_temp_c: '',
            beer_type: '',
            features: '',
          },
          {
            sku: '003',
            name: 'Beer 3',
            brewery: 'Brewery 3',
            abv: '6.0',
            ibu: '40',
            country: 'Country 3',
            rating: '4.5',
            category: 'IPA',
            sub_category_1: '',
            sub_category_2: '',
            sub_category_3: '',
            description: '',
            region: '',
            calories_per_serving_12oz: '',
            carbs_per_serving_12oz: '',
            tasting_notes: '',
            food_pairing: '',
            suggested_glassware: '',
            serving_temp_f: '',
            serving_temp_c: '',
            beer_type: '',
            features: '',
          },
        ],
      };

      service.getBeers().subscribe(beers => {
        expect(beers.length).toBe(3);
        expect(beers[0].sku).toBe('001');
        expect(beers[1].sku).toBe('002');
        expect(beers[2].sku).toBe('003');
        done();
      });

      const req = httpMock.expectOne(environment.api.url);
      req.flush(mockApiResponse);
    });
  });
});

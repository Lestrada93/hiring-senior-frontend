import fetchMock from 'jest-fetch-mock';
import ApiConnection from './ApiConnection';
import mockData from '../../../test/mocks/helperData.json';

fetchMock.enableMocks();

const api = new ApiConnection();

describe('ApiConnection class', () => {
  describe('getCurrencies', () => {
    beforeEach(() => {
      fetch.resetMocks();
    });

    test('Should return an object with the values of the rates after a api call', async () => {
      fetch.mockResponseOnce(JSON.stringify(mockData.apiResult));

      const response = await api.getCurrencies();
      expect(response).toEqual(mockData.apiResult.rates);
    });
  });
});

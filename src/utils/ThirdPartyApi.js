class ThirdPartyApi {
  constructor({ urlBase, api_key }) {
      this._urlBase = urlBase;
      this._api_key = api_key;
      this._date = new Date();
      this._currentDate = `${this._date.getFullYear()}-${this._date.getMonth() + 1}-${this._date.getDate()}`;
      let date2 = new Date(this._date);
      date2.setDate(date2.getDate() - 7);
      this._sevenDaysAgo = `${date2.getFullYear()}-${date2.getMonth() + 1}-${date2.getDate()}`;
  }

  getCards(topic) {
      return fetch(
          `${this._urlBase}?q=${topic}&from=${this._sevenDaysAgo}&to=${this._currentDate}&sortBy=popularity&pageSize=100&apiKey=${this._api_key}`,
          {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
                  Accept: 'application/json',
              },
          }
      );
  }
}

const api = new ThirdPartyApi({
  urlBase: 'https://nomoreparties.co/news/v2/everything',
  api_key: 'b8212ab5f8bc40d1ab30fc6f8ac7138c', 
});

export default api;

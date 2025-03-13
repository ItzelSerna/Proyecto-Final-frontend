class ThirdPartyApi {
  constructor({ urlBase, api_key }) {
      this._urlBase = urlBase;
      this._api_key = api_key;
      this._date = new Date();

      // Formato de fecha actual
      this._currentDate = `${this._date.getFullYear()}-${this._date.getMonth() + 1}-${this._date.getDate()}`;

      // Formato de fecha hace 7 días
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
  api_key: 'b8212ab5f8bc40d1ab30fc6f8ac7138c', // Reemplaza con tu API Key
});

export default api;

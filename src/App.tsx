import React, {useState, useEffect} from 'react';
import './App.css';

type CurrencyRate = {
  base_ccy: string;
  ccy: string;
  buy: string;
  sale: string;
};

function App() {
  const [currencies, setCurrencies] = useState([] as CurrencyRate[]);

  useEffect(() => {
    async function fetchAPI() {
      // This URL is wrong. It's not public and raises error:
      //   Access to fetch at 'https://api.privatbank.ua/p24api/exchange_rates?json&date=15.09.2021' from origin 'http://localhost:3000'
      //   has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
      // const uri = "https://api.privatbank.ua/p24api/exchange_rates?json&date=15.09.2021"

      const uri =
        "https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5";
      const response = await fetch(uri);
      const data = await response.json();
      setCurrencies(data);
    }
    fetchAPI();
  }, [currencies]);
 
  const today = new Date();
  const todayStr = today.getDate() + '-' + (today.getMonth()+1) + '-'+today.getFullYear();

  return (
    <div className="App">
     <h1>Курс валют для UAH на {todayStr}</h1>
     <table id="currencies">
       <thead>
         <tr>
           <th>Код валюты</th>
           <th>Курс продажи</th>
           <th>Курс покупки</th>
         </tr>
       </thead>
       <tbody>
         {currencies.map(item => 
           <tr>
             <td>{item.ccy}</td>
             <td>{item.sale}</td>
             <td>{item.buy}</td>
         </tr>
         )}
       </tbody>
     </table>
     </div>
  );
}

export default App;

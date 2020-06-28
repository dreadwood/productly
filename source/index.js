import Header from './js/header';
import Strategies from './js/strategies';
import { data } from './js/data';

window.onload = () => {  
  const headerElement = document.querySelector(`.header`);
  new Header(headerElement);

  const strategiesElement = document.querySelector(`.strategies`);
  const strategiesComponent = new Strategies(strategiesElement);

  if (data) {
    strategiesComponent.renderCards(data);
  } 
}
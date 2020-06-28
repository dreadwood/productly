import Strategies from './js/strategies';
import { data } from './js/data';

window.onload = () => {  
  const strategiesElement = document.querySelector(`.strategies`);
  const strategiesComponent = new Strategies(strategiesElement);

  if (data) {
    strategiesComponent.renderCards(data);
  } 
}
import React, {MouseEventHandler} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {changeCity} from '../../store/action';
import {cities} from '../../const';

const CitiesList = () => {
  const dispatch = useAppDispatch();

  const currentCity = useAppSelector((state) => state.currentCity);
  const cityClickHandler = (city: string): MouseEventHandler<HTMLElement> => (
    () => {
      dispatch(changeCity(city));
    }
  );

  return (
    <ul className="locations__list tabs__list">
      {cities.map((city) => (
        <li key={city} className="locations__item" onClick={cityClickHandler(city)}>
          <a className={`locations__item-link ${currentCity === city ? 'tabs__item--active' : ''} tabs__item`} href="#">
            <span>{city}</span>
          </a>
        </li>
      ))}
    </ul>
  );
};

export default CitiesList;

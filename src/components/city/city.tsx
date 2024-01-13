import React, {memo} from 'react';

type CityProps = {
  cityClickHandler: (city: string) => void;
  city: string;
  isActive: boolean;
}

const City = ({cityClickHandler, city, isActive}: CityProps) => (
  <li className="locations__item" onClick={() => cityClickHandler(city)}>
    <a className={`locations__item-link ${isActive ? 'tabs__item--active' : ''} tabs__item`} href="#">
      <span>{city}</span>
    </a>
  </li>
);


export default memo(City);

import React, {SetStateAction, useState} from 'react';
import {SortTypes} from '../../const';

type SortingPropsType = {
  currentSortType: string;
  onSortTypeClick: (type:SetStateAction<SortTypes>) => void;
}

const Sorting = ({currentSortType, onSortTypeClick}: SortingPropsType) => {

  const [isOpened, setIsOpened] = useState(false);

  const sortListLabelClickHandler = () => {
    setIsOpened(!isOpened);
  };

  const sortTypeClickHandler = (type: SetStateAction<SortTypes>) => {
    onSortTypeClick(type);
    setIsOpened(!isOpened);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by&nbsp;</span>
      <span className="places__sorting-type" tabIndex={0} onClick={sortListLabelClickHandler}>
        {currentSortType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isOpened ? 'places__options--opened' : ''}`}>
        {Object.values(SortTypes)
          .map((item, index) => (
            <li
              key={item}
              className={`places__option ${currentSortType === item ? 'places__option--active' : ''}`}
              tabIndex={0}
              onClick={() => {sortTypeClickHandler(item);}}
            >
              {item}
            </li>
          ))}
      </ul>
    </form>
  );
};

export default Sorting;

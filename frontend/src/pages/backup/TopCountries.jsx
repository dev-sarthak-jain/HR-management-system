import React from 'react';
import Icon from './Icon';
import Image from './Image';

const Countrydata = [
  { name: 'Amit chauhan', rise: true, id: 1 },
  { name: 'Isha sen', rise: false, id: 2 },
  { name: 'Javed Akhtar', rise: false, id: 3 },
  { name: 'Vishwanathan Anand', rise: true, id: 4 },
    //{ name: 'Sweden', rise: true, value: 9725.0, id: 4 },
];

const TopCountries = () => {
  return (
    <div className="flex p-4 flex-col h-full">
      <div className="flex justify-between items-center">
        <div className="text-white font-bold">Top Performers</div>
        <Icon path="res-react-dash-plus" className="w-5 h-5" />
      </div>
      <div className="">favourites</div>
      {Countrydata.map(({ name, rise, id }) => (
        <div className="flex items-center mt-3" key={id}>
          <div className="">{id}</div>
          <div className="ml-2">{name}</div>
          <div className="flex-grow" />
          <Icon path={rise ? 'res-react-dash-country-up' : 'res-react-dash-country-down'} className="w-4 h-4 mx-3" />
          <Icon path="res-react-dash-options" className="w-2 h-2" />
        </div>
      ))}
      <div className="flex-grow" />
      <div className="flex justify-center">
        <div className="">Check All</div>
      </div>
    </div>
  );
};

export default TopCountries;

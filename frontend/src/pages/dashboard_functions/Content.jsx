import React,{ useState, useEffect } from 'react';
import NameCard from './NameCard';
import Graph from './Graph';
import TopCountries from './TopCountries';
import Segmentation from './Segmentation';
import Satisfaction from './Satisfaction';
import AddComponent from './AddComponent';
import Icon from './Icon';
import IconButton from './IconButton';
import { useSelector } from 'react-redux';
import { getToken } from '../../store/auth/selectors';
import { userInfo } from "../../redux/Selectors/selectors"
import './style.css';

const employeeData = [
  { id: 1, name: 'Tickets raised', position: "Sale's manager USA", transactions: 231, rise: true, message: "43% less tickets raised", tasksCompleted: 3, imgId: 0 },
  { id: 2, name: 'Tickets acknowledged', position: "Sale's manager Europe", transactions: 215, rise: false, message: "50% slower response time", tasksCompleted: 5, imgId: 2 },
  { id: 3, name: 'Tickets closed', position: "Sale's manager Asia", transactions: 150, rise: true, message: "20 percent more tickets closed", tasksCompleted: 2, imgId: 3 },
];

const Content = ({ onSidebarHide }) => {
  let userName;
    const user = useSelector(state => userInfo(state))
   if(user){
     userName = user.first_name + " " + user.last_name;
   }
    const token = useSelector(getToken) || userName || 'Jane Doe';

    const [username, setUsername] = useState(token);

    const changeUserName = username => {
        setUsername(token);
    }

    useEffect(() => {
        changeUserName(token);
    }, [token]);
  return (
    <div className="flex w-full">
      <div className="w-full h-screen hidden sm:block sm:w-20 xl:w-60 flex-shrink-0">.</div>
      <div className=" h-screen flex-grow overflow-x-hidden overflow-auto flex flex-wrap content-start p-2">
        <div className="w-full sm:flex p-2 items-end">
          <div className="sm:flex-grow flex justify-between">
            <div className="">
              <div className="flex items-center">
                <div className="text-3xl font-bold text-white">{username}</div>
                <div className="flex items-center p-2 bg-card ml-2 rounded-xl">
                  <Icon path="res-react-dash-premium-star" />
                  <div className="ml-2 font-bold text-premium-yellow">Authorized HR personnel</div>
                </div>
              </div>
              <div className="flex items-center">
                <Icon path="res-react-dash-date-indicator" className="w-3 h-3" />
                <div className="ml-2">October 26</div>
              </div>
            </div>
            <IconButton icon="res-react-dash-sidebar-open" className="block sm:hidden" onClick={onSidebarHide} />
          </div>
          <div className="w-full sm:w-56 mt-4 sm:mt-0 relative">
            <Icon path="res-react-dash-search" className="w-5 h-5 search-icon left-3 absolute" />
            <form action="#" method="POST">
              <input
                type="text"
                name="company_website"
                id="company_website"
                className="pl-12 py-2 pr-2 block w-full rounded-lg border-gray-300 bg-card"
                placeholder="search"
              />
            </form>
          </div>
        </div>
        {employeeData.map(({ id, name, position, transactions, rise, tasksCompleted, imgId, message }) => (
          <NameCard key={id} id={id} name={name} position={position} transactionAmount={transactions} rise={rise} tasksCompleted={tasksCompleted} imgId={imgId} message={message} />
        ))}
        <div className="w-full p-2 lg:w-2/3">
          <div className="rounded-lg bg-card sm:h-80 h-60">
            <Graph />
          </div>
        </div>
        <div className="w-full p-2 lg:w-1/3">
          <div className="rounded-lg bg-card h-80">
            <TopCountries />
          </div>
        </div>
        <div className="w-full p-2 lg:w-1/3">
          <div className="rounded-lg bg-card h-80">
            <Segmentation />
          </div>
        </div>
        <div className="w-full p-2 lg:w-1/3">
          <div className="rounded-lg bg-card h-80">
            <Satisfaction />
          </div>
        </div>
        <div className="w-full p-2 lg:w-1/3">
          <div className="rounded-lg bg-card overflow-hidden h-80">
            <AddComponent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;

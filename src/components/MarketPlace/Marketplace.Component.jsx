import React, { useEffect,useState } from 'react'
import DoctorListComponent from './DoctorList/DoctorList.Component'
import DoctorsearchComponent from './DoctorSearch/Doctorsearch.Component'
import HighlightedDoctorsComponent from './HighlightedDoctors/HighlightedDoctors.Component'
import './Marketplace.Component.css'
import { appointmentService } from '../../services';
import moment from 'moment'
const MarketplaceComponent = () => {
  const [doctorsList,setDoctorsList] = useState([]);
  const [searchText,setSearchText] =useState("");
  useEffect(()=>{
    getDoctorsList();
  },[searchText])

  
  const getDoctorsList = ()=>{
    const searchParam={
      pageLimit:20,
      pageNo:1,
      sortByColoumn:"name",
      sortOrder:"desc",
      searchKey:"name",
      searchValue:searchText,
      speciality:"[]",
      country:"",
      state:"",
      city:"",
      zipcode:""
    };
    appointmentService.getDoctorsList(searchParam).then(
      res => {
        console.log("Get doctorslist",res);
        if(res.status=== 200){
          let doctors = res?.data?.data?.list;
          const doctorsArray = [];
          doctors.forEach(doc => {
            
            let newObj={
            id: doc._id,
            name: doc.name,
            speciality: doc.speciality,
            location: [doc.country,doc.state,doc.city].filter(n => n).join(','),
            availability: getAvailabilityFromObject(doc.availabilities),
            pic: "",
            action: ''}
            console.log("new",newObj);
            doctorsArray.push(newObj);
          });
          setDoctorsList(doctorsArray);
        }
        
      },error=>{
        console.log("Get doctorslist",error);
      })
  }

  const getAvailabilityFromObject =(availability)=>{
    if(availability.days.length>0){
    let oneDayAvail = availability.days[0];
    let firstHStart = moment(oneDayAvail.first_half_starting_time).format("h:mm a");
    let firstHEnd = moment(oneDayAvail.first_half_ending_time).format("h:mm a");
    let SecondHStart = moment(oneDayAvail.second_half_starting_time).format("h:mm a");
    let SecondHEnd = moment(oneDayAvail.second_half_ending_time).format("h:mm a");
    return firstHStart +" - "+firstHEnd+ ",\n "+SecondHStart+"-"+SecondHEnd;
    

    

    } else {
      return null;
    }

  }

  return (
    <div className="mp__main__div">
      <div className="mp__title__text">Highlighted Doctors</div>
      <DoctorsearchComponent searchText={searchText} setSearchText={setSearchText}/>
      <HighlightedDoctorsComponent />
      <DoctorListComponent doctorsList={doctorsList}/>
    </div>
  )
}

export default MarketplaceComponent

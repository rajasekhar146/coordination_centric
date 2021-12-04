import React, { useEffect, useState } from 'react'
import DoctorListComponent from './DoctorList/DoctorList.Component'
import DoctorsearchComponent from './DoctorSearch/Doctorsearch.Component'
import HighlightedDoctorsComponent from './HighlightedDoctors/HighlightedDoctors.Component'
import './Marketplace.Component.css'
import { appointmentService } from '../../services'
import moment from 'moment'
import get from 'lodash.get';
const MarketplaceComponent = () => {
  const [doctorsList, setDoctorsList] = useState([])
  const [searchText, setSearchText] = useState('')
  const [searchSpecialists, setSearchSpecialists] = useState([])

  const [searchState,setSearchState] =useState("");
  const [searchCity,setSearchCity] =useState("");
  const [searchZipcode,setSearchZipcode] = useState("");

  useEffect(() => {
    getDoctorsList()
    console.log('Fired', searchSpecialists)
  }, [searchText, searchSpecialists,searchState,searchCity,searchZipcode])

  const getDoctorsList = () => {
    const searchParam = {
      pageLimit: 2000,
      pageNo: 1,
      sortByColoumn: 'name',
      sortOrder: 'desc',
      searchKey: 'name',
      searchValue: searchText,
      speciality: JSON.stringify(searchSpecialists),
      country: '',
      state: searchState,
      city: searchCity,
      zipcode: searchZipcode,
    }
    appointmentService.getDoctorsList(searchParam).then(
      res => {
        console.log("Get doctorslist",res);
        if(res.status=== 200){
          let doctors = get(res, ['data', 'data', 'list'], []);
          const doctorsArray = [];
          doctors.forEach(doc => {
            let newObj = {
              _id: doc._id,
              name: doc.name,
              speciality: doc.speciality,
              location: [doc.country, doc.state, doc.city].filter(n => n).join(','),
              availability: getAvailabilityFromObject(doc.availabilities),
              availabilityArray:doc.availabilities?.days,
              pic: doc.profilePic,
              action: '',
            }
            console.log('new', newObj)
            doctorsArray.push(newObj)
          })
          setDoctorsList(doctorsArray)
        }
      },
      error => {
        console.log('Get doctorslist', error)
      }
    )
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
      return null
    }
  }

  return (
    <div className="mp__main__div">
      <div className="mp__title__text">Highlighted Doctors</div>
      
      <HighlightedDoctorsComponent />
      <DoctorsearchComponent
        searchText={searchText}
        setSearchText={setSearchText}
        searchSpecialists={searchSpecialists}
        setSearchSpecialists={setSearchSpecialists}
        searchState= {searchState}
        setSearchState = {setSearchState}
        searchCity ={searchCity}
        setSearchCity = {setSearchCity}
        searchZipcode = {searchZipcode}
        setSearchZipcode = {setSearchZipcode}
      />
      <DoctorListComponent doctorsList={doctorsList} />
    </div>
  )
}

export default MarketplaceComponent

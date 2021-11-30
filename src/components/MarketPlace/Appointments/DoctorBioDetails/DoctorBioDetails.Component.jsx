import React from 'react'
import './DoctorBioDetails.Component.css'
import Button from '@mui/material/Button'
import DoctorDetailsComponent from './DoctorDetails/DoctorDetails.Component'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import history from '../../../../history'

const DoctorBioDetailsComponent = () => {
  return (
    <div className="dbd__main__div">
      <div className="dbd__row">
        <div>
          <Button className="dbd__button" onClick={() => history.push('/marketplace')}>
            <ArrowBackIosNewIcon fontSize="sm" /> &nbsp;&nbsp; Back
          </Button>
        </div>
        <div className="dbd__doctor__name">Dr. Anna Choy</div>
      </div>
      <div className="dbd__row">
        <div className="dbd__doctor__bio__details">
          <DoctorDetailsComponent />
        </div>
        <div className="dbd__bio__details">
          <div className="dbd__doctor__section">
            <div className="dbd__row">
              <div className="dbd__bio__name">Bio</div>
            </div>
            <div className="dbd__row">
              <div className="dbd__bio__section__details">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna urna mauris feugiat sit dolor,
                pellentesque a sed venenatis. Feugiat nibh id cursus tortor. Rhoncus imperdiet aliquam scelerisque morbi
                lacus. Et etiam vitae euismod leo pellentesque vitae dis malesuada. Nibh feugiat diam proin mauris etiam
                a. Dictum ac convallis montes, nulla. Scelerisque metus magna facilisi nulla tortor, vel viverra.
                Volutpat quisque semper neque, mauris, adipiscing rhoncus consectetur mattis. In risus sed lorem
                ultrices ac vitae tincidunt. Praesent eget amet tellus cum massa ac, semper pretium. Sit tempor lectus
                euismod enim ornare quisque. Urna, tristique sem sagittis, maecenas. Facilisis mollis risus condimentum
                faucibus morbi. Turpis sed donec augue dictum duis orci massa. Sollicitudin ultrices sed enim non vel
                enim ultricies.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DoctorBioDetailsComponent

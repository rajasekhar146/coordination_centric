import React from 'react'
import './Dashboard.Component.css'

import EnhancedEncryptionOutlinedIcon from '@mui/icons-material/EnhancedEncryptionOutlined'
import AppointmentsIcon from '../../assets/icons/db_appointments.png'
import NewPatientsIcon from '../../assets/icons/db_new_patients.png'
import OperationsIcon from '../../assets/icons/db_operations.png'
import HospitalEarningsIcon from '../../assets/icons/db_hospital_earnings.png'

const DashboardComponent = () => {
  return (
    <div className="db__main__div">
      <div className="db__row">
        <div className="db__card">
          <div className="db__row">
            <div className="db__card__content">
              <div>
                <img src={AppointmentsIcon} alt="Appointments" />
              </div>
            </div>
            <div>
              <div className="db__label">Appointments</div>
              <div className="db__label__value">212</div>
            </div>
          </div>
        </div>

        <div className="db__card">
          <div className="db__row">
            <div className="db__card__content">
              <div>
                <img src={NewPatientsIcon} alt="New Patients" />
              </div>
            </div>
            <div>
              <div className="db__label">New Patients</div>
              <div className="db__label__value">103</div>
            </div>
          </div>
        </div>

        <div className="db__card">
          <div className="db__row">
            <div className="db__card__content">
              <div>
                <img src={OperationsIcon} alt="Operations" />
              </div>
            </div>
            <div>
              <div className="db__label">Operations</div>
              <div className="db__label__value">45</div>
            </div>
          </div>
        </div>

        <div className="db__card">
          <div className="db__row">
            <div className="db__card__content">
              <div>
                <img src={HospitalEarningsIcon} alt="Hospital Earnings" />
              </div>
            </div>
            <div>
              <div className="db__label">Hospital Earnings</div>
              <div className="db__label__value">$ 2123</div>
            </div>
          </div>
        </div>
      </div>

      <div className="db__row">
        <div className="db__placeholder"></div>
      </div>

      <div className="db__row">
        <div className="db__left__placeholder"></div>
        <div className="db__right__placeholder"></div>
      </div>
    </div>
  )
}

export default DashboardComponent

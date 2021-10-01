import React from 'react'
import './Dashboard.Component.css'

import EnhancedEncryptionOutlinedIcon from '@mui/icons-material/EnhancedEncryptionOutlined';

const DashboardComponent = () => {
    return (
        <div className="db__main__div">
            <div className="db__row">
                <div className="db__card">
                <div className="db__row">
                <div className="db__card__content">
                    <div><EnhancedEncryptionOutlinedIcon /></div>
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
                    <div><EnhancedEncryptionOutlinedIcon /></div>
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
                    <div><EnhancedEncryptionOutlinedIcon /></div>
                    </div>
                    <div>
                    <div className="db__label">Appointments</div>
                    <div className="db__label__value">212</div>
                    </div>
                    </div>
                </div>

                <div className="db__card">
                <div className="db__row">
                    <div className="db__card__content"><div><EnhancedEncryptionOutlinedIcon /></div></div>
                    <div>
                    <div className="db__label">Appointments</div>
                    <div className="db__label__value">212</div>
                    </div>
                    </div>
                </div>
            </div>

            <div className="db__row">
                <div className="db__placeholder">
                </div>
            </div>

            <div className="db__row">
              
                <div className="db__left__placeholder">
                </div>
                <div className="db__right__placeholder">
                </div>
               
            </div>
        </div>
    )
}

export default DashboardComponent

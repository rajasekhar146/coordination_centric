import * as React from 'react';
import './AcceptanceCriteria.Component.css'


const AcceptanceCriteriaComponent = () => {
  return (
    <div className="ac__main__div">
    <div className="ac__title__text">Welcome to Coordination Centric!</div>
        <div className="ac__subtitle__text">For the purpose of registration please fill the required fields of this form to join our platform.
        </div>
        <div>
          <div className="ac__form">
            <div className="ac__header__text">Admin’s Info</div>
            <div>
              <div className="ac__row">
              <div className="ac__column">
              <div className="ac__label">Full Name <span className="ac__required">*</span></div>
                <input type="text" />
              </div>
              
            
              <div className="ac__column">
              <div className="ac__label">Email <span className="ac__required">*</span></div>
                <input type="text" />
              </div>

              <div className="ac__column">
              <div className="ac__label">Phone Number <span className="ac__required">*</span></div>
                <input type="text" />
              </div>
              
              </div>
            </div>

            <div className="ac__gap__div"></div>

            <div className="ac__header__text">Organization’s Info</div>
            <div>
              <div className="ac__row">
              <div className="ac__column">
              <div className="ac__label">Name <span className="ac__required">*</span></div>
                <input type="text" />
              </div>
              
            
              <div className="ac__column">
              <div className="ac__label">Email <span className="ac__required">*</span></div>
                <input type="text" />
              </div>
              
              </div>

              <div className="ac__row">
              <div className="ac__column">
              <div className="ac__label">Phone Number <span className="ac__required">*</span></div>
                <input type="text" />
              </div>
              
            
              <div className="ac__column">
              <div className="ac__label">Fax Number <span className="ac__required">*</span></div>
                <input type="text" />
              </div>
              
              </div>

              <div className="ac__row">
              <div className="ac__column">
              <div className="ac__label">Address <span className="ac__required">*</span></div>
                <input type="text" />
              </div>
              
              </div>
            
            
              <div className="ac__row">
              <div className="ac__column">
              <div className="ac__label">NIP <span className="ac__required">*</span></div>
                <input type="text" />
              </div>
              
            
              <div className="ac__column">
              <div className="ac__label">Tax ID</div>
                <input type="text" />
              </div>

              <div className="ac__column">
              <div className="ac__label">Medical ID</div>
                <input type="text" />
              </div>
              
              </div>
          
              <div className="ac__row">
              <div className="ac__column">
              <div className="ac__label">Website</div>
                <input type="text" />
              </div>
              
            
              <div className="ac__column">
              <div className="ac__label">How did you hear about us?</div>
                <input type="text" />
              </div>
              
              </div>

              </div>

          </div>
        </div>
    
        
    </div>
)
}
export default AcceptanceCriteriaComponent

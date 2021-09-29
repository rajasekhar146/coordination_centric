import React from 'react'

const BankInformationComponent = () => {
    return (
        <div className="ac__main__div">
    <div className="ac__title__text">Banking Information</div>
        <div className="ac__subtitle__text">This is optional at this point, if you don’t want to fill it right know you can skip this step.
        </div>
        <div>
          <div className="ac__form">
            <div className="ac__header__text">Organization Banking Info</div>
            <div>
              <div className="ac__row">
              <div className="ac__column">
              <div className="ac__label">Routing Number <span className="ac__required">*</span></div>
                <input type="text" />
              </div>
              
            
              <div className="ac__column">
              <div className="ac__label">Name Associated with Bank Account <span className="ac__required">*</span></div>
                <input type="text" />
              </div>

              <div className="ac__column">
              <div className="ac__label">Phone Number <span className="ac__required">*</span></div>
                <input type="text" />
              </div>
              
              </div>
            </div>

            <div className="ac__gap__div"></div>
            
          </div>
        </div>
    
        
    </div>

    )
}

export default BankInformationComponent

import React from 'react'
import Box from '@mui/material/Box'
import headerImage from '../../../assets/images/header_image.png'
import SignupCompletedImage from '../../../assets/images/signup_completed.png'
import Button from '@mui/material/Button'
import './CompleteSignUp.Component.css'

export const CompleteSignupComponent = () => {



  return (
    <div className="ob__main__section">
      <div className="ob__align__center">
        <div className="cs__header__section">
          <img src={headerImage} alt="logo" />
        </div>
        <div className="ob__content__section">
          <Box sx={{ width: '100%' }}>
            {
              <div className="ac__main__div">
                <div>
                  <div className="ac__form">
                    <div id="my-node">
                      <div className="ac__row">
                        <div className="cs__align__center">
                          <img src={SignupCompletedImage} alt="Signup Completed" />
                        </div>
                      </div>
                    </div>
                    <div className="ac__row">
                      <div className="ac__column cs__align__center">
                        <div className="cs__signup__completed__text">Signup Completed</div>
                      </div>
                    </div>

                    <div className="ac__row">
                      <div className="ac__column cs__align__center">
                        <div className="cs__centent__text">
                          Congratulations, you finished the registration proccess. Now you’ll have to wait for our team
                          to review and process all the data and approve your account. We will notify you by email as
                          soon as possible.
                        </div>
                      </div>
                    </div>

                    <div className="ac__row">
                      <div className="ac__column cs__align__center">
                        <Button className="ac__next__btn">Done</Button>
                      </div>
                    </div>
                  </div>

                  <div className="ac__gap__bottom__div"></div>
                </div>
              </div>
            }
          </Box>
        </div>
      </div>
    </div>
  )
}

import React, { useState, useEffect } from 'react'
import './Signup.Component.css'
import tickIcon from '../../../assets/icons/tick_icon.png'
import Button from '@mui/material/Button'
import tickPremiumIcon from '../../../assets/icons/tick__premium__icon.png'
import history from '../../../history'
import { useParams } from 'react-router-dom'
import { organizationService } from '../../../services'

const SignupComponent = () => {
  const [selectedPlan, setSelectedPlan] = useState('M')
  const { referredby } = useParams()
  const { invitetoken } = useParams()
  const { invitedBy } = useParams()

  const handleFreePlan = planType => {
    localStorage.setItem('plan_type', planType)
    history.push(`/acceptance-criteria/${invitetoken}/${referredby}/${invitedBy}`)
  }

  useEffect(async () => {
    console.log('referredBy', referredby, 'inviteToken', invitetoken)
    const tokenResponse = await organizationService.validateToken(invitetoken)
    console.log('token >> response', tokenResponse)
    const data = tokenResponse?.data ? tokenResponse.data : tokenResponse.response.data
    console.log('token >> data', data)
    if (data.status_code !== 200) {
      history.push('/error-page')
    }
    // .then(data => {
    //   const response = data.response.data
    //   console.log('tokan data >> ', response.status_code)
    //   if(response.status_code !== 200 ){
    //     history.push('/error-page')
    //   }
    // })
    // .catch(err => {
    //   console.log('tokan data err >> ', err)
    //   history.push('/error-page')
    // })
  }, [])

  return (
    <div className="su__main__div">
      <div className="su__row">
        {' '}
        <div className="su__title">Simple, transparent pricing</div>
      </div>
      <div className="su__row">
        <div className="su__sub__title">Coordination Centric</div>
      </div>
      <div className="su__row">
        {' '}
        <div className="su__signup__plan">
          <div className="su__row ">
            <div className="su__select__plan">
              <Button
                className={selectedPlan == 'M' ? 'su__plan__button__active' : 'su__plan__button'}
                onClick={e => setSelectedPlan('M')}
              >
                MONTHLY
              </Button>
              &nbsp;&nbsp;&nbsp;
              <Button
                className={selectedPlan == 'Y' ? 'su__plan__button__active' : 'su__plan__button'}
                onClick={e => setSelectedPlan('Y')}
              >
                YEARLY
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="su__row">
        <div className="su__plan__section">
          <div className="su__column__free">
            <div className="su__plan__amount">$0</div>
            <div className="su__free__text">Free</div>
            <div className="su__content">Lorem ipsum dolor sit amet, consectetur adipiscing elit ut</div>
            <div className="su__row su__tick__section">
              <div>
                <img src={tickIcon} alt="Tick Icon"></img>
              </div>
              <div class="su__tick__text">Lorem ipsum dolor sit</div>
            </div>
            <div className="su__row su__tick__section">
              <div>
                <img src={tickIcon} alt="Tick Icon"></img>
              </div>
              <div class="su__tick__text">Lorem ipsum dolor sit</div>
            </div>
            <div className="su__row su__tick__section">
              <div>
                <img src={tickIcon} alt="Tick Icon"></img>
              </div>
              <div class="su__tick__text">Lorem ipsum dolor sit</div>
            </div>
            <div className="su__row su__tick__section">
              <div>
                <img src={tickIcon} alt="Tick Icon"></img>
              </div>
              <div class="su__tick__text">Lorem ipsum dolor sit</div>
            </div>
            <div className="su__row su__tick__section">
              <div>
                <img src={tickIcon} alt="Tick Icon"></img>
              </div>
              <div class="su__tick__text">Lorem ipsum dolor sit</div>
            </div>
            <div className="su__row su__choose__plan__btn">
              <Button className="su__choose__plan" onClick={e => handleFreePlan('F')}>
                Choose plan
              </Button>
            </div>
          </div>
          <div className="su__column__premium">
            <div className="su__row">
              <div className="su__plan__premium__amount">$100</div>
              <div className="su__plan__premium__amount__month">/month</div>
            </div>
            <div className="su__row su__premiun__text">Premium</div>
            <div className="su__content__premium">Lorem ipsum dolor sit amet, consectetur adipiscing elit ut</div>
            <div className="su__row su__tick__section">
              <div>
                <img src={tickPremiumIcon} alt="Tick Icon"></img>
              </div>
              <div class="su__tick__text__premium">Lorem ipsum dolor sit</div>
            </div>
            <div className="su__row su__tick__section">
              <div>
                <img src={tickPremiumIcon} alt="Tick Icon"></img>
              </div>
              <div class="su__tick__text__premium">Lorem ipsum dolor sit</div>
            </div>
            <div className="su__row su__tick__section">
              <div>
                <img src={tickPremiumIcon} alt="Tick Icon"></img>
              </div>
              <div class="su__tick__text__premium">Lorem ipsum dolor sit</div>
            </div>
            <div className="su__row su__tick__section">
              <div>
                <img src={tickPremiumIcon} alt="Tick Icon"></img>
              </div>
              <div class="su__tick__text__premium">Lorem ipsum dolor sit</div>
            </div>
            <div className="su__row su__tick__section">
              <div>
                <img src={tickPremiumIcon} alt="Tick Icon"></img>
              </div>
              <div class="su__tick__text__premium">Lorem ipsum dolor sit</div>
            </div>
            <div className="su__row su__choose__plan__btn">
              <Button className="su__choose__plan__premium" onClick={e => handleFreePlan('P')}>
                Choose plan
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignupComponent

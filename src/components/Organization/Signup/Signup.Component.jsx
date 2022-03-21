import React, { useState, useEffect } from 'react'
import './Signup.Component.css'
import tickIcon from '../../../assets/icons/tick_icon.png'
import Button from '@mui/material/Button'
import tickPremiumIcon from '../../../assets/icons/tick__premium__icon.png'
import history from '../../../history'
import { useParams } from 'react-router-dom'
import { organizationService } from '../../../services'
import get from 'lodash.get'

const SignupComponent = () => {
  const [selectedPlan, setSelectedPlan] = useState('M')
  const { referredby } = useParams()
  const { invitetoken } = useParams()
  const { invitedBy } = useParams()
  const [plans, setPlans] = useState([])
  const [planPrice, setPlanPrice] = useState(null)

  const handleFreePlan = planType => {
    localStorage.setItem('plan_type', planType)
    const priceDet = plans.filter(p => p.interval === selectedPlan)
    const selectedSubscriptionId = get(priceDet[0], ['priceId'], null)
    const selectedPlanPrice = get(priceDet[0], ['priceAmount'], null)
    const interval = get(priceDet[0], ['interval'], null)

    var uFacility = JSON.parse(localStorage.getItem('facility'))
    if (planType === 'P') {
      uFacility.planType = interval === 'Y' ? 'year' : 'month'
      uFacility.subscription_price_id = selectedSubscriptionId
      uFacility.subscription_price = selectedPlanPrice
    }
    else uFacility.planType = 'free'
    localStorage.setItem('facility', JSON.stringify(uFacility))
    console.log('Page >> uFacility', uFacility)
    history.push(`/acceptance-criteria/${invitetoken}/${referredby}/${invitedBy}`)
  }

  useEffect(async () => {
    const params = {
      userId: '6195f999b39e32b8a4274b4d'
    }
    const payRes = await organizationService.paymentSubscription(params).catch(err => {console.log(err)})
    console.log('payRes', payRes.status)
    console.log('referredBy', referredby, 'inviteToken', invitetoken)
    const tokenResponse = await organizationService.validateToken(invitetoken)
    console.log('token >> response', tokenResponse)
    const data = tokenResponse?.data ? tokenResponse.data : tokenResponse.response.data
    var facility = get(data, ['data'], null)
    console.log('token >> data', facility)
    localStorage.setItem('facility', JSON.stringify(facility))
    if (data.status_code !== 200) {
      history.push('/error-page')
    }

    const response = await organizationService.getPrices().catch(err => {
      console.log(err)
    })
    console.log('prices >> response', response)
    const prices = get(response, ['data', 'data', 'data'], false)
    var listPrices = []
    prices.map(p => {
      const recurring = p.recurring
      const nPrice = {
        priceId: p.id,
        priceAmount: p.unit_amount / 100,
        interval: recurring.interval === 'month' ? 'M' : 'Y',
      }
      if (recurring.interval === 'month') setPlanPrice(nPrice.priceAmount)
      listPrices.push(nPrice)
    })
    console.log('prices >> data', listPrices)
    setPlans(listPrices)
  }, [])

  const handleSelectedPlan = pType => {
    setSelectedPlan(pType)
    const priceDet = plans.filter(p => p.interval === pType)
    const selectedPlanPrice = get(priceDet[0], ['priceAmount'], null)
    setPlanPrice(selectedPlanPrice)
    console.log('selectedPlanPrice', selectedPlanPrice)
  }
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
                onClick={e => handleSelectedPlan('M')}
              >
                MONTHLY
              </Button>
              &nbsp;&nbsp;&nbsp;
              <Button
                className={selectedPlan == 'Y' ? 'su__plan__button__active' : 'su__plan__button'}
                onClick={e => handleSelectedPlan('Y')}
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
              <div className="su__plan__premium__amount">${planPrice}</div>
              <div className="su__plan__premium__amount__month">{selectedPlan == 'M' ? '/ Month' : '/ Year'} </div>
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

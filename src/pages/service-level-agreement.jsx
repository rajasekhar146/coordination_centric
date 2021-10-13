import React from 'react'
import ServiceLevelAgreementComponent from '../components/Organization/ServiceLevelAgreement/ServiceLevelAgreement.Component'

const ServiceLevelAgreement = props => {
  console.log('ServiceLevelAgreement >> trigered', props)
  return (
    <div>
      <ServiceLevelAgreementComponent onButtonClick={props.onButtonClick} />
    </div>
  )
}

export default ServiceLevelAgreement

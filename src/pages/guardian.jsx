import React from 'react'
import GuardianComponent from '../components/OnboardMember/Guardian/Guardian.Component'

const Guardian = props => {
  return (
    <div>
      <GuardianComponent closeScreen={props.closeScreen} />
    </div>
  )
}

export default Guardian

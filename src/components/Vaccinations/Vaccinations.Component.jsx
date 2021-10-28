import React from 'react'
import Inventory from '../../assets/icons/inventory.png'

const VaccinationsComponent = () => {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      marginTop: "72px"
    }}>
      <img width={250} src={Inventory} alt="inventory" />
    </div>
  )
}

export default VaccinationsComponent

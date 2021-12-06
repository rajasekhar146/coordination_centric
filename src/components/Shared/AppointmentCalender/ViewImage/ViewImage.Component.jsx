import React, { useState, useEffect } from 'react'
import get from 'lodash.get'
import { commonService } from '../../../../services' //'../../services'

const ViewImageComponent = props => {
  const { pic, category,imageClass } = props
console.log("ViewImageComponent",props);
  const [picUrl, setPicUrl] = useState('')

  useEffect(async () => {
    await getImage()
  }, [props.pic])
  const arrayBufferToBase64 = buffer => {
    let binary = ''
    const bytes = new Uint8Array(buffer)
    const len = bytes.byteLength
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i])
    }
    return window.btoa(binary)
  }

  const getImage = async () => {
    const urlData = {
      name: `${category}/${pic}`,
    }
    console.log('image >> urlData', urlData)
    const response = await commonService.getProfile(urlData).catch(error => {
      setPicUrl(null);
      console.log("wqeqweqweqe",error)
    })
    console.log('image >> response', response)
    if (response && response.data.status === 200) {
      setPicUrl(arrayBufferToBase64(get(response, ['data', 'data', 'data', 'data'], [])))
    } else {
      console.log("wqeqweqweqe");
      setPicUrl(null);
    }
  }

  return (
    <div>
      {picUrl ? <img  className={imageClass} src={picUrl ? `data:image/png;base64,${picUrl}`:require('../../../../assets/icons/default_profile_image.png').default} alt="profile"  />:
       <img  className={imageClass} src={require('../../../../assets/icons/default_profile_image.png').default} alt="profile"  />}
    </div>
  )
}

export default ViewImageComponent

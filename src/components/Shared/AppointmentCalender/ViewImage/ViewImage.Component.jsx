import React, { useState, useEffect } from 'react'
import get from 'lodash.get'
import { commonService } from '../../../../services' //'../../services'

const ViewImageComponent = props => {
  const { pic, category } = props

  const [picUrl, setPicUrl] = useState('')

  useEffect(async () => {
    await getImage()
  }, [])
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
      console.log(error)
    })
    console.log('image >> response', response)
    if (response && response.data.status === 200) {
      setPicUrl(arrayBufferToBase64(get(response, ['data', 'data', 'data', 'data'], [])))
    }
  }

  return (
    <div>
      {picUrl && <img src={picUrl ? picUrl : `data:image/png;base64,${picUrl}`} alt="profile" className="io_profile" />}
    </div>
  )
}

export default ViewImageComponent

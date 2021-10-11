import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import './SAASAgreement.Component.css'
import SignaturePad from 'react-signature-canvas'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DatePicker from '@mui/lab/DatePicker'

const SAASAgreementComponent = () => {
  const [signatureUrl, setSignature] = useState({})
  const [value, setValue] = useState(null)
  var sigPad = {}

  const captureSignature = () => {
    setSignature({ signatureUrl: sigPad.getTrimmedCanvas().toDataURL('image/png') })
  }

  return (
    <div className="ac__main__div">
      <div className="ac__title__text">SAAS Agreement</div>
      <div className="ac__subtitle__text">
        For the purpose of registration please fill the required fields of this form to join our platform.
      </div>
      <div>
        <div className="ac__form">
          <div>
            <div className="ac__row">
              <div className="ac__column">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Montes, ac venenatis lacus, at. Lacus, turpis
                nascetur faucibus aliquet dignissim neque aliquet vehicula at. Magna vitae eget leo viverra sit bibendum
                ullamcorper nullam pretium. Faucibus risus fermentum, amet faucibus et scelerisque. Fringilla amet in
                tempus tincidunt. Accumsan neque nibh proin suspendisse tortor, arcu, fusce rhoncus leo. Ante duis enim,
                congue ut arcu arcu, adipiscing. At placerat urna, tristique praesent etiam varius sit. Integer neque
                donec facilisis non nibh facilisis.
                <br />
                <br />
                Enim nunc vulputate velit amet molestie. Tempus facilisi congue viverra id velit, etiam. Vitae nulla
                cursus commodo id velit odio aenean purus, et. Sed nibh adipiscing egestas tristique. Vulputate
                elementum eget cras eleifend pharetra. Quam tempor mauris suspendisse sed ipsum integer. Enim quisque
                malesuada nec diam amet enim adipiscing mattis. Aliquam tincidunt nec ultricies lacus, velit. Massa nisl
                venenatis in quis suspendisse. Leo molestie gravida vestibulum aenean et ultricies vulputate. Magna
                lobortis feugiat ipsum habitant diam elementum et facilisis.
                <br />
                <br />
                Orci integer nibh nunc, molestie nisl libero. Parturient ut sodales odio quisque varius semper eu eu.
                Tellus sit lacinia turpis lobortis. Commodo odio consectetur nec arcu. Sapien enim penatibus facilisis
                proin sed nulla eget. Pretium maecenas venenatis, elit nec diam sagittis, sit ut velit.
                <br />
                <br />
                Velit ac eget senectus nullam nulla maecenas risus adipiscing. Lectus urna, habitant nam dictumst at
                fringilla mauris urna in. Consectetur eleifend non porttitor eget. Non id ante aliquet tellus, aliquet
                diam condimentum. Nunc nulla consectetur ultricies velit, ac elit ornare arcu. Aliquet faucibus vitae
                pharetra sit molestie amet morbi mauris dictum. Maecenas faucibus lectus erat aenean egestas et aenean.
                Augue quam elit id donec. Eget morbi varius malesuada lacus, sit orci at.
                <br />
                <br />
                In ac odio et quam dui dolor. Nulla facilisis id eu, et velit enim semper sagittis. Eget aliquam
                elementum vitae cras sapien praesent. Congue sit in quam tristique lacus. Convallis tincidunt diam id
                sollicitudin pellentesque risus adipiscing. Ac neque ullamcorper amet, cursus. Quis faucibus volutpat
                nisi tincidunt arcu, libero, risus platea nisl. Et sed aliquet ac ipsum sit eleifend sed. Aliquet auctor
                tristique imperdiet ultrices nullam laoreet enim sed id. Sed et in malesuada nibh consectetur euismod
                sed. Aliquam nec volutpat volutpat, arcu, commodo donec tristique volutpat sed.
                <br />
                <br />
                Proin nulla dolor, ipsum lectus. Facilisis condimentum nulla feugiat vel mauris, pellentesque est
                aliquet ac. Viverra morbi ipsum eu mauris, cras nec nec adipiscing lacus. Nunc facilisis lacus, nisi
                ullamcorper. Neque nisl eget pharetra, proin sagittis ipsum sed diam elementum. Laoreet fusce dolor
                morbi integer. Facilisis eget nulla gravida nam quam a nunc ut. Rhoncus neque, scelerisque enim nulla
                purus. Velit condimentum sagittis dignissim et cras elit est.
                <br />
                <br />
                Quis velit ultricies egestas risus proin justo. Sagittis nunc, sed tellus diam. Cursus neque nisl at
                neque, pellentesque. Tincidunt ante amet, gravida eget non vestibulum ac odio tincidunt. Feugiat nibh ut
                a, nibh vestibulum mattis dignissim nisl.
                <br />
                <br />
                Amet vitae hac vitae nec amet lacus, diam, eget. Neque lobortis nunc augue lorem scelerisque faucibus
                scelerisque. At mi sit urna mi integer. Gravida malesuada placerat in vehicula pellentesque diam. Aenean
                fermentum augue ac, integer semper pellentesque. Platea nisl non augue sed proin eu purus sagittis. Cras
                feugiat vitae, neque metus, cursus turpis ut potenti. Id augue sed vulputate dui. Vel mattis dui proin
                netus.
                <br />
                <br />
                Viverra lacus, ut enim cras nunc odio magna nunc. Quisque iaculis sit est, quis. Lacus orci ut a quam
                facilisis nibh. Habitasse vel feugiat ultricies a. Massa ac mattis posuere urna. Neque pellentesque odio
                sagittis, dignissim sed ornare in ullamcorper a. Facilisis aliquet diam amet egestas vitae rutrum
                euismod. Id vitae, aliquam neque pretium ultrices pulvinar ipsum varius sed. Aliquam venenatis odio
                volutpat commodo mauris pretium massa vitae a.
              </div>
            </div>

            <div className="saas__row">
              <div className="saas__column">
                <div className="saas__label">Sign Here</div>
                <div className="sla__sign__container">
                  <SignaturePad
                    canvasProps={{ className: 'sla__sign__pad' }}
                    ref={ref => {
                      sigPad = ref
                    }}
                  />
                </div>
              </div>

              <div className="saas__column">
                <div className="saas__label">Date</div>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    value={value}
                    onChange={newValue => {
                      setValue(newValue)
                    }}
                    renderInput={params => <TextField {...params} variant="standard" />}
                    InputProps={{ className: '' }}
                  />
                </LocalizationProvider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SAASAgreementComponent

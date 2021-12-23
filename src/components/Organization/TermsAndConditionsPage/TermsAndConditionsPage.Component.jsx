import React, {useState} from 'react'
import './TermsAndConditionsPage.Component.css'
import CCLogo from '../../../assets/images/terms_conditions.png'
import Button from '@mui/material/Button'
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded'
import Checkbox from '@mui/material/Checkbox'

const TermsAndConditionsPageComponent = (props) => {
  const [readAndAgree, setReadAndAgree] = useState(false)
  const [allowCC, setAllowCC] = useState(false)

  const handleSubmit = () => {
    props.setTermsAndConditionsPage(false)
    props.setReadTermsAndConditions(true)
  }
  return (
    <div className="tac__main__div">
      <div className="tac__logo_section">
        <img src={CCLogo} className="tac__main__img" alt="Terms and conditions" />
      </div>
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="Generator" content="Microsoft Word 15 (filtered)" />
      <style id="dynCom" type="text/css" dangerouslySetInnerHTML={{ __html: '<!-- -->' }} />
      <style
        dangerouslySetInnerHTML={{
          __html:
            '\n<!--\n /* Font Definitions */\n @font-face\n\t{font-family:"Cambria Math";\n\tpanose-1:2 4 5 3 5 4 6 3 2 4;}\n@font-face\n\t{font-family:Calibri;\n\tpanose-1:2 15 5 2 2 2 4 3 2 4;}\n@font-face\n\t{font-family:Cambria;\n\tpanose-1:2 4 5 3 5 4 6 3 2 4;}\n@font-face\n\t{font-family:"Frank Ruhl Libre";}\n@font-face\n\t{font-family:"Noto Sans Symbols";}\n /* Style Definitions */\n p.MsoNormal, li.MsoNormal, div.MsoNormal\n\t{margin:0in;\n\tline-height:115%;\n\tfont-size:11.0pt;\n\tfont-family:"Arial",sans-serif;}\nh3\n\t{margin-top:16.0pt;\n\tmargin-right:0in;\n\tmargin-bottom:4.0pt;\n\tmargin-left:0in;\n\tline-height:115%;\n\tpage-break-after:avoid;\n\tfont-size:14.0pt;\n\tfont-family:"Arial",sans-serif;\n\tcolor:#434343;\n\tfont-weight:normal;}\n.MsoChpDefault\n\t{font-family:"Arial",sans-serif;}\n.MsoPapDefault\n\t{line-height:115%;}\n /* Page Definitions */\n @page WordSection1\n\t{size:8.5in 11.0in;\n\tmargin:1.0in 1.0in 1.0in 1.0in;}\ndiv.WordSection1\n\t{page:WordSection1;}\n /* List Definitions */\n ol\n\t{margin-bottom:0in;}\nul\n\t{margin-bottom:0in;}\n-->\n',
        }}
      />
      <div className="WordSection1">
        <p className="MsoNormal" align="center" style={{ textAlign: 'center', lineHeight: 'normal' }}>
          <b>
            <u>
              <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif' }}>
                <span style={{ textDecoration: 'none' }}>&nbsp;</span>
              </span>
            </u>
          </b>
        </p>
        <p className="MsoNormal" align="center" style={{ textAlign: 'center', lineHeight: 'normal' }}>
          <span lang="EN">
            <a />
          </span>
          <b>
            <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif', background: 'white' }}>
              [Clickwrap Pop Up]
            </span>
          </b>
        </p>
        <p className="MsoNormal" align="center" style={{ textAlign: 'center', lineHeight: 'normal' }}>
          <b>
            <u>
              <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif' }}>
                <span style={{ textDecoration: 'none' }}>&nbsp;</span>
              </span>
            </u>
          </b>
        </p>
        <p className="MsoNormal" style={{ lineHeight: 'normal' }}>
          <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif' }}>
            In order to be eligible to use CSuites, you must first read, acknowledge, and agree to our Terms of Use and
            Privacy Policy. By creating an account and/or using CSuites, you are agreeing to comply with and be bound by
            these policies. You also acknowledge and understand that Coordination Centric, LLC will share the
            information you share on CSuites with your employer organization for purposes of maintaining a safe
            workplace. If you do not agree with these terms, <b>do not create an account or use our services.</b>
          </span>
        </p>
        <p className="MsoNormal" style={{ lineHeight: 'normal' }}>
          <b>
            <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif' }}>
              &nbsp;
            </span>
          </b>
        </p>
        <p
          className="MsoNormal"
          style={{ marginLeft: '1.5in', textIndent: '-.25in', lineHeight: 'normal', border: 'none' }}
        >
          <span lang="EN" style={{ fontFamily: '"Noto Sans Symbols"', color: 'black' }}>
          <Checkbox
           onChange={e => {
              setReadAndAgree(e.target.checked)
            }}
          /><span style={{ font: '7.0pt "Times New Roman"' }}>&nbsp;&nbsp;&nbsp;&nbsp;</span>
          </span>
          <i>
            <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif', color: 'black' }}>
              I have read, understand, and agree to the{' '}
            </span>
          </i>
          <i>
            <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif' }}>
              CSuites<span style={{ color: 'black' }}> Terms of Use &amp; Privacy Policy.</span>
            </span>
          </i>
        </p>
        <p
          className="MsoNormal"
          style={{ marginLeft: '1.5in', textIndent: '-.25in', lineHeight: 'normal', border: 'none' }}
        >
          <span lang="EN" style={{ fontFamily: '"Noto Sans Symbols"', color: 'black' }}>
          <Checkbox
          onChange={e => {
             setAllowCC(e.target.checked)
           }}
           /><span style={{ font: '7.0pt "Times New Roman"' }}>&nbsp;&nbsp;&nbsp;&nbsp;</span>
          </span>
          <i>
            <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif', color: 'black' }}>
              I agree to allow Coordination Centric,&nbsp; Inc. to share my information with my employer organization.
            </span>
          </i>
          <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif', color: 'black' }}>
            {' '}
            <i>
              I understand that my information may also be combined with that of other Employees in my workplace to
              allow my Employer to{' '}
            </i>
          </span>
          <span lang="EN">
            <a
              className="msocomanchor"
              id="_anchor_1"
              onmouseover="msoCommentShow('_anchor_1','_com_1')"
              onmouseout="msoCommentHide('_com_1')"
              href="#_msocom_1"
              language="JavaScript"
              name="_msoanchor_1"
            >
              [1]
            </a>
            &nbsp;
          </span>
          <i>
            <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif' }}>
              manage patient health.
            </span>
          </i>
        </p>
        <p className="MsoNormal" style={{ lineHeight: 'normal' }}>
          <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif' }}>
            &nbsp;
          </span>
        </p>
        <p className="MsoNormal" align="center" style={{ textAlign: 'center', lineHeight: 'normal' }}>
          <b>
            <u>
              <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif' }}>
                Introduction to Terms Of Use
              </span>
            </u>
          </b>
        </p>
        <p className="MsoNormal" style={{ lineHeight: 'normal', background: 'white' }}>
          <b>
            <u>
              <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif', color: 'black' }}>
                This is a contract between You and Coordination Centric, LLC (“Coordination Centric'').{' '}
              </span>
            </u>
          </b>
          <b>
            <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif', color: 'black' }}>
              You should carefully read the following Terms of Use (the “Terms”) before using CSuites. By using the
              Service (defined in the full Terms), you are consenting to be bound by and are becoming a party to these
              Terms. If you do not agree to the Terms, do not use the Service.{' '}
            </span>
          </b>
        </p>
        <p className="MsoNormal" style={{ lineHeight: 'normal', background: 'white' }}>
          <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif' }}>
            &nbsp;
          </span>
        </p>
        <p className="MsoNormal" style={{ textAlign: 'justify', lineHeight: 'normal', background: 'white' }}>
          <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif', color: 'black' }}>
            Any information that Coordination Centric collects through your use of the Service is subject to the
            Coordination Centric Privacy Policy, which is part of these Terms.
          </span>
        </p>
        <p className="MsoNormal" style={{ lineHeight: 'normal' }}>
          <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif' }}>
            &nbsp;
          </span>
        </p>
        <p className="MsoNormal" style={{ lineHeight: 'normal' }}>
          <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif' }}>
            By continuing to use the Service, you agree as follows:
          </span>
        </p>
        <p className="MsoNormal" style={{ lineHeight: 'normal' }}>
          <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif' }}>
            &nbsp;
          </span>
        </p>
        <ol style={{ marginTop: '0in' }} start={1} type={1}>
          <li className="MsoNormal" style={{ lineHeight: 'normal' }}>
            <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif' }}>
              You are at least 18 years old or have been legally emancipated;
            </span>
          </li>
          <li className="MsoNormal" style={{ lineHeight: 'normal' }}>
            <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif' }}>
              You understand and intend that this Agreement is a legally binding agreement and the equivalent of a
              signed, written contract;
            </span>
          </li>
          <li className="MsoNormal" style={{ lineHeight: 'normal' }}>
            <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif' }}>
              You will use the Service in a manner consistent with applicable laws and regulations and these Terms of
              Use, as they may be amended by Coordination Centric from time to time; and
            </span>
          </li>
          <li className="MsoNormal" style={{ lineHeight: 'normal' }}>
            <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif' }}>
              You understand, accept, and have received these Terms of Use, and acknowledge and demonstrate that You can
              access these Terms of Use at will.
            </span>
          </li>
        </ol>
        <p className="MsoNormal" style={{ lineHeight: 'normal' }}>
          <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif' }}>
            &nbsp;
          </span>
        </p>
        <p className="MsoNormal" style={{ lineHeight: 'normal' }}>
          <b>
            <i>
              <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif' }}>
                If You do not agree with and accept the Terms, please discontinue all further use of the Service and
                immediately delete all associated files, if any, from Your device. Once you agree to the Terms of Use
                you also agree to the sharing of the data you share with CSuites with your employer.
              </span>
            </i>
          </b>
        </p>
        <p className="MsoNormal" style={{ lineHeight: 'normal' }}>
          <b>
            <i>
              <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif' }}>
                &nbsp;
              </span>
            </i>
          </b>
        </p>
        <p className="MsoNormal" style={{ lineHeight: 'normal' }}>
          <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif' }}>
            &nbsp;ARBITRATION NOTICE: EXCEPT IF YOU OPT-OUT AND EXCEPT FOR CERTAIN TYPES OF DISPUTES DESCRIBED IN THE
            DISPUTE RESOLUTION SECTION BELOW, YOU AGREE THAT DISPUTES BETWEEN YOU AND COORDINATION CENTRIC WILL BE
            RESOLVED BY BINDING, INDIVIDUAL ARBITRATION AND YOU WAIVE YOUR RIGHT TO PARTICIPATE IN A CLASS ACTION
            LAWSUIT OR CLASS-WIDE ARBITRATION. YOU CAN OPT OUT OF THE AGREEMENT TO ARBITRATE BY CONTACTING{' '}
          </span>
          <span lang="EN">
            <a href="mailto:INFO@COORDINATIONCENTRIC.COM">
              <span style={{ fontFamily: '"Calibri",sans-serif', color: 'blue' }}>INFO@COORDINATIONCENTRIC.COM</span>
            </a>
          </span>
          <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif' }}>
            {' '}
            WITHIN 30 DAYS OF ACCEPTING THESE TERMS.
          </span>
        </p>
        <p className="MsoNormal" style={{ lineHeight: 'normal' }}>
          <b>
            <u>
              <span lang="EN" style={{ fontSize: '16.0pt', fontFamily: '"Calibri",sans-serif' }}>
                <span style={{ textDecoration: 'none' }}>&nbsp;</span>
              </span>
            </u>
          </b>
        </p>
        <p className="MsoNormal" align="center" style={{ textAlign: 'center', lineHeight: 'normal' }}>
          <b>
            <u>
              <span lang="EN" style={{ fontSize: '16.0pt', fontFamily: '"Calibri",sans-serif' }}>
                Terms of Use
              </span>
            </u>
          </b>
        </p>
        <p className="MsoNormal" align="center" style={{ textAlign: 'center', lineHeight: 'normal' }}>
          <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif' }}>
            Last Updated: December 2021
          </span>
        </p>
        <div
          style={{
            border: 'none',
            borderBottom: 'none black 1.0pt',
            padding: '0in 0in 11.0pt 0in',
            background: 'white',
          }}
        >
          <p
            className="MsoNormal"
            style={{ lineHeight: 'normal', background: 'white', border: 'none', padding: '0in' }}
          >
            <a name="_heading=h.gjdgxs" />
            <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif' }}>
              &nbsp;
            </span>
          </p>
          <p
            className="MsoNormal"
            style={{ lineHeight: 'normal', background: 'white', border: 'none', padding: '0in' }}
          >
            <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif', color: 'black' }}>
              These terms of use (the “Terms”) are a legal contract between <b>Coordination Centric, LLC</b>{' '}
              (“Coordination Centric”, “we” or “us”) and “you” or “You”.&nbsp; The terms explain how you are permitted
              to use the services provided by and through CSuites, including in your personal or your employer issued
              mobile device(s) (collectively, the “<b>App</b>”) and our website (located at the URL
              https://coordinationcentric.com) (the “<b>Site</b>”).&nbsp; These Terms also govern your use of all the
              text, data, information, software, graphics, proprietary content and more (all of which we refer to as “
              <b>Materials</b>”) that we and/or our affiliates may make available to you, as well as any services we may
              provide through the Site).&nbsp; Collectively, the Site, the Materials, and the services provided herein
              are referred to as the <b>“Service”</b>.{' '}
            </span>
          </p>
          <p
            className="MsoNormal"
            style={{ lineHeight: 'normal', background: 'white', border: 'none', padding: '0in' }}
          >
            <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif' }}>
              &nbsp;
            </span>
          </p>
          <p
            className="MsoNormal"
            style={{ lineHeight: 'normal', background: 'white', border: 'none', padding: '0in' }}
          >
            <b>
              <i>
                <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif', color: 'black' }}>
                  The organization You work for is referred to in these Terms as your “Employer.” Employees submitting
                  information to their Employer through CSuites for purposes of the Employer’s review and evaluation are
                  referred to in these Terms as “Employees”. Employers and their authorized users (e.g. HR Personnel)
                  are collectively referred to as “Employer Personnel.”
                </span>
              </i>
            </b>
          </p>
          <p
            className="MsoNormal"
            style={{ lineHeight: 'normal', background: 'white', border: 'none', padding: '0in' }}
          >
            <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif' }}>
              &nbsp;
            </span>
          </p>
          <p
            className="MsoNormal"
            style={{ lineHeight: 'normal', background: 'white', border: 'none', padding: '0in' }}
          >
            <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif', color: 'black' }}>
              If You or your employer organization has entered into a separate executed agreement, order form, or legal
              contract for purchasing services or products from Coordination Centric (each a “<b>Contract</b>”), such
              Contract shall supersede these Terms. In the event of any conflict between these Terms and the Contract,
              the Contract will prevail. In cases where the Contract does not address specific provisions included in
              these Terms, these Terms will apply, supplementing the Contract.{' '}
            </span>
          </p>
        </div>
        <h3
          align="center"
          style={{
            margin: '0in',
            textAlign: 'center',
            lineHeight: 'normal',
            pageBreakAfter: 'auto',
            background: 'white',
          }}
        >
          <a name="_heading=h.30j0zll" />
          <b>
            <span lang="EN" style={{ fontSize: '11.0pt', fontFamily: '"Calibri",sans-serif', color: 'black' }}>
              What is the Service?
            </span>
          </b>
        </h3>
        <p className="MsoNormal">
          <span lang="EN">&nbsp;</span>
        </p>
        <p className="MsoNormal">
          <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif' }}>
            The service your clinic provides may be telemonitoring and/or telemedicine.&nbsp; These are addressed
            individually below.
          </span>
        </p>
        <p className="MsoNormal">
          <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif' }}>
            &nbsp;
          </span>
        </p>
        <h3 style={{ margin: '0in', lineHeight: 'normal', pageBreakAfter: 'auto', background: 'white' }}>
          <a name="_heading=h.d5f48jv0ctvg" />
          <b>
            <span lang="EN" style={{ fontSize: '11.0pt', fontFamily: '"Calibri",sans-serif', color: '#27313F' }}>
              Telemonitoring
            </span>
          </b>
        </h3>
        <div
          style={{
            border: 'none',
            borderBottom: 'none black 1.0pt',
            padding: '0in 0in 11.0pt 0in',
            background: 'white',
          }}
        >
          <p
            className="MsoNormal"
            style={{ marginTop: '14.0pt', lineHeight: 'normal', background: 'white', border: 'none', padding: '0in' }}
          >
            <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif', color: 'black' }}>
              Telemonitoring is the use of technology to provide care and support to patients in their homes. This
              allows the patient’s medical team to track and monitor a patient’s vitals on a regular basis. To do this,
              a patient receives a monitor to check their vitals as recommended by their doctor.&nbsp; If any of their
              vitals are out of normal range, a patient’s nurse will be notified to determine what action should be
              taken. All of this sensitive patient information is transferred over a secure website connection that can
              only be accessed by the patient’s care team.
            </span>
          </p>
          <p
            className="MsoNormal"
            style={{ marginTop: '14.0pt', lineHeight: 'normal', background: 'white', border: 'none', padding: '0in' }}
          >
            <b>
              <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif', color: '#222222' }}>
                Telemedicine
              </span>
            </b>
          </p>
        </div>
        <div style={{ border: 'none #E2E8F0 1.0pt', padding: '0in 0in 11.0pt 0in', background: 'white' }}>
          <p
            className="MsoNormal"
            style={{
              marginBottom: '15.0pt',
              lineHeight: 'normal',
              background: 'white',
              border: 'none',
              padding: '0in',
              paddingBottom: '0in',
              borderBottom: '0in none #E2E8F0',
            }}
          >
            <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif', color: '#222222' }}>
              Telemedicine allows patients to virtually visit a healthcare provider using technology.
            </span>
          </p>
          <p
            className="MsoNormal"
            style={{
              marginBottom: '15.0pt',
              lineHeight: 'normal',
              background: 'white',
              border: 'none',
              padding: '0in',
              paddingTop: '0in',
              paddingBottom: '0in',
              borderBottom: '0in none #E2E8F0',
            }}
          >
            <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif', color: '#222222' }}>
              With telemedicine, a patient can discuss symptoms, medical issues, and more with a healthcare provider in
              real time using video, online portals, and other communication methods. Using telemedicine, a patient can
              receive a diagnosis, learn treatment options, and get a prescription.
            </span>
          </p>
          <p
            className="MsoNormal"
            style={{
              marginBottom: '15.0pt',
              lineHeight: 'normal',
              background: 'white',
              border: 'none',
              padding: '0in',
              paddingTop: '0in',
              paddingBottom: '0in',
              borderBottom: '0in none #E2E8F0',
            }}
          >
            <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif', color: 'black' }}>
              Certain features of the Service may be subject to additional terms not included here. Use of any features
              that are subject to additional terms constitutes an agreement to be bound by the additional terms. In the
              event that additional terms presented to you conflict with these Terms, the additional terms will govern.
            </span>
          </p>
          <p
            className="MsoNormal"
            style={{
              marginBottom: '15.0pt',
              lineHeight: 'normal',
              background: 'white',
              border: 'none',
              padding: '0in',
              paddingTop: '0in',
            }}
          >
            <b>
              <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif', color: 'black' }}>
                THE USE OF THE SERVICE IS NOT APPROPRIATE FOR EMERGENCIES. IF YOU THINK YOU ARE EXPERIENCING A MEDICAL
                OR MENTAL HEALTH EMERGENCY, OR IF AT ANY TIME YOU ARE CONCERNED ABOUT YOUR CARE OR TREATMENT, CALL 911
                OR GO TO THE NEAREST OPEN CLINIC OR EMERGENCY ROOM.
              </span>
            </b>
          </p>
        </div>
        <div
          style={{
            border: 'none',
            borderBottom: 'none black 1.0pt',
            padding: '0in 0in 11.0pt 0in',
            background: 'white',
          }}
        >
          <p
            className="MsoNormal"
            style={{ lineHeight: 'normal', background: 'white', border: 'none', padding: '0in' }}
          >
            <b>
              <u>
                <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif', color: 'black' }}>
                  Coordination Centric is not responsible for inaccuracies in the information you provide.
                </span>
              </u>
            </b>
          </p>
        </div>
        <h3
          align="center"
          style={{
            margin: '0in',
            textAlign: 'center',
            lineHeight: 'normal',
            pageBreakAfter: 'auto',
            background: 'white',
          }}
        >
          <a name="_heading=h.1fob9te" />
          <b>
            <span lang="EN" style={{ fontSize: '11.0pt', fontFamily: '"Calibri",sans-serif', color: 'black' }}>
              What happens if Coordination Centric changes the Service or these Terms?
            </span>
          </b>
        </h3>
        <div
          style={{
            border: 'none',
            borderBottom: 'none black 1.0pt',
            padding: '0in 0in 11.0pt 0in',
            background: 'white',
          }}
        >
          <p
            className="MsoNormal"
            style={{ lineHeight: 'normal', background: 'white', border: 'none', padding: '0in' }}
          >
            <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif', color: 'black' }}>
              Coordination Centric may make changes to the Service or these Terms of Use without prior notice to you. If
              you object to any changes, stop using the Service immediately. Continued use of the Service following any
              changes will indicate your acknowledgement of and agreement with those changes. We also reserve the right
              to discontinue the Service at any time without notice to you but if we do so, we will give your remaining
              data that we have to your Employer organization. We will not be liable to you or any third-party should we
              exercise our right to modify or discontinue the Service.
            </span>
          </p>
        </div>
        <h3
          align="center"
          style={{
            margin: '0in',
            textAlign: 'center',
            lineHeight: 'normal',
            pageBreakAfter: 'auto',
            background: 'white',
          }}
        >
          <a name="_heading=h.3znysh7" />
          <b>
            <span lang="EN" style={{ fontSize: '11.0pt', fontFamily: '"Calibri",sans-serif', color: 'black' }}>
              How does Coordination Centric protect my privacy?
            </span>
          </b>
        </h3>
        <div
          style={{
            border: 'none',
            borderBottom: 'none black 1.0pt',
            padding: '0in 0in 11.0pt 0in',
            background: 'white',
          }}
        >
          <p
            className="MsoNormal"
            style={{ lineHeight: 'normal', background: 'white', border: 'none', padding: '0in' }}
          >
            <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif', color: 'black' }}>
              Coordination Centric takes your privacy seriously. Please review our privacy policy (the “Privacy Policy”)
              for information on how we use information that you submit to us.{' '}
            </span>
          </p>
        </div>
        <h3
          align="center"
          style={{
            margin: '0in',
            textAlign: 'center',
            lineHeight: 'normal',
            pageBreakAfter: 'auto',
            background: 'white',
          }}
        >
          <a name="_heading=h.2et92p0" />
          <b>
            <span lang="EN" style={{ fontSize: '11.0pt', fontFamily: '"Calibri",sans-serif', color: 'black' }}>
              What are my responsibilities as an <i>Employee</i>?
            </span>
          </b>
        </h3>
        <div
          style={{
            border: 'none',
            borderBottom: 'none black 1.0pt',
            padding: '0in 0in 11.0pt 0in',
            background: 'white',
          }}
        >
          <p
            className="MsoNormal"
            style={{ lineHeight: 'normal', background: 'white', border: 'none', padding: '0in' }}
          >
            <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif', color: 'black' }}>
              If you are an Employee, the Service is designed to help your patients be more actively engaged in your
              practice and their health. As such, you are responsible for complying with these Terms when using the
              Services and for any activity that takes place on your account.&nbsp;{' '}
            </span>
          </p>
          <p
            className="MsoNormal"
            style={{ lineHeight: 'normal', background: 'white', border: 'none', padding: '0in' }}
          >
            <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif', color: 'black' }}>
              &nbsp;
            </span>
          </p>
          <p
            className="MsoNormal"
            style={{ lineHeight: 'normal', background: 'white', border: 'none', padding: '0in' }}
          >
            <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif', color: 'black' }}>
              Additionally, you agree and understand that:
            </span>
          </p>
        </div>
        <p
          className="MsoNormal"
          style={{ marginLeft: '.5in', textIndent: '-.25in', lineHeight: 'normal', background: 'white' }}
        >
          <span lang="EN" style={{ fontSize: '15.0pt', fontFamily: '"Frank Ruhl Libre"' }}>
            ●<span style={{ font: '7.0pt "Times New Roman"' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>
          </span>
          <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif', color: 'black' }}>
            You have addressed your questions on use of CSuites with Coordination Centric, Employer Personnel, and/or
            your Employer.
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{ marginLeft: '.5in', textIndent: '-.25in', lineHeight: 'normal', background: 'white' }}
        >
          <span lang="EN" style={{ fontSize: '15.0pt', fontFamily: '"Frank Ruhl Libre"' }}>
            ●<span style={{ font: '7.0pt "Times New Roman"' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>
          </span>
          <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif', color: 'black' }}>
            You agree that any disclosures or history you share with us may be stored electronically in the Service and
            will be made available to your Employer and/or Employer Personnel.
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{ marginLeft: '.5in', textIndent: '-.25in', lineHeight: 'normal', background: 'white' }}
        >
          <span lang="EN" style={{ fontSize: '15.0pt', fontFamily: '"Frank Ruhl Libre"' }}>
            ●<span style={{ font: '7.0pt "Times New Roman"' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>
          </span>
          <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif', color: 'black' }}>
            You acknowledge that Coordination Centric is not a health care provider or physician.
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{ marginLeft: '.5in', textIndent: '-.25in', lineHeight: 'normal', background: 'white' }}
        >
          <span lang="EN" style={{ fontSize: '15.0pt', fontFamily: '"Frank Ruhl Libre"' }}>
            ●<span style={{ font: '7.0pt "Times New Roman"' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>
          </span>
          <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif', color: 'black' }}>
            Coordination Centric does not require payment of charges or fees for your use of the Service.
          </span>
        </p>
        <p className="MsoNormal" style={{ lineHeight: 'normal', background: 'white' }}>
          <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif' }}>
            &nbsp;
          </span>
        </p>
        <p
          className="MsoNormal"
          align="center"
          style={{ textAlign: 'center', lineHeight: 'normal', background: 'white' }}
        >
          <b>
            <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif' }}>
              &nbsp;
            </span>
          </b>
        </p>
        <p
          className="MsoNormal"
          align="center"
          style={{ textAlign: 'center', lineHeight: 'normal', background: 'white' }}
        >
          <b>
            <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif', color: 'black' }}>
              What are my responsibilities as <i>Employer Personnel</i>?
            </span>
          </b>
        </p>
        <div
          style={{
            border: 'none',
            borderBottom: 'none black 1.0pt',
            padding: '0in 0in 11.0pt 0in',
            background: 'white',
          }}
        >
          <p
            className="MsoNormal"
            style={{ lineHeight: 'normal', background: 'white', border: 'none', padding: '0in' }}
          >
            <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif', color: 'black' }}>
              If you are Employer Personnel, you are responsible for complying with all applicable laws in connection
              with your use of the Service. For example, you are responsible for protecting Employee information that
              you have access to through the Service in accordance with any and all privacy laws applicable to the use
              of this Service.&nbsp; Coordination Centric has established reasonable safeguards and procedures to
              protect the security of your and your Employees’ information, but you must also take steps to protect your
              privacy and confidentiality and that of yourself and your Employees.&nbsp;{' '}
            </span>
          </p>
          <p
            className="MsoNormal"
            style={{ lineHeight: 'normal', background: 'white', border: 'none', padding: '0in' }}
          >
            <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif' }}>
              &nbsp;
            </span>
          </p>
          <p
            className="MsoNormal"
            style={{ lineHeight: 'normal', background: 'white', border: 'none', padding: '0in' }}
          >
            <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif', color: 'black' }}>
              CSuites may allow you to manually edit certain Employee information.&nbsp;{' '}
              <b>
                Coordination Centric is not responsible for any such changes that you make with CSuites or any decisions
                made based on that change. Further, you are responsible for making a final determination regarding any
                data input such as clinical notations and/or medical advice given to patients, and Coordination Centric
                cannot be held responsible for your decision or the effects of that decision.
              </b>
            </span>
          </p>
        </div>
        <h3
          align="center"
          style={{
            margin: '0in',
            textAlign: 'center',
            lineHeight: 'normal',
            pageBreakAfter: 'auto',
            background: 'white',
          }}
        >
          <a name="_heading=h.tyjcwt" />
          <b>
            <span lang="EN" style={{ fontSize: '11.0pt', fontFamily: '"Calibri",sans-serif', color: 'black' }}>
              Are minors allowed to use the Service?
            </span>
          </b>
        </h3>
        <div
          style={{
            border: 'none',
            borderBottom: 'none black 1.0pt',
            padding: '0in 0in 11.0pt 0in',
            background: 'white',
          }}
        >
          <p
            className="MsoNormal"
            style={{ lineHeight: 'normal', background: 'white', border: 'none', padding: '0in' }}
          >
            <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif', color: 'black' }}>
              No. By using the Service, you represent, acknowledge and agree that you are at least 18 years old and
              legally allowed to enter into contracts.&nbsp; Coordination Centric does not knowingly collect, use, or
              store information relating to children under the age of 13 (a “<b>Minor</b>”). If you are not legally
              allowed to enter into contracts or are under 13, you may not use the Service at any time or in any manner
              or submit any information to Coordination Centric through the Service.&nbsp; If you know of anyone under
              the age of 13 using the Service, please notify Coordination Centric immediately at
              info@coordinationcentric.com<b>.</b>
            </span>
          </p>
        </div>
        <h3
          align="center"
          style={{
            margin: '0in',
            textAlign: 'center',
            lineHeight: 'normal',
            pageBreakAfter: 'auto',
            background: 'white',
          }}
        >
          <a name="_heading=h.3dy6vkm" />
          <b>
            <span lang="EN" style={{ fontSize: '11.0pt', fontFamily: '"Calibri",sans-serif', color: 'black' }}>
              Who owns the Service?
            </span>
          </b>
        </h3>
        <div
          style={{
            border: 'none',
            borderBottom: 'none black 1.0pt',
            padding: '0in 0in 11.0pt 0in',
            background: 'white',
          }}
        >
          <p
            className="MsoNormal"
            style={{ lineHeight: 'normal', background: 'white', border: 'none', padding: '0in' }}
          >
            <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif', color: 'black' }}>
              Coordination Centric owns the Service, which is protected by copyright laws throughout the world.&nbsp;
              Subject to your continuing compliance with these Terms, Coordination Centric grants you a personal,
              non-exclusive, non-transferable, non-sublicensable, revocable limited license subject to the limitations
              below to use the Service for the purposes described in these Terms. You agree not to use the Service for
              any other purpose.
            </span>
          </p>
          <p
            className="MsoNormal"
            style={{ lineHeight: 'normal', background: 'white', border: 'none', padding: '0in' }}
          >
            <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif' }}>
              &nbsp;
            </span>
          </p>
          <p
            className="MsoNormal"
            style={{ lineHeight: 'normal', background: 'white', border: 'none', padding: '0in' }}
          >
            <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif', color: 'black' }}>
              The Service and all associated proprietary and intellectual property rights are and shall remain
              Coordination Centric’s property or the property of Coordination Centric’s licensors. Neither these Terms
              nor your use of the Service convey or grant to you any rights: (i) in or related to the Service except for
              the limited license granted above; or (ii) to use or reference in any manner Coordination Centric’s
              company names, logos, product and service names, trademarks or services marks or those of Coordination
              Centric’s licensors. There are no licenses by implication. If you breach any of these Terms, the above
              license will terminate automatically, and you must stop using the Service and immediately destroy any
              materials downloaded or printed from the Service.
            </span>
          </p>
          <p
            className="MsoNormal"
            style={{ lineHeight: 'normal', background: 'white', border: 'none', padding: '0in' }}
          >
            <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif', color: 'black' }}>
              &nbsp;
            </span>
          </p>
          <p
            className="MsoNormal"
            style={{ lineHeight: 'normal', background: 'white', border: 'none', padding: '0in' }}
          >
            <u>
              <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif', color: 'black' }}>
                Restrictions
              </span>
            </u>
            <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif', color: 'black' }}>
              . You may not: (i) remove any copyright, trademark or other proprietary notices from any portion of the
              Service; (ii) reproduce, modify, prepare derivative works based upon, distribute, license, lease, sell,
              resell, transfer, publicly display, publicly perform, transmit, stream, broadcast or otherwise exploit the
              Service except as expressly permitted by Coordination Centric; (iii) decompile, reverse engineer or
              disassemble the Service except as may be permitted by applicable law; (iv) link to, mirror or frame any
              portion of the Service except as expressly permitted by Coordination Centric; (v) cause or launch any
              programs or scripts for the purpose of scraping, indexing, surveying, or otherwise data mining any portion
              of the Service or unduly burdening or hindering the operation and/or functionality of any aspect of the
              Service; or (vi) attempt to gain unauthorized access to or impair any aspect of the Service or its related
              systems or networks.
            </span>
          </p>
          <p
            className="MsoNormal"
            style={{ lineHeight: 'normal', background: 'white', border: 'none', padding: '0in' }}
          >
            <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif' }}>
              &nbsp;
            </span>
          </p>
          <p
            className="MsoNormal"
            align="center"
            style={{ textAlign: 'center', lineHeight: 'normal', background: 'white', border: 'none', padding: '0in' }}
          >
            <b>
              <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif', color: 'black' }}>
                How do I create an account?
              </span>
            </b>
          </p>
          <p
            className="MsoNormal"
            align="center"
            style={{ textAlign: 'center', lineHeight: 'normal', background: 'white', border: 'none', padding: '0in' }}
          >
            <b>
              <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif' }}>
                &nbsp;
              </span>
            </b>
          </p>
          <p
            className="MsoNormal"
            style={{ lineHeight: 'normal', background: 'white', border: 'none', padding: '0in' }}
          >
            <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif', color: 'black' }}>
              You do not need to register with Coordination Centric when you are visiting or viewing the public areas of
              the Site, or to browse any publicly accessible information in the Site. However, in order to access and
              use the features of the Service, you must register with Coordination Centric for an account and receive a
              password. For purposes of the Terms, a “<b>Registered User</b>” is a user of the Service (“<b>User</b>,”
              or “<b>user</b>”) who has registered an account with us (“<b>Account</b>”).&nbsp;{' '}
            </span>
          </p>
          <p
            className="MsoNormal"
            style={{ lineHeight: 'normal', background: 'white', border: 'none', padding: '0in' }}
          >
            <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif' }}>
              &nbsp;
            </span>
          </p>
          <p
            className="MsoNormal"
            style={{ lineHeight: 'normal', background: 'white', border: 'none', padding: '0in' }}
          >
            <u>
              <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif', color: 'black', background: 'white' }}>
                Registration Data
              </span>
            </u>
            <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif', color: 'black', background: 'white' }}>
              .&nbsp; In order to register for the service, you must receive an invite from your Employer. In
              registering for the Service, you agree to (i) provide true, accurate, current and complete information
              about yourself as prompted by the Service’s registration form (the “<b>Registration Data</b>”); and (ii)
              maintain and promptly update the Registration Data to keep it true, accurate, current and complete.&nbsp;
              You represent that you are not a person barred from using the Service under the laws of any applicable
              jurisdiction.&nbsp; You are responsible for all activities that occur under your Account.&nbsp;&nbsp; You
              agree that you shall monitor your Account to restrict use by Minors, and you will accept full
              responsibility for any unauthorized use of the Service by Minors.&nbsp; You may not share your Account or
              password with anyone, and you agree to (A) notify Coordination Centric immediately of any unauthorized use
              of your password or any other breach of security; and (B) exit from your Account at the end of each
              session.&nbsp; If you provide any information that is untrue, inaccurate, not current or incomplete, or
              Coordination Centric has reasonable grounds to suspect that such information is untrue, inaccurate, not
              current or incomplete, Coordination Centric has the right to suspend or terminate your Account and refuse
              any and all current or future use of the Service (or any portion thereof).&nbsp; You agree not to create
              an Account using a false identity or information, or on behalf of someone other than yourself or the Minor
              you represent, or register for an account on behalf of any group or entity unless you are legally
              authorized to bind such person, group or entity to these Terms. By registering another person, group or
              entity you hereby represent that you are legally authorized to do so.&nbsp; You agree not to create or use
              more than one Account at any given time.&nbsp; You agree not to create an Account or use the Service if
              Coordination Centric has previously removed you, or if you have been previously banned from use of the
              Service, nor to designate other individuals to use an account on your behalf.
            </span>
          </p>
          <p
            className="MsoNormal"
            style={{ lineHeight: 'normal', background: 'white', border: 'none', padding: '0in' }}
          >
            <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif' }}>
              &nbsp;
            </span>
          </p>
          <p
            className="MsoNormal"
            align="center"
            style={{ textAlign: 'center', lineHeight: 'normal', background: 'white', border: 'none', padding: '0in' }}
          >
            <b>
              <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif', color: 'black' }}>
                Computer Equipment, Data Network, and Internet Access
              </span>
            </b>
          </p>
          <p
            className="MsoNormal"
            style={{ lineHeight: 'normal', background: 'white', border: 'none', padding: '0in' }}
          >
            <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif' }}>
              &nbsp;
            </span>
          </p>
          <p
            className="MsoNormal"
            style={{ lineHeight: 'normal', background: 'white', border: 'none', padding: '0in' }}
          >
            <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif', color: 'black' }}>
              You are responsible for obtaining, installing, maintaining and operating all software, hardware or other
              equipment (collectively, "Systems") necessary for you to access and use the Service. This includes,
              without limitation, obtaining Internet services, using up to date web-browsers and the best commercially
              available encryption, antivirus, anti-spyware, and internet security software. You are responsible for the
              data security of the Systems used to access the Service and for the transmission and receipt of
              information using such Systems. We are not responsible for any errors or problems that arise from the
              malfunction or failure of the Internet or your Systems.{' '}
            </span>
          </p>
          <p
            className="MsoNormal"
            style={{ lineHeight: 'normal', background: 'white', border: 'none', padding: '0in' }}
          >
            <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif' }}>
              &nbsp;
            </span>
          </p>
          <p
            className="MsoNormal"
            style={{ lineHeight: 'normal', background: 'white', border: 'none', padding: '0in' }}
          >
            <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif', color: 'black' }}>
              THERE ARE ALWAYS CERTAIN SECURITY AND ACCESS AVAILABILITY RISKS ASSOCIATED WITH USING OPEN NETWORKS SUCH
              AS THE INTERNET, AND YOU EXPRESSLY ASSUME SUCH RISKS.
            </span>
          </p>
          <p
            className="MsoNormal"
            style={{ lineHeight: 'normal', background: 'white', border: 'none', padding: '0in' }}
          >
            <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif' }}>
              &nbsp;
            </span>
          </p>
          <p
            className="MsoNormal"
            style={{ lineHeight: 'normal', background: 'white', border: 'none', padding: '0in' }}
          >
            <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif', color: 'black' }}>
              When you access the Service through a mobile network, your network’s messaging, data, roaming and/or other
              rates and fees may apply.&nbsp; Downloading, installing or using certain services may be prohibited or
              restricted by your network provider and not all features of the Service may work with your network
              provider or device.&nbsp; The Service may require an internet connection to access internet-based
              features, authenticate the Service, or perform other functions. You acknowledge that Coordination Centric
              is not responsible for paying any fees associated with Internet access, mobile data, messaging, etc.
            </span>
          </p>
        </div>
        <h3
          align="center"
          style={{
            margin: '0in',
            textAlign: 'center',
            lineHeight: 'normal',
            pageBreakAfter: 'auto',
            background: 'white',
          }}
        >
          <a name="_heading=h.1t3h5sf" />
          <b>
            <span lang="EN" style={{ fontSize: '11.0pt', fontFamily: '"Calibri",sans-serif', color: 'black' }}>
              What does Coordination Centric cost?
            </span>
          </b>
        </h3>
        <div
          style={{
            border: 'none',
            borderBottom: 'none black 1.0pt',
            padding: '0in 0in 11.0pt 0in',
            background: 'white',
          }}
        >
          <p
            className="MsoNormal"
            style={{ lineHeight: 'normal', background: 'white', border: 'none', padding: '0in' }}
          >
            <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif', color: 'black' }}>
              Coordination Centric does not charge Employees or Employer Personnel directly for use of the Service.
              Please check with your Employer for any fees or charges which may be billed to you or your insurance
              company for use of the Service.
            </span>
          </p>
        </div>
        <h3
          align="center"
          style={{
            margin: '0in',
            textAlign: 'center',
            lineHeight: 'normal',
            pageBreakAfter: 'auto',
            background: 'white',
          }}
        >
          <a name="_heading=h.4d34og8" />
          <b>
            <span lang="EN" style={{ fontSize: '11.0pt', fontFamily: '"Calibri",sans-serif', color: 'black' }}>
              What am I <u>not</u> allowed to do when using the Service?
            </span>
          </b>
        </h3>
        <div
          style={{
            border: 'none',
            borderBottom: 'none black 1.0pt',
            padding: '0in 0in 11.0pt 0in',
            background: 'white',
          }}
        >
          <p
            className="MsoNormal"
            style={{ lineHeight: 'normal', background: 'white', border: 'none', padding: '0in' }}
          >
            <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif', color: 'black' }}>
              In addition to your other promises and obligations, by using Coordination Centric’s Service, Users{' '}
              <b>
                agree <u>NOT</u> to
              </b>
              :
            </span>
          </p>
        </div>
        <p
          className="MsoNormal"
          style={{ marginLeft: '.5in', textIndent: '-.25in', lineHeight: 'normal', background: 'white' }}
        >
          <span lang="EN" style={{ fontSize: '15.0pt', fontFamily: '"Frank Ruhl Libre"' }}>
            ●<span style={{ font: '7.0pt "Times New Roman"' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>
          </span>
          <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif', color: 'black' }}>
            Use your account or the Service to advertise, solicit, or transmit any commercial advertisements, including
            chain letters, junk email or repetitive messages (spim and spam) to anyone;
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{ marginLeft: '.5in', textIndent: '-.25in', lineHeight: 'normal', background: 'white' }}
        >
          <span lang="EN" style={{ fontSize: '15.0pt', fontFamily: '"Frank Ruhl Libre"' }}>
            ●<span style={{ font: '7.0pt "Times New Roman"' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>
          </span>
          <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif', color: 'black' }}>
            Use your account or Service to engage in, discuss or incite any illegal conduct or activity;
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{ marginLeft: '.5in', textIndent: '-.25in', lineHeight: 'normal', background: 'white' }}
        >
          <span lang="EN" style={{ fontSize: '15.0pt', fontFamily: '"Frank Ruhl Libre"' }}>
            ●<span style={{ font: '7.0pt "Times New Roman"' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>
          </span>
          <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif', color: 'black' }}>
            Access another user’s account without permission;
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{ marginLeft: '.5in', textIndent: '-.25in', lineHeight: 'normal', background: 'white' }}
        >
          <span lang="EN" style={{ fontSize: '15.0pt', fontFamily: '"Frank Ruhl Libre"' }}>
            ●<span style={{ font: '7.0pt "Times New Roman"' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>
          </span>
          <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif', color: 'black' }}>
            Use the Service in any manner that violates any applicable laws or regulations or is prohibited by these
            Terms;
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{ marginLeft: '.5in', textIndent: '-.25in', lineHeight: 'normal', background: 'white' }}
        >
          <span lang="EN" style={{ fontSize: '15.0pt', fontFamily: '"Frank Ruhl Libre"' }}>
            ●<span style={{ font: '7.0pt "Times New Roman"' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>
          </span>
          <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif', color: 'black' }}>
            Collect or harvest any information about other users;
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{ marginLeft: '.5in', textIndent: '-.25in', lineHeight: 'normal', background: 'white' }}
        >
          <span lang="EN" style={{ fontSize: '15.0pt', fontFamily: '"Frank Ruhl Libre"' }}>
            ●<span style={{ font: '7.0pt "Times New Roman"' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>
          </span>
          <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif', color: 'black' }}>
            Post, request, or link to obscene, threatening, embarrassing, hateful, racially or ethnically insulting,
            inciteful, deceptive, tortuous, defamatory, libelous, harassing, stalking or otherwise inappropriate or
            offensive material or conduct or that otherwise violate the legal rights (such as rights of privacy and
            publicity) of others;
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{ marginLeft: '.5in', textIndent: '-.25in', lineHeight: 'normal', background: 'white' }}
        >
          <span lang="EN" style={{ fontSize: '15.0pt', fontFamily: '"Frank Ruhl Libre"' }}>
            ●<span style={{ font: '7.0pt "Times New Roman"' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>
          </span>
          <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif', color: 'black' }}>
            Discuss, promote, or depict any form of child sexuality, abuse, exploitation, or related topics that may be
            harmful to or threaten the security of a child or minor;
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{ marginLeft: '.5in', textIndent: '-.25in', lineHeight: 'normal', background: 'white' }}
        >
          <span lang="EN" style={{ fontSize: '15.0pt', fontFamily: '"Frank Ruhl Libre"' }}>
            ●<span style={{ font: '7.0pt "Times New Roman"' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>
          </span>
          <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif', color: 'black' }}>
            Use features of the Service for anything other than their intended purpose;
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{ marginLeft: '.5in', textIndent: '-.25in', lineHeight: 'normal', background: 'white' }}
        >
          <span lang="EN" style={{ fontSize: '15.0pt', fontFamily: '"Frank Ruhl Libre"' }}>
            ●<span style={{ font: '7.0pt "Times New Roman"' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>
          </span>
          <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif', color: 'black' }}>
            Interfere with or disable any security-related features of the Service, or any part thereof, including any
            services available on or through any Third-Party Sites or through your employer;
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{ marginLeft: '.5in', textIndent: '-.25in', lineHeight: 'normal', background: 'white' }}
        >
          <span lang="EN" style={{ fontSize: '15.0pt', fontFamily: '"Frank Ruhl Libre"' }}>
            ●<span style={{ font: '7.0pt "Times New Roman"' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>
          </span>
          <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif', color: 'black' }}>
            Decipher, decompile, disassemble, reverse engineer or otherwise attempt to derive any code or underlying
            ideas or algorithms of any part of the Service;
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{ marginLeft: '.5in', textIndent: '-.25in', lineHeight: 'normal', background: 'white' }}
        >
          <span lang="EN" style={{ fontSize: '15.0pt', fontFamily: '"Frank Ruhl Libre"' }}>
            ●<span style={{ font: '7.0pt "Times New Roman"' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>
          </span>
          <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif', color: 'black' }}>
            Use any robot, spider, scraper or other automated means to access the Service;
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{ marginLeft: '.5in', textIndent: '-.25in', lineHeight: 'normal', background: 'white' }}
        >
          <span lang="EN" style={{ fontSize: '15.0pt', fontFamily: '"Frank Ruhl Libre"' }}>
            ●<span style={{ font: '7.0pt "Times New Roman"' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>
          </span>
          <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif', color: 'black' }}>
            Take any action that imposes an unreasonable or disproportionately large load on our infrastructure;
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{ marginLeft: '.5in', textIndent: '-.25in', lineHeight: 'normal', background: 'white' }}
        >
          <span lang="EN" style={{ fontSize: '15.0pt', fontFamily: '"Frank Ruhl Libre"' }}>
            ●<span style={{ font: '7.0pt "Times New Roman"' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>
          </span>
          <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif', color: 'black' }}>
            Post anything contrary to our public image, goodwill or reputation;
          </span>
        </p>
        <p
          className="MsoNormal"
          style={{ marginLeft: '.5in', textIndent: '-.25in', lineHeight: 'normal', background: 'white' }}
        >
          <span lang="EN" style={{ fontSize: '15.0pt', fontFamily: '"Frank Ruhl Libre"' }}>
            ●<span style={{ font: '7.0pt "Times New Roman"' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>
          </span>
          <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif', color: 'black' }}>
            Engage in any other prohibited conduct;
          </span>
        </p>
        <div
          style={{
            border: 'none',
            borderBottom: 'none black 1.0pt',
            padding: '0in 0in 11.0pt 0in',
            background: 'white',
          }}
        >
          <p
            className="MsoNormal"
            style={{ lineHeight: 'normal', background: 'white', border: 'none', padding: '0in' }}
          >
            <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif' }}>
              &nbsp;
            </span>
          </p>
          <p
            className="MsoNormal"
            style={{ lineHeight: 'normal', background: 'white', border: 'none', padding: '0in' }}
          >
            <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif', color: 'black' }}>
              This list of prohibitions provides examples and is not complete or exclusive.&nbsp; Coordination Centric
              reserves the right to (i) terminate access to your Account, your ability to use the Service; and (ii)
              refuse, delete or remove any data submission(s), with or without cause and with or without notice, for any
              reason or no reason, or for any action that Coordination Centric determines is inappropriate or disruptive
              to this Service or to any other user of this Service.<b> </b>
            </span>
          </p>
          <p
            className="MsoNormal"
            style={{ lineHeight: 'normal', background: 'white', border: 'none', padding: '0in' }}
          >
            <b>
              <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif' }}>
                &nbsp;
              </span>
            </b>
          </p>
          <p
            className="MsoNormal"
            style={{ lineHeight: 'normal', background: 'white', border: 'none', padding: '0in' }}
          >
            <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif', color: 'black' }}>
              Coordination Centric does not have any obligation to, but may monitor your use of the Service for
              compliance with these terms.
              <b>
                {' '}
                COORDINATION CENTRIC MAY REPORT TO LAW ENFORCEMENT AUTHORITIES ANY ACTIONS THAT MAY BE ILLEGAL, AND ANY
                REPORTS IT RECEIVES OF SUCH CONDUCT.
              </b>{' '}
              <b>
                &nbsp;WHEN LEGALLY REQUIRED OR AT COORDINATION CENTRIC’S DISCRETION, COORDINATION CENTRIC WILL COOPERATE
                WITH LAW ENFORCEMENT AGENCIES IN ANY INVESTIGATION OF ALLEGED ILLEGAL ACTIVITY THROUGH THE USE OF THIS
                SERVICE.
              </b>
            </span>
          </p>
          <p
            className="MsoNormal"
            style={{ lineHeight: 'normal', background: 'white', border: 'none', padding: '0in' }}
          >
            <a name="_heading=h.2s8eyo1" />
            <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif' }}>
              &nbsp;
            </span>
          </p>
          <p
            className="MsoNormal"
            align="center"
            style={{ textAlign: 'center', lineHeight: 'normal', background: 'white', border: 'none', padding: '0in' }}
          >
            <b>
              <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif', color: 'black' }}>
                How do I provide feedback to Coordination Centric and who owns it?
              </span>
            </b>
          </p>
          <p
            className="MsoNormal"
            style={{ lineHeight: 'normal', background: 'white', border: 'none', padding: '0in' }}
          >
            <b>
              <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif' }}>
                &nbsp;
              </span>
            </b>
          </p>
          <p
            className="MsoNormal"
            style={{ lineHeight: 'normal', background: 'white', border: 'none', padding: '0in' }}
          >
            <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif', color: 'black' }}>
              If you send or transmit any communications, comments, questions, suggestions, or related materials to
              Coordination Centric, whether by letter, email, telephone, or otherwise (collectively, “<b>Feedback</b>”),
              suggesting or recommending changes to the Service, including, without limitation, new features or
              functionality relating thereto, all such Feedback is, and will be treated as, non-confidential and
              non-proprietary and may be shared with your employer in Coordination Centric’s discretion.&nbsp; You
              hereby assign all right, title, and interest in, and Coordination Centric is free to use, without any
              attribution or compensation to you, any ideas, know-how, concepts, techniques, or other intellectual
              property and proprietary rights contained in the Feedback, whether or not patentable, for any purpose
              whatsoever, including but not limited to, developing, manufacturing, having manufactured, licensing,
              marketing, and selling, directly or indirectly, products and services using such Feedback.&nbsp; You
              understand and agree that Coordination Centric is not obligated to use, display, reproduce, or distribute
              any such ideas, know-how, concepts, or techniques contained in the Feedback, and you have no right to
              compel such use, display, reproduction, or distribution.
            </span>
          </p>
        </div>
        <p className="MsoNormal" align="center" style={{ textAlign: 'center', lineHeight: 'normal' }}>
          <a name="_heading=h.17dp8vu" />
          <b>
            <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif' }}>
              How and when can my account be terminated?
            </span>
          </b>
        </p>
        <p className="MsoNormal" style={{ lineHeight: 'normal' }}>
          <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif' }}>
            &nbsp;
          </span>
        </p>
        <p className="MsoNormal" style={{ lineHeight: 'normal' }}>
          <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif' }}>
            If you breach any of these Terms, we may suspend or disable your account or terminate your access to the
            Service without prior notice to you. If you are an Employee, we will notify your employer organization about
            any such termination.&nbsp; There may be other instances where we may need to terminate your access to the
            Service that are not related to any of your actions or inactions.&nbsp; We reserve the right to terminate
            your access to and use of the Service and materials at any time, with or without cause, and will notify your
            employer organization of any such termination.&nbsp;{' '}
          </span>
        </p>
        <h3 style={{ margin: '0in', lineHeight: 'normal' }}>
          <span lang="EN" style={{ fontSize: '11.0pt', fontFamily: '"Calibri",sans-serif', color: 'black' }}>
            Your account can be disabled by your administrator or, in the alternative, by emailing us at
            info@coordinationcentric.com.&nbsp;{' '}
          </span>
        </h3>
        <p className="MsoNormal">
          <span lang="EN">&nbsp;</span>
        </p>
        <h3
          align="center"
          style={{
            margin: '0in',
            textAlign: 'center',
            lineHeight: 'normal',
            pageBreakAfter: 'auto',
            background: 'white',
          }}
        >
          <a name="_heading=h.3rdcrjn" />
          <b>
            <span lang="EN" style={{ fontSize: '11.0pt', fontFamily: '"Calibri",sans-serif', color: 'black' }}>
              &nbsp;
            </span>
          </b>
        </h3>
        <h3
          align="center"
          style={{
            margin: '0in',
            textAlign: 'center',
            lineHeight: 'normal',
            pageBreakAfter: 'auto',
            background: 'white',
          }}
        >
          <a name="_heading=h.qemf3yz2iw9f" />
          <b>
            <span lang="EN" style={{ fontSize: '11.0pt', fontFamily: '"Calibri",sans-serif', color: 'black' }}>
              Third-Parties and Third-Party Sites
            </span>
          </b>
        </h3>
        <div
          style={{
            border: 'none',
            borderBottom: 'none black 1.0pt',
            padding: '0in 0in 11.0pt 0in',
            background: 'white',
          }}
        >
          <p
            className="MsoNormal"
            style={{ lineHeight: 'normal', background: 'white', border: 'none', padding: '0in' }}
          >
            <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif', color: 'black' }}>
              The Service may be linked to other websites that are not Coordination Centric properties (collectively,
              “Third-Party Sites”).&nbsp; You acknowledge and agree that the Third-Party Sites may have different
              privacy policies, terms and conditions, user guides, and/or business practices (“Third-Party Rules”) than
              Coordination Centric, and you further acknowledge and agree that your use of such Third-Party Sites is
              governed by the respective Third-Party Rules.&nbsp; Coordination Centric does not verify, make any
              representations or take responsibility for any Third-Party Site, including, without limitation, the
              truthfulness, accuracy, quality or completeness of the content, services, links displayed and/or any other
              activities conducted on or through such Third-Party Sites.&nbsp;{' '}
            </span>
          </p>
          <p
            className="MsoNormal"
            style={{ lineHeight: 'normal', background: 'white', border: 'none', padding: '0in' }}
          >
            <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif' }}>
              &nbsp;
            </span>
          </p>
          <p
            className="MsoNormal"
            style={{ lineHeight: 'normal', background: 'white', border: 'none', padding: '0in' }}
          >
            <b>
              <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif', color: 'black' }}>
                YOU AGREE THAT COORDINATION CENTRIC WILL NOT, UNDER ANY CIRCUMSTANCES, BE RESPONSIBLE OR LIABLE,
                DIRECTLY OR INDIRECTLY, FOR ANY GOODS, SERVICES, APPLICATIONS, INFORMATION, RESOURCES AND/OR CONTENT
                AVAILABLE ON OR THROUGH ANY THIRD-PARTY SITES AND/OR THIRD-PARTY DEALINGS OR COMMUNICATIONS, OR FOR ANY
                HARM RELATED THERETO, OR FOR ANY DAMAGES OR LOSS CAUSED OR ALLEGED TO BE CAUSED BY OR IN CONNECTION WITH
                YOUR USE OR RELIANCE ON THE CONTENT OR BUSINESS PRACTICES OF ANY THIRD-PARTY
              </span>
            </b>
            <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif', color: 'black' }}>
              .&nbsp; Any reference on the Service to any product, service, publication, institution, organization of
              any third-party entity or individual does not constitute or imply Coordination Centric’s endorsement or
              recommendation.
            </span>
          </p>
        </div>
        <h3
          align="center"
          style={{
            margin: '0in',
            textAlign: 'center',
            lineHeight: 'normal',
            pageBreakAfter: 'auto',
            background: 'white',
          }}
        >
          <a name="_heading=h.26in1rg" />
          <b>
            <span lang="EN" style={{ fontSize: '11.0pt', fontFamily: '"Calibri",sans-serif', color: 'black' }}>
              Warranty Disclaimers
            </span>
          </b>
        </h3>
        <div
          style={{
            border: 'none',
            borderBottom: 'none black 1.0pt',
            padding: '0in 0in 11.0pt 0in',
            background: 'white',
          }}
        >
          <p
            className="MsoNormal"
            style={{ lineHeight: 'normal', background: 'white', border: 'none', padding: '0in' }}
          >
            <b>
              <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif', color: 'black' }}>
                You use the Service at your own risk. THE SERVICE IS PROVIDED ON AN “AS IS” AND “AS AVAILABLE” BASIS,
                WITHOUT WARRANTIES OF ANY KIND, AND TO THE FULLEST EXTENT PERMITTED BY LAW, COORDINATION CENTRIC (AND
                ITS OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, ASSOCIATES, PARTNERS, LICENSORS AND SUPPLIERS) DISCLAIMS ALL
                WARRANTIES EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, THE WARRANTIES OF MERCHANTABILITY, FITNESS
                FOR A PARTICULAR PURPOSE, TITLE, NON-INFRINGEMENT, AND THOSE ARISING FROM COURSE OF DEALING OR USAGE OF
                TRADE. COORDINATION CENTRIC DOES NOT WARRANT THAT YOU WILL BE ABLE TO ACCESS OR USE THE SERVICE AT THE
                TIMES OR LOCATIONS OF YOUR CHOOSING; THAT THE SERVICE WILL BE UNINTERRUPTED OR ERROR-FREE; THAT DEFECTS
                WILL BE CORRECTED; OR THAT THE SERVICE IS FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS.
              </span>
            </b>
          </p>
          <p
            className="MsoNormal"
            style={{ lineHeight: 'normal', background: 'white', border: 'none', padding: '0in' }}
          >
            <b>
              <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif' }}>
                &nbsp;
              </span>
            </b>
          </p>
          <p
            className="MsoNormal"
            style={{ lineHeight: 'normal', background: 'white', border: 'none', padding: '0in' }}
          >
            <b>
              <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif', color: 'black' }}>
                YOU ARE SOLELY RESPONSIBLE FOR ALL OF YOUR COMMUNICATIONS AND INTERACTIONS WITH OTHER USERS OF THE
                COORDINATION CENTRIC SERVICE, INCLUDING OTHER EMPLOYEES AND/OR EMPLOYERS. YOU UNDERSTAND THAT
                COORDINATION CENTRIC DOES NOT MAKE ANY ATTEMPT TO VERIFY THE STATEMENTS OF USERS OF THE SERVICE.
              </span>
            </b>
          </p>
        </div>
        <h3
          align="center"
          style={{
            margin: '0in',
            textAlign: 'center',
            lineHeight: 'normal',
            pageBreakAfter: 'auto',
            background: 'white',
          }}
        >
          <a name="_heading=h.lnxbz9" />
          <b>
            <span lang="EN" style={{ fontSize: '11.0pt', fontFamily: '"Calibri",sans-serif', color: 'black' }}>
              Liability Limitation
            </span>
          </b>
        </h3>
        <div
          style={{
            border: 'none',
            borderBottom: 'none black 1.0pt',
            padding: '0in 0in 11.0pt 0in',
            background: 'white',
          }}
        >
          <p
            className="MsoNormal"
            style={{ lineHeight: 'normal', background: 'white', border: 'none', padding: '0in' }}
          >
            <b>
              <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif', color: 'black' }}>
                NOTHING IN THESE TERMS AFFECTS YOUR LEGAL RIGHTS AS A CONSUMER OR EXCLUDES OR LIMITS ANY LIABILITY WHICH
                CANNOT BE LEGALLY EXCLUDED OR LIMITED. COORDINATION CENTRIC WILL NOT BE LIABLE TO YOU FOR ANY INDIRECT,
                INCIDENTAL, CONSEQUENTIAL, SPECIAL, PUNITIVE, REMOTE OR OTHER SIMILAR DAMAGES, INCLUDING, BUT NOT
                LIMITED TO, LOSS OF REVENUES, LOST PROFITS, LOST DATA, OR BUSINESS INTERRUPTION OR OTHER INTANGIBLE
                LOSSES (HOWEVER SUCH LOSSES ARE QUALIFIED), ARISING OUT OF OR RELATING IN ANY WAY TO THESE TERMS OR THE
                SERVICE ITSELF, WHETHER BASED ON CONTRACT, TORT OR ANY OTHER LEGAL THEORY, AND WHETHER OR NOT
                COORDINATION CENTRIC HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. SUBJECT TO THE EXCLUSIONS
                EXPRESSLY SET FORTH IN THIS SECTION, IN ALL EVENTS, COORDINATION CENTRIC SHALL NOT BE LIABLE TO YOU FOR
                MORE THAN THE AMOUNT YOU HAVE PAID TO COORDINATION CENTRIC IN ACCORDANCE WITH THESE TERMS IN THE SIX (6)
                MONTHS IMMEDIATELY PRECEDING THE DATE ON WHICH YOU FIRST ASSERT A CLAIM. YOU ACKNOWLEDGE AND AGREE THAT
                IF YOU HAVE NOT PAID ANYTHING TO COORDINATION CENTRIC DURING SUCH TIME PERIOD, YOUR SOLE REMEDY (AND
                COORDINATION CENTRIC’S EXCLUSIVE LIABILITY) FOR ANY DISPUTE WITH COORDINATION CENTRIC IS TO STOP USING
                THE SERVICE AND TO CANCEL YOUR ACCOUNT.&nbsp; HOWEVER, YOUR EMPLOYER ORGANIZATION MAY RETAIN YOUR DATA
                OUTSIDE OF COORDINATION CENTRIC’S CONTROL.
              </span>
            </b>
          </p>
          <p
            className="MsoNormal"
            style={{ lineHeight: 'normal', background: 'white', border: 'none', padding: '0in' }}
          >
            <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif' }}>
              &nbsp;
            </span>
          </p>
          <p
            className="MsoNormal"
            style={{ lineHeight: 'normal', background: 'white', border: 'none', padding: '0in' }}
          >
            <a name="_heading=h.35nkun2" />
            <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif', color: 'black' }}>
              THE LIMITATIONS OF DAMAGES SET FORTH ABOVE ARE FUNDAMENTAL ELEMENTS OF THE BASIS OF THE BARGAIN BETWEEN
              COORDINATION CENTRIC AND YOU.&nbsp; To the extent that Coordination Centric may not, as a matter of
              applicable law, disclaim any warranty or limit its liability as set forth in these Terms, the scope of
              such warranty, and the extent of Coordination Centric’s liability, will be the minimum permitted under
              such applicable law.{' '}
            </span>
          </p>
        </div>
        <h3
          align="center"
          style={{
            margin: '0in',
            textAlign: 'center',
            lineHeight: 'normal',
            pageBreakAfter: 'auto',
            background: 'white',
          }}
        >
          <a name="_heading=h.1ksv4uv" />
          <b>
            <span lang="EN" style={{ fontSize: '11.0pt', fontFamily: '"Calibri",sans-serif', color: 'black' }}>
              Use outside the U.S.
            </span>
          </b>
        </h3>
        <div
          style={{
            border: 'none',
            borderBottom: 'none black 1.0pt',
            padding: '0in 0in 11.0pt 0in',
            background: 'white',
          }}
        >
          <p
            className="MsoNormal"
            style={{ lineHeight: 'normal', background: 'white', border: 'none', padding: '0in' }}
          >
            <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif', color: 'black' }}>
              Coordination Centric controls and operates the Service from its headquarters in the United States of
              America and it may not be appropriate or available for use in other locations. If you use the Service
              outside the United States of America, you are responsible for following applicable local laws.
            </span>
          </p>
        </div>
        <h3
          align="center"
          style={{
            margin: '0in',
            textAlign: 'center',
            lineHeight: 'normal',
            pageBreakAfter: 'auto',
            background: 'white',
          }}
        >
          <a name="_heading=h.2jxsxqh" />
          <b>
            <span lang="EN" style={{ fontSize: '11.0pt', fontFamily: '"Calibri",sans-serif', color: 'black' }}>
              Dispute Resolution and Arbitration; Class Action Waiver
            </span>
          </b>
        </h3>
        <p className="MsoNormal" style={{ lineHeight: 'normal' }}>
          <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif' }}>
            &nbsp;
          </span>
        </p>
        <div
          style={{
            border: 'none',
            borderBottom: 'none black 1.0pt',
            padding: '0in 0in 11.0pt 0in',
            background: 'white',
          }}
        >
          <p
            className="MsoNormal"
            style={{ lineHeight: 'normal', background: 'white', border: 'none', padding: '0in' }}
          >
            <b>
              <u>
                <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif', color: 'black' }}>
                  Please read this carefully if you are a resident of the United States of America.&nbsp; It affects
                  your rights.
                </span>
              </u>
            </b>
          </p>
        </div>
        <div
          style={{
            border: 'none',
            borderBottom: 'none black 1.0pt',
            padding: '20.0pt 20.0pt 5.0pt 20.0pt',
            background: 'white',
            marginLeft: '.25in',
            marginRight: '0in',
          }}
        >
          <p
            className="MsoNormal"
            style={{
              marginLeft: '.25in',
              textIndent: '-.25in',
              lineHeight: 'normal',
              background: 'white',
              border: 'none',
              padding: '0in',
            }}
          >
            <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif', color: 'black' }}>
              (a)<span style={{ font: '7.0pt "Times New Roman"' }}>&nbsp;&nbsp;&nbsp;</span>
            </span>
            <u>
              <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif', color: 'black' }}>
                Disputes and Applicable Law
              </span>
            </u>
            <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif', color: 'black' }}>
              .&nbsp; These Terms will be subject to and construed in accordance with the laws of the State of Texas,
              United States of America excluding its rules regarding conflicts of law. You agree that any claim or
              dispute you may have against Coordination Centric must be resolved exclusively by a state or federal court
              located in the State of Texas, except as otherwise agreed by the parties or as described in the
              Arbitration subsection below. You agree to submit to the personal jurisdiction of the courts located in
              Brazos County, Texas for the purpose of litigating all such claims or disputes.
            </span>
          </p>
        </div>

        <div
          style={{
            border: 'none',
            borderBottom: 'none black 1.0pt',
            padding: '20.0pt 20.0pt 5.0pt 20.0pt',
            background: 'white',
            marginLeft: '.25in',
            marginRight: '0in',
          }}
        >
          <p
            className="MsoNormal"
            style={{
              marginLeft: '.25in',
              textIndent: '-.25in',
              lineHeight: 'normal',
              background: 'white',
              border: 'none',
              padding: '0in',
            }}
          >
            <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif', color: 'black' }}>
              (b)<span style={{ font: '7.0pt "Times New Roman"' }}>&nbsp;&nbsp;&nbsp;</span>
            </span>
            <u>
              <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif', color: 'black' }}>
                Arbitration.
              </span>
            </u>
            <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif', color: 'black' }}>
              {' '}
              You agree that Coordination Centric may elect to resolve any dispute, whether brought by You or
              Coordination Centric, through binding non-appearance-based arbitration. In the event Coordination Centric
              elects arbitration, you hereby agree to move any claims to the exclusive jurisdiction of an arbitration
              procedure, which shall be initiated through an established alternative dispute resolution provider (“ADR”)
              chosen by Coordination Centric. The ADR provider and the parties must comply with the following rules: (i)
              the arbitration shall be conducted by telephone, online and/or be solely based on written submissions, the
              specific manner shall be chosen by the party initiating the arbitration; (ii) the arbitration shall not
              involve any personal appearance by the parties or witnesses unless otherwise mutually agreed by the
              parties, in which case the location of the arbitration shall be Brazos County, Texas; and (iii) any
              judgment on the award rendered by the arbitrator may be entered in any court of competent jurisdiction.
              Arbitration expressly excludes claims for injunctive or other equitable relief.
            </span>
          </p>
        </div>
        <div
          style={{
            border: 'none',
            borderBottom: 'none black 1.0pt',
            padding: '20.0pt 20.0pt 5.0pt 20.0pt',
            background: 'white',
            marginLeft: '.25in',
            marginRight: '0in',
          }}
        >
          <p
            className="MsoNormal"
            style={{
              marginLeft: '.25in',
              textIndent: '-.25in',
              lineHeight: 'normal',
              background: 'white',
              border: 'none',
              padding: '0in',
            }}
          >
            <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif', color: 'black' }}>
              (c)<span style={{ font: '7.0pt "Times New Roman"' }}>&nbsp;&nbsp;&nbsp;&nbsp;</span>
            </span>
            <u>
              <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif', color: 'black' }}>
                Waiver of Jury Trial.
              </span>
            </u>
            <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif', color: 'black' }}>
              &nbsp;{' '}
              <b>
                YOU HEREBY WAIVE YOUR CONSTITUTIONAL AND STATUTORY RIGHTS TO GO TO COURT AND HAVE A TRIAL IN FRONT OF A
                JUDGE OR A JURY AS TO ANY CLAIMS AGAINST COORDINATION CENTRIC, NOT THOSE CLAIMS WHICH YOU MAY HAVE
                AGAINST YOUR EMPLOYER OR THAT YOUR EMPLOYER MAY HAVE AGAINST YOU
              </b>
              . In the event any litigation should arise between you and Coordination Centric in any state or federal
              court in a suit to vacate or enforce an arbitration award or otherwise, YOU WAIVE ALL RIGHTS TO A JURY
              TRIAL, instead electing that the dispute be resolved by a judge.{' '}
            </span>
          </p>
        </div>

        <div
          style={{
            border: 'none',
            borderBottom: 'none black 1.0pt',
            padding: '20.0pt 20.0pt 5.0pt 20.0pt',
            background: 'white',
            marginLeft: '.25in',
            marginRight: '0in',
          }}
        >
          <p
            className="MsoNormal"
            style={{
              marginLeft: '.25in',
              textIndent: '-.25in',
              lineHeight: 'normal',
              background: 'white',
              border: 'none',
              padding: '0in',
            }}
          >
            <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif', color: 'black' }}>
              (d)<span style={{ font: '7.0pt "Times New Roman"' }}>&nbsp;&nbsp;&nbsp;</span>
            </span>
            <u>
              <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif', color: 'black' }}>
                Waiver of Class or Consolidated Actions.{' '}
              </span>
            </u>
            <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif', color: 'black' }}>
              &nbsp;ALL CLAIMS AND DISPUTES WITHIN THE SCOPE OF THESE TERMS BETWEEN YOU AND COORDINATION CENTRIC MUST BE
              ARBITRATED OR LITIGATED ON AN INDIVIDUAL BASIS AND NOT ON A CLASS BASIS, AND CLAIMS OF MORE THAN ONE USER
              CANNOT BE ARBITRATED OR LITIGATED JOINTLY OR CONSOLIDATED WITH THOSE OF ANY OTHER USER.&nbsp; NOTHING IN
              THIS PARAGRAPH MODIFIES ANY AGREEMENTS, RIGHTS OR RESPONSIBILITIES BETWEEN YOU AND YOUR EMPLOYER.
            </span>
          </p>
        </div>
        <h3
          align="center"
          style={{
            margin: '0in',
            textAlign: 'center',
            lineHeight: 'normal',
            pageBreakAfter: 'auto',
            background: 'white',
          }}
        >
          <a name="_heading=h.z337ya" />
          <b>
            <span
              lang="EN"
              style={{ fontSize: '11.0pt', fontFamily: '"Calibri",sans-serif', color: 'black', background: 'white' }}
            >
              How do I opt-out of receiving emails from Coordination Centric?
            </span>
          </b>
        </h3>
        <p className="MsoNormal" style={{ lineHeight: 'normal' }}>
          <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif' }}>
            In using the Service, you may receive periodic email communications regarding the Service, which are part of
            the Service and which you cannot opt out of receiving. If you choose not to receive these communications,
            please see your account administrator.&nbsp; You may not be able to use the Service and should contact your
            Employer organization or Coordination Centric to terminate services.
          </span>
        </p>
        <p className="MsoNormal" style={{ lineHeight: 'normal' }}>
          <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif' }}>
            &nbsp;
          </span>
        </p>
        <h3
          align="center"
          style={{
            margin: '0in',
            textAlign: 'center',
            lineHeight: 'normal',
            pageBreakAfter: 'auto',
            background: 'white',
          }}
        >
          <a name="_heading=h.3j2qqm3" />
          <b>
            <span lang="EN" style={{ fontSize: '11.0pt', fontFamily: '"Calibri",sans-serif', color: 'black' }}>
              California Residents
            </span>
          </b>
        </h3>
        <div
          style={{
            border: 'none',
            borderBottom: 'none black 1.0pt',
            padding: '0in 0in 11.0pt 0in',
            background: 'white',
          }}
        >
          <p
            className="MsoNormal"
            style={{ lineHeight: 'normal', background: 'white', border: 'none', padding: '0in' }}
          >
            <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif', color: 'black' }}>
              Under California Civil Code Section 1789.3, California users are entitled to the following consumer rights
              notice: The Service is provided by Coordination Centric, LLC&nbsp; If you have a question or complaint
              regarding the Service, please contact Coordination Centric’s Customer Service at
              info@coordinationcentric.com.&nbsp; California residents may reach the Complaint Assistance Unit of the
              Division of Consumer Services of the California Department of Consumer Affairs by post at 1625 North
              Market Blvd., Sacramento, CA 95834 or by telephone at (916) 445-1254 or (800) 952-5210 or Hearing Impaired
              at TDD (800) 326-2297 or TDD (916) 322-1700.
            </span>
          </p>
        </div>
        <h3
          align="center"
          style={{
            margin: '0in',
            textAlign: 'center',
            lineHeight: 'normal',
            pageBreakAfter: 'auto',
            background: 'white',
          }}
        >
          <a name="_heading=h.1y810tw" />
          <b>
            <span lang="EN" style={{ fontSize: '11.0pt', fontFamily: '"Calibri",sans-serif', color: 'black' }}>
              General Contract Terms
            </span>
          </b>
        </h3>
        <div
          style={{
            border: 'none',
            borderBottom: 'none black 1.0pt',
            padding: '0in 0in 11.0pt 0in',
            background: 'white',
          }}
        >
          <p
            className="MsoNormal"
            style={{ lineHeight: 'normal', background: 'white', border: 'none', padding: '0in' }}
          >
            <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif', color: 'black' }}>
              These Terms together with our Privacy Policy, any separate Contract we may have executed directly with
              your Employer and any additional terms that we may make available from time to time through our internet
              properties, constitute the entire agreement between you and Coordination Centric regarding your use of our
              Service and supersede and replace any prior written or oral agreements regarding the foregoing. Our
              failure to exercise or enforce any right or provision in these Terms shall not operate as a waiver of such
              right or provision. If any provision of the Terms is found to be unlawful, void or for any reason
              unenforceable, then that provision shall be deemed severable from the Terms and shall not affect the
              validity and enforceability of any remaining provisions. Neither the rights nor obligations arising under
              these Terms are assignable by you. Any such attempted assignment or transfer shall be void and without
              effect. We may assign these Terms without restriction.
            </span>
          </p>
        </div>
        <h3
          align="center"
          style={{
            margin: '0in',
            textAlign: 'center',
            lineHeight: 'normal',
            pageBreakAfter: 'auto',
            background: 'white',
          }}
        >
          <a name="_heading=h.dxlbj7gywi10" />
          <b>
            <span lang="EN" style={{ fontSize: '11.0pt', fontFamily: '"Calibri",sans-serif', color: 'black' }}>
              How can I contact Coordination Centric?
            </span>
          </b>
        </h3>
        <p className="MsoNormal" style={{ lineHeight: 'normal', background: 'white' }}>
          <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif', color: 'black' }}>
            If you have any questions about these Terms or otherwise need to contact Coordination Centric for any
            reason, you can reach us at Coordination Centric, LLC, 216 W 26th St. Bryan, TX 77803<b></b>with a copy to
            info@coordinationcentric.com or call us at (<span style={{ background: 'white' }}>844) 803-9171</span>
          </span>
          <span lang="EN" style={{ fontSize: '12.0pt', fontFamily: '"Calibri",sans-serif', color: 'black' }}>
            .
          </span>
        </p>
        <p className="MsoNormal" style={{ lineHeight: 'normal' }}>
          <span lang="EN" style={{ fontFamily: '"Calibri",sans-serif' }}>
            &nbsp;
          </span>
        </p>
      </div>
      <div className="ac__column ac__right__action">
        <Button
          className={
            readAndAgree && allowCC ? 'ac__next__btn' : 'ac__next__btn_disable'
                          }
          onClick={handleSubmit}
        >
          Continue &nbsp;
          <ArrowForwardIosRoundedIcon />
        </Button>
      </div>
    </div>
  )
}

export default TermsAndConditionsPageComponent

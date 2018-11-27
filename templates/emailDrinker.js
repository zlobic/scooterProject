var mjml2html = require('mjml')

const emailDrinker = function(name) {
  return mjml2html(`
  <mjml>
  <mj-body background-color="#ffffff" font-size="13px">
    <mj-section background-color="#ffffff" padding-bottom="0px" padding-top="0px">
      <mj-column vertical-align="top" width="100%">
        <mj-image src="https://img.clipartxtras.com/22ce23d284dec7cfcfa341265f2aab22_album-archive-mobility-scooter-clipart-mobility-scooter-drawing_226-220.jpeg" alt="scooterTaxi" align="center" border="none" width="600px" padding-left="0px" padding-right="0px" padding-bottom="0px" padding-top="0px"></mj-image>
      </mj-column>
    </mj-section>
    <mj-section background-color="black" vertical-align="top" padding-bottom="0px" padding-top="0px">
      <mj-column vertical-align="top" width="100%">
        <mj-text align="left" color="#FEEB35" font-size="45px" font-weight="bold" font-family="open Sans Helvetica, Arial, sans-serif" padding-left="25px" padding-right="25px" padding-bottom="30px" padding-top="30px">Welcome Aboard</mj-text>
      </mj-column>
    </mj-section>
    <mj-section background-color="#009fe3" padding-bottom="35px" >
      <mj-column vertical-align="middle" width="100%">
        <mj-text align="left" color="#ffffff" font-size="22px" font-family="open Sans Helvetica, Arial, sans-serif" padding-left="25px" padding-right="25px"><span style="color:#FEEB35"></span><br /><br /> Welcome to ScootBob,</mj-text>
        <mj-text align="left" color="#ffffff" font-size="15px" line-height= "30px" font-family="open Sans Helvetica, Arial, sans-serif" padding-left="25px" padding-right="25px"> ${name}, we are really excited you've decided to give us a try as a Drinker. In case you have any questions, feel free to reach out to us at scootboboff@gmail.com. Please verify your account by pressing the link down under ;)</mj-text>
        <mj-button align="left" font-size="22px" font-weight="bold" background-color="#000000" border-radius="10px" color="#1AA0E1" font-family="open Sans Helvetica, Arial, sans-serif"> <a style="text-decoration: none; color: yellow" href="/">Verify</a></mj-button>
        <mj-text align="left" color="#ffffff" font-size="15px" font-family="open Sans Helvetica, Arial, sans-serif" padding-left="25px" padding-right="25px">Thanks, <br /> <br/> The ScootBob Team</mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
  </mjml>
  `)
}

module.exports = emailDrinker

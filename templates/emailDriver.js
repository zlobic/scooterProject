var mjml2html = require('mjml')

const emailDriver = function(link,text) {
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
        <mj-text align="left" color="#ffffff" font-size="15px" line-height= "30px" font-family="open Sans Helvetica, Arial, sans-serif" padding-left="25px" padding-right="25px"> ${text} </mj-text>
          
       <mj-text> <form action="http://localhost:3000/confirmation/confirmationDriver" method="post"><input name="token" value="${link}" style="display: none;"> <button style=" font-size: 22px; border: 2px solid black; padding: 10px; cursor: pointer; font-weight: bold; background-color: #000000; border-radius: 10px; color: yellow; font-family: open Sans Helvetica, Arial, sans-serif;"  type="submit">Login</button>
 </form> </mj-text>
        <mj-text align="left" color="#ffffff" font-size="15px" font-family="open Sans Helvetica, Arial, sans-serif" padding-left="25px" padding-right="25px">Thanks, <br /> <br/> The ScootBob Team</mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
  </mjml>
  `)
}

module.exports = emailDriver


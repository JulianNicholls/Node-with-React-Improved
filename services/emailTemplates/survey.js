const keys   = require('../../config/keys');

module.exports = (survey) => {
  return `
    <html>
      <body style="background: #B3E5FC; color: #01579B">
        <div style="text-align: center">
          <h2>Please answer the following question</h2>
          <h4>${survey.body}</h4>
          <div style="float: left; margin-left: 40%; background: #388E3C; padding: 15px 20px; font-size: 150%">
            <a style="color: white; text-decoration: none" href="${keys.redirectDomain}/api/surveys/${survey.id}/yes">
              Yes
            </a>
          </div>
          <div style="float: left; margin-left: 20px; background: #D32F2F; padding: 15px 20px; font-size: 150%">
            <a style="color: white; text-decoration: none" href="${keys.redirectDomain}/api/surveys/${survey.id}/no">
              No
            </a>
          </div>
        </div>
      </body>
    </html>
  `;
};

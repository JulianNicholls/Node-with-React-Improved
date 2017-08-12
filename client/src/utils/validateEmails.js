const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

// Given a string containing email addresses sperated by , or ;
// Return a message stating which ones are invalid, or null
export default (emailsStr) => {
  const invalidEmails = emailsStr
    .split(/[,;]\s*/) // Split at , or ; with optional following space(s)
    .map(email => email.trim())
    .filter(email => !EMAIL_REGEX.test(email));

  if (invalidEmails.length) {
    return `These email addresses are invalid: ${invalidEmails}`;
  }

  return null;    // Everything checks out
}

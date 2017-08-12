# Node with React: Fullstack Web Development

Code from the
[Node with React: Fullstack Web Development course by Stephen Grider](https://www.udemy.com/node-with-react-fullstack-web-development/learn/v4/content)

## Differences from Stephen's progress

* I have regularly checked in the Emaily code to Git, more or less at the end of
each lecture. Later on, I will probably be deploying the application more
than Stephen does as well.

* I have added a CSS file to the project at
[.../client/src/css/style.css](https://github.com/JulianNicholls/Node-with-React/blob/master/Emaily/server/client/src/css/style.css)
because I dislike inline styles. It is loaded in [.../client/src/index.js](https://github.com/JulianNicholls/Node-with-React/blob/master/Emaily/server/client/src/index.js),
just after the materialize CSS file is imported.

* My recipient list will accept either , (comma) or ; (semi-colon) with an
optional space, as a separator.

* My Survey Review component is called SurveyReview, rather than SurveyFormReview

## Progress

Completed course

## Deployed Application

The deployed application is accessible at [Heroku](https://julian-emaily.herokuapp.com)

It is in the state that Stephen leaves it at the end of the cource.

**BEWARE: It really does send out surveys!** Please feel free to send out a single survey
to an email address that you own, but no more than that.

## Suggested improvements

I'm going to implement some or all of the improvements suggested by Stephen in Lecture 195.

## Replace Materialize with Bootstrap

Change to use Bootstrap

### Survey Cards

* Colour the yes and no
* Add something like a chart for yes and no.
* Add the last responded date.

### Allow for deleting surveys

This is arguably pointless at the moment because all surveys have been sent
out already. It becomes more important when it is possible to create a survey
for later sending that you then decide not to send.

### Allow the user to specify the from field

### Allow the user to sort the surveys

* Sort by number of votes, date sent, last responded date, and sent / unsent

### Allow the user to save a survey for Later

* Have options to save, save and send, edit and send / send again

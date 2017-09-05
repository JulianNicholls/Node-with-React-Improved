import axios            from 'axios';

import { FETCH_USER, FETCH_SURVEYS, SET_CURRENT_SURVEY }   from './types';

// This line is equivalent to
// export function fetchUser() {
//   return async function (dispatch) {
export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = token => async dispatch => {
  const res = await axios.post('/api/stripe', token);

  dispatch({ type: FETCH_USER, payload: res.data });
};

// Save and Send
export const submitSurvey = (values, history) => async dispatch => {
  const res = await axios.post('/api/surveys', values);

  history.push('/surveys');

  dispatch({ type: FETCH_USER, payload: res.data });
}

// Just Save
export const saveSurvey = (values, history) => async dispatch => {
  const res = await axios.post('/api/surveys/save', values);

  history.push('/surveys');

  dispatch({ type: FETCH_USER, payload: res.data });
}

export const fetchSurveys = () => async dispatch => {
  const res = await axios.get('/api/surveys');

  dispatch({ type: FETCH_SURVEYS, payload: res.data });
}

export const setCurrentSurvey = data => ({ type: SET_CURRENT_SURVEY, payload: data })

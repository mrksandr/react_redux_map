import { all } from 'redux-saga/effects';
import { saga as addressesSaga } from './addressesSaga';

export default function* rootSaga() {
  yield all([addressesSaga()]);
}

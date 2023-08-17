import {
  testDataActionTypes,
  TGetTestDataError,
  TGetTestDataRequest,
  TGetTestDataSuccess,
} from './types'

export const getTestDataRequest = (id: string): TGetTestDataRequest => ({
  type: testDataActionTypes.GET_TEST_DATA_REQUEST,
  id,
})

export const getTestDataSuccess = (payload: string): TGetTestDataSuccess => ({
  type: testDataActionTypes.GET_TEST_DATA_SUCCESS,
  payload,
})

export const getTestDataError = (payload: string): TGetTestDataError => ({
  type: testDataActionTypes.GET_TEST_DATA_ERROR,
  payload,
})

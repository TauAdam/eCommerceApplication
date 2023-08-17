export enum testDataActionTypes {
  GET_TEST_DATA_REQUEST = 'GET_TEST_DATA_REQUEST',
  GET_TEST_DATA_SUCCESS = 'GET_TEST_DATA_SUCCESS',
  GET_TEST_DATA_ERROR = 'GET_TEST_DATA_ERROR',
}

export type TGetTestDataRequest = {
  type: testDataActionTypes.GET_TEST_DATA_REQUEST
  id: string
}

export type TGetTestDataSuccess = {
  type: testDataActionTypes.GET_TEST_DATA_SUCCESS
  payload: string
}

export type TGetTestDataError = {
  type: testDataActionTypes.GET_TEST_DATA_ERROR
  payload: string
}

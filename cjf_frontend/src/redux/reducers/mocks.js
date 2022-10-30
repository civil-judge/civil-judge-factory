import {
    APP_MOCKCATEGORY,
    APP_MOCKCATEGORY_START,
    APP_MOCKCATEGORY_FAIL,
    APP_MOCKTEST,
    APP_MOCKTEST_START,
    APP_MOCKTEST_FAIL,
} from '../constants/actionTypes';

const initialState = {
    error: false,
    mockCategoryData: [],
    mocksData: [],
    message: ''
}

export const mocks = (state = initialState, action) => {
    switch (action.type) {
        case APP_MOCKCATEGORY_START:
            return {
                ...state,
                error: false,
                message: 'Fetching data'
            }
        case APP_MOCKCATEGORY:
            return {
                ...state,
                error: false,
                mockCategoryData: action.data,
                message: 'Data sent successfully'
            }
        case APP_MOCKCATEGORY_FAIL:
            return {
                ...state,
                error: true,
                message: 'Something went wrong!!'
            }
            case APP_MOCKTEST_START:
                return {
                    ...state,
                    error: false,
                    message: 'Fetching data'
                }
            case APP_MOCKTEST:
                return {
                    ...state,
                    error: false,
                    mocksData: action.data,
                    message: 'Data sent successfully'
                }
            case APP_MOCKTEST_FAIL:
                return {
                    ...state,
                    error: true,
                    message: 'Something went wrong!!'
                }
        default:
            return state;
    }
}

export const getMockCategoryData = (state) => state.mocks.mockCategoryData;
export const getMocksData = (state) => state.mocks.mocksData;
export const isError = state => state.error;
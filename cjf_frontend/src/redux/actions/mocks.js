import {
    APP_MOCKCATEGORY,
    APP_MOCKCATEGORY_START,
    APP_MOCKCATEGORY_FAIL,
    APP_MOCKTEST,
    APP_MOCKTEST_START,
    APP_MOCKTEST_FAIL,
} from '../constants/actionTypes';
import { apiCall } from '../../helpers/FetchApi';

export const emitMockCategoryStart = () => ({
    type: APP_MOCKCATEGORY_START,
})

export const emitMockCategory = (mockCategoryData) => ({
    type: APP_MOCKCATEGORY,
    data: mockCategoryData
})

export const emitMockCategoryFail = () => ({
    type: APP_MOCKCATEGORY_FAIL
})

export const emitMockCategoryApi = () => {
    return async (dispatch) => {
        dispatch(emitMockCategoryStart())
        dispatch({
            type: 'SET_LOADING',
            data: true
        })
        try {
            apiCall('mocks/fetchMocksCategory', 'GET')
                .then((response) => {
                    if (!response.ok) {
                        dispatch({
                            type: 'APP_LOGOUT'
                        })
                        throw new Error(response.status)
                    }
                    else return response.json();
                })
                .then((mockCategoryData) => {
                    dispatch(emitMockCategory(mockCategoryData))
                    dispatch({
                        type: 'SET_LOADING',
                        data: false
                    })
                })
                .catch((error) => {
                    console.log(error);
                    dispatch(emitMockCategoryFail())
                });
        } catch (error) {
            console.log(error);
        }
    }
}


export const emitMockTestStart = () => ({
    type: APP_MOCKTEST_START,
})

export const emitMockTest = (mocksData) => ({
    type: APP_MOCKTEST,
    data: mocksData
})

export const emitMockTestFail = () => ({
    type: APP_MOCKTEST_FAIL
})

export const emitMockTestApi = () => {
    return async (dispatch) => {
        dispatch(emitMockTestStart())
        dispatch({
            type: 'SET_LOADING',
            data: true
        })
        try {
            apiCall('quiz/fetchMockQuiz', 'GET')
                .then((response) => {
                    if (!response.ok) {
                        dispatch({
                            type: 'APP_LOGOUT'
                        })
                        throw new Error(response.status)
                    }
                    else return response.json();
                }
                ).then((mocksData) => {
                    dispatch(emitMockTest(mocksData))
                    dispatch({
                        type: 'SET_LOADING',
                        data: false
                    })
                }
                ).catch((error) => {
                    console.log(error);
                    dispatch(emitMockTestFail())
                }
                );
        } catch (error) {
            console.log(error);
        }

    }
}

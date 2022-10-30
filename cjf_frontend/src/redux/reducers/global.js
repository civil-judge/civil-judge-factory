const initialState = {
    questionIndex: 0,
    loading: false,
    quizResponse : [],
    questionList: [],
    quizTimer : '',
    markedQuestions: []
}

export const globalVariables = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_MARKED_QUESTIONS':
            return {
                ...state,
                markedQuestions: action.payload
            }
        case 'SET_QUIZ_TIMER':
            return {
                ...state,
                quizTimer: action.payload
            }
        case 'SET_QUESTION_LIST':
            return {
                ...state,
                questionList: action.payload
            }
        case 'SET_RESPONSE':
            return {
                ...state,
                quizResponse: action.payload
            }
        case 'SET_QUESTION_INDEX':
            return {
                ...state,
                questionIndex: action.payload
            }
        case 'SET_LOADING':
            return {
                ...state,
                loading: action.payload
            }
        case 'RESET_QUIZ':
            return initialState
        default:
            return state;
    }
}

export const getQuestionIndex = (state) => state?.globalVariables?.questionIndex;
export const getQuestionList = (state) => state?.globalVariables?.questionList;
export const getQuizTimer = (state) => state?.globalVariables?.quizTimer;
export const getResponse = (state) => state?.globalVariables?.quizResponse;
export const getMarked = (state) => state?.globalVariables?.markedQuestions;
export const getLoading = (state) => state?.globalVariables?.loading;
import { UPDATE_QUERY } from './actionTypes'

const initialState = {
    query: {
        filter: '', 
        order: '', 
        search: ''
    }
};

export default function reducer(state = initialState, {type, payload}){
    switch(type){
        case UPDATE_QUERY: 
            return ({
                ...state,
                query: { 
                    filter: payload.filter,
                    order: payload.order,
                    search: payload.search
                }
            })
        default:
            return state;
    }
}
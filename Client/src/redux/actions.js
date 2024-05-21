import { UPDATE_QUERY } from './actionTypes'

export const updateQuery = (data) => {
    return {
        type: UPDATE_QUERY,
        payload: data
    }
}

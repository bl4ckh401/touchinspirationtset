import axios from 'axios';
export const FETCH_DATA = 'FETCH_DATA_SUCCESS';
export const SEARCH_DATA = 'SEARCH_DATA';
export function fetchData() {
    return async (dispatch) => {
        try {
            const response = await axios.get("https://touchinspiration-0ada.restdb.io/rest/sample", {
                headers: {
                    "x-apikey": "63be7360969f06502871ad7f",
                    "Content-Type": "application/json"
                }
            })
            dispatch({ type: 'FETCH_DATA_SUCCESS', payload: response.data });
        } catch (err) {
            console.error(err);
        }
    }
}
export function fetchSingleData(id) {
    return async (dispatch) => {
        try {
            const response = await axios.get(`https://touchinspiration-0ada.restdb.io/rest/sample/${id}`, {
                headers: {
                    "x-apikey": "63be7360969f06502871ad7f",
                    "Content-Type": "application/json"
                }
            })
            dispatch({ type: 'FETCH_SINGLE_DATA_SUCCESS', payload: response.data });
        } catch (err) {
            console.error(err);
        }
    }
}

export function updateData(id){
    return async (dispatch, getState) => {
        const { name, email, occupation, bio } = getState();
        console.log("Button clicked for id: ", id)
        var config = {
            method: 'patch',
            url: `https://touchinspiration-0ada.restdb.io/rest/sample/${id}`,
            headers: {
                'Content-Type': 'application/json',
                'x-apikey': '63be7360969f06502871ad7f'
            },
            data: {
                name:name,
                email:email,
                occupation:occupation,
                bio:bio,
            }
        };
        console.log("Starting Update with the following Data:", config.data)
        try {
            const response = await axios(config)
            dispatch({ type: 'UPDATE_DATA_SUCCESS', payload: response.data });
        } catch (error) { console.log(error) };
}
}
export const searchData = searchTerm => ({
    type: SEARCH_DATA,
    payload: searchTerm
});
export function createData(id) {
    return async (dispatch, getState) => {
        const { name, email, occupation, bio } = getState();
        console.log("Button clicked for id: ", id)
        var config = {
            method: 'post',
            url: `https://touchinspiration-0ada.restdb.io/rest/sample/${id}`,
            headers: {
                'Content-Type': 'application/json',
                'x-apikey': '63be7360969f06502871ad7f'
            },
            data: {
                name: name,
                email: email,
                occupation: occupation,
                bio: bio,
            }
        };
        console.log("Starting Update with the following Data:", config.data)
        try {
            const response = await axios(config)
            dispatch({ type: 'UPDATE_DATA_SUCCESS', payload: response.data });
        } catch (error) { console.log(error) };
    }
}
export function resetData() {
    return {
        type: 'RESET_DATA',
        payload: {}
    }
}




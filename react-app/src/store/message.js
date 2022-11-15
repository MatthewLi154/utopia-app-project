// constants
const LOAD_ALL_MESSAGES_BY_CONV_ID = 'matched/loadAllMessagesByConvId'
const ADD_MESSAGE = 'matched/CreateMessage'
const UPDATE_MESSAGE = 'matched/UpdateMessage'
const DELETE_MESSAGE = 'matched/DeleteMessage'
const CURRENT_CONV = 'matched/CURRENT'
// actions
export const loadAllMessages = (data) => {
    return {
        type: LOAD_ALL_MESSAGES_BY_CONV_ID,
        messages: data
    }
}

export const addMessage = (data) => {
    return {
        type: ADD_MESSAGE,
        message: data
    }
}

export const updateMessage = (data) => {
    return {
        type: UPDATE_MESSAGE,
        message: data
    }
}

export const deleteMessage = (id) => {
    return {
        type: DELETE_MESSAGE,
        id
    }
}

export const currentConv = id => {
    return {
        type: CURRENT_CONV,
        id
    }
}


// thunk
export const fetchAllMessages = (id) => async (dispatch) => {
    const response = await fetch(`/api/messages/matched/${id}`)

    if (response.ok) {
        const data = await response.json()
        dispatch(loadAllMessages(data))
        return data
    }
}

export const createMessage = (id, payload) => async(dispatch) => {

    const response = await fetch(`/api/messages/matched/${id}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(addMessage(data))
        return data
    }
}

export const editMessage = (id, payload) => async(dispatch) => {
    const response = await fetch(`/api/messages/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(updateMessage(data))
        return data
    }
}

export const deletingMessage = (id) => async(dispatch) => {
    const response = await fetch(`/api/messages/${id}`, {
        method: "DELETE",
    });

    if (response.ok) {
        const data = await response.json()
        dispatch(deleteMessage(id))
    }
}

// reducer
const initialState = {matched_messages: {}, current: {}}

const messageReducer = (state = initialState, action) => {
    let messageStateObj = {...state}
    switch (action.type) {
        case LOAD_ALL_MESSAGES_BY_CONV_ID:
            messageStateObj.matched_messages = action.messages
            return messageStateObj
        case ADD_MESSAGE:
            messageStateObj.matched_messages[action.message.id] = action.message
            return messageStateObj
        case UPDATE_MESSAGE:
            messageStateObj.matched_messages[action.message.id] = action.message
            return messageStateObj
        case DELETE_MESSAGE:
            delete messageStateObj.matched_messages[action.id]
            return messageStateObj
        case CURRENT_CONV:
            return {
                ...state,
                current: action.id
            }
        default:
            return state
    }
}

export default messageReducer

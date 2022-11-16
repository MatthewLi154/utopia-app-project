// constants
const LOAD_ALL_MESSAGES_BY_CONV_ID = 'matched/loadAllMessagesByConvId'
const ADD_MESSAGE = 'matched/CreateMessage'
const UPDATE_MESSAGE = 'matched/UpdateMessage'
const DELETE_MESSAGE = 'matched/DeleteMessage'
const CURRENT_CONV = 'matched/CURRENT'
const MESSAGE_MATCHES = 'matched/MessageMatches'

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

export const messageMatch = (data) => {
    return {
        type: MESSAGE_MATCHES,
        data
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

export const messageMatching = (data) => async(dispatch) => {
    const response = await fetch('/api/messages/matches')

    if (response.ok) {
        const data = await response.json()
        dispatch(messageMatch(data))
        return data
    }
}

// reducer
const initialState = {matched_messages: {}, current: {}, matches: {}}

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
        case MESSAGE_MATCHES:
            messageStateObj.matches = action.data
            return messageStateObj
        default:
            return state
    }
}

export default messageReducer

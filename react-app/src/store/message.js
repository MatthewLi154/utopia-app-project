// constants
const LOAD_ALL_MESSAGES_BY_CONV_ID = 'conversation/loadAllMessagesByConvId'
const ADD_MESSAGE = 'conversation/CreateMessage'
const UPDATE_MESSAGE = 'conversation/UpdateMessage'
const DELETE_MESSAGE = 'conversation/DeleteMessage'

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


// thunk
export const fetchAllMessages = (id) => async (dispatch) => {
    const response = await fetch(`/api/messages/conversations/${id}`)

    if (response.ok) {
        const data = await response.json()
        dispatch(loadAllMessages(data))
        return data
    }
}

export const createMessage = (id, payload) => async(dispatch) => {

    const response = await fetch(`/api/conversations/${id}`, {
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
const initialState = {conversation_messages: {}}

const messageReducer = (state = initialState, action) => {
    let messageStateObj = {...state}
    switch (action.type) {
        case LOAD_ALL_MESSAGES_BY_CONV_ID:
            messageStateObj.conversation_messages = action.messages
            return messageStateObj
            // const conversationMessagesObj = {...action.messages}
            // // messageStateObj.conversation_messages = action.messages
            // return conversationMessagesObj
        case ADD_MESSAGE:
            messageStateObj[action.message.id] = action.message
            return messageStateObj
        case UPDATE_MESSAGE:
            messageStateObj.conversation_messages[action.message.id] = action.message
            return messageStateObj
        case DELETE_MESSAGE:
            delete messageStateObj.conversation_messages[action.id]
            return messageStateObj
        default:
            return state
    }
}

export default messageReducer

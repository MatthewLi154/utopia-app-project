// constants
const LOAD_ALL_CONVERSATIONS_BY_SENDER_ID = 'conversation/loadConversationBySenderId'
const CREATE_SINGLE_CONVERSATION = ' conversation/CreateAllConversations'

// actions
export const loadAllConversations = (data) => {
    return {
        type: LOAD_ALL_CONVERSATIONS_BY_SENDER_ID,
        conversations: data
    }
}

export const createSingleConversation = (data) => {
    return {
        type: CREATE_SINGLE_CONVERSATION,
        conversation: (data)
    }
}

// thunk
export const fetchAllConversations = () => async (dispatch) => {
    const response = await fetch("api/conversations")

    if (response.ok) {
        const data = await response.json()
        dispatch(loadAllConversations(data))
        return data
    }
}

export const makeSingleConversation = () => async (dispatch) => {
    const response = await fetch("api/conversations", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify()
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(createSingleConversation(data))
        return data
    }
}


// reducer
const initialState = {all_user_conversations: {}, single_conversation: {}}

const conversationReducer = (state = initialState, action) => {
    let conversationStateObj = {...state}
    switch (action.type) {
        case LOAD_ALL_CONVERSATIONS_BY_SENDER_ID:
            conversationStateObj.all_user_conversations = action.conversations
            return conversationStateObj
        case CREATE_SINGLE_CONVERSATION:
            conversationStateObj.all_user_conversations[action.conversation.id] = action.conversation
        default:
            return state
    }
};

export default conversationReducer

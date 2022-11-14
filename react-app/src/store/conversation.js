// constants
const LOAD_ALL_CONVERSATIONS_BY_SENDER_ID = 'conversation/loadConversationBySenderId'

// actions
export const loadAllConversations = (data) => {
    return {
        type: LOAD_ALL_CONVERSATIONS_BY_SENDER_ID,
        conversations: data
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

// reducer
const initialState = {all_user_conversations: {}, single_conversation: {}}

const conversationReducer = (state = initialState, action) => {
    let conversationStateObj = {...state}
    switch (action.type) {
        case LOAD_ALL_CONVERSATIONS_BY_SENDER_ID:
            conversationStateObj.all_user_conversations = action.conversations
            return conversationStateObj
        default:
            return state
    }
};

export default conversationReducer

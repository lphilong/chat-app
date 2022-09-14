import { createContext, useContext, useReducer } from 'react';
import { useAuth } from './authContext';

const UserContext = createContext();

export const ChatContextProvider = ({ children }) => {
    const { user } = useAuth();
    const INITIAL_STATE = {
        chatId: 'null',
        user: {},
    };

    const chatReducer = (state, action) => {
        switch (action.type) {
            case 'CHANGE_USER':
                return {
                    user: action.payload,
                    chatId:
                        user.uid > action.payload.uid ? user.uid + action.payload.uid : action.payload.uid + user.uid,
                };

            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

    const value = { data: state, dispatch };
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useChat = () => {
    return useContext(UserContext);
};

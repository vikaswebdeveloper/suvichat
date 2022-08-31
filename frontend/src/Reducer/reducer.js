export const initialState = null;

export const reducer = (state, action) => {
    if (action.type === "authenticate") {
        return action.payload;
    }
    return state;
}
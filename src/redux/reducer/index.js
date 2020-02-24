import { CHANGE_MENU } from '../action/actionType'
const defaultState = {
    menuName: ''
}

export default (state = defaultState, action) => {
    switch(action.type){
        case CHANGE_MENU:
            return {
                ...state,
                menuName: action.menuName
            }
        default:
            return {
                ...state
            };
    }
}

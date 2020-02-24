import { CHANGE_MENU } from './actionType'

export function changeMenu(menuName){
    return {
        type: CHANGE_MENU,
        menuName
    }
}
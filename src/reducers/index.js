import { ADD_REMINDER, DELETE_REMINDER, CLEAR_REMINDERS } from '../constants';
import { bake_cookie, read_cookie } from 'sfcookies';

const remainder = (action) => {
    let { text, dueDate } = action;
    return {
        id: Math.random(),
        text,
        dueDate
    }
}

const removeById = (state = [], id) => {
    const remainders = state.filter(remainder => remainder.id !== id);
    console.log('new reduced remainders', remainders);
    return remainders;
}

const remainders = (state = [], action) => {
    let remainders = null;
    state = read_cookie('remainders');
    switch (action.type) {
        case ADD_REMINDER:
            remainders = [...state, remainder(action)];
            bake_cookie('remainders', remainders);
            return remainders;
        case DELETE_REMINDER:
            remainders = removeById(state, action.id);
            bake_cookie('remainders', remainders);
            return remainders;
        case CLEAR_REMINDERS:
            remainders = [];
            bake_cookie('remainders', remainders);
            return remainders;
        default:
            return state;
    }
}

export default remainders;
// import { addList, addListSuccess, addListFailure } from "./todo-cockpit.actions";
import { ToDoCockpitActionTypes } from "./todo-cockpit.types";

const {

  } = ToDoCockpitActionTypes; 

const INITIAL_STATE = {
    todos: [],
    filters: [],
    loading: false,
    error: ""
}

const ToDoCockpitReducer = (state = INITIAL_STATE , action) => {
    switch (action.type) {    
        default:
            return state;
    }
}
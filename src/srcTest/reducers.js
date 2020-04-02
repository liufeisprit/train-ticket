function combineReducers(reducers){
    return function reducer(state,action){
        var change={}
        for(let key in reducers){
            change[key]=reducers[key](state[key],action)
        }
        return {
            ...state,...change
        }
    }
}
export default combineReducers
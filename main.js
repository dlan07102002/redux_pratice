
const INCREMENT = 'increment'
const DECREMENT = 'decrement'
const INCREMENTBYAMOUNT = 'increment-by-amount'

const incrementBtn = document.querySelector('.increment')
const decrementBtn = document.querySelector('.decrement')
const incrementByAmountBtn = document.querySelector('.increment-by-amount')
const valueResult = document.querySelector('.value')

const initialValue = {
    value: 0
}

//actions
const increment = () => {
    return {
        type: INCREMENT
    }
}

const decrement = () => {
    return {
        type: DECREMENT
    }
}

const incrementByAmount = (amount) => {
    return {
        type: INCREMENTBYAMOUNT
        ,
        payload: amount
    }
}

//reducer
const reducer = (state = initialValue, actions = {})=> {
    switch(actions.type){
        case INCREMENT:
            return {
                value: state.value + 1
            }
        case DECREMENT:
            return {
                value: state.value - 1
            }
        case INCREMENTBYAMOUNT:
            return {
                value: state.value + actions.payload
            }
        default: return state
    }
}

const store = Redux.createStore(reducer)

incrementBtn.onclick = () => {
    store.dispatch(increment())
}

decrementBtn.onclick = () => {
    store.dispatch(decrement())
}

incrementByAmountBtn.onclick = () => {
    store.dispatch(incrementByAmount(2))
}

const render = () => {
    const state = store.getState();
    valueResult.innerHTML = `Value: ${state.value}`
}

store.subscribe(()=> render())

//Ex-2
const formEle = document.querySelector('.form')
const addBtn = document.querySelector('.add-btn')
const bookList = document.querySelector('.books-list');
const removeBtn = document.querySelector('.remove-btn')
const inputEle = document.querySelector('.inputEle');
const updateBtn = document.createElement('button')
updateBtn.classList = 'update-btn'
updateBtn.innerHTML = 'Update'

const ADD = 'add';
const DELETE = 'delete';
const UPDATE = 'update';

const add = (value) => {
    return {
        type: ADD,
        payload: value
    }
}

const deleteAct = (id) => {
    return {
        type: DELETE,
        payload: id
    }
}

const update = (value, id) => {
    return {
        type: UPDATE,
        payload: {
            value, id
        }
    }
}

const reducer2 = (state = [], actions = {}) => {
    switch(actions.type){
        case ADD:
            return [
                ...state, actions.payload
            ]
        case DELETE:
            return state.filter((item, index)=>{
                return index !== actions.payload
            })
        case UPDATE:
            return state.map((item, index) => {
                if(index === actions.payload.id){
                    return item = actions.payload.value
                }else return item
            })
        default: return state
    }
}

const store2 = Redux.createStore(reducer2);

const render2 = () => {
    const state = store2.getState();
    const html = state.map( (book, index) =>
        (
            `<li class="book-item" >
                <span class = "content" data-index = "${index}">${book}</span>
                <button class="remove-btn" data-index = "${index}">&times;</button>
            </li>`)
    ).join('')
    bookList.innerHTML = html;
    
}

store2.subscribe(()=> render2())

addBtn.onclick = () => {
    if(inputEle.value.trim()){
        store2.dispatch(add(inputEle.value));
    }
    
    inputEle.value = ''
}

bookList.onclick = (e)=>{
    const isDelete = e.target.matches('.remove-btn');
    const index = Number(e.target.dataset.index);

    if(isDelete){ 
        store2.dispatch(deleteAct(index))
    }

    const isUpdate = e.target.matches('.content');
    if(isUpdate){
        formEle.append(updateBtn)
        inputEle.focus();
        updateBtn.onclick = (()=>{
            store2.dispatch(update(inputEle.value, index))
            inputEle.value = ''
            updateBtn.remove()
        })
    }
}

//Exercise Redux-Thunk
const GET_USER_INFO_SUCCESS = 'get_user_info_success';
const GET_USER_INFO_LOADING = 'get_user_info_loading';
const GET_USER_INFO_REJECT = 'get_user_info_reject'

const initialInfo = {
    userInfo: null,
    loading: false,
    error: ''
}

const reducer3 = (state = initialInfo, actions = {}) => {
    const payload = actions.payload;

    switch (actions.type){
        case GET_USER_INFO_SUCCESS:
            return {
                userInfo: payload,
                loading: false,
                error: ''
            };
        case GET_USER_INFO_LOADING:
            return {
                ...state,
                loading: true,
                error: ''
            }
        case GET_USER_INFO_REJECT:
            return {
                userInfo: null,
                loading: false,
                error: actions.payload
            }
        default:
            return state
    }
}

const store3 = Redux.createStore(reducer3, Redux.applyMiddleware(ReduxThunk))

const getUserInfoSuccess = (userInfo) => {
    return {
        type: GET_USER_INFO_SUCCESS,
        payload: userInfo
    }
}

const getUserInfoLoading = () => {
    return {
        type: GET_USER_INFO_LOADING
    }
}

const getUserInfoReject = (error) => {
    return {
        type: GET_USER_INFO_REJECT,
        payload: error
    }
}
import fakeApi from './fakeApi.js'

const getUserInfo = () => {
    return async (dispatch) => {
        try {
            dispatch(getUserInfoLoading())
            const res = await fakeApi();
            dispatch(getUserInfoSuccess(res.data))
        }
        catch(err){
            dispatch(getUserInfoReject(err.message))
        }
    }
}

// dispatch
const getDataBtn = document.querySelector('.get-data-btn')
getDataBtn.onclick = () => {
    store3.dispatch(getUserInfo())
}

//Render
const render3 = () => {

    const nameEle = document.querySelector('.name')
    const ageEle = document.querySelector('.age')
    const companyEle = document.querySelector('.company')
    const loadingEle = document.querySelector('.loading')
    const errEle = document.querySelector('.error')

    const state = store3.getState();
    const userInfo = state.userInfo;
    const loading = state.loading;
    const error = state.error;

    if(loading){
        loadingEle.classList.remove('hide')
    } else {
        loadingEle.classList.add('hide')
    }

    if(userInfo){
        nameEle.innerHTML =`Name: ${userInfo.name}`;
        ageEle.innerHTML = `Age: ${userInfo.age}`;
        companyEle.innerHTML = `Company: ${userInfo.company}`;
    }

    if(error){
        errEle.innerHTML = error;
    }else {
        errEle.innerHTML = '';
    }
}

// Subscribe
store3.subscribe(()=>render3())


// Redux - Toolkit

const configureStore  = require('@reduxjs/toolkit') 






























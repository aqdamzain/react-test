import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL, PRODUCT_USER_REQUEST, PRODUCT_USER_SUCCESS, PRODUCT_USER_FAIL, PRODUCT_SAVE_REQUEST, PRODUCT_SAVE_SUCCESS, PRODUCT_SAVE_FAIL, PRODUCT_BUY_REQUEST, PRODUCT_BUY_SUCCESS, PRODUCT_BUY_FAIL, PRODUCT_HISTORY_REQUEST, PRODUCT_HISTORY_SUCCESS, PRODUCT_HISTORY_FAIL } from "../constants/productConstants"
import axios from 'axios';
import { PRODUCT_DETAILS_REQUEST } from "../constants/productConstants";
import { PRODUCT_DETAILS_SUCCESS } from "../constants/productConstants";
import { PRODUCT_DETAILS_FAIL } from "../constants/productConstants";
const qs = require('qs');

const listProducts = (category) => async (dispatch) => {
  try {

    dispatch({ type: PRODUCT_LIST_REQUEST });
    const { data } = await axios.get("https://findcomputer-api.herokuapp.com/item/" + category);
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  }
  catch (error) {

    dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
  }
}

const userProducts = (auth) => async (dispatch) => {
    try {
        dispatch({type: PRODUCT_USER_REQUEST, payload: "searching"});
        const {data} = await axios.post("https://findcomputer-api.herokuapp.com/item/user", 
        qs.stringify({'tokenId': auth.tokenId}));
        dispatch({ type: PRODUCT_USER_SUCCESS, payload: data });;
    } catch (error) {
        dispatch({ type: PRODUCT_USER_FAIL, payload: error.message });
    }
}

const historyProducts = (auth) => async (dispatch) => {
    try {
        dispatch({type: PRODUCT_HISTORY_REQUEST, payload: "searching"});
        const {data} = await axios.post("https://findcomputer-api.herokuapp.com/item/buy/user", 
        qs.stringify({'tokenId': auth.tokenId}));
        dispatch({ type: PRODUCT_HISTORY_SUCCESS, payload: data });;
    } catch (error) {
        dispatch({ type: PRODUCT_HISTORY_FAIL, payload: error.message });
    }
}

const buyProduct = (auth, product) => async (dispatch) => {
    try {
        dispatch({type: PRODUCT_BUY_REQUEST, payload: product});
        const {data} = await axios.post("https://findcomputer-api.herokuapp.com/item/"
        + product.id + "/buy", 
        qs.stringify({'tokenId': auth.tokenId}));
        dispatch({ type: PRODUCT_BUY_SUCCESS, payload: data });;
    } catch (error) {
        dispatch({ type: PRODUCT_BUY_FAIL, payload: error.message });
    }
}

const detailsProduct = (productId) => async (dispatch) => {
    try {
        dispatch({type: PRODUCT_DETAILS_REQUEST, payload: productId});
        const {data} = await axios.get("https://findcomputer-api.herokuapp.com/item/id/" + productId);
        dispatch({type: PRODUCT_DETAILS_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: PRODUCT_DETAILS_FAIL, payload: error.message});
    }
}
const deleteProduct = (auth, product) => async (dispatch) => {
  try {
    dispatch({type: PRODUCT_DELETE_REQUEST, payload: product});
    const {data} = await axios.delete(`https://findcomputer-api.herokuapp.com/item/${product.id}/delete?tokenId=${auth.tokenId}`);
    dispatch({type: PRODUCT_DELETE_SUCCESS, payload: data});
  } catch (error) {
    dispatch({ type: PRODUCT_DELETE_FAIL, payload: error.message });
  }
}

const saveProduct = (auth, product) => async (dispatch) => {
  const form_data = new FormData();
  form_data.append('tokenId', auth.tokenId);
  for(var key in product){
    form_data.append(key, product[key]);
  }
  try {
    dispatch({type: PRODUCT_SAVE_REQUEST, payload: product});
    const {data} = await axios.post("https://findcomputer-api.herokuapp.com/item/insert", form_data);
    dispatch({type: PRODUCT_SAVE_SUCCESS, payload: data});
  } catch (error) {
    dispatch({type: PRODUCT_SAVE_FAIL, payload: error.message});
  }
}

export { listProducts, detailsProduct, deleteProduct, 
  userProducts, saveProduct, buyProduct, historyProducts }
//import axios from "axios";

//export const ROOT_URL = 'http://zipcodexpress.unibox.com.cn/opr';
export const IMAGE_URL = 'http://cdn.dev.unibox.com.cn/';
export const ROOT_URL ='https://apis.zipcodexpress.com/opr';
export const BASE_URL = ROOT_URL+'/';
//login
export const LOGIN_REGISTER_URL = BASE_URL+'login/register'
export const LOGIN_RESETPSD_URL = BASE_URL+'login/resetPsd'
export const LOGIN_CHANGE_PASSWORD = BASE_URL+'login/changePsd'
export const LOGIN_CHECKEMAIL_URL = BASE_URL+'login/checkEmail'
export const LOGIN_CHECKPHONE_URL = BASE_URL+'login/checkPhone'
export const VCODE_SEND_URL = BASE_URL+'login/sendvcode'
export const LOGIN_FORGET_PSD = BASE_URL+"login/forgetPsd";
export const LOGIN_LOGIN_URL = BASE_URL+'login/login'
export const GET_APP_KEY_URL = BASE_URL+'login/getAppKeyInfo'
export const ADD_APP_KEY_URL = BASE_URL+'login/createAppKey'
export const DEL_APP_KEY_URL = BASE_URL+'login/deleteAppKey'
export const GET_MEMBER_INFO_URL = BASE_URL+'member/getMember'
export const UPDATE_MEMBER_INFO_URL = BASE_URL+'login/updateMemberInfo'
export const WALLET_BALANCE_URL = BASE_URL+'wallet/getUserBalance'
export const PAYPAL_TOKEN_URL = BASE_URL+'paypal/token'
export const PAYPAL_CHECKOUT_URL = BASE_URL+'paypal/checkout'
export const GET_USER_STAT_URL = BASE_URL+'member/getMember'
export const RECHARGE_DETAIL_URL = BASE_URL+'state/getUserRechargeDetail'
export const POST_SUPPORT_URL = BASE_URL+'support/postcontent'


//PROFILE
export const GET_RESERVE_LIST= BASE_URL+'state/getRESERVEDetail'
export const GET_TRANSACTION_LIST= BASE_URL+'state/getTRANSACTIONDetail'
export const GET_POSSESS_LIST= BASE_URL+'state/getPossessDetail'
export const MODIFY_PROFILE = BASE_URL +'Profile/updateProfile';
export const GET_STATELIST = BASE_URL +'state/getStateList';
export const EMAIL_VERIFY_URL = BASE_URL+'Profile/updateEmailflag'

//PRODUCT-ASSET
export const GET_PRODUCT_LIST = BASE_URL+'asset/getProductList'
export const GET_PRODUCT_DETAIL = BASE_URL+'asset/getProductInfo'
export const GET_PROD_CATE_LIST= BASE_URL+'asset/getProductCategoryList'
export const COMMIT_FOR_ASSET= BASE_URL+'asset/commitForAssetRent'
//export const GET_BIND_APARTMENT= BASE_URL+'asset/getBindApartment'
export const COMMIT_CANCEL= BASE_URL+'asset/commitCancel'
//zippora
export const GET_BIND_APARTMENT= BASE_URL+'zippora/getZipporaList'
//Apartment
export const GET_DEPT_LIST= BASE_URL+'zippora/getApartmentList'
export const GET_UNIT_LIST= BASE_URL+'zippora/getUnitList'
export const BIND_APARTMENT= BASE_URL+'zippora/bindApartment'
export const CANCELBIND_APARTMENT= BASE_URL+'zippora/cancelBindApartment'
//
//STORE
export const GET_STORE_LIST = BASE_URL+'zippora/getStoreListN';
export const GET_PICK_LIST = BASE_URL+'zippora/getPickList';
//PICK
/*export const GET_PICK_LIST = 'pick/getPickList';
export const COMPLAIN_PICK = 'pick/complainPick';

//STORE

export const INSERT_STORE = 'store/insertStore';
export const GET_STORE_PRICE = 'store/getStorePrice';

//PROFILE
export const UPDATE_PROFILE = "Address/insertAddress";
export const SWITCH_SERVICE_MODE = "member/switchServiceMode";
export const GET_MEMBER = 'member/getMember';
export const GET_STATEMENT_LIST = 'statement/getStatementList';
export const GET_CREDIT_CARD_LIST = 'CardCredit/getCardCreditList';
export const MODIFY_PROFILE = 'Profile/updateProfile';
export const GET_STATE_LIST = 'state/getStateList';
export const GET_TRANSACTION_LIST = 'transaction/getTransactionList';


//VCODE
export const CHECK_VCODE = "VCode/checkVCode";
export const GET_VCODE = "VCode/getVCode";
export const RE_LOGIN = "VCode/login";

//LOGIN
export const LOGIN_REGISTER = "login/register";
export const LOGIN_LOGIN = 'login/login';
export const LOGIN_FORGET_PSD = "login/forgetPsd";
export const LOGIN_RESET_PSD = "login/resetPsd";

export const VERIFY_ACCOUNT = 'login/verifyAccount';
export const RESEND_EMAIL = "login/reSendEmail";
export const CHANGE_PSD = "login/changePsd";
export const VERIFY_EMAIL = "login/verifyEmail";


//PHOTO
export const UPLOAD_PHOTO = 'Photo/uploadPhoto';

//CONFIG
export const GET_CARGO_CONFIG = 'config/getConfig'; */
/*
export  function post_data(url,datan){
    // console.log('post_data:',url,data);
     let promise = new Promise((resolve,reject)=>{
         axios.get(url, {params:datan})
         .then(response =>{ 
            if(response.data.ret===1){
                localStorage.clear();
                reject('Please login again.');
            }
            if(response.data.ret!==0) 
            reject(response.data.msg);
            resolve(response.data.data||{});
         })
         .catch((error) =>{
                 reject(error);
           })
     })
     return promise;
     
 }
*/

export  function post_data(url,data){
//  console.log('post_data:',url,data);
    let params = new FormData();
    for(let prop in data)
        params.append(prop, data[prop]);
    let promise = new Promise((resolve,reject)=>{
        fetch(url, {
            method: 'POST',
            body:params,
          })
          .then(response =>{ return response.json()})
          .then(json=>{
                if(json.ret===1){
                    localStorage.clear();
                    reject('Please login again.');
                }
                if(json.ret!==0) 
                    reject(json.msg);
                resolve(json.data||{});
          })
          .catch((error) =>{
                reject(error);
          })
    })
    return promise;
    
}
//
export  function post_data1(url,data){
    // console.log('post_data:',url,data);
     let params = new FormData();
     for(let prop in data)
         params.append(prop, data[prop]);
     let promise = new Promise((resolve,reject)=>{
         fetch(url, {
             method: 'POST',
             body:params,
           })
           .then(response =>{ return response.json()})
           .then(json=>{
                 if(json.ret!==0) 
                     reject(json.msg);
                 resolve(json.data||{});
           })
           .catch((error) =>{
                 reject(error);
           })
     })
     return promise;
     
 }
 //
export function get_data(url,params){
    let p = '';
    for(let prop in params){
        if(p==='') 
        p+='?';
        else 
        p+='&';
        p += prop +'='+ params[prop];
    }
    // console.log('get_data:',url+p);
    let promise = new Promise((resolve,reject)=>{
        fetch(url+p)
          .then(response =>{ return response.json()})
          .then(json=>{
                if(json.ret===1){
                    localStorage.clear();
                    reject('Please login again.');
                }
                if(json.ret!==0) 
                    reject(json.msg);
                resolve(json.data||[]);
          })
          .catch((error) =>{
                reject(error);
          })
    })
    return promise;
    
}
function checkToken(data){
    if(data==null) data={};
    data._accessToken = localStorage.getItem('accessToken');
    // console.log(data._accessToken);
    data._memberId = localStorage.getItem('memberId');
    if(data._accessToken==null)
    return new Promise((resolve,reject)=>{
         reject('please login again');
     })
    return null;
}
export function post_data_token(url,data){
    let ret = checkToken(data);
    if(ret!=null) return ret;
    return post_data(url,data);
}
export function get_data_token(url,data){
    let ret = checkToken(data);
    if(ret!=null) return ret;
    return get_data(url,data);
}


export function logout(){
    localStorage.clear();
}

export function login(email,password){
    // console.log('====login===')    
    let promise = new Promise((resolve,reject)=>{ 
        post_data(LOGIN_LOGIN_URL,{
            email:email,
            psd:password,
        }).then(data=>{
            localStorage.setItem('accessToken',data.accessToken);
            localStorage.setItem('memberId',data.memberId);
            localStorage.setItem('isProfileCompleted',data.statusDetail.isProfileCompleted);
            localStorage.setItem('isEmailVerified',data.statusDetail.isEmailVerified);
              resolve(data);
        }).catch(error=>{
            localStorage.clear();
            reject(error);
        })
    })
    return promise;
}


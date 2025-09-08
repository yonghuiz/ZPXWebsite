import React from 'react';

import { Button,  Modal, ModalHeader, ModalBody, ModalFooter,Progress  } from 'reactstrap';
import './MessageBox.css'
import {FormattedMessage} from 'react-intl';


// Usage: openConfirmBox.call(this,title,content,onOK)
const MODAL_BASE_NAME = 'ModalBox_12321'
const MODAL_FLAG = MODAL_BASE_NAME + '_Flag';
const MODAL_TITLE = MODAL_BASE_NAME + '_Title';
const MODAL_CONTENT = MODAL_BASE_NAME + '_Content';
const MODAL_TOGGLE = MODAL_BASE_NAME + '_Toggle';
const MODAL_ONOK = MODAL_BASE_NAME + '_onOK';
const MODAL_TYPE = MODAL_BASE_NAME + '_Type';
const MODAL_TYPE_INFO = 'info';
const MODAL_TYPE_ERROR = 'error';
const MODAL_TYPE_CONFIRM = 'confirm';
const MODAL_TYPE_SUCESS = 'success';

const PROGRESS_BASE_NAME = 'ProgressBox_12321'
const PROGRESS_FLAG = PROGRESS_BASE_NAME + '_Flag';
const PROGRESS_TITLE = PROGRESS_BASE_NAME + '_Title';
const PROGRESS_VALUE = PROGRESS_BASE_NAME + '_Value';
const PROGRESS_TOGGLE = PROGRESS_BASE_NAME + '_Toggle';
const PROGRESS_SUCCESS_INFO = PROGRESS_BASE_NAME + '_SuccessInfo';


/* 
option={
    title:'',
    content:'',
    type:'', //confirm,info,error 
    onOK: ()=>{},
    onCanel: ()=>{},
}
*/



export function openModalBox(option){
    
    this.setState({
        [MODAL_FLAG]:true,
        [MODAL_TITLE]:option.title||'',
        [MODAL_CONTENT]:option.content||'',
        [MODAL_ONOK]:option.onOK||(()=>{}),
        [MODAL_TYPE]:option.type||MODAL_TYPE_INFO,
    });
    
}



export function openErrorBox(option){
    option.type = MODAL_TYPE_ERROR;
    openModalBox.call(this,option);
}
export function openInfoBox(option){
    option.type = MODAL_TYPE_INFO;
    openModalBox.call(this,option);
}
export function openSuccessBox(option){
    option.type = MODAL_TYPE_SUCESS;
    openModalBox.call(this,option);
}

export function showInfoMessage(msg){
    openModalBox.call(this,{
        content:msg,
        type:MODAL_TYPE_INFO,
    });
}
export function showErrorMessage(msg){
    openModalBox.call(this,{
        content:msg,
        type:MODAL_TYPE_ERROR,
    });
}
export function showSuccessMessage(msg){
    openModalBox.call(this,{
        content:msg,
        type:MODAL_TYPE_SUCESS,
    });
}
export function openConfirmBox(option){
    option.type = MODAL_TYPE_CONFIRM;
    option.title = option.title||<FormattedMessage id="page.comfirmbox.title" defaultMessage="Please Confirm"/>
    openModalBox.call(this,option);
}
// Usage:  ModalBox.call(this)
export function ModalBox(){
    if(this[MODAL_TOGGLE]===undefined)
    this[MODAL_TOGGLE] = ()=>{
        this.setState({[MODAL_FLAG]:!this.state[MODAL_FLAG],});
    }
    return (
        <Modal isOpen={this.state[MODAL_FLAG]} 
                toggle={this[MODAL_TOGGLE]} >
                <ModalHeader>
                    {this.state[MODAL_TITLE]}
                </ModalHeader>
                <ModalBody>
                    {
                        this.state[MODAL_TYPE] === MODAL_TYPE_ERROR?
                        <span className='modal-error-ico'><i className="fa fa-times-circle"> </i></span>
                        :null
                    }
                     {
                        this.state[MODAL_TYPE] === MODAL_TYPE_INFO?
                        <span className='modal-info-ico'><i className="fa fa-info-circle"> </i></span>
                        :null
                    }
                    {
                        this.state[MODAL_TYPE] === MODAL_TYPE_CONFIRM?
                        <span className='modal-info-ico'><i className="fa fa-question-circle"> </i></span>
                        :null
                    }
                    {
                        this.state[MODAL_TYPE] === MODAL_TYPE_SUCESS?
                        <span className='modal-success-ico'><i className="fa fa-check-circle"> </i></span>
                        :null
                    }
                
                    <span>{this.state[MODAL_CONTENT]}</span>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={()=>{this[MODAL_TOGGLE]();this.state[MODAL_ONOK]();}}><FormattedMessage id="page.ok" defaultMessage="OK"/></Button>{' '}
                    {
                    this.state[MODAL_TYPE] === MODAL_TYPE_CONFIRM?
                    <Button color="secondary" onClick={this[MODAL_TOGGLE]}><FormattedMessage id="page.cancel" defaultMessage="Cancel"/></Button>
                    :null
                    }
                </ModalFooter>
        </Modal>
    )
}




export function openProgressBox(option){
    
    this.setState({
        [PROGRESS_FLAG]:true,
        [PROGRESS_TITLE]:option.title||'',
        [PROGRESS_VALUE]:option.value||0,
        [PROGRESS_SUCCESS_INFO]:option.successInfo||0,
    });
    
}
// Usage:  ProgressBox.call(this)
export function ProgressBox(){
    if(this[PROGRESS_TOGGLE]===undefined)
    this[PROGRESS_TOGGLE] = ()=>{
        this.setState({[PROGRESS_FLAG]:!this.state[PROGRESS_FLAG],});
    }
    return (
        <Modal isOpen={this.state[PROGRESS_FLAG]} 
                toggle={this[PROGRESS_TOGGLE]} >
                <ModalHeader>
                    {this.state[PROGRESS_TITLE]}
                </ModalHeader>
                <ModalBody>
                    <div className="text-center">{this.state[PROGRESS_VALUE]+'%'}</div>
                    <Progress value={this.state[PROGRESS_VALUE]} />   
                    {
                        this.state[PROGRESS_VALUE] === 100?
                    <p> {this.state[PROGRESS_SUCCESS_INFO]} </p>
                    : null
                    }
                </ModalBody>
                <ModalFooter>
                    {
                        this.state[PROGRESS_VALUE] === 100?
                    <Button color="primary" onClick={()=>{this[PROGRESS_TOGGLE]();}}><FormattedMessage id="page.ok" defaultMessage="OK"/></Button>
                    : null
                    }
                </ModalFooter>
        </Modal>
    )
}

import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import RequestManager from '../../Managers/Softlockrequest';

export default connect(
    (state:any)=>{
        return {
           req_data:[]
        }
    },
    (dispatch)=>{
        console.log('dispatch=req');
        return bindActionCreators({
            sendRequest:(emp_request:any) => {
                return {type:"SEND_REQUEST",data:emp_request}
            }
        },dispatch)
    }
)(RequestManager)
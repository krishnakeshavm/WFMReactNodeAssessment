import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import WFMHome from '../../WFM/Home'

export default connect(
    (state:any)=>{
        console.log('HOC',state.wfmData)
        return {
            wfmData:state.wfmData.wfmData
        }
    },
    (dispatch)=>{
        return bindActionCreators({
            getWFM_manager:()=>{
                return {type:"WFM_MANAGER_ACTION"}
            },
            sendWFM_Request:(request:any) => {
                console.log('HOC Approval status:',request)
                return {type:"APPROVE_REQUEST",data:request}
            }
        },dispatch)
    }
)(WFMHome)
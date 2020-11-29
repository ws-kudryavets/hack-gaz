import React from 'react';
import {Label, Button, Input} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import styled from 'styled-components';
import {goToSteps, setActiveSteps} from "../../actions/workAction";
import axios from 'axios';

const InfoClient = styled.div`
  display: flex;
  flex-direction: column;
  width: 66%;
`

const TopContainer = styled.div`
  display: flex;
  padding-right: 0;
  padding: 23px 32px;
  height: calc(100% - 161px);
`;

const Name = styled.span`
font-style: normal;
font-weight: normal;
font-size: 38px;
line-height: 46px;
margin-bottom: 20px;
color: #000000;
`

const Work = styled.span`
font-style: normal;
font-weight: normal;
font-size: 21px;
line-height: 26px;
display: flex;
align-items: center;
margin-bottom: 50px;
color: #000000;
`



const Top = styled.div`
display: flex;
`;

const LeftContainer = styled.div`
width: 80%;
`;
const Bottom = styled.div`
    padding: 0 32px;
    text-align: end;
`;
const CloseButton = styled(Button)`
    height: 47px;
    width: 200px;
    background-color: transparent;
    border: 1px solid #5765E8;
    font-size: 16px;
    line-height: 20px;
    text-align: center;
    color: #5765E8;
    margin-right: 20px;
`;
export const ApproveButton = styled(Button)`
width: 199px;
    height: 47px;
    background: #1D61DA;
    border-radius: 2px;
    font-size: 16px;
    line-height: 20px;
    text-align: center;
    color: #FFFFFF;
`
const Step2 = () => {
    const activeClient = useSelector(({work}) => work.clients.find(v => v.id === work.activeClient));
    const dispath = useDispatch()
    const handleClick = React.useCallback((value) => {
        dispath(goToSteps(activeClient.id, value))
    }, [ dispath]);

    const [message, setMessage] = React.useState('');
    const handleInstance = async () => {
        await  axios.post('http://gpb2.hack48.ru:5000/send', {
                id: "230637210",
                message: message,
                send: "1"
            });
    }

    return (
        <div style={{width: 'calc(100% - 357px)',
            backgroundColor: '#EDEFF3'}}>
            <TopContainer>
                <LeftContainer>
                    <Top>
                        <InfoClient>
                            <Name>{activeClient.name}</Name>
                            <Work>{activeClient.position} {activeClient.work.length ? `(${activeClient.work})` : ''} </Work>

                        </InfoClient>

                    </Top>
                </LeftContainer>
            </TopContainer>
            <Label>Введите сообщение</Label>
            <Input type="text-area" value={message} onChange={e => setMessage(e.target.value)}/>
            <Bottom>
                <CloseButton onClick={() => handleClick(7)}>Отказаться</CloseButton>
                <ApproveButton onClick={handleInstance}>Отправить</ApproveButton>
            </Bottom>
        </div>
    );
}

export default Step2;

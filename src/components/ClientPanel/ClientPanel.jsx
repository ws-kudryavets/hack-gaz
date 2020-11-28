import React from 'react';
import styled from "styled-components";
import {Input} from 'reactstrap';
import {LogoUser} from "../TopBar/TopBar";
import {useDispatch, useSelector} from "react-redux";
import {setQuery, setActiveClient} from "../../actions/workAction";

const Container = styled.div`
  width: 357px;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #A3A3A3;
  height: 100%;
`;

const StyledInput = styled(Input)`
  border-left: none;
  border-top: none;
  border-right: none;
  border-bottom: 1px solid #EAECEE;
  margin: 20px;
  width: initial;
`

const CardContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 121px;
    border: 1px solid #EBEFF6;
    cursor: pointer;
`;

const InfoContainer = styled.div`
    width: 70%;
    display: flex;
    flex-direction: column;
    padding: 7px;
    position: relative;
`;

const Name = styled.span`
font-style: normal;
font-weight: normal;
font-size: 21px;
line-height: 26px;
margin-bottom: 15px;
color: #212429;
`;

const Work = styled.span`
font-size: 16px;
line-height: 20px;
color: #ACB5BD;
`
const Count = styled.div`
    font-weight: 600;
    font-size: 21px;
    line-height: 26px;
    text-align: end;
    position: absolute;
    top: 81%;
    left: 83%;
    color: ${({count}) => count > 6 ? '#92DB6F' : (count > 4 ? '#FFC839' : '#F03D3E')};
`

const Card = ({id, name='', work='', position='', count=0, ...reset}) => {
    return (
        <CardContainer  {...reset}>
            <LogoUser id={id}/>
            <InfoContainer>
                <Name>{name}</Name>
                <Work>{position}</Work>
                <Work>{work}</Work>
                <Count count={count}>{count}/10</Count>
            </InfoContainer>
        </CardContainer>
    )
}


const Search = () => {
    const q = useSelector(({work}) => work.q);
    const dispath = useDispatch()
    const handleClick = React.useCallback((value) => {
        dispath(setQuery(value))
    }, [ dispath]);
    return <StyledInput placeholder="поиск..." value={q} onChange={e => handleClick(e.target.value)}/>
}

const OverflowContainer = styled.div`
height: 78%;
overflow-x: auto;
`;

const BottomContainer = styled.div`
    border-top: 1px solid #EBEFF6;
    height: 14%;
    flex-direction: row;
    justify-content: space-around;
    display: flex;
    align-items: center;
`;

const AllClients = styled.span`
font-weight: 600;
font-size: 16px;
line-height: 20px;
color: #ACB5BD;
cursor: default;
`;

const Reset = styled.span`
font-weight: 600;
font-size: 16px;
line-height: 20px;
color: #339AF0;
cursor: pointer;
`

const Panel = () => {
    const clients = useSelector(({work}) => work.clients.filter(v => v.positionId === work.activeWork && v.step === work.activeSteps && v.name.toLowerCase().includes(work.q)));
    const allClients = useSelector(({work}) => work.clients.filter(v => v.positionId === work.activeWork && v.step === work.activeSteps).length);
    const dispath = useDispatch()
    const handleClick = React.useCallback((value) => {
        dispath(setQuery(value))
    }, [ dispath]);
    const setActiveClients = React.useCallback((value) => {
        dispath(setActiveClient(value))
    }, [dispath]);

    return (
        <Container>
            <Search/>
            <OverflowContainer>
                {clients.map(item => <Card onClick={() => setActiveClients(item.id)} key={item.name} {...item}/>)}
            </OverflowContainer>
            <BottomContainer>
                <AllClients>Всего {allClients} откликов</AllClients>
                <Reset onClick={() => handleClick('')}>Все кандидаты</Reset>
            </BottomContainer>

        </Container>
    )
}

export default React.memo(Panel);

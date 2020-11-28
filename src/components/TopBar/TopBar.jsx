import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import styled from "styled-components";
import {setActiveSteps} from "../../actions/workAction";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 100px;
  border-bottom: 1px solid #DDE2E5;
  padding: 0 30px;
  align-items: center;
`

const SuperTitle = styled.h1`
  font-style: normal;
  font-weight: normal;
  font-size: 28px;
  color: #212429;
`;

const ContainerName = styled.div`
  display: flex;
  align-items: center;
`

const Name = styled.span`
font-size: 21px;
line-height: 26px;
color: #212429;
`

export const LogoUser = styled.div`
    margin-left: 20px;
    width: 45px;
    height: 45px;
    ${props => props.id ? `
background: url(/img/${props.id}.png);
background-repeat: no-repeat;
background-size: cover;
` : ''}
    background-color: #518ADD;
    border-radius: 50%;
`
const User = () => {
    const user = useSelector(({user}) => user.name);
    return (
        <ContainerName>
            <Name>{user}</Name>
            <LogoUser />
        </ContainerName>
    )
};

const SecondaryContainer = styled.div`
  height: 76px;
  border-bottom: 1px solid #DDE2E5;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-end;
`

const SecondaryTitle = styled.span`
  ${props => props.active 
    ? '' +
    'color: #212429;border-bottom: 5px solid #0066CC; padding-bottom: 5px;' 
    : 'color: #ACB5BD; padding-bottom: 10px;'
    }
  font-size: 16px;
  line-height: 20px;
  cursor: pointer;
  
`

const SecondaryTopBar = () => {
    const steps = useSelector(({work}) => work.steps)
    const activeSteps = useSelector(({work}) => work.activeSteps)
    // let history = useHistory();
    const dispath = useDispatch()
    const handleClick = React.useCallback((id) => {
        dispath(setActiveSteps(id))
        // history.push("/history");
    }, [ dispath]);

    return (
        <SecondaryContainer>
            {steps.map((item)=> <SecondaryTitle key={item.name} onClick={() => handleClick(item.id)} active={item.id === activeSteps}>{item.name}</SecondaryTitle>)}
        </SecondaryContainer>
    )
}

const TopBar = () => {
    const active = useSelector(({work}) => work.works.find(v => v.id === work.activeWork).title)
    return (
        <>
            <Container>
                <SuperTitle>{active}</SuperTitle>
                <User/>
            </Container>
            <SecondaryTopBar/>
        </>
    );
}

export default TopBar;

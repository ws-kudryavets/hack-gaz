import React from 'react';
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import { useHistory } from "react-router-dom";
import {ApproveButton} from "../Step1/Step1";
import {Input, Label} from "reactstrap";
import {newVacancy} from "../../actions/workAction";
import { getToken } from '../../utils/localStorage';

const Name = styled.span`
font-size: 21px;
line-height: 26px;
color: #212429;
`
const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 100px;
  border-bottom: 1px solid #DDE2E5;
  padding: 0 30px;
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
            <LogoUser id={'0'}/>
        </ContainerName>
    )
};

const ContainerInput = styled.div`
display: flex;
flex-direction: row;
`

const ContainerInputLeft = styled.div`
width: 50%;
padding: 20px;

& > label {
  margin-top: 30px;
}

& > button {
margin-top: 50px;
}
`


const NewVacancy = () => {
    const [title, setTitle] = React.useState('');
    const [subtitle, setSubTitle] = React.useState('');
    let history = useHistory();

    React.useEffect(() => {
        if (!getToken()) {
            history.replace('/login');
        }
    }, [])
    const dispath = useDispatch()
    const handleClick = React.useCallback(() => {
        dispath(newVacancy({title, subtitle}))
        history.push("/");
    }, [title, subtitle, dispath]);

    return (
        <>
        <Container>
            <SuperTitle>Новая вакансия</SuperTitle>
            <User/>
        </Container>
        <ContainerInput>
            <ContainerInputLeft>
                <Label>Название вакансии</Label>
                <Input value={title} onChange={e => setTitle(e.target.value)}/>
                <Label>Отдел</Label>
                <Input value={subtitle} onChange={e => setSubTitle(e.target.value)}/>
                <Label>Требоввания</Label>
                <Input type="textarea"/>
            </ContainerInputLeft>
            <ContainerInputLeft>
                <Label>Обязанности</Label>
                <Input type="textarea"/>
                <Label>Мы предлагаем</Label>
                <Input type="textarea"/>
                <ApproveButton onClick={handleClick}>Опубликовать</ApproveButton>
            </ContainerInputLeft>
        </ContainerInput>
            </>
    );
};

export default NewVacancy;

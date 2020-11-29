import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import styled from 'styled-components';
import {setActive} from "../../actions/workAction";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useHistory} from "react-router-dom";

const Container = styled.div`
    width: 230px;
    background-color: #518ADD;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px 0;
`

const Title = styled.h1`
  margin: 40px 0;
  font-style: normal;
  font-weight: normal;
  font-size: 21px;
  line-height: 26px;
  color: #DDE2E5;
  border-bottom: 1px solid #fff;
  padding: 0 20px 20px;
`

const ContainerItem = styled.div`
  display: flex;
  flex-direction: column;
  background-color: transparent;
  align-items: start;
  width: 129px;
  margin-bottom: 30px;
  cursor: pointer;
  ${props => props.active ? 'color: #1D61DA;' : 'color: #DDE2E5;' }
`

const ItemTitle = styled.span`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 20px;
  padding-bottom: 6px;
`;

const SubContainer = styled.div`
    height: 70vh;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    width: 200px;
    align-items: center;
`

const SubTitle = styled.span`
font-style: normal;
font-weight: normal;
font-size: 12px;
line-height: 15px;
`

const Logo = () => (<svg width="156" height="41" viewBox="0 0 156 41" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M33.5409 13.4314C37.2292 20.8494 34.2057 29.8527 26.7877 33.541C19.3698 37.2292 10.3664 34.2057 6.67818 26.7878C2.98992 19.3698 6.01343 10.3665 13.4314 6.67821C20.8493 2.98995 29.8527 6.01346 33.5409 13.4314Z" fill="#1D61DA"/>
        <path d="M36.216 23.7639C36.216 25.4253 35.6373 26.7786 34.48 27.8239C33.3413 28.8506 31.8013 29.3639 29.86 29.3639C28.9267 29.3639 27.872 29.2426 26.696 28.9999C25.5387 28.7386 24.5773 28.4306 23.812 28.0759L24.848 24.7439C26.5653 25.5279 28.1893 25.9199 29.72 25.9199C31.456 25.9199 32.324 25.2479 32.324 23.9039C32.324 23.2506 32.0347 22.6906 31.456 22.2239C30.8773 21.7573 30.0933 21.2999 29.104 20.8519C28.1147 20.3853 27.4053 20.0306 26.976 19.7879C26.5653 19.5453 26.108 19.1999 25.604 18.7519C24.652 17.9119 24.176 16.6893 24.176 15.0839C24.176 13.4786 24.736 12.2186 25.856 11.3039C26.9947 10.3893 28.3947 9.93195 30.056 9.93195C31.736 9.93195 33.5373 10.2866 35.46 10.9959L34.34 14.0479C32.8093 13.5066 31.5027 13.2359 30.42 13.2359C28.8707 13.2359 28.0867 13.8519 28.068 15.0839C28.068 15.5879 28.236 15.9706 28.572 16.2319C28.908 16.4746 29.1507 16.6519 29.3 16.7639C29.4493 16.8573 29.748 17.0253 30.196 17.2679C30.6627 17.4919 31.092 17.7159 31.484 17.9399C31.876 18.1453 32.2307 18.3506 32.548 18.5559C32.884 18.7426 33.3227 19.0413 33.864 19.4519C34.4053 19.8626 34.816 20.2453 35.096 20.5999C35.8427 21.5333 36.216 22.5879 36.216 23.7639Z" fill="white"/>
        <path d="M41.9033 16.2319C42.3886 15.7466 43.0513 15.3173 43.8913 14.9439C44.75 14.5706 45.6553 14.3839 46.6073 14.3839C47.5593 14.3839 48.2966 14.5426 48.8193 14.8599C49.342 15.1773 49.762 15.6626 50.0793 16.3159C50.5833 15.7933 51.2646 15.3453 52.1233 14.9719C53.0006 14.5799 53.878 14.3839 54.7553 14.3839C56.3606 14.3839 57.4433 14.8039 58.0033 15.6439C58.582 16.4653 58.8713 17.6413 58.8713 19.1719V28.9999H54.9513V19.8719C54.9513 18.6773 54.6993 17.9679 54.1953 17.7439C53.9526 17.6319 53.626 17.5759 53.2153 17.5759C52.17 17.5759 51.2833 17.9213 50.5553 18.6119C50.574 18.7426 50.5833 18.9386 50.5833 19.1999V28.9999H46.6633V19.8719C46.6633 18.6773 46.4113 17.9679 45.9073 17.7439C45.6646 17.6319 45.338 17.5759 44.9273 17.5759C43.882 17.5759 42.9953 17.9213 42.2673 18.6119V28.9999H38.3473V14.6359H41.5673L41.9033 16.2319Z" fill="white"/>
        <path d="M74.7175 28.5239C73.7655 29.0466 72.7202 29.3079 71.5815 29.3079C70.4615 29.3079 69.6309 28.8786 69.0895 28.0199C68.0069 28.9159 66.7375 29.3639 65.2815 29.3639C63.8255 29.3639 62.7242 28.9999 61.9775 28.2719C61.2309 27.5253 60.8575 26.5173 60.8575 25.2479C60.8575 24.4079 61.0349 23.6893 61.3895 23.0919C61.7442 22.4946 62.2015 22.0559 62.7615 21.7759C63.7882 21.2906 64.8522 21.0479 65.9535 21.0479C67.0735 21.0479 67.9695 21.0759 68.6415 21.1319V19.7599C68.6415 18.7893 68.4455 18.1639 68.0535 17.8839C67.6615 17.6039 66.9895 17.4639 66.0375 17.4639C65.1042 17.4639 64.0495 17.6599 62.8735 18.0519L62.0615 15.5879C62.7522 15.1773 63.5922 14.8693 64.5815 14.6639C65.5895 14.4399 66.4482 14.3279 67.1575 14.3279C69.0615 14.3279 70.4149 14.7386 71.2175 15.5599C72.0389 16.3626 72.4495 17.7439 72.4495 19.7039V25.5839C72.4495 26.1066 72.6829 26.3679 73.1495 26.3679C73.3922 26.3679 73.7375 26.3119 74.1855 26.1999L74.7175 28.5239ZM66.3455 26.7599C67.1295 26.7599 67.8949 26.5173 68.6415 26.0319V23.0919C68.1189 23.0546 67.6615 23.0359 67.2695 23.0359C65.4215 23.0359 64.4975 23.6333 64.4975 24.8279C64.4975 26.1159 65.1135 26.7599 66.3455 26.7599Z" fill="white"/>
        <path d="M83.167 17.5199C81.6363 17.5199 80.563 17.9586 79.947 18.8359V28.9999H76.027V14.6359H79.275L79.583 16.4559C80.6656 15.0373 82.047 14.3279 83.727 14.3279C84.1936 14.3279 84.623 14.3746 85.015 14.4679L84.371 17.6879C83.9603 17.5759 83.559 17.5199 83.167 17.5199Z" fill="white"/>
        <path d="M88.0377 24.3799V17.3519L85.5177 17.1839V14.8879L88.1217 14.6639V11.3879L92.0417 11.0519V14.6359H96.1297L95.9057 17.3519H92.0137V24.7439C92.0137 25.2853 92.0977 25.6773 92.2657 25.9199C92.4337 26.1439 92.7883 26.2559 93.3297 26.2559C93.871 26.2559 94.4777 26.1719 95.1497 26.0039L95.7377 28.7759C94.823 29.1679 93.8897 29.3639 92.9377 29.3639C92.0043 29.3639 91.295 29.3079 90.8097 29.1959C90.343 29.0839 89.951 28.9533 89.6337 28.8039C89.335 28.6546 89.0737 28.4399 88.8497 28.1599C88.6443 27.8613 88.4857 27.5999 88.3737 27.3759C88.2803 27.1519 88.2057 26.8346 88.1497 26.4239C88.075 25.8639 88.0377 25.1826 88.0377 24.3799Z" fill="white"/>
        <path d="M108.319 17.6879V10.2959H112.323V28.9999H108.319V20.9359H102.187V28.9999H98.1826V10.2959H102.187V17.6879H108.319Z" fill="white"/>
        <path d="M124.164 27.6839C122.727 28.8039 121.196 29.3639 119.572 29.3639C117.967 29.3639 116.865 28.9533 116.268 28.1319C115.689 27.2919 115.4 26.1066 115.4 24.5759V14.6359H119.32V23.8759C119.32 24.6226 119.432 25.1919 119.656 25.5839C119.88 25.9759 120.431 26.1719 121.308 26.1719C122.204 26.1719 123.035 25.8826 123.8 25.3039V14.6359H127.72V29.3639H124.5L124.164 27.6839Z" fill="white"/>
        <path d="M138.891 14.3839C140.515 14.3839 141.616 14.8039 142.195 15.6439C142.792 16.4653 143.091 17.6413 143.091 19.1719V28.9999H139.171V19.8719C139.171 19.1439 139.05 18.5839 138.807 18.1919C138.583 17.7813 138.023 17.5759 137.127 17.5759C136.231 17.5759 135.419 17.9213 134.691 18.6119V28.9999H130.687V14.6359H133.991L134.327 16.2319C134.868 15.7279 135.55 15.2986 136.371 14.9439C137.211 14.5706 138.051 14.3839 138.891 14.3839Z" fill="white"/>
        <path d="M147.428 24.3799V17.3519L144.908 17.1839V14.8879L147.512 14.6639V11.3879L151.432 11.0519V14.6359H155.52L155.296 17.3519H151.404V24.7439C151.404 25.2853 151.488 25.6773 151.656 25.9199C151.824 26.1439 152.179 26.2559 152.72 26.2559C153.262 26.2559 153.868 26.1719 154.54 26.0039L155.128 28.7759C154.214 29.1679 153.28 29.3639 152.328 29.3639C151.395 29.3639 150.686 29.3079 150.2 29.1959C149.734 29.0839 149.342 28.9533 149.024 28.8039C148.726 28.6546 148.464 28.4399 148.24 28.1599C148.035 27.8613 147.876 27.5999 147.764 27.3759C147.671 27.1519 147.596 26.8346 147.54 26.4239C147.466 25.8639 147.428 25.1826 147.428 24.3799Z" fill="white"/>
    </svg>
);

const Item = ({id, title='', subtitle=''}) => {
    let history = useHistory();
    const dispath = useDispatch()
    const activeId = useSelector(({work}) => work.works.find(v => v.id === work.activeWork).id)

    const handleClick = React.useCallback(() => {
        dispath(setActive(id))
        history.push("/");
    }, [ dispath])
    return (
        <ContainerItem onClick={handleClick} active={activeId === id}>
            <ItemTitle>{title}</ItemTitle>
            <SubTitle>{subtitle}</SubTitle>
        </ContainerItem>

    )
}

const Plus = styled.div`
  width: 63px;
  height: 63px;
  background-color: #EBEFF6;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  box-shadow: 3px 6px 9px rgba(0, 0, 0, 0.15);
  margin-left: auto;
  margin-right: 20px;
  cursor: pointer;
;
`


const NavBar = () => {
    const works = useSelector(store => store.work.works);
    let history = useHistory();

    function handleClick() {
        history.push("/new-vac");
    }
    return (
        <Container>
            <Logo/>
            <Title>Мои вакансии</Title>
            <SubContainer>
                {works.map(item => <Item key={item.title} {...item}/>)}
            </SubContainer>
            <Plus onClick={handleClick}><svg width="23" height="25" viewBox="0 0 23 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.5 13.45V10.85H12.9V0.499997H10.05V10.85H0.45V13.45H10.05V24.1H12.9V13.45H22.5Z" fill="#1D61DA"/>
            </svg>
            </Plus>
        </Container>
    )
};


export default NavBar;

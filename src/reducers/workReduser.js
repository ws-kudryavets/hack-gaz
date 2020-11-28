import {
    SET_ACTIVE, SET_ACTIVE_STEPS, QUERY, SET_ACTIVE_CLIENT, GO_TO_STEPS, NEW_VACANCY
} from '../actions/types';
import React from "react";

const INITIAL_STATE = {
    works: [
        {
            id: 5,
            title: 'Программист JAVA',
            subtitle: 'Отдел исследований и разработки',
        },
        {
            id: 1,
            title: 'Аналитик',
            subtitle: 'Отдел маркетинга'
        },
        {
            id: 2,
            title: 'DevOps инженер',
            subtitle: 'Отдел исследований и разработки'
        },
        {
            id: 3,
            title: 'Ведущий Scala разработчик',
            subtitle: 'Отдел исследований и разработки'
        },
        {
            id: 4,
            title: 'Системный администратор',
            subtitle: 'Отдел исследований и разработки'
        },
    ],
    steps: [
        {
            id: 1,
            name: 'Отклики',
        },
        {
            id: 2,
            name: 'Первичный контакт',
        },
        {
            id: 3,
            name: 'Тестовое задание',
        },
        {
            id: 4,
            name: 'Интервью'
        },
        {
            id: 5,
            name: 'Выставлен оффер',
        },
        {
            id: 6,
            name: 'Выход на работу',
        },
        {
            id: 7,
            name: 'Отказ',
        }
    ],
    clients: [
        {
            id: 1,
            name: 'Смирнов Валерий',
            work: 'SberTech',
            position: 'Разработчик JAVA',
            count: 9,
            price: 100000,
            number: '8 955 445 65 87',
            email: 'pochta@gmail.com',
            step: 1,
            positionId: 5,
        },
        {
            id: 230637210,
            name: 'Карло Юлия',
            work: 'Райфайзен банк',
            position: 'Ведущий программист',
            count: 6,
            price: 120000,
            number: '8 955 445 65 87',
            email: 'pochta@gmail.com',
            step: 1,
            positionId: 5,
        },
        {
            id: 3,
            name: 'Ларин Алексей',
            work: 'Альфа Страхование',
            position: 'JAVA программист',
            count: 3,
            price: 100000,
            number: '8 955 445 65 87',
            email: 'pochta2@gmail.com',
            step: 1,
            positionId: 5,
        },
        {
            id: 4,
            name: 'Александр Кудрявец',
            work: 'WebSailors',
            position: 'Middle Web Developer',
            count: 8,
            price: 130000,
            number: '8 928 190 22 27',
            email: 'pochta1@gmail.com',
            step: 2,
            positionId: 5,
        }
    ],
    q: '',
    activeWork: 5,
    activeSteps: 1,
    activeClient: null,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_ACTIVE:
            return {
                ...state,
                activeWork: action.payload,
                activeClient: null,
            };
        case SET_ACTIVE_STEPS:
            return {
                ...state,
                activeSteps: action.payload,
                activeClient: null,
            }
        case SET_ACTIVE_CLIENT:
            return {
                ...state,
                activeClient: action.payload
            }
        case QUERY:
            return {
                ...state,
                q: action.payload,
            };
        case GO_TO_STEPS:
            return {
                ...state,
                clients: state.clients.map(v => v.id === action.payload.id ? {...v, step: action.payload.step} : v),
                activeClient: null,
            };
        case NEW_VACANCY:
            return {
                ...state,
                works: [...state.works, {...action.payload, id: state.works.length + 2}],
            };
        default:
            return state;
    }
};

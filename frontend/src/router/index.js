import {createRouter,createWebHistory} from 'vue-router';

export function create() {
    return new createRouter({
        history:createWebHistory(),
        routes: [
            ...require('./auth'), 
            ...require('./main')
        ]
    });
}
const { checkAuthenticatedUser } = require('./gaurds');
//chat frontend routes
module.exports = [
    {
        path: '/main',
        component: () =>
        import(
            './../pages/main/main.vue'
        ),
        beforeEnter: checkAuthenticatedUser
    },
];
'use strict';

class Route {
    constructor() {
        console.log('Route');

        let Router = function(name, routes) {
            return {
                name: name,
                routes: routes,
            };
        };

        let myFirstRouter = new Router('myFirstRouter', [
            {
                path: '/',
                name: 'Root',
            },
            {
                path: '/signin/',
                name: 'SignIn',
            },
            {
                path: '/signup/',
                name: 'SignUp',
            },
            {
                path: '/leaderboard',
                name: 'LeaderBoard',
            },
        ]);

        let currentPath = window.location.pathname;

        if (currentPath === '/') {
            console.log(currentPath);

            const main = new Main();
            main.show();
        } else {
            let route = myFirstRouter.routes.filter(function(r) {
                return r.path === currentPath;
            })[0];
            console.log(route);
            if (route.path === '/signin/') {
                const signin = new SignIn();
                signin.show();
            } else if (route.path === '/signup/') {
                const signup = new SignUp();
                signup.show();
            } else {
                console.log('404');
            }
        }
    }
}

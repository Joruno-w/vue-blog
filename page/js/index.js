const vm1 = new Vue({
    el: '#every_day',
    data: {
        content: 'An animal\'s eyes have the power to speak a great language.'
    },
    created() {
        //访问接口
    }
});

const vm2 = new Vue({
    el: '#articleList',
    data: {
        articleList: [
            {
                title: '在Nginx中将http://zh30.com:443跳转到https://zh30.com:443',
                link: '',
                content: '有小伙伴反应我博客半年没更新了，借此机会赶紧水一篇。另有小伙伴求助于我一个这样的问题，说在使用http://协议外加443端口访问时，nginx会报错提示：“400 Bad Request The plain HTTP request was sent to HTTPS port”这个错误是指请求错误，http协议的请求被发送到了https的端口。在Nginx中，不能在一个端口同时处理http和https请求。按正常浏览来说也不可能会...',
                publishDate: '2020-05-22',
                scan: '1,097',
                tags: 'bad request error_page nginx'
            },
            {
                title: '在Nginx中将http://zh30.com:443跳转到https://zh30.com:443',
                link: '',
                content: '有小伙伴反应我博客半年没更新了，借此机会赶紧水一篇。另有小伙伴求助于我一个这样的问题，说在使用http://协议外加443端口访问时，nginx会报错提示：“400 Bad Request The plain HTTP request was sent to HTTPS port”这个错误是指请求错误，http协议的请求被发送到了https的端口。在Nginx中，不能在一个端口同时处理http和https请求。按正常浏览来说也不可能会...',
                publishDate: '2020-05-22',
                scan: '1,097',
                tags: 'bad request error_page nginx'
            },
            {
                title: '在Nginx中将http://zh30.com:443跳转到https://zh30.com:443',
                link: '',
                content: '有小伙伴反应我博客半年没更新了，借此机会赶紧水一篇。另有小伙伴求助于我一个这样的问题，说在使用http://协议外加443端口访问时，nginx会报错提示：“400 Bad Request The plain HTTP request was sent to HTTPS port”这个错误是指请求错误，http协议的请求被发送到了https的端口。在Nginx中，不能在一个端口同时处理http和https请求。按正常浏览来说也不可能会...',
                publishDate: '2020-05-22',
                scan: '1,097',
                tags: 'bad request error_page nginx'
            },
            {
                title: '在Nginx中将http://zh30.com:443跳转到https://zh30.com:443',
                link: '',
                content: '有小伙伴反应我博客半年没更新了，借此机会赶紧水一篇。另有小伙伴求助于我一个这样的问题，说在使用http://协议外加443端口访问时，nginx会报错提示：“400 Bad Request The plain HTTP request was sent to HTTPS port”这个错误是指请求错误，http协议的请求被发送到了https的端口。在Nginx中，不能在一个端口同时处理http和https请求。按正常浏览来说也不可能会...',
                publishDate: '2020-05-22',
                scan: '1,097',
                tags: 'bad request error_page nginx'
            }
        ]
    },
    created() {

    }
});


const vm3 = new Vue({
    el: '#randomTag',
    data: {
        tags: ['javascript','php','java','c++','python','Ruby','javascript','php','java','c++','python','Ruby','javascript','php','java','c++','python','Ruby']
    },
    methods:{
        getRandom(min,max) {
            return Math.floor(Math.random() * (max+1 - min) + min);
        }
    },
    computed: {
        getRandomColor() {
            return () => `rgba(${this.getRandom(0, 255)},${this.getRandom(0, 255)},${this.getRandom(0, 255)})`;
        },
        getRandomSize(){
            return ()=>`${this.getRandom(10,25)}px`;
        }
    },
    created() {

    }
});


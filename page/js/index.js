const every_day_vm = new Vue({
    el: '#every_day',
    data: {
        content: ''
    },
    created() {
        axios.get('/queryEveryDay').then(res => {
            this.content = res.data[0].content;
        }).catch(res => {
            console.log('error');
        })
    }
});
function parseObj(ele) {
    const obj = {};
    obj.title = ele.title;
    obj.tags = ele.tags;
    obj.scan = ele.views;
    obj.publishDate = new Date(ele.createdAt).toLocaleDateString().replace(/\//g,'-');
    obj.content = ele.content;
    obj.id = ele.id;
    obj.link = '/blog_detail.html?bid=' + ele.id;
    return obj;
}
const articleVm = new Vue({
    el: '#articleList',
    data: {
        current: 1,
        limit: 1,
        count: 100,
        pageNumList: [],
        panelNumebr: 10,
        articleList: [
            {
                id: 1,
                title: '在Nginx中将http://zh30.com:443跳转到https://zh30.com:443',
                link: '',
                content: '有小伙伴反应我博客半年没更新了，借此机会赶紧水一篇。另有小伙伴求助于我一个这样的问题，说在使用http://协议外加443端口访问时，nginx会报错提示：“400 Bad Request The plain HTTP request was sent to HTTPS port”这个错误是指请求错误，http协议的请求被发送到了https的端口。在Nginx中，不能在一个端口同时处理http和https请求。按正常浏览来说也不可能会...',
                publishDate: '2020-05-22',
                scan: '1,097',
                tags: 'bad request error_page nginx'
            }
        ]
    },
    methods: {
        switchTo(page) {
            this.current = page;
            this.getPage(this.current, this.limit);
        },
        getPage(page, limit) {
            const paramsStr = location.search.includes('?') ? location.search.substring(1).split('&') : '';
            let tag = '';
            if (paramsStr !== '') {
                for (let i = 0; i < paramsStr.length; i++) {
                    if (paramsStr[i].split("=")[0] === 'tag') {
                        try {
                            tag = paramsStr[i].split("=")[1];
                        } catch {
                            console.log('出错了！');
                        }
                    }
                }
            }
            if (tag == ''){
                axios.get('/queryBlogByPage', {
                    params: {
                        page,
                        limit,
                    }
                }).then(res => {
                    const result = res.data;
                    const list = [];
                    for (let i = 0; i < result.length; i++) {
                        list.push(parseObj(result[i]));
                    }
                    this.articleList = list;
                    this.pageNumList = this.generatePager();
                }).catch(err => {
                    console.log(err);
                });
            }else{
                axios.get('/queryByTag',{
                    params: {
                        page,
                        limit,
                        tag,
                    }
                }).then(res=>{
                    const result = res.data;
                    if (Array.isArray(result)){
                        const list = [];
                        for (let i = 0; i < result.length; i++) {
                            list.push(parseObj(result[i]));
                        }
                        this.articleList = list;
                        this.pageNumList = this.generatePager();
                    }else{
                        this.articleList = [parseObj(result)];
                    }
                }).catch(err=>{
                    console.log(err);
                })
            }
        },
        generatePager() {
            const result = [];
            const page = this.current;
            const totalPage = this.count;
            const pageSize = this.limit;
            result.push({
                text: '首页',
                page: 1
            });
            if (page > 2) {
                result.push({
                    text: page - 2,
                    page: page - 2
                });
            }
            if (page > 1) {
                result.push({
                    text: page - 1,
                    page: page - 1
                });
            }
            result.push({
                text: page,
                page
            });
            if (this.current + 1 <= parseInt((totalPage + pageSize - 1) / pageSize)) {
                result.push({
                    text: page + 1,
                    page: page + 1
                });
            }
            if (this.current + 2 <= parseInt((totalPage + pageSize - 1) / pageSize)) {
                result.push({
                    text: page + 2,
                    page: page + 2
                });
            }
            result.push({
                text: '尾页',
                page: parseInt((totalPage + pageSize - 1) / pageSize)
            });
            return result;
        }
    },
    created() {
        this.getPage(this.current, this.limit);
    }
});


const randomTagVm = new Vue({
    el: '#randomTag',
    data: {
        tags: ['javascript', 'php', 'java', 'c++', 'python', 'Ruby', 'javascript', 'php', 'java', 'c++', 'python', 'Ruby', 'javascript', 'php', 'java', 'c++', 'python', 'Ruby']
    },
    methods: {
        getRandom(min, max) {
            return Math.floor(Math.random() * (max + 1 - min) + min);
        }
    },
    computed: {
        getRandomColor() {
            return () => `rgba(${this.getRandom(0, 255)},${this.getRandom(0, 255)},${this.getRandom(0, 255)})`;
        },
        getRandomSize() {
            return () => `${this.getRandom(10, 25)}px`;
        }
    },
    created() {
        axios.get('/queryRandomTag').then(res => {
            let result = [];
            for (let i = 0; i < res.data.length; i++) {
                result.push(res.data[i].tag);
            }
            result.sort(() => Math.random() - .5);
            this.tags = result;
        }).catch(err => {
            console.log(err);
        });
    }
});

const hotVm = new Vue({
    el: '#hot',
    data: {
        hots: []
    },
    created() {
        axios.get('/queryHotBlog', {
            params: {
                limit: 3
            }
        }).then(res => {
            const result = [];
            for (let i = 0; i < res.data.length; i++) {
                const temp = {};
                temp.title = res.data[i].title;
                temp.link = `/blog_detail.html?bid=${res.data[i].id}`;
                result.push(temp);
            }
            this.hots = result;
        }).catch(err => {
            console.log(err);
        })
    }
});


const commentVm = new Vue({
    el: '#comment',
    data: {
        comments: []
    },
    created() {
        axios.get('/queryNewComments',{
            params: {
                limit: 6
            }
        }).then(res=>{
            const result = [];
            for (let i = 0;i < res.data.length;i ++){
                const ele = res.data[i];
                const temp = {};
                temp.name = ele.userName;
                temp.date = new Date(ele.createdAt).toLocaleDateString().replace(/\//g,'-');
                temp.discuss = ele.comments;
                result.push(temp);
            }
            this.comments = result;
        }).catch(err=>{
            console.log(err);
        })
    }
});

const youlianVm = new Vue({
    el: '#youlian',
    data: {
        youlianList: [
            {
                link: 'http://www.baidu.com',
                content: '挨踢茶馆'
            },
            {
                link: 'http://www.baidu.com',
                content: '挨踢茶馆'
            },
            {
                link: 'http://www.baidu.com',
                content: '挨踢茶馆'
            },
            {
                link: 'http://www.baidu.com',
                content: '挨踢茶馆'
            },
            {
                link: 'http://www.baidu.com',
                content: '挨踢茶馆'
            },
            {
                link: 'http://www.baidu.com',
                content: '挨踢茶馆'
            },
            {
                link: 'http://www.baidu.com',
                content: '挨踢茶馆'
            },
            {
                link: 'http://www.baidu.com',
                content: '挨踢茶馆'
            },
            {
                link: 'http://www.baidu.com',
                content: '挨踢茶馆'
            },
            {
                link: 'http://www.baidu.com',
                content: '挨踢茶馆'
            },
            {
                link: 'http://www.baidu.com',
                content: '挨踢茶馆'
            },
            {
                link: 'http://www.baidu.com',
                content: '挨踢茶馆'
            },
            {
                link: 'http://www.baidu.com',
                content: '挨踢茶馆'
            },
            {
                link: 'http://www.baidu.com',
                content: '挨踢茶馆'
            },
            {
                link: 'http://www.baidu.com',
                content: '挨踢茶馆'
            },
            {
                link: 'http://www.baidu.com',
                content: '挨踢茶馆'
            }
        ]
    }
});


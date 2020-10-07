const blogDetail = new Vue({
    el: '#blog_detail',
    data: {
        title: '',
        content: '',
        tags: '',
        views: '',
        publishDate: ''
    },
    methods: {},
    created() {
        const paramsStr = location.search.includes('?') ? location.search.substring(1).split('&') : '';
        if (paramsStr === '') {
            return;
        }
        let bid = -1;
        for (let i = 0; i < paramsStr.length; i++) {
            if (paramsStr[i].split("=")[0] === 'bid') {
                try {
                    bid = paramsStr[i].split("=")[1];
                } catch {
                    console.log('出错了！');
                }
            }
        }
        axios.get(`/queryBlogById?bid=${bid}`).then(res => {
            const {title, content, views, tags, createdAt: publishDate} = res.data;
            this.title = title;
            this.content = content;
            this.views = views;
            this.tags = tags;
            this.publishDate = new Date(publishDate).toLocaleString().split(" ")[0].replace(/\//g, "-");
        }).catch(err => {
            console.log(err);
        });
    }
});

const addComment = new Vue({
    el: '#send_comment',
    data: {
        vcode: '',
        text: ''
    },
    methods: {
        handleSubmit() {
            const paramsStr = location.search.includes('?') ? location.search.substring(1).split('&') : '';
            if (paramsStr === '') {
                return;
            }
            let bid = -1;
            for (let i = 0; i < paramsStr.length; i++) {
                if (paramsStr[i].split("=")[0] === 'bid') {
                    try {
                        bid = paramsStr[i].split("=")[1];
                    } catch {
                        console.log('出错了！');
                    }
                }
            }
            const parent = document.getElementsByClassName("comment_hidden")[0].value;
            const name = document.getElementsByClassName('comment_name')[0].value;
            const email = document.getElementsByClassName("comment_email")[0].value;
            const content = document.getElementsByTagName("textarea")[0].value;
            const code = document.getElementsByClassName("comment_code")[0];
            console.log(code.value,this.text);
            if (code.value !== this.text){
                alert('验证码输入有误!');
                code.value = '';
            }else{
                axios.get(`/addComment`,{
                    params: {
                        bid,
                        parent,
                        name,
                        email,
                        content
                    }
                }).then(res=>{
                    alert("评论成功！")
                }).catch(err=>console.log(err));
            }
        },
        handleChangeCode(){
            axios.get('/queryRandomCode').then(result=>{
                this.vcode = result.data.data;
                this.text = result.data.text;
            }).catch(err=>{
                console.log(err);
            })
        }
    },
    created() {
        this.handleChangeCode();
    }
});

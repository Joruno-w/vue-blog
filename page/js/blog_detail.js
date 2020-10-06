const blogDetail = new Vue({
    el: '#blog_detail',
    data: {
        title: '',
        content: '',
        tags: '',
        views: '',
        publishDate: ''
    },
    methods: {

    },
    created(){
        const paramsStr = location.search.includes('?') ? location.search.substring(1).split('&') : '';
        if (paramsStr === ''){
            return;
        }
        let bid = -1;
        for (let i = 0;i < paramsStr.length;i ++){
            if (paramsStr[i].split("=")[0] === 'bid'){
                try {
                    bid = paramsStr[i].split("=")[1];
                }catch{
                    console.log('出错了！');
                }
            }
        }
        axios.get(`/queryBlogById?bid=${bid}`).then(res=>{
            const {title,content,views,tags,createdAt: publishDate} = res.data;
            this.title = title;
            this.content = content;
            this.views = views;
            this.tags = tags;
            this.publishDate = new Date(publishDate).toLocaleString().split(" ")[0].replace(/\//g,"-");
        }).catch(err=>{
            console.log(err);
        });
    }
});

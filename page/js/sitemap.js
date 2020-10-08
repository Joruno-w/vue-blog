const sitemap = new Vue({
    el: '#sitemap',
    data: {
        titles: []
    },
    methods: {},
    created(){
        axios.get('/queryAllBlog').then(res=>{
            for (let i = 0;i < res.data.length;i ++){
                res.data[i].link = `/blog_detail.html?bid=${res.data[i].id}`;
            }
            this.titles = res.data;
        }).catch(err=>{
            console.log(err);
        })
    }
});

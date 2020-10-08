const sendComment = new Vue({
    el: '#send_comment',
    data: {
        vcode: '',
        text: ''
    },
    methods: {
        handleSubmit() {
            const bid = -1;
            const parent = document.getElementsByClassName("comment_reply")[0].value;
            const parentName = document.getElementsByClassName("comment_reply_name")[0].value;
            const name = document.getElementsByClassName('comment_name')[0].value;
            const email = document.getElementsByClassName("comment_email")[0].value;
            const content = document.getElementsByTagName("textarea")[0].value;
            const code = document.getElementsByClassName("comment_code")[0];
            if (code.value !== this.text){
                alert('验证码输入有误!');
                code.value = '';
            }else{
                axios.get(`/addComment`,{
                    params: {
                        bid,
                        parent,
                        parentName,
                        name,
                        email,
                        content
                    }
                }).then(res=>{
                    alert("评论成功！");
                    history.go(0);
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

const messages = new Vue({
    el: '#messages',
    data:{
        total: 0,
        commentList: []
    },
    methods: {
        reply(id,name) {
            document.getElementsByClassName("comment_reply")[0].value = id;
            document.getElementsByClassName("comment_reply_name")[0].value = name;
        }
    },
    created(){
        const bid = -1;
        axios.get('/queryCommentByBlogId?bid=' + bid).then(res=>{
            this.total = res.data.length;
            this.commentList = res.data.map(item=>({
                ...item,
                publishDate: new Date(item.createdAt).toLocaleString().split(" ")[0].replace(/\//g, '-')
            }));
            for (let i =0;i < this.commentList.length;i ++){
                if (this.commentList[i].parent > -1){
                    this.commentList[i].options =  `回复@${this.commentList[i].parentName}`;
                }
            }
        }).catch(err=>{
            console.log(err);
        })
    }
});

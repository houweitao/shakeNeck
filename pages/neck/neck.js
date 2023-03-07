Page({
    data: {
        texts: ["Text 1", "Text 2", "Text 3skkkkkkkkk", "Text 4"],
        joy: ""
    },

    onLoad: function () {
        var that = this//不要漏了这句，很重要
        that.changeText()
    },

    changeText: function () {
        this.setData({
            'texts[0]': "一二三456789\nsss",
            'texts[1]': "faklsflasflafkaklfka康师傅看见啊身份卡史可法凯撒",
            'texts[2]': "七八\n2哈哈哈哈\n3红红火火\n斤",
            'texts[3]': "事事卡上了快仨考虑考虑儿"
        })
    },

    changeText1: function () {
        var that = this//不要漏了这句，很重要
        console.log("reauest story data ");
        wx.request({
            url: 'https://interface.meiriyiwen.com/article/random?dev=1',
            headers: {
                'Content-Type': 'application/json'
            },
            success: function (res) {
                console.log("neck story.data: ");
                console.log(res.data);
                console.log("neck story.data.digest: ");
                console.log(res.data.data.digest);
                //将获取到的json数据，存在名字叫zhihu的这个数组中
                that.setData({
                    joy: res.data.data.digest,
                    //res代表success函数的事件对，data是固定的，stories是是上面json数据中stories
                })
            }
        })

        var size = that.data.joy.length

        const chunkSize = Math.ceil(size / 4); // 计算每个子字符串的长度

        // 切割成四个不同的子字符串
        const chunk1 = that.data.joy.slice(0, chunkSize);
        const chunk2 = that.data.joy.slice(chunkSize, chunkSize * 2);
        const chunk3 = that.data.joy.slice(chunkSize * 2, chunkSize * 3);
        const chunk4 = that.data.joy.slice(chunkSize * 3, size);

        this.setData({
            'texts[0]': chunk1,
            'texts[1]': chunk3,
            // 'texts[2]': chunk2,
            'texts[2]': "chunk2kaflasfaksfkasflaflaflalfl",
            'texts[3]': chunk4
        })

    }
})

Page({
    data: {
        texts: ["第一步读我", "第二步堵我", "第三步读我", "第四步读我"],
        sentense: "",
        requestFailNum: 0
    },

    onLoad: function () {
        var that = this//不要漏了这句，很重要
        that.changeText()
        // that.changeText2()
    },

    showSentense: function () {
        var that = this//不要漏了这句，很重要

        var size = that.data.sentense.length

        const chunkSize = Math.ceil(size / 4); // 计算每个子字符串的长度

        // 切割成四个不同的子字符串
        const chunk1 = that.data.sentense.slice(0, chunkSize);
        const chunk2 = that.data.sentense.slice(chunkSize, chunkSize * 2);
        const chunk3 = that.data.sentense.slice(chunkSize * 2, chunkSize * 3);
        const chunk4 = that.data.sentense.slice(chunkSize * 3, size);

        that.setData({
            'texts[0]': chunk1,
            'texts[1]': chunk3,
            'texts[2]': chunk2,
            // 'texts[2]': "chunk2kaflasfaksfkasflaflaflalfl",
            'texts[3]': chunk4
        })
    },

    changeText: function (minLen, maxLen) {
        var that = this
        var retMsg = ''
        wx.request({
            url: 'https://zj.v.api.aa1.cn/api/wenan-wy/?type=json',
            headers: {
                'Content-Type': 'application/json'
            },
            success: function (res) {
                console.log("changeText story.data: ");
                console.log(res.data);
                that.setData({
                    sentense: res.data.msg,
                })
                that.showSentense()
            },
            fail(err) {
                console.error('changeText2: ' + err)

                var wrongNum = that.requestFailNum + 1
                var showMsg = '哎呀 好像出错了... 目前是第' + wrongNum + '次出错. 请稍后重试'

                that.setData({
                    sentense: showMsg,
                    requestFailNum: wrongNum,
                })
                that.showSentense()
            }
        })

    },

    changeText2: function () {
        var that = this//不要漏了这句，很重要
        console.log("reauest story data ");

        // var curSentense = that.changeText2(50, 120)

        // 无法备案 https://mp.weixin.qq.com/wxamp/devprofile/get_profile?token=716744170&lang=zh_CN
        // wx.request({
        //   url: 'http://20.194.193.249:8000/create?title=basketball',
        //   headers: {
        //       'Content-Type': 'application/json'
        //   },
        //   success: function (res) {
        //     console.log("20.194.193.249")
        //     console.log(res.data)
        //   }})

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
                    sentense: res.data.data.digest,
                    // sentense: curSentense,
                    // sentense: "如果有一天，我决定删了你，并不代表你对我不再重要，而是我怕我自己越陷越深，原来真的有那么一个人，我无数次的想要放弃，但终究还是舍不得，我知道忘记你很难，但我决定试试。 ——网易云音乐热评《可惜没有如果》如果有一天，我决定删了你，",
                    //res代表success函数的事件对，data是固定的，stories是是上面json数据中stories
                })

                that.showSentense()

                // var size = that.data.sentense.length

                // const chunkSize = Math.ceil(size / 4); // 计算每个子字符串的长度

                // // 切割成四个不同的子字符串
                // const chunk1 = that.data.sentense.slice(0, chunkSize);
                // const chunk2 = that.data.sentense.slice(chunkSize, chunkSize * 2);
                // const chunk3 = that.data.sentense.slice(chunkSize * 2, chunkSize * 3);
                // const chunk4 = that.data.sentense.slice(chunkSize * 3, size);

                // that.setData({
                //     'texts[0]': chunk1,
                //     'texts[1]': chunk3,
                //     'texts[2]': chunk2,
                //     // 'texts[2]': "chunk2kaflasfaksfkasflaflaflalfl",
                //     'texts[3]': chunk4
                // })
            },
            fail(err) {
                console.error('changeText: ' + err)

                var wrongNum = that.requestFailNum + 1
                var showMsg = '哎呀 好像出错了... 目前是第' + wrongNum + '次出错. 请稍后重试'

                that.setData({
                    sentense: showMsg,
                    requestFailNum: wrongNum,
                })
            }
        })
    }
})

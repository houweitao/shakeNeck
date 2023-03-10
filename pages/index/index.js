Page({
    data: {
        // texts: ["第一步读我", "第二步堵我", "第三步读我", "第四步读我"],
        texts: [" ", " ", " ", " "],
        sentense: "",
        requestFailNum: 0,
        joyTotalPageNum: 8000
    },

    onLoad: function () {
        var that = this//不要漏了这句，很重要
        that.initJoy()
        that.changeText()
        wx.showShareMenu()
    },

    onShareAppMessage: function () {
        // https://juejin.cn/post/7026222065774493704
    },

    initJoy: function () {
        var that = this
        const arr = [];

        arr.push("太棒了，能把汉字写成这样:话说某室友一清纯mm小L，新交一男朋友，各位姐妹都觉得她那位男友配不上她，在寝室里企图拉住她这匹悬崖上的马...Q姐苦口婆心地教育她“你找这种男人带的出去伐？那个谁谁，长得多好，还有那谁谁，虽说长的一般但是气质好，带出去倍有面子...”小L淡定地来了一句“能带的出去的就怕带不回来了...带不回来了....了....”")
        arr.push("哭着回房学习去了:表弟一直学习很一般，吃饭时候姑父说：“儿子下次考试要是还没进步，我就不开车去接你放学了我借楼下卖水果大伯的三轮车去你们学校等你，看见xxx还叫她一起回来。”（xxx是他喜欢的女同学）表弟丢下饭碗哭着回房学习去了……")
        arr.push("李代沫蹲，李代沫蹲，李代沫蹲完黄海波蹲；黄海波蹲，黄海波蹲，黄海波蹲完宁财神蹲；宁财神蹲，宁财神蹲，宁财神蹲完张耀扬蹲;张耀扬蹲，张耀扬蹲，张耀扬蹲完郭美美蹲;郭美美蹲，郭美美蹲，郭美美蹲完张默蹲，张默蹲，张默蹲，张默蹲完高虎蹲，高虎蹲，高虎蹲，高虎蹲完谁去蹲？")
        arr.push("现在的小盆友太狠了，今天走在街上，一男一女大概10来岁的两个小盆友在争吵，突然，女孩跑过来拉着我，对男孩说：“你看，这就是我的新男友，他长得比你要成熟，也比你有钱，也不会像你一放学就去LOL不管我，所以，你不要再想了，我们不合适！”")
        arr.push("老爸真相了:一天，儿子不解地问老爸：“既然孙悟空能大闹天宫，那为啥西天取经的路上，老让观音来帮忙降妖？”老爸深吸一口烟，说：“等你工作了就明白了。大闹天宫时，孙悟空碰到的都是给玉帝打工的，出力但不玩命；西天取经时，他碰到的都是自己出来创业的……")
        arr.push("喜欢一女孩，可是她有对象！万能的冷友我该怎么办？ 神评论：她有对象啊，你等我想想该怎么破，首先用炮打她一个象，然后剩下那个用车或者马把它吃了，这样就能轻易的将死她了，下棋得稳重知道吧，一步一步的来，莫慌")
        arr.push("某童鞋说：“这十几年来我辛辛苦苦的逢考必抄，为了什么，难道是为了我自己吗？！还不是为了提高班级的均分，为了任课老师的面子，为了年级主任的评先评优，为了校长去教育局开会有面子扎台型。每次抄的心惊胆战，满身虚汗，我有说过一句怨言吗？！无私到这个地步你还要我怎样！”")
        arr.push("18岁的时候在一家桑拿当包房服务员，某日一客人点餐要扬州炒饭，　　听错了，开单炒了个蛋炒饭回来，客人拒要。　　不甘心自己赔这碗饭，于是想了个办法，往炒饭里放了足量的盐，　　将饭重新拌匀，拿回餐厅理直气壮的说：“太咸了，客人不要。”　　餐厅的人不屑的说，怎么可能会咸。正逢经理在餐厅，　　试吃了一口：“确实太咸了。重新炒一碗吧。“　　餐厅的人只好点头答应。　　于是我趁火打劫的说了一句：“客人说你们的蛋炒饭炒得不够好，换成扬州炒饭。”　　就这样，我保住了口袋里的十八元钱。")

        const sentense = that.findNiceSentence(arr)
        that.setData({
            sentense: sentense,
        })
        that.showSentense()
    },

    showSentense: function () {
        var that = this//不要漏了这句，很重要
        // console.log('showSentense')
        var sentense = that.data.sentense
        // console.log(sentense)
        sentense = sentense.replace(/&nbsp;/g, "");
        sentense = sentense.replace(/\s+/g, " ");
        sentense = sentense.replace(/<br\s*\/?>/gi, " ").replace(/\n/g, " ");

        // console.log(sentense)

        // var sentense = '在酒吧喝醉了，我拿起电话翻开电话簿，想给朋友打一个电话。 但不知道打给谁但不知道打给谁但不知道打给谁，'

        var size = sentense.length

        console.log('sentense size: ' + size)

        const chunkSize = Math.ceil(size / 4); // 计算每个子字符串的长度

        // 切割成四个不同的子字符串
        const chunk1 = sentense.slice(0, chunkSize);
        const chunk2 = sentense.slice(chunkSize, chunkSize * 2);
        const chunk3 = sentense.slice(chunkSize * 2, chunkSize * 3);
        const chunk4 = sentense.slice(chunkSize * 3, size);

        that.setData({
            'texts[0]': chunk1,
            'texts[1]': chunk3,
            'texts[2]': chunk2,
            // 'texts[2]': "chunk2kaflasfaksfkasflaflaflalfl",
            'texts[3]': chunk4
        })
    },

    changeText: function () {
        var that = this
        // that.getNetEaseMusic()
        that.randomJoy()
    },

    getNetEaseMusic: function () {
        var that = this

        wx.request({
            url: 'https://zj.v.api.aa1.cn/api/wenan-wy/?type=json',
            headers: {
                'Content-Type': 'application/json'
            },
            success: function (res) {
                // console.log("getNetEaseMusic story.data: ");
                // console.log(res.data);
                that.setData({
                    sentense: res.data.msg,
                })
                that.showSentense()
            },
            fail(err) {
                console.error('getNetEaseMusic: ' + err)

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

    findNiceSentence(arr) {
        // const arr = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.', 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'];

        const filteredArr = arr.filter(str => str.length < 145 && str.length > 45);

        let selectedStr = '';
        if (filteredArr.length > 0) {
            const randomIndex = Math.floor(Math.random() * filteredArr.length);
            selectedStr = filteredArr[randomIndex];
            const index = arr.indexOf(selectedStr);
            if (index !== -1) {
                arr.splice(index, 1);
            }
        } else {
            let closestStr = '';
            let closestLenDiff = Number.MAX_VALUE;
            arr.forEach(str => {
                const lenDiff = Math.abs(str.length - 100);
                if (lenDiff < closestLenDiff) {
                    closestStr = str;
                    closestLenDiff = lenDiff;
                }
            });
            selectedStr = closestStr;
        }

        console.log(selectedStr); // 输出随机或者长度最接近100的字符串
        return selectedStr

    },

    randomJoy: function () {
        var that = this
        const randomNum = Math.floor(Math.random() * that.data.joyTotalPageNum) + 1;
        // console.log(randomNum);
        const curUrl = 'https://www.mxnzp.com/api/jokes/list?app_id=rgihdrm0kslojqvm&app_secret=WnhrK251TWlUUThqaVFWbG5OeGQwdz09&page=' + randomNum

        console.log(curUrl)
        var succFlag = false

        wx.request({
            url: curUrl,
            headers: {
                'Content-Type': 'application/json'
            },
            success: function (res) {
                // console.log("neck story.data: ");
                // console.log(res.data);
                //将获取到的json数据，存在名字叫zhihu的这个数组中
                if (res.data.code === 1) {
                    var list = res.data.data.list
                    if (list.length > 0) {
                        const arr = [];
                        for (const item of list) {
                            arr.push(item.content)
                        }
                        const selectedStr = that.findNiceSentence(arr)
                        that.setData({
                            // sentense: list[randomInNum].content,
                            sentense: selectedStr,
                            joyTotalPageNum: res.data.data.totalPage
                        })

                        console.log(that.data.joyTotalPageNum)

                        that.showSentense()
                        succFlag = true;
                        return;
                    }
                }
            },
            fail(err) {
                console.error('randomJoy fail: ' + err)
            },
            complete: function () {
                if (!succFlag) {
                    console.log('in joy,,,getNetEaseMusic')
                    that.getNetEaseMusic()
                }
            }
        })
    },

    // changeText2: function () {
    //     var that = this//不要漏了这句，很重要
    //     console.log("reauest story data ");

    //     // var curSentense = that.changeText2(50, 120)

    //     // 无法备案 https://mp.weixin.qq.com/wxamp/devprofile/get_profile?token=716744170&lang=zh_CN
    //     // wx.request({
    //     //   url: 'http://20.194.193.249:8000/create?title=basketball',
    //     //   headers: {
    //     //       'Content-Type': 'application/json'
    //     //   },
    //     //   success: function (res) {
    //     //     console.log("20.194.193.249")
    //     //     console.log(res.data)
    //     //   }})

    //     wx.request({
    //         url: 'https://interface.meiriyiwen.com/article/random?dev=1',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         success: function (res) {
    //             console.log("neck story.data: ");
    //             console.log(res.data);
    //             console.log("neck story.data.digest: ");
    //             console.log(res.data.data.digest);
    //             //将获取到的json数据，存在名字叫zhihu的这个数组中
    //             that.setData({
    //                 sentense: res.data.data.digest,
    //                 // sentense: curSentense,
    //                 // sentense: "如果有一天，我决定删了你，并不代表你对我不再重要，而是我怕我自己越陷越深，原来真的有那么一个人，我无数次的想要放弃，但终究还是舍不得，我知道忘记你很难，但我决定试试。 ——网易云音乐热评《可惜没有如果》如果有一天，我决定删了你，",
    //                 //res代表success函数的事件对，data是固定的，stories是是上面json数据中stories
    //             })

    //             that.showSentense()
    //         },
    //         fail(err) {
    //             console.error('getNetEaseMusic: ' + err)

    //             var wrongNum = that.requestFailNum + 1
    //             var showMsg = '哎呀 好像出错了... 目前是第' + wrongNum + '次出错. 请稍后重试'

    //             that.setData({
    //                 sentense: showMsg,
    //                 requestFailNum: wrongNum,
    //             })
    //         }
    //     })
    // }
})

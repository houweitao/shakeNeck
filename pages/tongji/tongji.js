var wxCharts = require('../../components/wx-chart/wx-chart.js');//https://github.com/xiaolin3303/wx-charts-demo
var app = getApp();
var lineChart = null;
Page({
    data: {
        shakeNumAll: 0,
        shakeNumToday: 0
    },

    goToShake: function () {
        wx.navigateTo({
            url: '/pages/index/index?refresh=1'
        })
    },

    touchHandler: function (e) {
        console.log(lineChart.getCurrentDataIndex(e));
        lineChart.showToolTip(e, {
            // background: '#7cb5ec',
            format: function (item, category) {
                return category + ' ' + item.name + ':' + item.data
            }
        });
    },

    // toCustomService: function () {
    //     wx.openCustomerServiceConversation({
    //         success: function (res) {
    //             console.log('打开客服会话成功');
    //         },
    //         fail: function (res) {
    //             console.log('打开客服会话失败');
    //         }
    //     });
    // },


    getLast7Days: function () {
        /// 获取当前日期
        let today = new Date();

        // 创建一个数组来存储日期
        let datesArray = [];

        // 设置时区为 "Asia/Shanghai"
        const options = { timeZone: "Asia/Shanghai" };

        // 通过循环计算过去七天的日期，并将它们添加到数组中
        for (let i = 6; i >= 0; i--) {
            let date = new Date(today);
            date.setUTCDate(date.getUTCDate() - i);
            let dateString = date.toLocaleString("default", options).slice(5, 9);
            // datesArray.push(dateString);

            var month = date.getMonth() + 1;
            var day = date.getDate();
            datesArray.push(month + '/' + day);
        }

        // 输出数组
        console.log(datesArray);
        return datesArray;
    },

    getTwoWeekShakeNum: function () {
        var that = this
        var shake_neck_key = 'shakeNeckRecordKey'
        var shake_record = wx.getStorageSync(shake_neck_key) || []

        const now = new Date();
        const twoWeeksAgo = new Date(now.getTime() - 13 * 24 * 60 * 60 * 1000);
        twoWeeksAgo.setHours(0, 0, 0, 0);

        // const timestamps = [/* your timestamps array */];
        const counts = {};
        var count_num_all = 0;
        shake_record.forEach(timestamp => {
            count_num_all++;
            const date = new Date(timestamp);
            if (date >= twoWeeksAgo && date <= now) {
                const dateStr = date.toLocaleDateString();
                counts[dateStr] = counts[dateStr] ? counts[dateStr] + 1 : 1;
            }
        });

        // 遍历日期范围内的所有日期，并检查 counts 对象中是否有对应日期的数据
        const resultDetail = [];
        const result = [];
        for (let date = new Date(twoWeeksAgo); date <= now; date.setDate(date.getDate() + 1)) {
            const dateStr = date.toLocaleDateString();
            const count = counts[dateStr] || 0;
            resultDetail.push({ date: dateStr, count: count });

            // result.push(Math.random() * (20 - 10) + 10);
            result.push(count);
        }

        console.log(resultDetail);
        console.log(result);

        that.setData({
            shakeNumAll: count_num_all,
            shakeNumToday: resultDetail[13].count,
        })

        return result;
    },

    updateData: function () {
        var that = this

        var windowWidth = 320;
        try {
            var res = wx.getSystemInfoSync();
            windowWidth = res.windowWidth;
        } catch (e) {
            console.error('getSystemInfoSync failed!');
        }

        var categories = that.getLast7Days()
        var shakeInfo = that.getTwoWeekShakeNum()

        // const shakeNums = shakeInfo.map(map => map.get('count'));

        lineChart = new wxCharts({
            canvasId: 'lineCanvas',
            type: 'line',
            categories: categories,
            animation: true,
            // background: '#f5f5f5',
            series: [{
                name: '上周右拧',
                data: shakeInfo.slice(0, 7),
                format: function (val, name) {
                    return val.toFixed(2) + '次';
                }
            }, {
                name: '本周右拧',
                data: shakeInfo.slice(7, 14),
                format: function (val, name) {
                    return val.toFixed(2) + '次';
                }
            }],
            xAxis: {
                disableGrid: true
            },
            yAxis: {
                title: '右拧次数',
                format: function (val) {
                    return val.toFixed(2);
                },
                min: 0
            },
            width: windowWidth,
            height: 200,
            dataLabel: false,
            dataPointShape: true,
            extra: {
                lineStyle: 'curve'
            }
        });


    },

    touchStart: function (event) {
        // 手指按下时，修改按钮样式
        this.setData({
            buttonColor: '#90EE90',
        });
    },

    touchEnd: function (event) {
        // 手指松开时，恢复按钮样式
        this.setData({
            buttonColor: '#ccc',
        });
    },

    onShow: function (e) {
        var that = this;
        that.updateData();
        console.log('on show')
    },

    onLoad: function (e) {
        var that = this;
        // that.updateData();
        console.log('on onLoad')
    }
});
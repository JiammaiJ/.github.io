$(function() {
    mui('.mui-scroll-wrapper').scroll({
        indicators: false //是否显示滚动条
    });
    /*渲染*/
    var tip = location.search.replace('?', '');
    getData(tip, render);



    $('.lt_proItem').on('tap', '.item-size span.size', function() {
        $(this).addClass('now').siblings().removeClass('now');
    });

    $('.lt_proItem').on('tap', '.item-number span', function() {
        var curNum = $(this).siblings('input').val();
        //此处有个大坑,val取出来的是数字，attr取出来的是字符串20
        //数字和字符串比较，当前是0 1 2 3之后，attr的字符串20转化后是2判断生效
        //后续就不执行了
        var dataNum = parseInt($(this).siblings('input').attr('data-num'));
        if ($(this).hasClass('jian')) {
            if (curNum > 0) {
                curNum--;
            } else {
                return false;
            }
        } else {
            if (curNum < dataNum) {
                curNum++;
            } else {
                return false;
            }
        }
        console.log(curNum);
        $(this).siblings('input').val(curNum);
    })



    $('.btn_addCart').on('tap', function() {

        var flag = localStorage.getItem('userLoginTrue');
        if (flag != 1) {
            mui.confirm('暂未登入,是否登入', '提示', ['否', '是'], function(e) {
                if (e.index == 1) {
                    //转到登入页面，后面登入页面要把userLogin改成登入状态
                    var href = location.href;
                    location.href = 'user/login.html?' + href;

                } else {

                }
            })
        } else {
            var num = $('.item-number input').val()
            if (num <= 0) {
                mui.toast('请选择数量哦亲');
                return false;
            } else {
                if (!$('.item-size span').hasClass('now')) {
                    mui.toast('请选择尺寸哦亲');
                    return false;
                }
            }
            //记录商品信息，需要图片，尺码，数量
            var proImg = $('.item-img img').attr('src');
            var proSize = $('.item-size span.now').text();
            var proNum = $('.item-number input').val();
            var proPrice = $('.item-price .newP').text();
            //console.log(proImg,proSize,proNum);
            var proObj = { 'proImg': proImg, 'proSize': proSize, 'proNum': proNum, 'proPrice': proPrice };
            var prohis = localStorage.getItem('userCart') || '[]';
            var proArr = JSON.parse(prohis);
            proArr.push(proObj);
            localStorage.setItem('userCart', JSON.stringify(proArr));
            //先获取缓存里面有的，在添加进去，结算的时候就跳转到购物车页面，购物车页面在根据
            //缓存 的记录渲染到页面
            mui.toast('古娜拉黑暗之神-乌漆嘛黑-关灯')
        }
    })
})


function getData(tip, callback) {
    $.ajax({
        type: 'get',
        url: 'js/data/item' + tip + '.json',
        data: '',
        dataType: 'json',
        success: function(data) {
            callback && callback(data);
        }
    })
}

function render(data) {
    $('.lt_proItem').html(template('firstTemplate', { res: data }));
}
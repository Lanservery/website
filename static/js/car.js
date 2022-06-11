$(function() {
 
    // 1全选模块
    // 1.1将全选按钮checkall状态赋值到三个小按钮j-checkbox上
    $(".checkall").change(function() {
        // console.log($(this).prop('checked'));
        $('.j-checkbox, .checkall').prop('checked', $(this).prop('checked'))
        if ($(this).prop('checked')) {
            // 让所有商品添加check-cart-item类名
            $('.cart-item').addClass('check-cart-item')
        } else {
            $('.cart-item').removeClass('check-cart-item')
        }
    })
 
    // 1.2通过小按钮选中全选按钮
    $('.j-checkbox').change(function() {
        // 如果小按钮全部选中，全选按钮选中，否则不被选中
        // console.log($('.j-checkbox:checked').length);
        if ($('.j-checkbox:checked').length === $('.j-checkbox').length) {
            $('.checkall').prop('checked', true)
        } else {
            $('.checkall').prop('checked', false)
        }
 
        if ($(this).prop('checked')) {
            // 让所有商品添加check-cart-item类名
            $(this).parents('.cart-item').addClass('check-cart-item')
        } else {
            $(this).parents('.cart-item').removeClass('check-cart-item')
        }
    })
 
    // 2商品模块
    // 2.1商品数量增加
    // 点击加号increment让这个值++，赋值给文本框，只增加本商品数量兄弟文本框itxt值
    // 修改表单val(),在文本框原有数值上相加
    $('.increment').click(function() {
        // 得到当前兄弟文本框的值
        var n = $(this).siblings('.itxt').val();
        // console.log(n);
        n++;
        $(this).siblings('.itxt').val(n)
            // 2.1.1商品小计
            // 点击加号或减号，根据文本框的数值乘以当前商品的价格，只计算当前商品小计(p-sum)
            // 修改普通元素内容方法text(),当前商品价格去除￥/$后再相乘，
            // 截取字符串substr(1)从第一个位置开始截取,保留两位小数toFixed(2)
            // var p = $(this).parent().parent().siblings('.p-price').html();
        var p = $(this).parents(".p-num").siblings('.p-price').html();
        // console.log(p);
        p = p.substr(1);
        var price = (p * n).toFixed(2);
        $(this).parents(".p-num").siblings('.p-sum').html("￥" + price);
        // $(this).parent().parent().siblings('.p-sum').html("￥"+p * n)
        getSum();
    })
 
    // 2.2商品数量减少
    // 点击加号decrement让这个值--，赋值给文本框，只减少本商品数量兄弟文本框itxt值
    // 修改表单val(),在文本框原有数值上相减
    // 如果n值为1，不再减少
    $('.decrement').click(function() {
        // 得到当前兄弟文本框的值
        var n = $(this).siblings('.itxt').val();
        // console.log(n);
        if (n == 1) {
            return false
        }
        n--;
        $(this).siblings('.itxt').val(n)
            // 2.1.1商品小计
            // 点击加号或减号，根据文本框的数值乘以当前商品的价格，只计算当前商品小计(p-sum)
            // 修改普通元素内容方法text(),当前商品价格去除￥/$后再相乘，截取字符串substr(1)从第一个位置开始截取
        var p = $(this).parents(".p-num").siblings('.p-price').html();
        // console.log(p);
        p = p.substr(1);
        var price = (p * n).toFixed(2);
        $(this).parents(".p-num").siblings('.p-sum').text("￥" + price);
        // $(this).parent().parent().siblings('.p-sum').html("￥"+p * n)
        getSum();
    })
 
    // 3用户修改文本框的值计算小计
    $('.itxt').change(function() {
        // 先得到文本框的值乘以当前商品单价
        var n = $(this).val();
        var p = $(this).parents('.p-num').siblings('.p-price').html()
        p = p.substr(1);
        var price = (p * n).toFixed(2);
        $(this).parents(".p-num").siblings('.p-sum').html("￥" + price);
        getSum();
    })
 
    getSum();
 
    // 4总和总额
    function getSum() {
        var count = 0; //计算总件数
        var money = 0; //计算总价钱
        // 总件
        $('.itxt').each(function(i, ele) {
            count += parseInt($(ele).val());
        })
        $('.amount-sum em').text(count);
        // 总额
        $('.p-sum').each(function(i, ele) {
            money += parseFloat($(ele).text().substr(1));
        })
        $('.price-sum em').text("￥" + money.toFixed(2));
    }
 
    // 5删除商品
    // 点击按钮删除商品
    $('.p-action a').click(function() {
        $(this).parents('.cart-item').remove();
        getSum();
    });
    // 点击删除选中的商品
    $('.remove-batch').click(function() {
        // 删除复选框选中的商品
        $('.j-checkbox:checked').parents('.cart-item').remove();
        getSum();
    });
    // 清空购物车
    $('.clear-all').click(function() {
        $('.cart-item').remove();
        getSum();
    })
 
 
 
})

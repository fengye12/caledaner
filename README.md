# caledaner
<code>
$('#firstSelect').calendarSwitch({
    selectors : {
        sections : "#calendar"
    },
    index : 4,      //展示的月份个数
    animateFunction : "toggle",        //显示日历的动画效果
    controlDay:false,//是否控制在daysnumber天之内，这个数值的设置前提是总显示天数大于90天
    daysnumber : "90",     //控制天数，具体天数要配合index参数
    comeColor : "blue",       //入住颜色
    outColor : "red",      //离店颜色
    comeoutColor : "#0cf",        //入住和离店之间的颜色
    callback : "" ,   //回调函数
    comfireBtn:'.comfire'//确定按钮的class或者id
});
</code>

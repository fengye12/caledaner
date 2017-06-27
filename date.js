(function($){
    "use strict";
    var calendarSwitch = (function(){
        function calendarSwitch(element, options){
            this.settings = $.extend(true, $.fn.calendarSwitch.defaults, options||{});
            this.element = element;
            this.init();
        }
        calendarSwitch.prototype = {
            /*说明：初始化插件*/
            /*实现：初始化dom结构，布局，分页及绑定事件*/
            init : function(){
                var me = this;
                me.selectors = me.settings.selectors;
                me.sections = me.selectors.sections;
                me.index=me.settings.index;
                me.comfire=me.settings.comfireBtn;



                var html="<div class='headerWrapper'><div class='headerTip'>请选择入住离店日期</div><div class='comfire'>确定</div></div><table class='dateZone'><tr><td class='colo'>日</td><td>一</td><td>二</td><td>三</td><td>四</td><td>五</td><td class='colo'>六</td></tr></table>"+
                "<div id='tbody' class='tbody'></div>"
                $(me.sections).append(html);
                $(me.sections).find('.headerWrapper').css({
                    "height": "50px",
                    "line-height": "50px",
                    "position":"relative"
                });
                $(me.sections).find('.headerTip').css({
                    "text-align": "center",
                    "line-height": "50px",
                });
                $(me.sections).find(me.comfire).css({
                    "height": "20px",
                    "line-height": "20px",
                    "width": "60px",
                    "color": "#ff5400",
                    "position":"absolute",
                    "right":"15px",
                    "text-align": "center",
                    "font-size": "14px",
                    "cursor":"pointer",
                    "top":"15px",
                    "border":"1px solid #ff5400"

                });
                for(var q=0;q<me.index;q++){
                    var select=q;
                    $("#tbody").append("<p class='ny1'></p><table class='dateTable'></table>")
                    var currentDate= new Date();
                    console.log(currentDate)
                    currentDate.setMonth(currentDate.getMonth()+1+select);
                    console.log(currentDate)
                    var currentYear=currentDate.getFullYear();
                    var currentMonth=currentDate.getMonth();
                    var setcurrentDate=new Date(currentYear,currentMonth,1);
                    var firstDay=setcurrentDate.getDay();
                    var yf=currentMonth+1;
                    if(yf<10){
                        console.log($(me.sections).find('.ny1').eq(select))
                        $(me.sections).find('.ny1').eq(select).text(currentYear+'年'+'0'+yf+'月');
                    }else{$(me.sections).find('.ny1').eq(select).text(currentYear+'年'+yf+'月');}
                    if(me._isLeapYear(currentYear)){ var DaysInMonth = new Array(31,29,31,30,31,30,31,31,30,31,30,31);}else{var DaysInMonth = new Array(31,28,31,30,31,30,31,31,30,31,30,31);}
                    var Ntd=firstDay+DaysInMonth[currentMonth];
                    var Ntr=Math.ceil(Ntd/7);
                    for(var i=0;i<Ntr;i++){
                        console.log()
                        $(me.sections).find('.dateTable').eq(select).append('<tr></tr>');
                    };
                    var createTd=$(me.sections).find('.dateTable').eq(select).find('tr');
                    createTd.each(function(index, element) {
                        for(var j=0;j<7;j++){
                            $(this).append('<td></td>')
                        }
                    });
                    var arryTd=$(me.sections).find('.dateTable').eq(select).find('td');
                    for(var m=0;m<DaysInMonth[currentMonth];m++){
                        arryTd.eq(firstDay++).text(m+1);
                    }
                }
                me._initselected();

                me.element .on('click', function(event) {
                    event.preventDefault();
                    me._slider(me.sections)
                });
                $(me.comfire).on('click', function(event) {
                    event.preventDefault();
                    me._slider(me.sections)
                    /* Act on the event */
                });

            },
            _isLeapYear:function(year){
                return (year % 4 == 0) && (year % 100 != 0 || year % 400 == 0);
            },
            _slider:function(id){
                var me=this;
                me.animateFunction=me.settings.animateFunction;
                if(me.animateFunction=="fadeToggle"){
                    $(id).fadeToggle();
                }else  if(me.animateFunction=="slideToggle"){
                    $(id).slideToggle();
                }else if(me.animateFunction=="toggle"){
                    $(id).toggle();
                }

            },
            _initselected:function(){
                var me=this;
                me.comeColor=me.settings.comeColor;
                me.outColor=me.settings.outColor;
                me.daysnumber=me.settings.daysnumber;
                var strDays = new Date().getDate();
                var arry=[];
                var arry1=[];
                var tds=$('.dateTable').eq(0).find('td');
                tds.each(function(index, element) {
                 if($(this).text()==strDays){
                    var r=index;
                    $(this).append('</br><p class="rz">入住</p>');
                    if($(this).next().text()!=""){
                      $(this).next().append('</br><p class="rz">离店</p>');}
                      else{
                       $(".dateTable").eq(1).find("td").each(function(index, el) {
                        if($(this).text()!=""){
                         $(this).append('</br><p class="rz">离店</p>');
                         return false;
                     }
                 });
                   }
                   me._checkColor(me.comeColor,me.outColor)

               }
           })

                $('#tbody').find('td').each(function(index, element) {
                   if($(this).text()!=''){
                    arry.push(element);
                }
            });
                for(var i=0;i<strDays-1;i++){
                    $(arry[i]).css('color','#ccc');
                }
                if(me.daysnumber){
                                //可以在这里添加90天的条件
                                for(var i=strDays-1;i<strDays+90;i++){
                                    arry1.push(arry[i])
                                }
                                for(var i=strDays+90;i<$(arry).length;i++){
                                    $(arry[i]).css('color','#ccc')
                                }
                            }else{
                                for(var i=strDays-1;i<$(arry).length;i++){
                                    arry1.push(arry[i])
                                }
                            }
                            me._selectDate(arry1)
                        },
                                // me._checkColor(,)
                                _checkColor:function(comeColor,outColor){
                                    var me=this;
                                    var rz=$(me.sections).find('.rz');
                                    console.log(rz);
                                    for(var i=0;i<rz.length;i++){
                                        if(rz.eq(i).text()=="入住"){
                                            rz.eq(i).closest('td').css({'background':comeColor,'color':'#fff'});
                                        }else{
                                            rz.eq(i).closest('td').css({'background':outColor,'color':'#fff'});
                                        }
                                    }

                                },
                                _selectDate:function(arry1){
                                    var me=this;
                                    me.comeColor=me.settings.comeColor;
                                    me.outColor=me.settings.outColor;
                                    me.sections = me.selectors.sections;

                                    var flag=0;
                                    var first;
                                    var sum;
                                    var second;
                                    $(arry1).on('click',function(index){
                                            //第一次点击
                                            if(flag==0){
                                                $('.hover').remove();
                                                $('#tbody').find('p').remove('.rz');
                                                $('#tbody').find('br').remove();
                                                $(arry1).css({'background':'#fff','color':'#000'});
                                            // $(this).css({'background':'#09F','color':'#fff'});
                                            $(this).append('<p class="rz">入住</p>')
                                            first=$(arry1).index($(this));
                                            //x1=$(this).next().offset().left;
                                            //y1=$(this).next().offset().top;

                                            me._checkColor(me.comeColor,me.outColor)
                                            flag=1; }
                                            //第二次点击
                                            else if(flag==1){

                                                // $(this).css({'background':'#ff5400','color':'#fff'});
                                                flag=0;
                                                second=$(arry1).index($(this))
                                                // x=$(this).next().offset().left;
                                    //           y=$(this).next().offset().top;
                                    sum=Math.abs(second-first);

                                    if(first<second){
                                        $(this).append('<p class="rz">离店</p>')
                                        first=first+1;
                                        for(first;first<second;first++){
                                            $(arry1[first]).css({'background':'#0CF','color':'#fff'});
                                        }}else if(first==second){

                                            $('.rz').text('离店');
                                            var e=$(this).text().replace(/[^0-9]/ig,"");
                                            var c,d;
                                            var a=new Array();
                                            var b=new Array();
                                            var f;
                                            var same=$(this).parents('table').prev('p').text().replace(/[^0-9]/ig,"").split('');
                                            for(var i=0;i<4;i++){
                                                a.push(same[i]);

                                            }
                                            c=a.join('');
                                            for(var j=4;j<6;j++){
                                                b.push(same[j]);
                                            }
                                            d=b.join('');

                                            f=c+'-'+d+'-'+e;
                                            $("#startDate").val(f);

                                        }
                                        else if(first>second){

                                            $('.rz').text('离店');
                                            $(this).append('<p class="rz">入住</p>')
                                            $(this).css({'background':'#09f','color':'#fff'});
                                            second=second+1;
                                            for(second;second<first;second++){
                                                $(arry1[second]).css({'background':'#0CF','color':'#fff'});
                                            }
                                        }
                                        $('.rz').each(function(index, element) {
                                            if($(this).text()=='离店'){
                                                // $(this).parent('td').next('td').append('<span class="hover">'+sum+'天</span>')
                                                // $(this).parent('td').next('td').css('position','relative');
                                            }
                                            if(sum==0){$('.hover').hide();}
                                        });
                                                //$('#tbody').append('<span class="hover">'+sum+'天</span>')
                                                //$('.hover').css({'position':'fixed','left':x,'top':y})刚开始用作定位的
                                                $('.hover').css({'position':'absolute','left':'-10px','top':'0px'})
                                                me._slider('firstSelect')

                                                //点击的日期存入input
                                                $('#tbody .rz').each(function(index, element) {
                                                    if($(this).text()=='入住'){
                                               var day=parseInt($(this).parent().text().replace(/[^0-9]/ig,""))//截取字符串中的数字

                                               var  startDayArrays=$(this).parents('table').prev('p').text().split('');
                                               var startDayArrayYear=[];
                                               var startDayArrayMonth=[];
                                               var startDayYear="";
                                               var startDayMonth="";
                                               for(var i=0;i<me.index;i++){
                                                var select=i;
                                                startDayArrayYear.push(startDayArrays[select])
                                            }
                                            startDayYear=startDayArrayYear.join('');
                                            for(var i=5;i<7;i++){
                                                startDayArrayMonth.push(startDayArrays[i])
                                            }
                                            startDayMonth=startDayArrayMonth.join('');
                                            $('#startDate').val(startDayYear+'-'+startDayMonth+'-'+day)
                                        }
                                        if($(this).text()=='离店'){
                                            var day=parseInt($(this).parent().text().replace(/[^0-9]/ig,""));
                                                    //day=$(this).parent().text().split('离')[0];

                                                    var endDayArrays=$(this).parents('table').prev('p').text().split('');
                                                    var endDayArrayYear=[];
                                                    var endDayArrayMonth=[];
                                                    var endDayYear="";
                                                    var  endDayMonth="";
                                                    for(var i=0;i<4;i++){
                                                        endDayArrayYear.push(endDayArrays[i])
                                                    }
                                                    endDayYear=endDayArrayYear.join('');
                                                    for(var i=5;i<7;i++){
                                                        endDayArrayMonth.push(endDayArrays[i])
                                                    }
                                                    endDayMonth=endDayArrayMonth.join('');

                                                    $('#endDate').val(endDayYear+'-'+endDayMonth+'-'+day);
                                                    if(parseInt($("#startDate").val().replace(/[^0-9]/ig,""))==parseInt($("#endDate").val().replace(/[^0-9]/ig,""))){       var x=$('#startDate').val();
                                                    var a=new Date(x.replace(/-/g,   "/"));
                                                    var b=new Date();
                                                    //b.setDate(a.getDate()+1)

                                                    b=new Date(a.getTime()+24*3600*1000);
                                                    var ye=b.getFullYear();
                                                    var mo=b.getMonth()+1;
                                                    var da=b.getDate();
                                                    $('#endDate').val(ye+'-'+mo+'-'+da);
                                                    $('.center_content').text('共1晚')

                                                }

                                                // dateNum();
                                            }
                                            startDayArrayYear=[];
                                            startDayArrayMonth=[];
                                            endDayArrayYear=[];
                                            endDayArrayMonth=[];

                                        });
var myweek=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];

var st=new Date($('#startDate').val());
var en=new Date($('#endDate').val());
$('.week').text(myweek[st.getDay()])
$('.week1').text(myweek[en.getDay()])
me._checkColor(me.comeColor,me.outColor)


}
                                                //第二次点击结束

                                            })
}

}
return calendarSwitch;
})();
$.fn.calendarSwitch = function(options){
    return this.each(function(){
        var me = $(this),
        instance = me.data("calendarSwitch");

        if(!instance){
            me.data("calendarSwitch", (instance = new calendarSwitch(me, options)));
        }

        if($.type(options) === "string") return instance[options]();
    });
};
$.fn.calendarSwitch.defaults = {
    selectors : {
        sections : "#calendar"
    },
    index : 4,      //展示的月份个数
    animateFunction : "toggle",        //动画效果
    controlDay:false,//知否控制在daysnumber天之内，这个数值的设置前提是总显示天数大于90天
    daysnumber : "90",     //控制天数
    comeColor : "blue",       //入住颜色
    outColor : "red",      //离店颜色
    comeoutColor : "#0cf",        //入住和离店之间的颜色
    direction : "vertical",     //滑动方向vertical,horizontal
    callback : "" ,   //回调函数
    comfireBtn:'.comfire'//确定按钮的class或者id

};

$(function(){
    $('#firstSelect').calendarSwitch();
});
})(jQuery);
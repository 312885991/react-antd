export default {
    formatSysTime:function(time){
        if(!time) return '';
        let arrays = ['星期日', '星期一','星期二','星期三','星期四','星期五','星期六']
        let date = new Date(time);
        return date.getFullYear() + "-" + this.formatNumer((date.getMonth()+1)) +"-" + this.formatNumer(date.getDate()) + " " + arrays[date.getDay()] + " " + this.formatNumer(date.getHours()) + ":" + this.formatNumer(date.getMinutes()) + ":" + this.formatNumer(date.getSeconds());
    },

    formatDate:function(time){
        if(!time) return '';
        let date = new Date(time);
        return date.getFullYear() + "-" + this.formatNumer((date.getMonth()+1)) +"-" + this.formatNumer(date.getDate()) + " " + this.formatNumer(date.getHours()) + ":" + this.formatNumer(date.getMinutes()) + ":" + this.formatNumer(date.getSeconds());
    },

    // 格式化日期当中的不满足两位前面补0
    formatNumer:function(number){
        let str = number.toString();
        if(str.length == 1){
            return "0" + str;
        }
        return str;
    }
}
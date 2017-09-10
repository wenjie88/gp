import GP from './gp.js'


class GPFilter {
    /**
     * 
     * @param {GP[]} gplist 
     */
    constructor(gplist) {
        this.gplist = gplist
    }


    //排除创业板
    chuangyeban() {
        this.gplist = this.gplist.filter(item => {
            return !(item.code.startsWith("3"));
        })
        return this;
    }



    /**
    * 
    * @param {String} min 最小  default: 0%
    */
    diefu(min) {
        min = Number(min.replace("%", ""))
        this.gplist = this.gplist.filter(item => {
            return Math.abs(item.UpDownPencentTotal) > min
        })
        return this;
    }





    /**
     * 
     * @param {String} x
     * 态 1  .|: ///////
     * 态 2  .:| ///////
     * 态 3  :.| ///////
     * 态 4  :|. ///////
     * 态 5  |:. ///////
     * 态 6  |.: ///////
     */
    valformat(formatArr) {
        if (formatArr === undefined) throw "必须输入格式 !"

        var GroupFormat = {}

        this.gplist.forEach(item => {
            var one = item.VolPaperArr[0] //29号
            var two = item.VolPaperArr[1]  //28号
            var three = item.VolPaperArr[2] //27号  由大到小

            var arr = [one, two, three].sort((a, b) => a - b)

            var format = ""
            for (var i = 0; i < arr.length; i++) {
                var index = arr.indexOf(item.VolPaperArr[arr.length - 1 - i])
                switch (index) {
                    case 0:
                        format += "."
                        break
                    case 1:
                        format += ":"
                        break
                    case 2:
                        format += "|"
                        break
                }
            }

            if (GroupFormat[format] !== undefined) {
                GroupFormat[format].push(item)
            } else {
                GroupFormat[format] = [item]
            }
        })


        var returnList = []
        var keys = Object.keys(GroupFormat)
        keys.forEach(_format => {
            if (formatArr.indexOf(_format) != -1) {
                returnList.push(...GroupFormat[_format])
            }
        })

        this.gplist = returnList

        return this;
    }







    /**
     * 
     * @param {String[]} Lines ["10","20","250"]
     */
    OverJunXian_and(Lines) {

        if (Lines === undefined) throw "Lines 不能为空 !";

        const returnlist = []
        this.gplist.forEach(item => {
            var isOver = true;
            for (var i = 0; i < Lines.length; i++) {
                var day = Lines[i]
                if (Number(item.nowprice) < Number(item["jun_" + day])) {
                    isOver = false;
                    break;
                }
            }
            if (isOver) returnlist.push(item);
        })
        this.gplist = returnlist;
        return this;
    }


    /**
       * 
       * @param {String} Lines "10||20||250"
       */
    OverJunXian_or(Lines) {

        if (Lines === undefined) throw "Lines 不能为空 !";

        var LineArr = Lines.split("||");

        const returnlist = []
        this.gplist.forEach(item => {
            for (var i = 0; i < LineArr.length; i++) {
                var day = LineArr[i]
                if (Number(item.nowprice) > Number(item["jun_" + day])) {
                    returnlist.push(item);
                    break;
                }
            }
        })
        this.gplist = returnlist;
        return this;
    }






    /**
     * 
     * @param {String[]} Lines "10","20"....."250" 
     * @param {String} NearUpDownPercent 均线附近上下幅度 default : "1%"
     */
    NearJunXian_and(Lines, NearUpDownPercent = "1%") {
        if (Lines === undefined) throw "Lines 不能为空 !";

        NearUpDownPercent = Number(NearUpDownPercent.replace("%", "")) * 0.01

        const returnlist = []
        this.gplist.forEach(item => {
            var isNearBy = true;
            for (var i = 0; i < Lines.length; i++) {
                var day = Lines[i]
                var _NowPrice = Number(item.nowprice)
                var cha = _NowPrice * NearUpDownPercent
                var JunPrice = Number(item["jun_" + day])
                var heigh = JunPrice + cha //最大
                var low = JunPrice - cha   //最小
                if (!(_NowPrice <= heigh && _NowPrice - cha >= low)) {
                    isNearBy = false;
                    break;
                }
            }
            if (isNearBy) returnlist.push(item);
        })

        this.gplist = returnlist;
        return this;
    }



    /**
      * 
      * @param {String} Lines "10||20||250" 
      * @param {String} NearUpDownPercent 均线附近上下幅度 default : "1%"
      */
    NearJunXian_or(Lines, NearUpDownPercent = "1%") {
        if (Lines === undefined) throw "Lines 不能为空 !";
        var LineArr = Lines.split("||");

        NearUpDownPercent = Number(NearUpDownPercent.replace("%", "")) * 0.01

        const returnlist = []
        this.gplist.forEach(item => {
            for (var i = 0; i < LineArr.length; i++) {
                var day = LineArr[i]
                var _NowPrice = Number(item.nowprice)
                var cha = _NowPrice * NearUpDownPercent
                var JunPrice = Number(item["jun_" + day])
                var heigh = JunPrice + cha //最大
                var low = JunPrice - cha   //最小
                if (_NowPrice <= heigh && _NowPrice >= low) {
                    returnlist.push(item);
                    break;
                }
            }
        })

        this.gplist = returnlist;
        return this;
    }






    Macd() {

    }
}




export default GPFilter;
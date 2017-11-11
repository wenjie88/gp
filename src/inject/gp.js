
class GP {


    // /**
    //  * 股票简称
    //  */
    // name = "";

    // /**
    //  * 股票代码
    //  */
    // code = "";

    // /**
    //  * 现价(元)
    //  */
    // nowprice = "";

    // /**
    //  * 涨跌幅(%)
    //  */
    // ZhangDiePencent = "";

    // /**
    //  * 涨跌幅:前复权(%)
    //  * 注意数组顺序为日期有后到前， 3号，2号，1号
    //  */
    // Arr_ZhangDiePencent = [];

    // /**
    //  * 成交量(股)
    //  * 注意数组顺序为日期有后到前， 3号，2号，1号
    //  */
    // Arr_ChengjiaoGu = [];

    // /**
    //  * 开盘价:前复权(元)
    //  * 注意数组顺序为日期有后到前， 3号，2号，1号
    //  */
    // Arr_OpenPrice = [];

    // /**
    //  * 最高价:前复权(元)
    //  * 注意数组顺序为日期有后到前， 3号，2号，1号
    //  */
    // Arr_HighPrice = [];

    // /**
    //  * 最低价:前复权(元)
    //  * 注意数组顺序为日期有后到前， 3号，2号，1号
    //  */
    // Arr_LowPrice = [];

    // /**
    //  * 收盘价:前复权(元)
    //  * 注意数组顺序为日期有后到前， 3号，2号，1号
    //  */
    // Arr_ClosePrice = [];

    // /**
    //  * 振幅(%)
    //  * 注意数组顺序为日期有后到前， 3号，2号，1号
    //  */
    // Arr_ZhenFuPencent = [];

    // /**
    //  * 区间涨跌幅:前复权(%)
    //  */
    // Sum_ZhangDiePencent = "";

    // /**
    //  * 区间振幅(%)
    //  */
    // Sum_ZhenFuPencent = "";

    // /**
    //  * 区间涨跌(元)
    //  */
    // Sum_ZhangDieMoney = "";

    // /**
    //  * 区间成交量(股)
    //  */
    // Sum_ChengjiaoGu = "";
    // /**
    //  * 区间成交额(元)
    //  */
    // Sum_ChengJiaoMoney = "";

    // /**
    //  * 10日均线
    //  */
    // jun_10 = "";

    // /**
    //  * 20日均线
    //  */
    // jun_20 = "";

    // /**
    //  * 30日均线
    //  */
    // jun_30 = "";

    // /**
    //  * 60日均线
    //  */
    // jun_60 = "";

    // /**
    //  * 180日均线
    //  */
    // jun_180 = "";

    // /**
    //  * 250日均线
    //  */
    // jun_250 = "";

    // /**
    //  * 买入信号
    //  */
    // SignBuy = "";

    // /**
    //  * 技术形态
    //  */
    // LookLike = "";

    // /**
    //  * 市盈率(pe)
    //  */
    // PE = "";

    // /**
    //  * 市净率(pb)
    //  */
    // PB = "";

    // /**
    //  * 流通a股(股)
    //  */
    // LiuTong_GuBen = "";

    // /**
    //  * a股流通市值(元)
    //  */
    // LiuTong_ShiZhi = "";

    // /**
    //  * 总股本(股)
    //  */
    // Sum_GuBen = "";

    // /**
    //  * 总市值(元)
    //  */
    // Sum_ShiZhi = "";

    // /**
    //  * 上市天数(天)
    //  */
    // Days = "";

    // /**
    //  * macd(macd值)
    //  * 注意数组顺序为日期有后到前， 3号，2号，1号
    //  */
    // Arr_Macd = [];

    // /**
    //  * macd(diff值)
    //  * 注意数组顺序为日期有后到前， 3号，2号，1号
    //  */
    // Arr_Diff = [];

    // /**
    //  * macd(dea值)
    //  * 注意数组顺序为日期有后到前， 3号，2号，1号
    //  */
    // Arr_Dea = [];

    constructor() {
        this.name = "";
        this.code = "";
        this.nowprice = "";
        this.ZhangDiePencent = "";
        this.Arr_ZhangDiePencent = [];
        this.Arr_ChengjiaoGu = [];
        this.Arr_OpenPrice = [];
        this.Arr_HighPrice = [];
        this.Arr_LowPrice = [];
        this.Arr_ClosePrice = [];
        this.Arr_ZhenFuPencent = [];
        this.Sum_ZhangDiePencent = "";
        this.Sum_ZhenFuPencent = "";
        this.Sum_ZhangDieMoney = "";
        this.Sum_ChengjiaoGu = "";
        this.Sum_ChengJiaoMoney = "";
        this.jun_10 = "";
        this.jun_20 = "";
        this.jun_30 = "";
        this.jun_60 = "";
        this.jun_180 = "";
        this.jun_250 = "";
        this.SignBuy = "";
        this.LookLike = "";
        this.PE = "";
        this.PB = "";
        this.LiuTong_GuBen = "";
        this.LiuTong_ShiZhi = "";
        this.Sum_GuBen = "";
        this.Sum_ShiZhi = "";
        this.Days = "";
        this.Arr_Macd = [];
        this.Arr_Diff = [];
        this.Arr_Dea = [];
    }


    get template() {
        return {
            "股票代码": "code",
            "股票简称": "name",
            "现价(元)": "nowprice",
            "涨跌幅(%)": "ZhangDiePencent",
            "涨跌幅:前复权(%)": "Arr_ZhangDiePencent",
            "成交量(股)": "Arr_ChengjiaoGu",
            "开盘价:前复权(元)": "Arr_OpenPrice",
            "最高价:前复权(元)": "Arr_HighPrice",
            "最低价:前复权(元)": "Arr_LowPrice",
            "收盘价:前复权(元)": "Arr_ClosePrice",
            "振幅(%)": "Arr_ZhenFuPencent",
            "区间涨跌幅:前复权(%)": "Sum_ZhangDiePencent",
            "区间振幅(%)": "Sum_ZhenFuPencent",
            "区间涨跌(元)": "Sum_ZhangDieMoney",
            "区间成交量(股)": "Sum_ChengjiaoGu",
            "区间成交额(元)": "Sum_ChengJiaoMoney",
            "10日均线": "jun_10",
            "20日均线": "jun_20",
            "30日均线": "jun_30",
            "60日均线": "jun_60",
            "180日均线": "jun_180",
            "250日均线": "jun_250",
            "买入信号": "SignBuy",
            "技术形态": "LookLike",
            "市盈率(pe)": "PE",
            "市净率(pb)": "PB",
            "流通a股(股)": "LiuTong_GuBen",
            "a股流通市值(元)": "LiuTong_ShiZhi",
            "总股本(股)": "Sum_GuBen",
            "总市值(元)": "Sum_ShiZhi",
            "上市天数(天)": "Days",
            "macd(macd值)": "Arr_Macd",
            "macd(diff值)": "Arr_Diff",
            "macd(dea值)": "Arr_Dea",
            "上市日期": "ShangShiDate",
            "净利润ttm(元)": "ttm"
        }
    }


    /**
     * 
     * @param {[]} item 
     * @param {[]} TitleList 
     * @returns {GP}
     */
    static CreateGP(item, TitleList) {
        var gp = new GP();
        for (var i = 0; i < TitleList.length; i++) {
            var _titleName = TitleList[i]
            var PropertyName = ""
            if (typeof (_titleName) === 'string') {
                PropertyName = gp.template[_titleName.replace(/(<br>[\w|\.|\-]+)/, "").replace(/[\r\n]/g,'')];
            } else {
                for (var key in _titleName) {
                    PropertyName = gp.template[key.replace(/(<br>[\w|\.|\-]+)/, "").replace(/[\r\n]/g,'')];
                }
            }

            if (PropertyName !== undefined && PropertyName !== "") {
                gp[PropertyName] = item[i];
            }
        }
        return gp
    }

}

export default GP;

class GP {
    constructor() {
        this.name = "";
        this.code = "";
        this.nowprice = "";
        this.UpDownPencent = "";
        this.UpDownPencentArr = [];
        this.VolPaperArr = [];
        this.OpenPriceArr = [];
        this.HighPriceArr = [];
        this.LowPriceArr = [];
        this.ClosePriceArr = [];
        this.ZhenFuPencentArr = [];
        this.UpDownPencentTotal = "";
        this.ZhenFuPencentTotal = "";
        this.UpDownMoneyTotal = "";
        this.VolPaperTotal = "";
        this.VolValTotal = "";
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
        this.AllPaper = "";
        this.MacdArr = [];
        }


    get template() {
        return {
            "股票代码": "code",
            "股票简称": "name",
            "现价(元)": "nowprice",
            "涨跌幅(%)": "UpDownPencent",
            "涨跌幅:前复权(%)": "UpDownPencentArr",
            "成交量(股)": "VolPaperArr",
            "开盘价:前复权(元)": "OpenPriceArr",
            "最高价:前复权(元)": "HighPriceArr",
            "最低价:前复权(元)": "LowPriceArr",
            "收盘价:前复权(元)": "ClosePriceArr",
            "振幅(%)": "ZhenFuPencentArr",
            "区间涨跌幅:前复权(%)": "UpDownPencentTotal",
            "区间振幅(%)": "ZhenFuPencentTotal",
            "区间涨跌(元)": "UpDownMoneyTotal",
            "区间成交量(股)": "VolPaperTotal",
            "区间成交额(元)": "VolValTotal",
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
            "总股本(股)": "AllPaper",
            "macd(macd值)":"MacdArr"
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
                PropertyName = gp.template[_titleName.replace(/(<br>[\w|\.|\-]+)/, "")];
            } else {
                for (var key in _titleName) {
                    PropertyName = gp.template[key.replace(/(<br>[\w|\.|\-]+)/, "")];
                }
            }
            gp[PropertyName] = item[i];
        }
        return gp
    }

}


export default GP;
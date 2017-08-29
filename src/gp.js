
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
    }


    get template() {
        return {
            "代码01": this.code,
            "代码02": this.name,
            "代码03": this.nowprice,
            "代码04": this.UpDownPencent,
            "代码05": this.UpDownPencentArr,
            "代码06": this.VolPaperArr,
            "代码07": this.OpenPriceArr,
            "代码08": this.HighPriceArr,
            "代码09": this.LowPriceArr,
            "代码10": this.ClosePriceArr,
            "代码11": this.ZhenFuPencentArr,
            "代码12": this.UpDownPencentTotal,
            "代码13": this.ZhenFuPencentTotal,
            "代码14": this.UpDownMoneyTotal,
            "代码15": this.VolPaperTotal,
            "代码16": this.VolValTotal,
            "代码17": this.jun_10,
            "代码18": this.jun_20,
            "代码19": this.jun_30,
            "代码20": this.jun_60,
            "代码21": this.jun_180,
            "代码22": this.jun_250,
            "代码23": this.SignBuy,
            "代码24": this.LookLike,
            "代码25": this.PE,
            "代码26": this.PB,
            "代码27": this.AllPaper,
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
        for (var i = 0; i < title.length; index++) {
            var _titleName = title[i]
            var PropertyName = ""
            if (typeof (_titleName) === 'string') {
                //PropertyName = gp.template[_titleName.replace(/(<br>[\w|\.|\-]+)/, "")];
                gp.template[_titleName.replace(/(<br>[\w|\.|\-]+)/, "")] = item[i]
            } else {
                for (var key in _titleName) {
                    gp.template[_titleName.replace(/(<br>[\w|\.|\-]+)/, "")] = item[i]
                    // PropertyName = gp.template[key.replace(/(<br>[\w|\.|\-]+)/, "")];
                }
            }
            // gp[PropertyName] = item[i];
        }
        return gp
    }

}


export default GP;
import GP from './gp.js'


class GPFilter {
    /**
     * 
     * @param {GP[]} gplist 
     */
    constructor(gplist) {
        this.gplist = gplist
    }

    /**
    * 
    * @param {String} min 最小
    */
    diefu(min) {
        this.gplist = this.gplist.filter(item => {
            return item.price > min
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

        var GroupFormat = {}

        this.gplist.forEach(item => {
            var one = item.priceArr[0]
            var two = item.priceArr[1]
            var three = item.priceArr[2]

            var arr = [one, two, three].sort((a, b) => a - b)

            var format = ""
            for (var i = 0; i < arr.length; i++) {
                var index = arr.indexOf(item.priceArr[i])
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



    jun(){
        
    }


}




export default GPFilter;
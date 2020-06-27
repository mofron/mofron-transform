/**
 * @file mofron-transform/index.js
 * @brief css transform util functions for mofron
 * @license MIT
 */

module.exports = (prm, x, y, z) => {
    try {
        let set = (sx,sy,sz) => {
            try {
	        let set_val = null;
                if ((undefined !== sx) && (undefined !== sy) && (undefined !== sz)) {
                    set_val = "translate3d("+ sx +","+ sy + "," + sz + ")";
                } if ((undefined !== sx) && (undefined !== sy)) {
		    set_val = "translate("+ sx +","+ sy +")";
                } else if (undefined !== sx) {
                    set_val = "translateX("+ sx +")";
                } else if (undefined !== sy) {
                    set_val = "translateY("+ sy +")";
                } else {
                    set_val = "translateZ("+ sz +")";
                }
                prm.style({ "transform" : set_val }, { bpref : true });
            } catch (e) {
                console.error(e.stack);
                throw e;
            }
        }
            
	let get = (gprm) => {
	    try {
	        if (-1 !== gprm.indexOf("translate3d")) {
		    return gprm.substring("translate3d".length-1, gprm.length-1).split(',');
                } else if (-1 === gprm.indexOf("translate")) {
                    return [undefined, undefined, undefined];
                }
                let sp_prm  = gprm.split("translate")[1];
                if ('X' === sp_prm[0]) {
		    return [sp_prm.substring(2, sp_prm.length-1), undefined, undefined];
		} else if ('Y' === sp_prm[0]) {
		    return [undefined, sp_prm.substring(2, sp_prm.length-1), undefined];
                } else if ('Z' === sp_prm[0]) {
                    return [undefined, undefined, sp_prm.substring(2, sp_prm.length-1)];
                }
                let ret = gprm.substring("translate".length-1, gprm.length-1).split(',');
                ret.push(undefined);
		return ret;
            } catch (e) {
                console.error(e.stack);
                throw e;
            }
        }
            
        let trans = prm.style("transform");
        if (null === trans) {
            set(x,y,z);
            return;
        }
        let trans_val = get(trans);
        /* set translate */
        set(
            (undefined !== x) ? x : trans_val[0],
            (undefined !== y) ? y : trans_val[1],
            (undefined !== z) ? z : trans_val[2],
        );
    } catch (e) {
        console.error(e.stack);
        throw e;
    }
}
/* end of file */

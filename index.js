/**
 * @file mofron-transform/index.js
 * @brief css transform util functions for mofron
 * @author simparts
 */

module.exports = {

    translate: (cmp, x, y, z) => {
        try {
            let set = (sx,sy,sz) => {
                try {
                    if ((undefined !== sx) && (undefined !== sy) && (undefined !== sz)) {
                        cmp.style({ "transform" : "translate3d("+ sx +","+ sy +")" });
                    } if ((undefined !== sx) && (undefined !== sy)) {
                        cmp.style({ "transform" : "translate("+ sx +","+ sy +")" });
                    } else if (undefined !== sx) {
                        cmp.style({ "transform" : "translateX("+ sx +")" });
                    } else if (undefined !== sy) {
                        cmp.style({ "transform" : "translateY("+ sy +")" });
                    } else {
                        cmp.style({ "transform" : "translateZ("+ sz +")" });
                    }
                } catch (e) {
                    console.error(e.stack);
                    throw e;
                }
            }
            
	    let get = (gprm) => {
	        try {
                    if (-1 === gprm.indexOf("translate")) {
                        return [null,null,null];
                    }
                    let sp_prm  = gprm.split("translate")[1];
                    if ( ('X' === sp_prm[0]) ||
                         ('Y' === sp_prm[0]) ||
                         ('Z' === sp_prm[0]) ) {
                        return sp_prm.substring(1, sp_prm.length-1);
                    }
                    let sp_prm2 = sp_prm.split(',');
                    let ret = [];
                    for (let sp_idx=0; sp_idx < sp_prm2.length ;sp_idx++) {
                        if (0 === sp_idx) {
                            ret.push(sp_prm2[sp_idx].substr(1));
                        } else if (sp_prm2.length-1 === sp_idx) {
                            ret.push(sp_prm2[sp_idx].substring(0, sp_prm2[sp_idx].length-1));
                        } else {
                            ret.push(sp_prm[sp_idx]);
                        }
                    }
		    return ret;
		} catch (e) {
                    console.error(e.stack);
                    throw e;
		}
            }
            
            let trans = cmp.style("transform");
            if (null === trans) {
                set(x,y,z);
                return;
            }
            let trans_val = translate_get(trans);
            if ( (null === trans_val[0]) &&
                 (null === trans_val[1]) &&
                 (null === trans_val[2]) ) {
                console.warn("overwrite transform");
            }
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
}
/* end of file */

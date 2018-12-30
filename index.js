/**
 * @file   mofron-comp-accrdmenu/index.js
 * @brief  accordion side menu component
 * @author simpart
 */
const mf    = require('mofron');
const Menu  = require('mofron-comp-menu');
const Click = require('mofron-event-click');

mf.comp.AcdMenu = class extends Menu {
    
    /**
     * initialize component
     * 
     * @param po paramter or option
     */
    constructor (po) {
        try {
            super();
            this.name('AcdMenu');
            this.prmOpt(po);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * get only menu item
     * this method is custmaized from menu
     */
    item (prm) {
        try {
            let ret = super.item(prm);
            if (undefined !== ret) {
                let itm_ret = [];
                let acc_chd = null;
                for (let ridx in ret) {
                    if (true === mf.func.isComp(ret[ridx], 'Accordion')) {
                        acc_chd = ret[ridx].child();
                        for (let aidx in acc_chd) {
                            itm_ret.push(acc_chd[aidx]);
                        }
                    } else {
                        itm_ret.push(ret[ridx]);
                    }
                }
                return itm_ret;
            }
            
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * add menu item clickevent
     *
     * @note private method
     */
    addItem (prm) {
        try {
            let ret = super.addItem(prm);
            if (undefined === prm) {
                /* getter */
                return ret;
            }
            /* setter */
            if (true !== mf.func.isComp(prm, 'Accordion')) {
                return;
            }
            
            let fnc = (clk_cmp, clk_evt, clk_prm) => {
                try {
                    let itm = clk_prm.item();
                    for (let iidx in itm) {
                        if (clk_cmp.getId() === itm[iidx].getId()) {
                            clk_prm.select(parseInt(iidx));
                        }
                    }
                } catch (e) {
                    console.error(e.stack);
                    throw e;
                }
            };
            let acc_chd = prm.child();
            for (let aidx in acc_chd) {
                if (true === mf.func.isComp(acc_chd[aidx], 'MenuItem')) {
                    acc_chd[aidx].execOption({
                        event : [new Click([fnc, this])],
                    });
                }
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
module.exports = mf.comp.AcdMenu;
/* end of file */

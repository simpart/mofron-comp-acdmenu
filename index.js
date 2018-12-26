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
    
    addItem(prm) {
        try {
            this.addChild(prm);
            let clk_evt = (clk_cmp, clk_evt, clk_prm) => {
                try {
                    let itm = clk_prm.item();
                    let cnt = 0;
                    for (let iidx in itm) {
                        if (true === mf.func.isInclude(itm[iidx], ['Component', 'Accordion'])) {
                            let acd_chd = itm[iidx].child();
                            for (let aidx in acd_chd) {
                                if (clk_cmp.getId() === acd_chd[aidx].getId()) {
                                    clk_prm.execSelect(cnt);
                                    return;
                                }
                                cnt++;
                            }
                        } else {
                            if (clk_cmp.getId() === itm[iidx].getId()) {
                                clk_prm.execSelect(cnt);
                                return;
                            }
                            cnt++;
                        }
                    }
                } catch (e) {
                    console.error(e.stack);
                    throw e;
                }
            }
            
            if (true === mf.func.isInclude(prm, ['Component', 'Accordion'])) {
                let accd_chd = prm.child();
                for (let aidx in accd_chd) {
                    accd_chd[aidx].execOption({
                        event : [new Click([clk_evt, this])]
                    });
                }
            } else {
                prm.execOption({
                    event : [new Click([clk_evt, this])]
                });
            }
            this.arrayMember('item', 'Component', prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
module.exports = mf.comp.AcdMenu;
/* end of file */

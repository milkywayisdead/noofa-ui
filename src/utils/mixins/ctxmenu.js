const ctxMenuMixin = {
    inject: ['ctxmenu'],
    props: {
        ctxmenuItems: {
            type: Array,
            default: [],
        },
    },
    methods: {
        contextMenu(event){
            this.beforeOnClick()
            if(this.ctxmenuItems.length){
                this._ctxMenuHandler(event)
            }
        },
        _ctxMenuHandler(event){
            const x = event.pageX, y = event.pageY
            const ctxmenu = this.ctxmenu()
            ctxmenu.update(this.ctxmenuItems)
            ctxmenu.position(x, y)
            ctxmenu.show(event.pageX, event.pageY)
        },
        beforeOnClick(){},
    },
}

export default ctxMenuMixin
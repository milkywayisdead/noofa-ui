const ctxMenuMixin = {
    data(){
        return {
            useCustomCtxmenuItems: false,
            customCtxmenuItems: [],
        }
    },
    inject: ['ctxmenu', 'locale'],
    props: {
        ctxmenuItems: {
            type: Array,
            default: [],
        },
    },
    computed: {
        hasCtxmenuItems(){
            return this.useCustomCtxmenuItems ?
                this.customCtxmenuItems.length :
                this.ctxmenuItems.length
        },
    },
    methods: {
        contextMenu(event){
            this.beforeOnClick()
            if(this.hasCtxmenuItems){
                this._ctxMenuHandler(event)
            }
        },
        _ctxMenuHandler(event){
            const x = event.pageX, y = event.pageY
            const ctxmenu = this.ctxmenu()
            ctxmenu.update(
                this.useCustomCtxmenuItems ?
                this.customCtxmenuItems :
                this.ctxmenuItems
            )
            ctxmenu.position(x, y)
            ctxmenu.show(event.pageX, event.pageY)
        },
        beforeOnClick(){},
    },
}

export default ctxMenuMixin
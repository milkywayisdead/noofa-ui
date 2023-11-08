const dbExplorerMixin = {
    inject: ['api', 'context', 'locale', 'snackbar'],
    methods: {
        getTablesList(sourceId){
            this.api.getTablesList(this.context.id, sourceId)
                .then(res => {
                    if(res.status === 200){
                        console.log(res.data)
                    }
                })
        },
        getFieldsList(sourceId, tableName){
            this.api.getFieldsList(this.context.id, sourceId, tableName)
                .then(res => {
                    if(res.status === 200){
                        console.log(res.data)
                    }
                })
        },
        getDbStructure(sourceId){
            this.beforeDbStructureLoading()
            this.api.getDbStructure(this.context.id, sourceId)
                .then(res => {
                    if(res.status === 200){
                        this.onDbStructureLoaded(res)
                    }
                }).catch(err => {
                    this.onDbStructureLoadingError(err)
                    this.snackbar.error(
                        this.locale.messages.errorWhenGettingDbStruct
                    )
                })
        },
        beforeDbStructureLoading(){},
        onDbStructureLoaded(response){},
        onDbStructureLoadingError(error){},
    },
}

export {
    dbExplorerMixin,
}
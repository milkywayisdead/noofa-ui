const dbExplorerMixin = {
    inject: ['api', 'context'],
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
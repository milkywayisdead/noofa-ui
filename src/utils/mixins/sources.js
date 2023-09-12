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
            this.api.getDbStructure(this.context.id, sourceId)
                .then(res => {
                    if(res.status === 200){
                        console.log(res.data)
                    }
                })
        },
    },
}

export {
    dbExplorerMixin,
}
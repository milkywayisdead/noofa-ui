class NoofaCtx {
    constructor(conf){
        this.update(conf);
    }

    compile(){
        const sources = {}
        for(let source of Object.values(this.sources)){
            sources[source.id] = source.compile();
        }

        const queries = {}
        for(let query of Object.values(this.queries)){
            queries[query.id] = query.compile();
        }

        const dataframes = {}
        for(let df of Object.values(this.dataframes)){
            dataframes[df.id] = df.compile();
        }

        const components = {}
        for(let cmp of Object.values(this.components)){
            components[cmp.id] = cmp.compile();
        }

        const docs = {}
        for(let doc of Object.values(this.docs)){
            docs[doc.id] = doc.compile();
        }

        const values = {}
        for(let value of Object.values(this.values)){
            values[value.id] = value.compile();
        }

        return {
            id: this.id,
            name: this.name,
            description: this.description,
            sources: sources,
            queries: queries,
            dataframes: dataframes,
            components: components,
            docs: docs,
            values: values,
        }
    }

    addSource(conf){
        this.sources[conf.id] = new CtxSource(conf);
    }

    update(conf){
        this.id = conf.id || null;
        this.name = conf.name || '';
        this.description = conf.description || '';
        for(let prop of [
                'sources', 'queries', 'dataframes',
                'components', 'docs', 'values',
            ]
        ){
            this[prop] = {}
        }

        const sources = conf.sources || {}
        for(let sourceId in sources){
            const sourceConf = sources[sourceId];
            this.addSource(sourceConf);
        }        
    }

    hasId(){
        return this.id !== null;
    }
}


class CtxSource {
    constructor(conf){
        for(let prop of this._propsForConstructor()){
            this[prop] = conf[prop];
        }
    }

    compile(){
        let value = this.connStr;
        if(this.from !== 'conn_str'){
            value = {}
            for(let prop of this._propsForCompile()){
                value[prop] = this[prop];
            }
        }
        return {
            id: this.id,
            type: this.type,
            from: this.from,
            value: value,
        }
    }

    _propsForCompile(){
        return [
            'host', 'port', 'dbName', 'user',
            'password',
        ];
    }

    _propsForConstructor(){
        return [
            'id', 'name', 'type', 'from',
            'host', 'port', 'dbName', 'user',
            'password', 'connStr',
        ];
    }
}

export default NoofaCtx;
class NoofaCtx {
    constructor(conf){
        this.id = conf.profileId || null;
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
            this.sources[sourceId] = new CtxSource(sourceConf);
        }
    }

    compile(){
        return {
            id: this.id,
            sources: Object.values(this.sources).map(src => src.compile()),
        }
    }

    addSource(conf){
        this.sources[conf.id] = new CtxSource(conf);
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
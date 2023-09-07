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
}


class CtxSource {
    constructor(conf){
        this.id = conf.id;
        this.type = conf.type;
        this.from = conf.from;
        this.value = conf.value;
    }

    compile(){
        return {
            id: this.id,
            type: this.type,
            from: this.from,
            value: this.value,
        }
    }
}

export default NoofaCtx;
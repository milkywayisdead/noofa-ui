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
        return this.sources[conf.id];
    }

    updateSource(sourceId, conf){
        this.sources[sourceId] = new CtxSource(conf);
        return this.sources[sourceId];
    }

    addQuery(conf){
        this.queries[conf.id] = new CtxQuery(conf);
        return this.queries[conf.id];
    }

    updateQuery(queryId, conf){
        this.queries[queryId] = new CtxQuery(conf);
        return this.queries[queryId];
    }

    addDataframe(conf){
        this.dataframes[conf.id] = new CtxDataframe(conf);
        return this.dataframes[conf.id];
    }

    updateDataframe(dfId, conf){
        this.dataframes[dfId] = new CtxDataframe(conf);
        return this.dataframes[dfId];
    }

    addTable(conf){
        this.components[conf.id] = new CtxTable(conf);
        return this.components[conf.id];
    }

    updateTable(tblId, conf){
        this.components[tblId] = new CtxTable(conf);
        return this.components[tblId];
    }

    addFigure(conf){
        this.components[conf.id] = new CtxFigure(conf);
        return this.components[conf.id];
    }

    updateFigure(figId, conf){
        this.components[figId] = new CtxFigure(conf);
        return this.components[figId];
    }

    deleteItem(target, targetId){
        target = ['tables', 'figures'].includes(target) ? 'components' : target;
        delete this[target][targetId];
    }

    update(conf){
        this.id = conf.id || null;
        this.name = conf.name ? conf.name : (conf.defaultName ? conf.defaultName : 'Untitled');
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
            this.sources[sourceId] = CtxSource.fromConf(sourceConf);
        }
        
        const queries = conf.queries || {}
        for(let queryId in queries){
            const queryConf = queries[queryId];
            this.queries[queryId] = CtxQuery.fromConf(queryConf);
        }

        const dataframes = conf.dataframes || {}
        for(let dfId in dataframes){
            const dfConf = dataframes[dfId];
            this.dataframes[dfId] = CtxDataframe.fromConf(dfConf);
        }

        const components = conf.components || {}
        for(let cmpId in components){
            const cmpConf = components[cmpId];
            const cmpType = cmpConf.type;
            if(cmpType === 'table'){
                this.components[cmpId] = CtxTable.fromConf(cmpConf);
            } else if(cmpType === 'figure'){
                this.components[cmpId] = CtxFigure.fromConf(cmpConf);
            }
        }
    }

    hasId(){
        return this.id !== null;
    }
}


class CtxSource {
    constructor(conf){
        for(let prop of CtxSource._propsForConstructor()){
            this[prop] = conf[prop] ?? '';
        }
    }

    compile(){
        let value = this.connStr;
        if(this.from !== 'conn_str'){
            value = {}
            for(let prop of CtxSource._propsForCompile()){
                value[prop] = this[prop];
            }
        }
        return {
            id: this.id,
            name: this.name,
            type: this.type,
            from: this.from,
            value: value,
        }
    }

    static fromConf(dbConf){
        const conf = {}
        const usingConnStr = dbConf.from === 'conn_str';
        for(let p of ['id', 'name', 'type', 'from']){
            conf[p] = dbConf[p];
        }
        conf.connStr = usingConnStr ? dbConf.value : '';
        for(let p of ['host', 'port', 'user', 'dbname', 'password']){
            conf[p] = dbConf.value[p];
        }

        return new CtxSource(conf);
    }

    static _propsForCompile(){
        return [
            'name', 'host', 'port', 'dbname', 'user',
            'password', 'connStr',
        ];
    }

    static _propsForConstructor(){
        return [
            'id', 'name', 'type', 'from',
            'host', 'port', 'dbname', 'user',
            'password', 'connStr',
        ];
    }
}


class CtxQuery {
    constructor(conf){
        for(let prop of this._propsForConstructor()){
            this[prop] = conf[prop];
        }
    }

    compile(){
        const cmp = {}
        let value = this.expression;
        cmp.value = value;
        for(let prop of this._propsForCompile()){
            cmp[prop] = this[prop];
        }

        return cmp;
    }

    static fromConf(dbConf){
        const conf = {...dbConf}
        if(dbConf.from === 'expression'){
            conf.expression = conf.value;
        }
        return new CtxQuery(conf);
    }

    _propsForCompile(){
        return [
            'id', 'name', 'from', 'source',
        ];
    }

    _propsForConstructor(){
        return [
            'id', 'name', 'from',
            'expression', 'source',
        ];
    }
}


class CtxDataframe {
    constructor(conf){
        for(let prop of this._propsForConstructor()){
            this[prop] = conf[prop];
        }
        for(let prop of ['unions', 'joins', 
            'filters', 'dtypes', 'columns', 'ordering', 'fillna']){
            this[prop] = conf[prop] ?? [];
        }
    }

    compile(){
        const cmp = {
            id: this.id,
            name: this.name,
            base: this.base,
        }
        for(let prop of ['unions', 'joins', 
            'filters', 'dtypes', 'columns', 'ordering', 'fillna']){
            cmp[prop] = this[prop] ?? [];
        }
        return cmp
    }

    static fromConf(dbConf){
        return new CtxDataframe(dbConf);
    }

    _propsForConstructor(){
        return ['id', 'name', 'base'];
    }
}


class CtxTable {
    constructor(conf){
        for(let prop of this._propsForConstructor()){
            this[prop] = conf[prop];
        }
        this.layout = conf.layout ?? {
            title_text: '',
            exclude: [],
            aliases: {},
        }
    }

    compile(){
        const cmp = {
            type: this.type,
            id: this.id,
            name: this.name,
            base: this.base,
            layout: this.layout,
        }
        return cmp
    }

    static fromConf(dbConf){
        return new CtxTable(dbConf);
    }

    _propsForConstructor(){
        return ['type', 'id', 'name', 'base'];
    }
}


class CtxFigure {
    constructor(conf){
        for(let prop of this._propsForConstructor()){
            this[prop] = conf[prop];
        }
    }

    compile(){
        const cmp = {
            id: this.id,
            name: this.name,
            engine: this.engine,
            type: this.type,
            figure_type: this.figure_type,
            base: this.base,
            layout: this.layout,
        }
        return cmp
    }

    static fromConf(dbConf){
        return new CtxFigure(dbConf);
    }

    _propsForConstructor(){
        return [
            'type', 'id', 'name', 
            'figure_type', 'base', 'engine',
            'layout',
        ];
    }
}


export default NoofaCtx;
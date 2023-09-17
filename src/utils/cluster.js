class Cluster {
    constructor(base, baseWidth, baseHeight){
        this.base = base
        this.left = []
        this.right = []
        this.baseWidth = baseWidth ? baseWidth : 0
        this.baseHeight = baseHeight ? baseHeight : 0
        this.width = 0
        this.height = 0
        this.leftGap = 0
        this.rightGap = 0
    }

    addLeft(sub){
        this.left.push(sub)
    }

    addRight(sub){
        this.right.push(sub)
    }
}


export default class Clusterizer {
    constructor(tables, xGap, yGap){
        this.tables = tables
        this.tablesBuffer = []
        this.xGap = xGap || 10
        this.yGap = yGap || 10
        this.clusters = this._clusterize()
    }

    measure(cluster){
        const wl = [], wr = []
        let width = cluster.baseWidth
        let height = cluster.baseHeight + this.yGap
        let lh = height, rh = height

        for(let sub of cluster.left){
            const m = this.measure(sub)
            wl.push(m.width)
            lh += m.height
        }
        for(let sub of cluster.right){
            const m = this.measure(sub)
            wr.push(m.width)
            rh += m.height
        }


        const leftGaps = Object.values(cluster.left).map(i => i.width)
        cluster.leftGap = leftGaps.length ? Math.max(...leftGaps) : 0
        const rightGaps = Object.values(cluster.right).map(i => i.width)
        cluster.rightGap = rightGaps.length ? Math.max(...rightGaps) : 0
        cluster.width = cluster.baseWidth + cluster.leftGap + cluster.rightGap + 2*this.xGap
        cluster.height = Math.max(lh, rh) + this.yGap
        return cluster
    }

    _clusterize(){
        this.tablesBuffer = Object.values(this.tables)
                                .sort((a, b) => a.related_to >= b.related_to ? -1 : 1)
                                .map(i => i.name)
        const clusters = []
        while(this.tablesBuffer.length){
            clusters.push(this._cluster(null))
        }
        return clusters
    }

    _cluster(baseName){
        if(baseName === null){
            baseName = this.tablesBuffer.shift()
        } else {
            this.tablesBuffer = this.tablesBuffer.filter(i => i !== baseName)
        }
        const table = this.tables[baseName]
        const fk = table.fk.filter(i => this.tablesBuffer.includes(i))
        const relatedBy = table.related_by.filter(i => this.tablesBuffer.includes(i))
        const cluster = new Cluster(baseName, table.width, table.height)

        for(let t of fk){
            if(this.tablesBuffer.includes(t)){
                cluster.addLeft(this._cluster(t))
            }
        }
        for(let t of relatedBy){
            if(this.tablesBuffer.includes(t)){
                cluster.addRight(this._cluster(t))
            }
        }

        this.measure(cluster)
        return cluster
    }
}

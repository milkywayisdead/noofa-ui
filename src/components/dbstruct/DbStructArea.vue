<template>
<div 
  :id="divId + '-container'"
  class="repmas-dbstruct-area repmas-thin-scrollbar"
  :style="{border: borderStyle}">
  <db-table v-for="(table, name) in tables"
    :key="table.divId"
    :divId="table.divId"
    :tableName="name" 
    :columns="table.columns" 
    :pk="table.pk" 
    :fk="table.fk_cols"
    @dbtable-mounted="addTableObj" />
  <div class="-db-relation-line" v-for="rl in relationsLines"
    :style="`left:${rl.left};top:${rl.top};width:${rl.width};height:${rl.height}`"
    :title="rl.title"
  >
  </div>
</div>
</template>

<script>
import DbTable from './DbTable.vue'
import Clusterizer from './cluster.js'

export default {
    name: 'DbStructArea',
    data(){
        return {
            divId: `dbstruct-area${+ new Date()}`,
            tables: {},
            _tables: {},
            relations: [],
            tableObjs: {},
            tablesBuffer: [],
            xGap: 7,
            yGap: 2,
            relationsLines: [],
            height: 0,
        }
    },
    mounted(){
        addEventListener('resize', this.resize)
    },
    unmounted(){
        removeEventListener('resize', this.resize)
    },
    methods: {
        resize(){
            const tab = $(`#${this.divId}-container`).closest('div.card-body')
            const r = document.getElementById(this.divId + '-container').getBoundingClientRect()
            $(`#${this.divId}-container`)
                .css('height', `${tab.height() - (r.top - tab.offset().top)}px`)
        },
        addTableObj(tableObj){
            this.tableObjs[tableObj.tableName] = tableObj
            const hw = tableObj.shape()
            const table = this.tables[tableObj.tableName]
            table.width = hw.width, table.height = hw.height

            const tableObjsN = Object.keys(this.tableObjs).length
            const tablesN = Object.keys(this.tables).length
            if(tableObjsN === tablesN){
                this.draw()
            }
        },
        getDiv(){
            return document.getElementById(this.divId + '-container')
        },
        getTableDiv(tableName){
            return this.tableObjs[tableName].getDiv()
        },
        reset(){
            this.tables = {}
            this.relations = {}
            this.tableObjs = {}
            this.tablesBuffer = []
            this.relationsLines = []
        },
        adjustTables(){
            const cl = new Clusterizer(this.tables, this.xGap, this.yGap)
            const grouped = cl.clusters
            if(grouped.length){
                this.height = Math.max(...grouped.map(i => i.height))
            }

            const clusters = []
            const singletons = []
            for(let g of grouped){
                if(!g.left.length && !g.right.length){
                    singletons.push(g)
                } else {
                    clusters.push(g)
                }
            }

            let offset = 0
            for(let cluster of clusters){
                this.arrange(cluster, null, offset)
                offset += cluster.width + this.xGap
            }

            if(singletons.length){
                this.arrangeSingletons(singletons, offset)
            }
        },
        arrange(cluster, parent, offset){
            const baseTableObj = this.tableObjs[cluster.base]
            let offsetTop = 0

            if(!parent){
                baseTableObj.position(cluster.leftGap)
            } else {
                offsetTop = parent.offsetTop + parent.shape().height
            }

            if(offset){
                baseTableObj.position(offset)
            }

            const params = [cluster.left, baseTableObj, cluster.baseWidth, offsetTop]
            this._arrangeSide(...params)
            params.shift()
            params.unshift(cluster.right)
            params.push(true)
            this._arrangeSide(...params)
        },
        arrangeSingletons(singletons, offsetLeft){
            let offsetTop = 0
            singletons.sort((a, b) => a.baseHeight > b.baseHeight ? 1 : -1)
            const smRowLength = Math.round(Math.sqrt(singletons.length))

            let n = 0
            let heights = []
            let dx = 0
            while(singletons.length){
                const s = singletons.shift()
                heights.push(s.baseHeight)
                const table = this.tableObjs[s.base]
                table.position(offsetLeft + dx, offsetTop)
                dx += s.baseWidth + this.xGap
                n++
                if(n === smRowLength){
                    dx = 0
                    n = 0
                    offsetTop += Math.max(...heights) + this.yGap
                    heights = []
                }
            }
        },
        draw(){
            this.adjustTables()
            this._drawRelations()
        },
        _drawRelations(){
            for(let r of this.relations){
                this._addRelationLine(r)
            }
        },
        _arrangeSide(clusterSide, baseTableObj, baseWidth, offsetTop, right){
            const {width, height} = baseTableObj.shape()
            let oT = offsetTop
            for(let sub of clusterSide){
                const table = this.tableObjs[sub.base]
                let oL = 0
                if(right){
                    oL = baseTableObj.offsetLeft + sub.leftGap + width + this.xGap
                } else {
                    oL = baseTableObj.offsetLeft - sub.rightGap - baseWidth - this.xGap
                }
                table.position(oL, oT)
                oT += sub.height
                this.arrange(sub, table)
            }
        },
        _addRelationLine(relation){
            const table = relation.referencing_table, col = relation.referencing_column
            const refTable = relation.referenced_table, refCol = relation.referenced_column
            const referencingTable = this.tableObjs[table]
            const referencedTable = this.tableObjs[refTable]
            const p1 = referencingTable.getEndpoint(col)
            const p2 = referencedTable.getEndpoint(refCol)
            referencingTable.addRelationDescription(
                col, 
                refTable, 
                refCol,
                referencedTable.getCell(refCol)
            )

            const relDesc = `${table}.${col} -> ${refTable}.${refCol}`
            const lines = []
            const dx = p1.oL - p2.oL, dy = p1.oT - p2.oT
            const rightwards = dx < 0
            const upwards = dy > 0

            let x = p1.oL, y = p1.oT, l = 5
            let o = 'h'
            if(rightwards){
                x += p1.width
            } else {
                x -= l 
            }
            lines.push(this._line(x, y, l, o, relDesc))

            o = 'v'
            if(rightwards){
                x += l
            }
            if(upwards){
                y = p2.oT
            }
            l = Math.abs(dy)
            lines.push(this._line(x, y, l, o, relDesc))

            o = 'h'
            l = Math.abs(dx)
            y = p2.oT
            if(!rightwards){
                l = x - (p2.oL + p2.width)
                x = p2.oL + p2.width
            }
            lines.push(this._line(x, y, l, o, relDesc))

            this.relationsLines = this.relationsLines.concat(lines)
        },
        _line(x, y, length, orientation, relDesc){
            relDesc = relDesc || ''
            const sides = [length + 'px', '1px']
            return this.relationsLines.push({
                left: x + 'px',
                top: y + 'px',
                height: orientation === 'v' ? sides[0] : sides[1],
                width: orientation === 'v' ? sides[1] : sides[0],
                title: relDesc,
            })
        },
        setIds(dbtables){
            for(let t in dbtables){
                dbtables[t].divId = `${t}-${+ new Date()}`
            }
            return dbtables
        },
    },
    computed: {
        hasTables(){
            return Object.keys(this.tables).length > 0
        },
        borderStyle(){
            return `${this.hasTables ? 1 : 0}px solid grey`
        },
    },
    components: {
        DbTable,
    }
}
</script>

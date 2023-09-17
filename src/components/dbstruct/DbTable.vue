<template>
    <v-card 
        :id="divId" 
        :style="{top:y, left:x}" 
        class="noo-dbstruct-table o-g">
        <v-card-title>{{ tableName }}</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
            <v-list>
                <v-list-item v-for="col in columns" :key="col"
                    :class="`_col-${col.name}`">
                    {{ col.name }}({{ col.type }})
                    <v-icon v-if="isPk(col.name)">mdi-key-variant</v-icon>
                    <v-icon v-if="isFk(col.name)">mdi-link-variant</v-icon>
                </v-list-item>
            </v-list>
        </v-card-text>
    </v-card>

    <!--<div :id="divId" class="card card-info prevent-select repmas-dbstruct-table" :style="{top:y, left:x}">
      <div class="card-header repmas-dbstruct-table-cell">
        {{ tableName }}
      </div>
      <ul class="list-group list-group-flush" v-for="col in columns">
        <li class="list-group-item repmas-dbstruct-table-cell" :data-column="col.name">
          <font-awesome-icon icon="key" v-if="isPk(col.name)" />
          <font-awesome-icon icon="link" v-if="isFk(col.name)" />
          <span>{{ col.name }}({{ col.type }})</span>
        </li>
      </ul>
    </div>-->
</template>
    
<script>
export default {
    name: 'DbTable',
    data(){
        return {
            offsetLeft: 0,
            offsetTop: 0,
        }
    },
    props: {
        divId: {
            type: String,
            required: true,
        },
        tableName: {
            type: String,
        },
        columns: {
            type: Array,
        },
        pk: {
            type: Array,
        },
        fk: {
            type: Array,
        },
    },
    inject: ['locale'],
    methods: {
        isPk(col){
            return this.pk.includes(col)
        },
        isFk(col){
            return this.fk.includes(col)
        },
        shape(){
            const dbtable = document.getElementById(this.divId)
            const rect = dbtable.getBoundingClientRect()
            return {
                height: rect.height,
                width: rect.width,
            }
        },
        getDiv(){
            return document.getElementById(this.divId)
        },
        getEndpoint(col){
            const cell = document.querySelector(`#${this.divId} div._col-${col}`)
            const {width, height} = cell.getBoundingClientRect()
            const ep = {
                oL: this.offsetLeft, 
                oT: this.offsetTop + cell.offsetTop + height/2, 
                width: width
            }
            return ep
        },
        addRelationDescription(col, refTable, refCol, refCell){
            const desc = `${this.locale.dbstruct.fk} -> ${refTable}.${refCol}`
            const cell = this.getCell(col)
            cell.setAttribute('title', desc)
            cell.classList.add('-db-struct-fk')
            if(refCell){
                cell.addEventListener('click', e => {
                    refCell.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center',
                        inline: 'center',
                    })
                })
            }
        },
        getCell(col){
            return document.querySelector(`#${this.divId} div._col-${col}`)
        },
        position(oL, oT){
            if(oL !== null){
                this.offsetLeft = oL
            }
            if(oT !== undefined){
                this.offsetTop = oT
            }
        },
    },
    emits: ['dbtableMounted'],
    mounted(){
        this.$emit('dbtableMounted', this)
    },
    computed: {
        x(){
            return `${this.offsetLeft}px`
        },
        y(){
            return `${this.offsetTop}px`
        },
    },
}
</script>

<style scoped>
.v-card {
    font-size: 12px!important;
}

.v-card-text {
    padding: 0px;
    font-size: inherit;
}

.v-card-title {
    padding: 0px;
    font-size: 14px;
    line-height: unset;
    min-height: fit-content;
}

.v-list {
    padding: 0px!important;
    font-size: inherit;
}

.v-list-item {
    padding: 0px!important;
    min-height: fit-content;
}

.o-g {
    outline: 1px solid grey;
}
</style>
<template>
  <router-view :key="$route.fullPath" />
</template>

<script>
export default {
}
</script>

<style>
.noo-dbstruct-area {
  overflow: auto;
  position: relative;
}

.noo-dbstruct-table {
  position: absolute!important;
  width: max-content;
  z-index: 10;
}

.noo-thin-scrollbar {
  scrollbar-width: thin;
}

.-db-relation-line {
  position: absolute;
  background-color: grey;
  z-index: 0;
}

.-db-struct-fk {
  cursor: pointer;
}

.cursor-default {
    cursor: default !important;
}

.prevent-select {
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.selected-profile-tree-item {
  outline: 1px dotted black;
  background-color: #637d8f;
}

div.v-row.rigid-row {
  flex: none;
  overflow: auto;
}

.noo-widget, .noo-widget-resizers {
  position: absolute;
}

.noo-widget-resizers {
  outline: 2px dotted black;
}

.noo-text-widget {
  resize: none;
}
</style>
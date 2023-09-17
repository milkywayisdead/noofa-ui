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
</style>
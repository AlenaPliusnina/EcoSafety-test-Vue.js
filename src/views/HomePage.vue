<template>
  <v-container fluid>
      <DocumentList/>
  </v-container>
</template>

<script>
import DocumentList from "../components/DocumentList"

export default {
    name: "home-page",
    components: {
        DocumentList
    },
};
</script>
<template>
    <v-card class="mx-auto" max-width="600">
        <div v-if="loading" class="text-center" style="padding-top: 12vh; padding-bottom: 12vh;">
            <v-progress-circular
            :size="50"
            color="primary"
            indeterminate
            ></v-progress-circular>
        </div>
        <v-list v-else>
            <v-list-item-group v-model="model">
                <v-list-item v-for="(document, index) in documents" :key="document">
                    <v-img class="shrink ml-3 mr-3"
                            contain 
                            src="../assets/pdf.png" 
                            width="40"/>
                    <v-list-item-content>
                        <v-list-item-title v-text="document.doc_name + ' от ' + document.date_doc"></v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-icon>
                        <v-icon v-text="'mdi-download'" v-on:click="downloadDoc(index)"></v-icon>
                    </v-list-item-icon>
                </v-list-item>
            </v-list-item-group>
        </v-list>
    </v-card>
</template>

<script>
import axios from 'axios'

export default {
  name: "document-list",
  data() {
    return {
        model: null,
        documents: [],
        loading: false,
        pid: localStorage.getItem('pid'),
        token: localStorage.getItem('token'),
        md5: localStorage.getItem('md5')
    };
  },
  methods: {
        downloadDoc(index) {
            const doc_info = this.documents[index];
            axios.get(`https://host1.medsafe.tech:40443/api/test?json={"id_login":"${this.pid}","id_people":"${this.pid}","TK":"${this.token}","IMEI":"${this.md5}","Name_app":"connect","Name_event":"get_pic_path","id_document":"${doc_info.id_document}","doc_type":"${doc_info.doc_type}"}`)
            .then(res => {
                window.location.href = `https://host1.medsafe.tech:40443/${res.data.body[0].hash}`;
            })
            .catch((e) => {
                console.log(e.response);
            })
        }
  },
  mounted() {
      this.loading = true;
      if (this.pid !== 0) {
        axios.get(`https://host1.medsafe.tech:40443/api/test?json={"id_login":"${this.pid}","id_people":"${this.pid}","TK":"${this.token}","IMEI":"${this.md5}","Name_app":"connect","Name_event":"list_load"}`)
        .then(res => {
            this.documents = res.data.body;
            this.loading = false;
        })
        .catch((e) => {
            console.log(e.response);
        })
      }
  }
}
</script>

<style>
.v-list {
    padding: 0 !important;
}
.v-list-item__title {
    font-size: 1.1rem !important;
}
.v-list-item__content {
    padding: 30px 5px !important;
}
.mdi-download {
    margin-top: 15px;
    margin-right: 5px;
}
</style>
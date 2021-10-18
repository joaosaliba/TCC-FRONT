<template>
  <div id="alerta">
    <div v-cloak>
      <b-alert
        :show="alertCountDown"
        dismissible
        variant="danger"
        @dismissed="alertCountDown=0"
        @dismiss-count-down="alertCountDownChanged"
      >
        <p>
          <b>{{ tituloErro }}</b>
          <br>
          {{ mensagemErro }}
        </p>
      </b-alert>
      <b-alert
        :show="msgCountDown"
        dismissible
        variant="success"
        @dismissed="msgCountDown=0"
        @dismiss-count-down="msgCountDownChanged"
      >
        <p>{{ mensagemSucesso }}</p>
      </b-alert>
      <b-alert
        :show="msgInfoCountDown"
        dismissible
        variant="info"
        @dismissed="msgInfoCountDown=0"
        @dismiss-count-down="msgInfoCountDownChanged"
      >
        <p>{{ mensagemInfo }}</p>
      </b-alert>
    </div>
  </div>
</template>
<script>
export default {
  name:"Alerta",
  data: function () {
    return {
      dispensaAlertaSeg: 10,
      alertCountDown: 0,
      msgCountDown: 0,
      msgInfoCountDown: 0,
      tituloErro: '',
      mensagemErro: '',
      mensagemSucesso: '',
      mensagemInfo: ''
    }
  },
  methods: {
    alertCountDownChanged (alertCountDown) {
      this.alertCountDown = alertCountDown
    },
    msgCountDownChanged (msgCountDown) {
      this.msgCountDown = msgCountDown
    },
    msgInfoCountDownChanged (msgInfoCountDown) {
      this.msgInfoCountDown = msgInfoCountDown
    },
    mostraErro (error, msg) {
      var titulo = 'Erro! '
      if (
        error != null &&
        error != undefined &&
        error.response != null &&
        error.response != undefined
      ) {
        var status = error.response.status
        if (status == 403 || status == 412 || status == 404) {
          if (typeof error.response.data.includes === 'function') {
            if (!error.response.data.includes('html')) {
              titulo += error.response.data
            }
          }
        } else if (error.response.status == 500) {
          titulo = 'Erro interno do servidor'
        }
      } else {
        titulo = 'Erro!'
      }

      this.tituloErro = titulo
      this.mensagemErro = msg
      this.alertCountDown = this.dispensaAlertaSeg
    },
    mostraErroSimples (titulo, msg) {
      this.tituloErro = titulo
      this.mensagemErro = msg
      this.alertCountDown = this.dispensaAlertaSeg
    },
    mostraMsg (msg) {
      this.mensagemSucesso = msg
      this.msgCountDown = this.dispensaAlertaSeg
    },
    mostraMsgInfo (msg) {
      this.mensagemInfo = msg
      this.msgInfoCountDown = this.dispensaAlertaSeg
    }
  }
}
</script>
<style  scoped>
#alerta {
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  margin: 20px 10px;
}

</style>
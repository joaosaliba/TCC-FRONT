export const dataUtil = {
  getTimeComOffset: function(data) {
    if (!data) return;
    // O método getTimezoneOffset retorna um valor em minutos. As multiplicação
    // transformam em milisegundos
    let offset = data.getTimezoneOffset() * 60 * 1000;

    return data.getTime() + offset;
  },
  aplicarOffset: function(data) {
    if (!data) return;

    return new Date(dataUtil.getTimeComOffset(data));
  },
  maskHora: function(data, seconds = true) {
    const vm = this;
    let dataOffset = dataUtil.getTimeComOffset(new Date(data));
    let formatado = null;
    // Opções do formatador
    let options = {
      hour: "numeric",
      minute: "numeric",
      second: seconds ? "numeric" : undefined,
      hour12: false,
      timeZone: "America/Sao_Paulo",
    };

    if (data != null) {
      formatado = new Intl.DateTimeFormat("pt-BR", options).format(dataOffset);
    }
    return formatado;
  },
  maskDataHora: function(data, seconds = false) {
    const vm = this;
    let dataOffset = dataUtil.getTimeComOffset(new Date(data));
    let formatado = null;
    // Opções do formatador
    let options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: seconds ? "numeric" : undefined,
      hour12: false,
      timeZone: "America/Sao_Paulo",
    };

    if (data != null) {
      formatado = new Intl.DateTimeFormat("pt-BR", options).format(dataOffset);
    }
    return formatado;
  },
  maskData: function(data) {
    const vm = this;
    let dataOffset = dataUtil.getTimeComOffset(new Date(data));
    let formatado = null;
    // Opções do formatador
    let options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      // hour: 'numeric', minute: 'numeric', second: seconds ? 'numeric' : undefined,
      // hour12: false,
      // timeZone: 'America/Sao_Paulo'
    };

    if (data != null) {
      formatado = new Intl.DateTimeFormat("pt-BR", options).format(dataOffset);

      if (data != null) {
        formatado = new Intl.DateTimeFormat("pt-BR", options).format(
          dataOffset
        );
      }
      return formatado;
    }
  },
  aplicarISODateTime: function(
    dataStr,
    separadorData = "/",
    adiocionarCentessimos = true
  ) {
    if (
      dataStr === undefined ||
      dataStr.length == 0 ||
      typeof dataStr !== "string"
    ) {
      return dataStr;
    }

    let dataArray = dataStr.split(" ");
    dataArray[0] = dataArray[0]
      .split(separadorData)
      .reverse()
      .join("-");
    let dataIso = dataArray.join("T") + (adiocionarCentessimos ? ":00Z" : "Z");
    return dataIso;
  },

  diaMesAnoParaAnoMesDia: function(data) {
    data = data.replace(/-/g, "/");

    const dia = data.split("/")[0];
    const mes = data.split("/")[1];
    const ano = data.split("/")[2];

    return ano + "-" + ("0" + mes).slice(-2) + "-" + ("0" + dia).slice(-2);
    // Utilizo o .slice(-2) para garantir o formato com 2 digitos.
  },
  tempoDecorrido: function(desde) {
    const since = desde;
    const elapsed = (new Date().getTime() - since) / 1000;

    if (elapsed >= 0) {
      const diff = {};

      diff.days = Math.floor(elapsed / 86400);
      diff.hours = Math.floor((elapsed / 3600) % 24);
      diff.minutes = Math.floor((elapsed / 60) % 60);
      diff.seconds = Math.floor(elapsed % 60);
      let message;

      if (diff.days > 0) {
        message = `${
          diff.days > 1 ? diff.days + " dias" : diff.days + " dia"
        } atrás`;
      } else if (diff.hours > 0) {
        message = `${
          diff.hours > 1 ? diff.hours + " horas" : diff.hours + " hora"
        } atrás`;
      } else if (diff.minutes > 0) {
        message = `${
          diff.minutes > 1
            ? diff.minutes + " minutos"
            : diff.minutes + " minuto"
        } atrás`;
      } else if (diff.seconds > 0) {
        message = `${
          diff.seconds > 1
            ? diff.seconds + " segundos"
            : diff.seconds + " segundo"
        } atrás`;
      }
      message = message.replace(/(?:0. )+/, "");
      return message;
    } else {
      const diff = {};

      diff.days = Math.abs(Math.floor(elapsed / 86400));
      diff.hours = Math.abs(Math.floor((elapsed / 3600) % 24));
      diff.minutes = Math.abs(Math.floor((elapsed / 60) % 60));
      diff.seconds = Math.abs(Math.floor(elapsed % 60));
      let message;

      if (diff.days > 0) {
        message = `${
          diff.days > 1 ? diff.days + " dias" : diff.days + " dia"
        } a frente`;
      } else if (diff.hours > 0) {
        message = `${
          diff.hours > 1 ? diff.hours + " horas" : diff.hours + " hora"
        } a frente`;
      } else if (diff.minutes > 0) {
        message = `${
          diff.minutes > 1
            ? diff.minutes + " minutos"
            : diff.minutes + " minuto"
        } a frente`;
      } else if (diff.seconds > 0) {
        message = `${
          diff.seconds > 1
            ? diff.seconds + " segundos"
            : diff.seconds + " segundo"
        }  a frente`;
      }
      message = message.replace(/(?:0. )+/, "");
      return message;
    }
  },
  getMesAno(date) {
    if (date === undefined || date === null) return null;
    return date.toLocaleDateString("pt-BR", {
      month: "long",
      year: "numeric",
    });
  },
  getNomeDoMes(mes) {
    if (mes === undefined || mes === null) return null;

    const date = new Date(1, mes, 1);
    return date.toLocaleString("default", {
      month: "long",
    });
  },
};

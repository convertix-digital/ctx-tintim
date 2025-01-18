(function () {
    // Cria um objeto de contexto ou usa um existente
    var ctx = window.ctx || {};

    // Função de inicialização
    ctx.init = function () {
        if (this.accountCode) {
            this.saveParams();
            this.addParamsToLinks();
        }
    };

    // Adiciona parâmetros aos links
    ctx.addParamsToLinks = function () {
        const links = document.querySelectorAll('a[href]');

        links.forEach(link => {
            if (link.getAttribute('href').startsWith('#')) return;

            const url = new URL(link.href);
            const cookies = getCookiesWithPrefix("ctx_");

            // Adiciona cookies como parâmetros se não existirem
            Object.entries(cookies).forEach(([name, value]) => {
                if (!url.searchParams.has(name)) {
                    url.searchParams.append(name, value);
                }
            });

            link.href = url.toString();
        });
    };

    // Salva parâmetros válidos como cookies
    ctx.saveParams = function () {
        const queryParams = new URLSearchParams(window.location.search);
        const validParams = [
            "utm_source", "utm_medium", "utm_campaign", "utm_content", "campaignid",
            "adsetid", "fbclid", "tintim_fbid", "adset", "adid", "gclid", "utm_term",
            "adgroupid", "targetid", "adcampaign", "groupid", "gad_source", "utm_id",
            "__hsfp", "__hssc", "__hstc", "__s", "_hsenc", "_openstat", "dclid",
            "hsCtaTracking", "mc_eid", "mkt_tok", "ml_subscriber", "ml_subscriber_hash",
            "msclkid", "oly_anon_id", "oly_enc_id", "rb_clickid", "s_cid", "vero_conv",
            "vero_id", "wickedid", "yclid", "src", "sck", "utm_publico", "utm_url"
        ];

        queryParams.forEach((value, key) => {
            if (validParams.includes(key)) {
                document.cookie = `ctx_${key}=${value};`;
            }
        });
    };

    // Função auxiliar para obter cookies com um prefixo específico
    function getCookiesWithPrefix(prefix) {
        return document.cookie.split('; ').reduce((obj, cookie) => {
            let [name, value] = cookie.split('=');
            if (name.startsWith(prefix)) {
                name = name.replace(prefix, "");
                obj[name] = value;
            }
            return obj;
        }, {});
    }

    // Inicializa o contexto
    ctx.init();
})();

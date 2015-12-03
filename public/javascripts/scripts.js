$('.selectpicker').selectpicker({
    style: 'btn-default'
});

$('#cargo').change(function () {
    if ($(this).val() === "Presidente") {
        // Manipular o DOM para remover os estados, permitindo apenas Brasil
        console.log("Presidente")
        $('#uf').val("Brasil");
        $('#uf').children().filter(function () {
            return $(this).text() === "Brasil"
        }).prop('disabled', false);
        $('#uf').children().filter(function () {
            return $(this).text() !== "Brasil"
        }).prop('disabled', true);
        $('#uf').selectpicker('refresh');

    } else if ($(this).val() === "Governador") {
        console.log("Governador")
            // Manipular o DOM para restaurar estados e remover Brasil
        $('#uf').val("Pernambuco");
        $('#uf').children().filter(function () {
            return $(this).text() === "Brasil"
        }).prop('disabled', true);
        $('#uf').children().filter(function () {
            return $(this).text() !== "Brasil"
        }).prop('disabled', false);
        $('#uf').selectpicker('refresh');

    }
});

//sempre começamos em governador, portanto fazer a devida desativação
$('#uf').children().filter(function () {
    return $(this).text() === "Brasil"
}).prop('disabled', true);
$('#uf').children().filter(function () {
    return $(this).text() !== "Brasil"
}).prop('disabled', false);
$('#uf').selectpicker('refresh');

//uso da biblioteca scrollify para separar as sessões do site
$(function () {
    $.scrollify({
        section: "section",
    });
});
// Botão que dá scroll para baixo e envia request GET
$('#bottom').click(function () {
    $('body, html').animate({
        scrollTop: 0
    }, 500);

});

var estados = {
    "Pernambuco": "PE",
    "Sao Paulo": "SP",
    "Rio de Janeiro": "RJ",
    "Brasil": "SP"
};

var cargos = {
    "Governador": 3,
    "Presidente": 1
};

// Request GET
$('#bottom').click(function () {
    var uf = estados[$('#uf').val()];
    var ano = $('#ano').val();
    var cargo = cargos[$('#cargo').val()];

    var url = '/candidatos?estado=' + uf + '&ano=' + ano + '&cargo=' + cargo;

    $.getJSON(url, function (data) {
        var candidato = data.candidato;
        var doacoes = data.doacoes;
        var inidoneos = data.doadores_inidoneos;

        var apelido = candidato.apelido;
        var cargo_atual = candidato.cargo;
        var nome = candidato.nome;
        var partido = candidato.partido;
        var miniBio = candidato.miniBio;
        var doac1 = doacoes[0].nome;
        var doac2 = doacoes[1].nome;
        var doac3 = doacoes[2].nome;
        var doac4 = doacoes[3].nome;
        var doac5 = doacoes[4].nome;
        var cgc = doacoes.cgc;
        var montante = doacoes.montante;

        $('#cargo_atual').text(cargo_atual);
        $('#apelido').text(apelido);
        $('#nome').text(nome);
        $('#partido').text(partido);
        $('#miniBio').text(miniBio);
        $('#doac1').text(doac1);
        $('#doac2').text(doac2);
        $('#doac3').text(doac3);
        $('#doac4').text(doac4);
        $('#doac5').text(doac5);


    });
});

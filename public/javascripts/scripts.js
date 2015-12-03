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

$('#bottom').click(function () {
    $('body, html').animate({
        scrollTop: 0
    }, 500);

});

$('.selectpicker').selectpicker({
     style: 'btn-default'
 });


$('#cargo').change(function(){
  if ($(this).val() === "Presidente"){
    // Manipular o DOM para remover os estados, permitindo apenas Brasil
    console.log("Presidente")
  $('#uf').filter(function(){return $(this).text()!=="Brasil"}).prop('disabled',true);
  $('#uf').filter(function(){return $(this).text()==="Brasil"}).prop('disabled',false);
  $('#uf').selectpicker('refresh');

} else if($(this).val() === "Governador"){
  console.log("Governador")
  // Manipular o DOM para restaurar estados e remover Brasil
  $('#uf').filter(function(){return $(this).text()!=="Brasil"}).prop('disabled',false);
  $('#uf').filter(function(){return $(this).text()==="Brasil"}).prop('disabled',true);
  $('#uf').selectpicker('refresh');


  }
})

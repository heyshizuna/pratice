const allFN = {};

allFN.modal = ()=>{
$('.open-btn').click(function(){
  $('.modal-content').fadeToggle('slow');
  $('.modal-content').attr('stamp','open');
});
$('.close-btn').click(function(){
  $('.modal-content').fadeToggle('slow');
  $('.modal-content').attr('stamp','close');
});
}

allFN.drop = () =>{
  $('.dropdown-btn').click(function(){
  $('.dropdown-menu').slideToggle('2000');
  });
}

allFN.tabs=()=>{
$('.tab[data-tab="1"]').addClass('active')
$('.content[data-tab="1"]').addClass('active')

$('.tab').click(function(){
  const tabNum = $(this).attr('data-tab');

  $('.tab').removeClass('active')
  $('.content').removeClass('active')

  $(this).addClass('active')
  $('.content[data-tab="' + tabNum + '"]').addClass('active')
});
}


// (function(){
//   allFN.modal();
//   allFN.drop();
//   allFN.tabs();
// })


allFN.modal();
allFN.drop();
allFN.tabs();
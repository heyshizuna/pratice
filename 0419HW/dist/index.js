/******/ (function() { // webpackBootstrap
var __webpack_exports__ = {};
var allFN = {};
allFN.modal = function () {
  $('.open-btn').click(function () {
    $('.modal-content').fadeToggle('slow');
    $('.modal-content').attr('stamp', 'open');
  });
  $('.close-btn').click(function () {
    $('.modal-content').fadeToggle('slow');
    $('.modal-content').attr('stamp', 'close');
  });
};
allFN.drop = function () {
  $('.dropdown-btn').click(function () {
    $('.dropdown-menu').slideToggle('2000');
  });
};
allFN.tabs = function () {
  $('.tab[data-tab="1"]').addClass('active');
  $('.content[data-tab="1"]').addClass('active');
  $('.tab').click(function () {
    var tabNum = $(this).attr('data-tab');
    $('.tab').removeClass('active');
    $('.content').removeClass('active');
    $(this).addClass('active');
    $('.content[data-tab="' + tabNum + '"]').addClass('active');
  });
};

// (function(){
//   allFN.modal();
//   allFN.drop();
//   allFN.tabs();
// })

allFN.modal();
allFN.drop();
allFN.tabs();
/******/ })()
;
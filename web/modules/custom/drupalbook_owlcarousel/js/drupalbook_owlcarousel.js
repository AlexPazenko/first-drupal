(function ($) {
  Drupal.behaviors.drupalBookOwlCarousel = {
    attach: function (context, settings) {
      $('.view-content #widget_pager_bottom_slide_show-block_1').owlCarousel({
        items: 3,
        margin: 5,
        nav: true,
        dots: false,
        responsiveClass:true,
        responsive:{
          0: {
            items: 3
          },
          600:{
            items: 3
          },
          1000:{
            items: 3
          }
        }
      });
      $('.view-content #widget_pager_bottom_slide_show-block_1').addClass('owl-carousel');
      /*$('.owl-carousel').find('.owl-nav').removeClass('disabled');
      $('.owl-carousel').on('changed.owl.carousel', function(event) {
        $(this).find('.owl-nav').removeClass('disabled');
      });*/
    }
  };
})(jQuery);

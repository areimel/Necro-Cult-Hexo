(function($){



//MAIN JS CODE

/*************************************
        Global Elements
*************************************/
  
  //NAV

    //HEADROOM - HEADER
            $("#header").headroom({
              "offset": 0,
              "tolerance": 25,
            });
    
    //NAV BUTTONS
      $('.menu_button').click(function(){
            if($('.body_wrapper').hasClass('active')){
                $(this).removeClass('active');
                $('.body_wrapper').removeClass('active');
                $('#nav').removeClass('active');
            }else{
                $(this).addClass('active');
                $('.body_wrapper').addClass('active');
                $('#nav').addClass('active');
            }
        });



  //STICKY SIDEBAR
    if($('.sticky_sidebar').length){
      console.log('sticky sidebar');
      
      /*$('.blog_get_results').click(function(e) {
        setTimeout(function(){
          sticky_sidebar.duration($('.blog_sidebar').height() - 420);
        }, 750);

      })*/
      
      var controller = new ScrollMagic.Controller();

      var sticky_sidebar = new ScrollMagic.Scene({
        triggerElement: ".sticky_sidebar",
        triggerHook: 'onLeave', 
        offset: -100,
        duration: $('.sticky_sidebar').height() - 750
        //loglevel: 3,
      })
        
        //.setClassToggle(".sticky_sidebar", "active") // trigger a TweenMax.to tween
        .setPin(".sticky_sidebar")
        .addTo(controller);
      
    }

/*************************************
        PAGES
*************************************/
  /*************************************
          HOME
  *************************************/
      
      var home_hero_swiper = new Swiper('.home_hero_slider', {
          spaceBetween: 200,
          pagination: {
            el: '.home_hero_slider .swiper-pagination',
          },
          speed: 500,
          autoplay: {
              delay: 5000,
            },
      });
    

  	//RANDOM QUOTE SELECTOR
  	$(function() {
  		var quotes = new Array(
  			"The Past is Alive",
        "Death To False Metal",
        "Brothers of Steel"


  		),
  		randno = quotes[Math.floor( Math.random() * quotes.length )];
  		$('#nav_tagline').html( randno );
  	});


  //ALBUM ART CREDIT

  //TYPEWRITER TEXT EFFECT
      const typing = document.querySelectorAll('.typewriter');

      function type(element) {
      
          function randomOpacity() {
              return (Math.floor(Math.random() * 50) + 50)/100;
          }
          
          function randomEms() {
              if (Math.random() > .8) {
                  return (Math.floor(Math.random() * 100) - 50)/800;
              }
              else {
                  return 0;
              }
          }
          
          function wrap(char) {
              return '<span style="opacity:' + randomOpacity() + '; text-shadow:' + randomEms() + 'em ' + randomEms() + 'em currentColor;">' + char + '</span>';
          }
          
          const wrappedText = Array.from(element.textContent).map(wrap);
          
          element.innerHTML = wrappedText.join('');
      
      }
      
      typing.forEach(type);






      //ACHIEVEMENT CODE

          /****
           * Example HTML:
           * <a class="button achievement" data-title="Achievement Getter" data-description="You have unlocked you first achievement." data-icon='<i class="fas fa-ring"></i>'>Achievement Get</a>
           * 
           * Icons: https://fontawesome.com/icons?d=gallery&c=gaming-tabletop,halloween,music&m=free 
           * 
           */
          $('.achievement').click(function(){
              var title = $(this).data('title');
              var description = $(this).data('description');
              var icon = $(this).data('icon');
              
              $('#achievement_notification .title').text(title);
              $('#achievement_notification .description').text(description);
              $('#achievement_notification .icon>.inner').html(icon);
              
              $('#achievement_notification').addClass('active');
              setTimeout(function () { 
                      $('#achievement_notification').removeClass('active');
              }, 8000);
               
          });














//STOCK JS CODE
  // Search
  var $searchWrap = $('#search-form-wrap'),
    isSearchAnim = false,
    searchAnimDuration = 200;

  var startSearchAnim = function(){
    isSearchAnim = true;
  };

  var stopSearchAnim = function(callback){
    setTimeout(function(){
      isSearchAnim = false;
      callback && callback();
    }, searchAnimDuration);
  };

  $('#nav-search-btn').on('click', function(){
    if (isSearchAnim) return;

    startSearchAnim();
    $searchWrap.addClass('on');
    stopSearchAnim(function(){
      $('.search-form-input').focus();
    });
  });

  $('.search-form-input').on('blur', function(){
    startSearchAnim();
    $searchWrap.removeClass('on');
    stopSearchAnim();
  });

  // Share
  $('body').on('click', function(){
    $('.article-share-box.on').removeClass('on');
  }).on('click', '.article-share-link', function(e){
    e.stopPropagation();

    var $this = $(this),
      url = $this.attr('data-url'),
      encodedUrl = encodeURIComponent(url),
      id = 'article-share-box-' + $this.attr('data-id'),
      offset = $this.offset();

    if ($('#' + id).length){
      var box = $('#' + id);

      if (box.hasClass('on')){
        box.removeClass('on');
        return;
      }
    } else {
      var html = [
        '<div id="' + id + '" class="article-share-box">',
          '<input class="article-share-input" value="' + url + '">',
          '<div class="article-share-links">',
            '<a href="https://twitter.com/intent/tweet?url=' + encodedUrl + '" class="article-share-twitter" target="_blank" title="Twitter"></a>',
            '<a href="https://www.facebook.com/sharer.php?u=' + encodedUrl + '" class="article-share-facebook" target="_blank" title="Facebook"></a>',
            '<a href="http://pinterest.com/pin/create/button/?url=' + encodedUrl + '" class="article-share-pinterest" target="_blank" title="Pinterest"></a>',
            '<a href="https://plus.google.com/share?url=' + encodedUrl + '" class="article-share-google" target="_blank" title="Google+"></a>',
          '</div>',
        '</div>'
      ].join('');

      var box = $(html);

      $('body').append(box);
    }

    $('.article-share-box.on').hide();

    box.css({
      top: offset.top + 25,
      left: offset.left
    }).addClass('on');
  }).on('click', '.article-share-box', function(e){
    e.stopPropagation();
  }).on('click', '.article-share-box-input', function(){
    $(this).select();
  }).on('click', '.article-share-box-link', function(e){
    e.preventDefault();
    e.stopPropagation();

    window.open(this.href, 'article-share-box-window-' + Date.now(), 'width=500,height=450');
  });

  // Caption
  $('.article-entry').each(function(i){
    $(this).find('img').each(function(){
      if ($(this).parent().hasClass('fancybox')) return;

      var alt = this.alt;

      if (alt) $(this).after('<span class="caption">' + alt + '</span>');

      $(this).wrap('<a href="' + this.src + '" title="' + alt + '" class="fancybox"></a>');
    });

    $(this).find('.fancybox').each(function(){
      $(this).attr('rel', 'article' + i);
    });
  });

  if ($.fancybox){
    $('.fancybox').fancybox();
  }

  // Mobile nav
  var $container = $('#container'),
    isMobileNavAnim = false,
    mobileNavAnimDuration = 200;

  var startMobileNavAnim = function(){
    isMobileNavAnim = true;
  };

  var stopMobileNavAnim = function(){
    setTimeout(function(){
      isMobileNavAnim = false;
    }, mobileNavAnimDuration);
  }

  $('#main-nav-toggle').on('click', function(){
    if (isMobileNavAnim) return;

    startMobileNavAnim();
    $container.toggleClass('mobile-nav-on');
    stopMobileNavAnim();
  });

  $('#wrap').on('click', function(){
    if (isMobileNavAnim || !$container.hasClass('mobile-nav-on')) return;

    $container.removeClass('mobile-nav-on');
  });
})(jQuery);
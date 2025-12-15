/* Simple jQuery ripple plugin (lightweight, permissive implementation)
   Usage: $(selector).ripple({ color: 'rgba(...)', duration: 700 });
*/
(function($){
  $.fn.ripple = function(options){
    var settings = $.extend({ color: 'rgba(255,255,255,0.25)', duration: 700 }, options);

    return this.each(function(){
      var $el = $(this);
      if ($el.css('position') === 'static') $el.css('position','relative');
      $el.on('pointerdown.ripple touchstart.ripple mousedown.ripple', function(e){
        var ev = e.originalEvent || e;
        var pageX = ev.pageX || (ev.touches && ev.touches[0] && ev.touches[0].pageX) || 0;
        var pageY = ev.pageY || (ev.touches && ev.touches[0] && ev.touches[0].pageY) || 0;
        var offset = $el.offset();
        var x = pageX - offset.left;
        var y = pageY - offset.top;

        var size = Math.max($el.outerWidth(), $el.outerHeight()) * 2;
        var $r = $('<span class="ripple-element"></span>');
        $r.css({
          width: size + 'px',
          height: size + 'px',
          left: (x - size/2) + 'px',
          top: (y - size/2) + 'px',
          background: settings.color,
          transition: 'transform ' + (settings.duration/1000) + 's ease-out, opacity ' + (settings.duration/1000) + 's ease-out'
        });

        $el.append($r);
        // force layout then animate
        requestAnimationFrame(function(){
          $r.addClass('ripple-animate');
        });

        // remove after animation
        setTimeout(function(){ $r.remove(); }, settings.duration + 50);
      });
    });
  };
})(jQuery);

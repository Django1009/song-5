// Initialize ripple on the main container
$(function(){
  if ($.fn.ripple) {
    $('.ocean-container').ripple({ color: 'rgba(255,255,255,0.18)', duration: 900 });
  }
});

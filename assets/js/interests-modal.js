/* interests-modal.js: opens interests.html in a full-screen pop-up from any link with data-open="interests".
   Closes with the Close button, the Escape key, or Escape pressed inside the gallery. */
(function(){
  const modal=document.getElementById("interests-modal");
  if(!modal)return;
  const frame=modal.querySelector("iframe"), closeBtn=modal.querySelector(".modal-close");
  let opener=null;
  function open(link){
    opener=link;
    if(!frame.src)frame.src=frame.dataset.src;      // load the gallery only the first time it is opened
    modal.hidden=false;
    document.body.classList.add("modal-open");
    closeBtn.focus();
  }
  function close(){
    modal.hidden=true;
    document.body.classList.remove("modal-open");
    if(opener)opener.focus();
  }
  document.addEventListener("click",function(e){
    const a=e.target.closest('[data-open="interests"]');
    if(!a)return;
    e.preventDefault();open(a);
  });
  closeBtn.addEventListener("click",close);
  document.addEventListener("keydown",function(e){if(e.key==="Escape"&&!modal.hidden)close()});
  addEventListener("message",function(e){if(e.data==="close-interests"&&!modal.hidden)close()});
})();

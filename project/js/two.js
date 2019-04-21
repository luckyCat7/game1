onload=function(){
    function $(el){
        return document.querySelector(el);
    }

    let isOk=0;
    let moveBox=document.querySelectorAll('.pencil li img');
    let alertBox=document.querySelector('.wrap .box');
    let innerBox=document.querySelector('.wrap .box .box-inner');
    var moveL = 0;
    var moveT = 0;
    let index1=-1;
    for(let a=0;a<moveBox.length;a++){
        let back=[];
        back.push({
            left: moveBox[a].offsetLeft,
            top: moveBox[a].offsetTop
        })
        moveBox[a].ontouchstart=function(ev){
            let isEnter=false;
            let index=a;
            this.style.transition="none"
            let startL=ev.targetTouches[0].pageX-this.offsetLeft;
            let startT=ev.targetTouches[0].pageY-this.offsetTop;

            //
            moveBox[index].style.transform='scale(1.2)';
            moveBox[index].style.transition='1s';
            
            this.style.position="absolute"
            document.ontouchmove=(ev)=>{
                moveBox[a].style.transition='none';
                isEnter=false;
                moveL=ev.targetTouches[0].pageX-startL;
                moveT=ev.targetTouches[0].pageY-startT;
                if(moveL<=0){moveL=0}
                if(moveT<=0){moveT=0}
                if(moveL>=window.innerWidth-this.offsetWidth){
                    moveL=window.innerWidth-this.offsetWidth;
                }
                if(moveT>=window.innerHeight-this.offsetHeight){
                    moveT=window.innerHeight-this.offsetHeight;
                }
                console.log(window.innerHeight);
                this.style.left=`${moveL}px`;
                this.style.top=`${moveT}px`;
                index1=(collision(this,$('.house').children))
                if(index1!=-1){
                    clear()
                    $('.house').children[index1].style.transform='scale(1.2)';
                    if(index1==a){
                        isEnter=true
                    }
                }else{
                    clear()
                }
            }
            document.ontouchend=function(){
                console.log(index1)
                moveBox[index].style.transform='scale(1)';
                if(index1!=-1){
                    if(moveT || moveL){
                        if(isEnter){
                            isOk++;
                            moveBox[index].style.display='none';
                            if(isOk!=3){
                                setTimeout(function(){
                                    alertBox.style.opacity='1';
                                    alertBox.style.zIndex='99';
                                    innerBox.innerHTML='小朋友，你答对喽!';
                                },500)
                                clear()
                            }
                            setTimeout(function(){
                                alertBox.style.opacity='0';
                                alertBox.style.zIndex='-1';
                                clear()
                            },2000)
                        }else{
                            // alert("放入失败")
                            moveBox[index].style.transition=" 1s";
                            moveBox[index].style.left=back[0].left+"px";
                            moveBox[index].style.top=back[0].top+"px";
                            setTimeout(function(){
                                alertBox.style.opacity='1';
                                alertBox.style.zIndex='99';
                                innerBox.innerHTML='小朋友，你答错喽!';
                                clear()
                            },1000)
                            setTimeout(function(){
                                alertBox.style.opacity='0';
                                alertBox.style.zIndex='-1';
                                clear()
                            },3000)
                        }
                        this.ontouchmove=this.ontouchend=null;
                        if(isOk==3){
                            setTimeout(function(){
                                alertBox.style.opacity='1';
                                alertBox.style.zIndex='99';
                                innerBox.innerHTML='全答对喽,你真棒!';
                                clear()
                            },500)
                            setTimeout(function(){
                                location.href='./three.html';
                            },3500)
                        }
                    }
                }else{
                    clear()
                    moveBox[index].style.transition=" 1s";
                    moveBox[index].style.left=back[0].left+"px";
                    moveBox[index].style.top=back[0].top+"px";
                    this.ontouchmove=this.ontouchend=null;
                }
                    
                    
            }
        }
    }

    function collision(obj,oList){
        var objL=obj.offsetLeft;
        var objT=obj.offsetTop;
        var objW=obj.offsetWidth;
        var objH=obj.offsetHeight;
        var index=-1;
        let min=9999;
        for(let a=0;a<oList.length;a++){
            if(oList[a]!=obj){
                var listL=oList[a].offsetLeft;
                var listT=oList[a].offsetTop;
                var listW=oList[a].offsetWidth;
                var listH=oList[a].offsetHeight;
                if(objT+objH<listT||listT+listH<objT||objL+objW<listL||listL+listW<objL){
                    //aosT+aosH<osT  ||osT  +osH  <aosT||aosL+aosW <osL ||osL  +osW  <aosL
                }else{
                    var obja=objL-listL;
                    var objb=objT-listT;//直角边 a,b
                    var objc=Math.sqrt(obja*obja+objb*objb)//斜边 c
                    if(objc<min){
                        min=objc;
                        index=a;
                    }
                }	

            }
        }
        
        return index
    }

    function clear(){
        for(let j=0;j<$('.house').children.length;j++){
            $('.house').children[j].style.transform='scale(1)'
        }
    }

}    
    
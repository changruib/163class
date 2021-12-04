(function(){
    var game={
        "$":function(ele){
            return document.querySelectorAll(ele);
        },
        //游戏列表
        "gamelist":function(){
            var gameList=this.$('.game_list')[0];
            var text=document.getElementsByClassName('game_list')[0].getElementsByClassName('text')[0];
            var content=topNav.getElementsByClassName('content')[0];
            var bottomIcon=content.getElementsByClassName('bottomIcon')[0];
            var imgBtn=bottomIcon.getElementsByTagName('img')[0];
            
            imgBtn.onclick = function(){
                gameList.classList.remove('active');
                text.style.display='block';
                setTimeout(function(){
                    content.style.height='0px';
                },0);
            };
            gameList.onclick=function(){
                if(gameList.classList.contains('active')){
                    this.classList.remove('active');
                    text.style.display='block';
                    setTimeout(function(){
                        content.style.height='0px';
                    },0);
                }
                else{
                    this.classList.add('active');
                    text.style.display='none';
                    setTimeout(function(){
                        content.style.height='930px';
                    },0);
                } 
            };
            gameList.onmousedown = function(){
                return false;
            }
        },

        //轮播图
        "bannerSlide":function(){
            var slideImg=banner.getElementsByClassName('banner_ul')[0].children;
            var slidePoint=banner.getElementsByClassName('slider')[0].getElementsByTagName('ol')[0].children;
            var last=banner.getElementsByClassName('banner_last')[0];
            var thumbnailLeft=last.getElementsByClassName('thumbnail')[0];
            var next=banner.getElementsByClassName('banner_next')[0];
            var thumbnailRight=next.getElementsByClassName('thumbnail')[0];
            var timer=null;
            var auto=null;
            var position=0;

            
            //上一个
            last.onclick=function(){
                if(position==0){
                    position=slidePoint.length;
                }
                touch(slidePoint[position-1]);
            }
            last.onmouseover=function(){
                var v1=position;
                if(v1==0){
                    v1=slidePoint.length;
                }
                var img=thumbnailLeft.getElementsByTagName('img')[0];
                thumbnailLeft.style.display='block';
                img.src='image/'+'thumbnail-'+(v1-1)+'.jpg';
            }
            last.onmouseout=function(){
                thumbnailLeft.style.display='none';
            }
            //下一个
            next.onclick=function(){
                if(position==slidePoint.length-1){
                    position=-1;
                }
                touch(slidePoint[position+1]);
            }
            next.onmouseover=function(){
                var v1=position;
                if(v1==slidePoint.length-1){
                    v1=-1;
                }
                
                var img=thumbnailRight.getElementsByTagName('img')[0];
                thumbnailRight.style.display='block';
                img.src='image/'+'thumbnail-'+(v1+1)+'.jpg';
            }
            next.onmouseout=function(){
                thumbnailRight.style.display='none';
            }

            for(var i=0;i<slideImg.length;i++){
                slidePoint[i].index=i;

                //点击小红点
                slidePoint[i].onclick=function(){
                    touch(this);
                }
            }

            //点击切换
            function touch(obj){
                clearTimeout(timer);
                position = obj.index;
                for(var i=0;i<slideImg.length;i++){
                    slideImg[i].style.opacity='0';
                    slideImg[i].style.display='none';
                    slidePoint[i].classList.remove('active');
                }
                clearTimeout(timer);
                timer = setTimeout(function(){
                    slideImg[position].style.opacity='1';
                },0);
                slideImg[position].style.display='block'; 
                slidePoint[position].classList.add('active'); 
                go();
            }

            //自动轮播
            go();
            function go(){
                clearInterval(auto);
                auto = setInterval(function(){
                    clearTimeout(timer);
                    position++;
                    if(position == slideImg.length){
                        position=0;
                    }
                    for(var i=0;i<slideImg.length;i++){
                        slideImg[i].style.opacity='0';
                        slideImg[i].style.display='none';
                        slidePoint[i].classList.remove('active');
                    }
                    timer = setTimeout(function(){
                        slideImg[position].style.opacity='1';
                    },0);
                    slideImg[position].style.display='block';  
                    slidePoint[position].classList.add('active'); 
                },5000);
            }

            var titleLi=banner.getElementsByClassName('banner_news_game')[0].children;
            var contentLi=banner.getElementsByClassName('banner_news_img')[0].children;
            for(var i=0;i<titleLi.length;i++){
                titleLi[i].index=i;
                titleLi[i].onclick=function(){
                    for(var j=0;j<titleLi.length;j++){
                        titleLi[j].classList.remove('active');
                        contentLi[j].classList.remove('active');
                    }
                    this.classList.add('active');
                    contentLi[this.index].classList.add('active');
                }
            }
        },

        //官方社群
        "officialGroup":function(){
            var outerUL=officialGroup.getElementsByTagName('ul')[0];
            outerUL.style.width= outerUL.children[0].offsetWidth * outerUL.children.length + 'px';
            var outerLi=officialGroup.getElementsByTagName('ul')[0].children;
            var innerLi=this.$('.content .leftSlide ul>li ol>li');
            var leftBtn=officialGroup.getElementsByClassName('last')[0];
            var rightBtn=officialGroup.getElementsByClassName('next')[0];
            var position=0;

            leftBtn.onclick=function(){
                position--;
                if(position==-1){
                    position=outerLi.length-1;
                    outerUL.style.left= -position * 810 +'px';
                }
                else{
                    outerUL.style.left= -position * 810 +'px';
                }
                
            }
            rightBtn.onclick=function(){
                position++;
                if(position==outerLi.length){
                    position=0;
                    outerUL.style.left= -position * 810 +'px';
                }
                else{
                    outerUL.style.left= -position * 810 +'px';
                }
                
            }


            for(var i=0;i<innerLi.length;i++){
                innerLi[i].onmouseenter=function(){
                    for(var j=0;j<innerLi.length;j++){
                        innerLi[j].classList.remove('active');
                        innerLi[j].children[0].classList.remove('active');
                        innerLi[j].children[1].classList.remove('active');
                        innerLi[j].children[2].classList.remove('active');
                    }
                    this.classList.add('active');
                    this.children[0].classList.add('active');
                    this.children[1].classList.add('active');
                    this.children[2].classList.add('active');
                }
            }
        },

        //热门游戏
        "hotGames":function(){
            var change=hotgames.getElementsByClassName('title')[0].getElementsByTagName('span')[0];
            var allUl=hotgames.getElementsByClassName('gameList');
            var allLi=hotgames.getElementsByTagName('li');
            var position=0;

            change.onclick=function(){
                position++;
                if(position == allUl.length){
                    position=0;
                }
                for(var i=0;i<allLi.length;i++){
                    (function(i){
                        setTimeout(function(){
                            allLi[i].classList.add('scale');
                        },i*50);
                    })(i);
                }
                for(var i=0;i<allUl.length;i++){
                    allUl[i].classList.remove('active');
                }
                allUl[position].classList.add('active');
                for(var i=0;i<allLi.length;i++){
                    (function(i){
                        setTimeout(function(){
                            allLi[i].classList.remove('scale');
                        },i*50);
                    })(i);
                }
            }
        },

        //查看更多
        "lookMore":function(){
            var gameTree=document.getElementById('gameTree');
            var btn=gameTree.getElementsByClassName('readMore')[0].getElementsByClassName('button')[0];

            btn.onclick=function(){
                if(btn.innerText=='查看更多'){
                    gameTree.style.height='900px';
                    btn.innerText='收起';
                }
                else{
                    gameTree.style.height='614px';
                    btn.innerText='查看更多';
                }
            }
            btn.onmousedown=function(){
                return false;
            }
        }
    }
    game.gamelist();
    game.bannerSlide();
    game.officialGroup();
    game.hotGames();
    game.lookMore();
})();
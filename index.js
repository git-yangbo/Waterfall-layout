var oUls=document.getElementsByTagName('ul');
var box=document.getElementById('box');
var winHeigt=utils.win('clientHeight');
var oImgs=box.getElementsByTagName('img');
var oUlsArr=utils.likeArray(oUls);

var data;
var xhr=new XMLHttpRequest;
xhr.open('get','data.txt?_='+Math.random(),false);
xhr.onreadystatechange=function () {
  if (this.readyState===4&&/^2\d{2}$/.test(this.status)){
      data=xhr.responseText;
      console.log(data);
      data=utils.toJson(this.responseText);
    data&&data.length?bindData():null;
  }
};
xhr.send(null);

function bindData() {
    for (var i = 0; i < 50; i++) {
        var index = Math.round(Math.random() * 7);
        var cur = data[index];
        var oLi = document.createElement('li');
        var oa = document.createElement('a');
        oa.innerHTML = '采集';
        oa.href = '#';
        oLi.appendChild(oa);
        var ospan=document.createElement('span');
        ospan.innerHTML='❤';
        oLi.appendChild(ospan);
        var oIamg = document.createElement('img');
        oIamg.style.height = Math.round(Math.random() * 150 + 200) + 'px';
        oIamg.setAttribute('data-real', cur.src);
        oLi.appendChild(oIamg);
        var op = document.createElement('p');
        op.innerHTML = cur.title;
        oLi.appendChild(op);
        oUlsArr.sort(function (a, b) {
            return a.offsetHeight - b.offsetHeight;
        });
        oUlsArr[0].appendChild(oLi);
    }
}
  dlayImgs();//这里到时要执行一次图片延时加载
   window.onscroll=function () {
       dlayImgs();//这里到时要执行一次图片延时加载
    var wscrollHeight=utils.win('scrollHeight');
    var sTop=utils.win('scrollTop');
    if (winHeigt+sTop>=wscrollHeight-1000){
        bindData();
    }
   backTop();
};

var back=document.getElementById('back');
var time;
back.onclick=function () {
    time=setInterval(function () {
        var cTop=utils.win('scrollTop');
        if (cTop<=0){
            clearInterval(time);
            return;
        }
        cTop-=200;
        utils.win('scrollTop',0);
    },100);
};
window.onmusewheel=function () {
    clearInterval(time);
};

function backTop() {
    var sTop=utils.win('scrollTop');
    if (sTop>=winHeigt*0.5){
        utils.setCss(back,'display','block');
    }else {
        utils.setCss(back,'display','none');
    }
}

function dlayImgs() {
    for(var i=0;i<oImgs.length;i++){
        if (oImgs[i].flag) continue;
        checkImg(oImgs[i]);//这里执行检测图片是否可以加载
    }
}

function checkImg(img) {
      var sTop=utils.win('scrollTop');
       var imgHeight=img.offsetHeight;
      var imgTop=utils.offset(img).top;
      if (sTop+winHeigt>=imgTop+imgHeight-20){
        var imgSrc=img.getAttribute('data-real');
        var Img=document.createElement('img');
        Img.src=imgSrc;
        Img.onload=function () {
            img.src=imgSrc;
            Img=null;
            fadeImg(img);//这里执行图片渐变
            img.flag=true;
        }

    }
}

function fadeImg(img) {
    var timer = setInterval(function () {
        var op = utils.getCss(img, 'opacity');
        if (op >= 1) {
            clearInterval(timer);
            return;
        }
        op += 0.1;
        utils.setCss(img, 'opacity', op);
    }, 100);
}


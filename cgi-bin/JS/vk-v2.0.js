//Песочница
/*
 var arr = [1, -1, 2, -2, 3];

var positiveArr = arr.filter(function(number) {
  return number > 0;
});

alert( positiveArr ); // 1,2,3
 */
VK.init({ apiId: 5668186 });

var gr = new Array('zebrushansk', 'lvushi_sushi');

//Свойство для хранения данных
function getResurs(resurs) {
    function counter() {
        return counter.setResurs;
    };
    counter.setResurs = resurs;

    return counter;
}

var resurs = this.getResurs();

//После загрузки документа
$(document).ready(function () {

    
    $("#startPost").click(function () {
        if (!("user" in resurs.setResurs)) {
            alert("Вы не авторизировались!Войдите в личный кабинет.");
            return;
        }

        //gr.forEach(function (item, i, arr) {
        //    console.log("item " + item);
        //    var postsGroup = getPostsGroup(item);
        //    console.log("PostGroup " + postsGroup);
        //    resurs.setResurs.allPostsGroup.push(postsGroup.response.wall);
        //});
        //console.log(resurs.setResurs.allPostsGroup);
        //var userPost = getPostsUser();
        //console.log(resurs.setResurs.userPost);
        debugger
        getPostsGroup(gr[0]);
        getPostsGroup(gr[0]);
        console.log(resurs.setResurs.groupPost);
        
        
    });

    $("#inside").click(function () {
        VK.Auth.login(function callback(response)
        {            
            if (response.status="connected")
            {
                console.log("response " + response);
                //confirm("Вы, успешно авторитизировались!");
                
                document.getElementById('news').innerHTML = 'Здравствуйте ' + response.session.user.first_name;
                return resurs.setResurs = response.session;
            }else
                if (response.status = "unknown") {
                    alert('В не вошли в личный кабинет!');
                } else { alert('Что то пошло не так!');}
        });
    });
});

function getPostsUser()
{
    return VK.Api.call('wall.search',
    {
        owner_id: resurs.setResurs.session.user.id,
        query: "репост",
        count: 50,
        extended: true
    }, function (r)
        {
        
        return resurs.setResurs.userPost=r;
        }
    );
}

function getPostsGroup(domengroup) {
    return VK.Api.call('wall.search',
    {
        domain: domengroup,
        query: "репост",
        count: 50,
        extended: true
    }, function (r) {
        debugger
        return resurs.setResurs.groupPost = r.response.wall;
    }
    );
}
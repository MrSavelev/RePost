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
        return counter;
    };
    counter.setResurs = resurs;
    counter.allPostsGroup= new Array();
    counter.groupPost;
    counter.userPost;
    counter.session;
    counter.onPosting = new Array();
    return counter;
}

var resurs = this.getResurs();

//После загрузки документа
$(document).ready(function () {

    
    $("#startPost").click(function () {
        if (!("user" in resurs.session)) {
            alert("Вы не авторизировались!Войдите в личный кабинет.");
            return;
        }
        resurs.groupPost;
        gr.forEach(function (item, i, arr) {
            getPostsGroup(item);
            if (resurs.groupPost != undefined)
            {
                    resurs.allPostsGroup.push(resurs.groupPost);
            }
            });
        console.log(resurs.allPostsGroup);

        getPostsUser();

        resurs.allPostsGroup.forEach(function (item, i, arr)
        {
             item.response.wall.forEach(function (grwall, i1, arr1){
                 resurs.userPost.response.wall.forEach(function (usrwall, i2, arr2) {
                    console.log(grwall);
                    console.log(usrwall);
                    if (typeof (usrwall) == "object"
                     && typeof (grwall) == "object"
                     && usrwall.copy_owner_id != grwall.copy_owner_id
                     && usrwall.copy_post_id != grwall.copy_post_id)
                      {
                        resurs.onPosting.push(grwall);
                         
                      }
                    return;
                    });
            });
            
        });
        console.log(resurs.onPosting);
        

        //var groupPost = getPostsGroup(gr[0]);
        //console.log(resurs.groupPost);
        
        
    });

    $("#inside").click(function () {
        VK.Auth.login(function callback(response)
        {            
            if (response.status="connected")
            {
                console.log("response " + response);
                //confirm("Вы, успешно авторитизировались!");
                
                document.getElementById('news').innerHTML = 'Здравствуйте ' + response.session.user.first_name;
                return resurs.session = response.session;
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
        owner_id: resurs.session.user.id,
        query: "репост",
        count: 50,
        extended: true
    }, function (r)
        {
        
        return resurs.userPost=r;
        }
    );
}

function getPostsGroup(domengroup) {
    VK.Api.call('wall.search',
    {
        domain: domengroup,
        query: "репост",
        count: 50,
        extended: true
    }, function (r) {

        return resurs.groupPost = r;
    }
    );
    return resurs.groupPost;
}
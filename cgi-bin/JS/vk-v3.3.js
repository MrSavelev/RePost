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
    counter.date = new Date().setHours(0, 0, 0, 0) / 1000;
    counter.onPosting = new Array();
    counter.repost_response;
    counter.repost_error;
    counter.access_token;
    counter.user_id;
    return counter;
}

var resurs = this.getResurs();

//После загрузки документа
$(document).ready(function () {

    function getUrlVars() {
        var vars = {};
        var parts = window.location.href.replace("#", "&");
            parts=parts.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
            vars[key] = value;
            console.log(key + " " + value);
        });
        console.log(vars);
        return vars;
    }
    resurs.access_token = getUrlVars()["access_token"];
    resurs.user_id = getUrlVars()["user_id"];
    console.log(resurs.access_token);
    console.log(resurs.user_id);
    $("#startPost").click(function () {
        if (!(resurs.session.hasOwnProperty('user'))) {
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
        console.log('allpost');
        console.log(resurs.allPostsGroup);

        getPostsUser();
        console.log('user stroka ');
        console.log(resurs.userPost);
        resurs.allPostsGroup.forEach(function (item, i, arr)
        {
            item.response.wall.forEach(function (grwall, i1, arr1)
            {
                console.log(resurs.date);
                if (typeof (grwall) == "object"
                 && grwall.date>=resurs.date
                 && resurs.userPost.indexOf(grwall.post_type == "post" ? "" + grwall.from_id + "" + grwall.id : grwall.post_type == "copy" ? "" + grwall.copy_owner_id + "" + grwall.copy_post_id : "") == (-1))
                {
                    console.log(grwall.post_type == "post" ? "" + grwall.from_id + "" + grwall.id : grwall.post_type == "copy" ? "" + grwall.copy_owner_id + "" + grwall.copy_post_id : "");
                    console.log(grwall);
                    resurs.onPosting.push(grwall);
                         
                    }
            });
        });
        console.log('onPosting');
        console.log(resurs.onPosting);
        //var groupPost = getPostsGroup(gr[0]);
        //console.log(resurs.groupPost);
        
        resurs.onPosting.forEach(function (post, i, arr) {
            setTimeout(Repost(post), 1000);
            
            //console.log("Response:");
            //if (resurs.repost_response.hasOwnProperty('success')) {
            //    console.log("Результат = " + resurs.repost_response.success);
            //    console.log("Id записи = " + resurs.repost_response.post_id);
            //    console.log("Колличество репостов = " + resurs_repost_response.reposts_count);
            //    console.log("Колличсетво лайков = " + resurs.repost_response.likes_count);
            //} else {
            //    console.log("Error:");
            //    console.log("Код ошибки", resurs.repost_error.error_code);
            //    console.log("Код сообщения", resurs.repost_error.error_msg);
            //        }
            });

        });
    

    $("#inside").click(function () {
        document.location.href = 'https://oauth.vk.com/authorize?client_id=5668186&display=page&redirect_uri=https://oauth.vk.com/blank.html&scope=336130&response_type=token&v=5.59';

        //VK.Auth.login(function callback(response)
        //{            
        //    if (response.status="connected")
        //    {
        //        console.log("response " + response);
        //        //confirm("Вы, успешно авторитизировались!");
                
        //        document.getElementById('news').innerHTML = 'Здравствуйте ' + response.session.user.first_name;
        //        return resurs.session = response.session;
        //    }else
        //        if (response.status = "unknown") {
        //            alert('В не вошли в личный кабинет!');
        //        } else { alert('Что то пошло не так!');}
        //});
    });

    $("#Post").click(function () {
        /*document.location.href = 'https://api.vk.com/method/wall.repost?object=wall-75844644_20425&access_token=' + resurs.access_token + '&v=5.59';*/
        VK.Api.call('wall.repost',
            {   
                object:'wall-75844644_20425',
                access_token: resurs.access_token,
                version: 5.59
            }, function (response, error) {

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
        var usidstr = '';
            r.response.wall.forEach(function (item, i, arr)
            {
                if (item.post_type == "post")
                {
                    usidstr += "" + item.from_id + "" + item.id + ",";
                } else if (item.post_type == "copy")
                            {
                                usidstr += "" + item.copy_owner_id + "" + item.copy_post_id + ",";
                            }
                
            });
            console.log(usidstr);
            resurs.userPost = usidstr.split(',');
            console.log(resurs.userPost);
            return resurs.userPost;
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

function Repost(post) {
    VK.Api.call('wall.repost',
            {
                object: "wall" + (post.post_type == "post" ? "" + post.from_id + "_" + post.id : post.post_type == "copy" ? "" + post.copy_owner_id + "_" + post.copy_post_id : "")

            }, function (response,error) {
                //console.log("wall"+ (post.post_type == "post" ? "" + post.from_id + "_" + post.id : post.post_type == "copy" ? "" + post.copy_owner_id + "_" + post.copy_post_id : ""));
                
                resurs.repost_response = response;
                resurs.repost_error = error;
               
                return resurs.repost;
                
            });
    return resurs.repost;
}
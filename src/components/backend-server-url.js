/*хранилище url Django backend */
    const url={

        //"baseUrl":"https://ars.pythonanywhere.com",/* базовый url */
        "baseUrl":"http://127.0.0.1:8000", // тестовый url
        "url_get_data":"/api/v1/news/get/content/",/*загрузка по id */
        "lates_news":"/api/v1/news/get/last_news?page=",/*Последние новости*/
        "main_news":"/api/v1/news/get/main_news?page=",
        'search':"/api/v1/news/get/search",
    

    'social':{

        'vk':'https://vk.com/magazzbekov',
        'linkedin':'https://wa.me/message/Y4XY75EQWM47A1',
        'github':'#',
        'instagram':'https://instagram.com/magazzbekov?igshid=YmMyMTA2M2Y=',
    },
    Auth:{
        login:'/api/v1/login/',
        post:'/api/v1/news/post/new_post',
        register:'/api/v1/register/',
        refresh:'/api/v1/login/refresh/'
    },
    Update:{
        refresh:'/api/v1/login/refresh/'
    },
    Profile:{
        info:'/api/v1/user/info',
        profile:'/api/v1/news/get/profile',
        logout:'/api/v1/logout/',
        userpost:'/api/v1/news/get/user_post',
    },
    Post:{
        like:'/api/v1/news/post/like',
        identificated:'/api/v1/news/post/identificated',
        post_delete:'/api/v1/news/post/delete'
    },
    gmail:'magazbekovarsen@gmail.com',

    order:'/api/v1/news/post/order',
    catgeory:'/api/v1/category/get/all',
    filter:'/api/v1/product/filter/?category__category=',
    
    }


export default url ;
import {mapState, mapMutations} from 'vuex'

const myPlugin = {
    install(Vue){
        Vue.mixin({
            data:()=>({
                baseUrl: "http://localhost:5050/api/", // access .env file "VUE_APP_URL" w/c is url to server side script
                icadApiUrl: "http://icad_filesvr/db/api"
            }),
            methods:{
                ...mapMutations([
                    'CHANGE_USERINFO'
                ])
            },
            computed:{
                ...mapState([
                    'userInfo'
                ])
            }           
        })
    }
}
export default myPlugin
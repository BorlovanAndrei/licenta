import {create} from "zustand";
import axios from "axios";

const authStore = create((set) => ({
    loggedIn: null,

    loginForm: {
        email: "",
        password: "",
    },

    updateLoginForm: (e) => {
        const {name, value} = e.target

        set((state) =>{
            return{
                loginForm: {
                    ...state.loginForm,
                    [name]: value,
                },
            };
        });

    },

    login: async (e) =>{
        try{
            const {loginForm} = authStore.getState();

            const res = await axios.post("/general/login", loginForm, {withCredentials: true});
            set({loggedIn: true});
            console.log(res);
        }catch(error){
            console.log(error);
        }
            
        
        
    },

    checkAuth: async () =>{
        try{
            await axios.get("/general/check-auth", {withCredentials: true});
            set({ loggedIn: true});
        }catch(error){
            set({ loggedIn: false});
        }

    }

}));

export default authStore;
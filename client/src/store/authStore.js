import {create} from "zustand";
import axios from "axios";

const authStore = create((set) => ({
    loggedIn: null,

    loginForm: {
        email: "",
        password: "",
    },
    errorMessage: "",
    showError: false,

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
            set({
                loggedIn: false,
                errorMessage: "Invalid email or password",
                showError: true
            });

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

    },

    logout: async () =>{
        try{
            await axios.get("/general/logout", {withCredentials: true});
            set({ loggedIn: false});
            window.location.href = '/login';
        }catch(error){
            console.log(error);
        }
        
    },

    
    hideError: () => set({ showError: false})

}));

export default authStore;